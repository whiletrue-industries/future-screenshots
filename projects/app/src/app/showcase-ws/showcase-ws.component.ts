import { AfterViewInit, Component, computed, effect, ElementRef, signal, ViewChild, inject, OnDestroy, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, distinctUntilChanged, filter, forkJoin, from, fromEvent, interval, Observable, of, Subject, timer } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { QrcodeComponent } from "./qrcode/qrcode.component";
import { EvaluationSidebarComponent } from "./evaluation-sidebar/evaluation-sidebar.component";
import { FiltersBarComponent, FiltersBarState } from '../shared/filters-bar/filters-bar.component';
import { TaxonomyService } from '../shared/taxonomy.service';
import { FisheyeSettings } from './settings-panel.component';
import { PhotoData, PhotoAnimationState, PhotoMetadata } from './photo-data';
import { ThreeRendererService } from './three-renderer.service';
import { LayoutStrategy } from './layout-strategy.interface';
import { TaxonomyLayoutStrategy } from './taxonomy-layout-strategy';
import { SvgBackgroundLayoutStrategy } from './svg-background-layout-strategy';
import { CirclePackingLayoutStrategy } from './circle-packing-layout-strategy';
import { PhotoDataRepository } from './photo-data-repository';
import { PHOTO_CONSTANTS } from './photo-constants';
import { ANIMATION_CONSTANTS } from './animation-constants';
import { ApiService } from '../../api.service';
import { TaxonomyClustersOverlayComponent } from './taxonomy-clusters-overlay/taxonomy-clusters-overlay.component';
import { TaxonomyClusterLabel } from './taxonomy-clusters-overlay/taxonomy-label.interface';
import { TaxonomyLabelHoverEvent } from './taxonomy-clusters-overlay/taxonomy-clusters-overlay.component';

/** Duration of the drag_all countdown in minutes when first enabled. */
const DRAG_ALL_DEFAULT_MINUTES = 5;

/** Properties that collaborators may update during temporary collaboration (drag_all). */
const DRAG_ALL_ALLOWED_PROPERTIES = 'layout_x,layout_y,plausibility,favorable_future,transition_bar_position';

@Component({
  selector: 'app-showcase-ws',
  imports: [QrcodeComponent, EvaluationSidebarComponent, FiltersBarComponent, TaxonomyClustersOverlayComponent],
  templateUrl: './showcase-ws.component.html',
  styleUrl: './showcase-ws.component.less'
})
export class ShowcaseWsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('titleElement') titleElement?: ElementRef;
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  taxonomyService = inject(TaxonomyService);
  private photoRepository: PhotoDataRepository;
  private activatedRoute: ActivatedRoute;
  loop = new Subject<any[]>();
  lastCreatedAt = '0';
  lastFetchedAt = '';
  lastActivityAt = Date.now();
  isPollingActive = signal(true);
  qrSmall = signal(false);
  workspace = signal('');
  workspaceTitle = signal('');
  api_key = signal('');
  admin_key = signal('');
  lang = signal('');
  allowAdditionalContributions = signal(true); // Default to showing QR code
  currentLayout = signal<'tsne' | 'svg' | 'circle-packing'>('circle-packing');
  enableRandomShowcase = signal(false);
  enableSvgAutoPositioning = signal(true);
  fisheyeEnabled = signal(false);
  currentZoomLevel = signal(1.0); // Track current zoom level for UI display
  fisheyeTaxonomyFocusLabel = signal<string | null>(null);

  // Taxonomy overlay labels (populated when switching to the taxonomy/TSNE layout)
  taxonomyThemeLabels = signal<TaxonomyClusterLabel[]>([]);
  taxonomySubThemeLabels = signal<TaxonomyClusterLabel[]>([]);
  /** Reference to the active TSNE layout strategy so we can query cluster positions. */
  private currentTsneStrategy: TaxonomyLayoutStrategy | null = null;
  
  // Evaluation sidebar state
  sidebarOpen = signal(false);
  selectedItemId = signal<string | null>(null);
  
  // Permalink support - item to focus on after load
  focusItemId = signal<string | null>(null);

  // Item_key for the current viewer (from URL ?key= param)
  // Allows authors to drag items belonging to their author_id
  userItemKey = signal<string>('');
  // Author ID resolved from userItemKey after items are loaded
  userAuthorId = signal<string | null>(null);

  // drag_all mode – expiry timestamp stored in workspace metadata
  dragAllUntil = signal<Date | null>(null);
  // Whether drag_all is currently active (expiry is in the future)
  dragAllActive = computed(() => {
    const until = this.dragAllUntil();
    if (!until) return false;
    return until.getTime() > Date.now();
  });
  // Remaining seconds in the drag_all countdown (updated every second)
  dragAllRemainingSeconds = signal(0);
  // Formatted remaining time string (MM:SS)
  dragAllRemainingFormatted = computed(() => {
    const secs = this.dragAllRemainingSeconds();
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  });
  dragAllControlsOpen = signal(false);
  private dragModeDefaultLayoutApplied = false;
  
  // Get the selected item's key (if available)
  selectedItemKey = computed(() => {
    const itemId = this.selectedItemId();
    if (!itemId) return null;
    const photo = this.photoRepository.getPhoto(itemId);
    return photo?.metadata?.['item_key'] || null;
  });
  
  // Check if user has admin access
  isAdmin = computed(() => this.admin_key() !== '' && this.admin_key() !== 'ADMIN_KEY_NOT_SET');
  
  // Check if user can edit the selected item (either admin or has item_key)
  canEditSelectedItem = computed(() => {
    return this.isAdmin() || (this.selectedItemKey() !== null && this.selectedItemKey() !== '');
  });
  
  // Filter counts for filters bar (computed from all photos)
  filterCounts = computed(() => {
    // Guard: Return empty counts if repository not initialized
    if (!this.photoRepository) {
      return {
        status: new Map<string, number>(),
        author: new Map<string, number>(),
        preference: new Map<string, number>(),
        potential: new Map<string, number>(),
        type: new Map<string, number>(),
        topic: new Map<string, number>()
      };
    }
    
    const allPhotos = this.photoRepository.getAllPhotos();
    const statusMap = new Map<string, number>();
    const authorMap = new Map<string, number>();
    const preferenceMap = new Map<string, number>();
    const potentialMap = new Map<string, number>();
    const typeMap = new Map<string, number>();
    const topicMap = new Map<string, number>();

    allPhotos.forEach(photo => {
      const metadata = photo.metadata;

      // Count status (based on _private_moderation)
      const moderation = metadata['_private_moderation'];
      let statusKey = 'pending';
      if (moderation === 0) statusKey = 'banned';
      else if (moderation === 1) statusKey = 'flagged';
      else if (moderation === 3) statusKey = 'not-flagged';
      else if (moderation === 4) statusKey = 'approved';
      else if (moderation === 5) statusKey = 'highlighted';
      statusMap.set(statusKey, (statusMap.get(statusKey) || 0) + 1);

      // Count author
      const authorId = metadata['author_id'] || 'unknown';
      authorMap.set(authorId, (authorMap.get(authorId) || 0) + 1);

      // Count preference
      const preference = metadata['favorable_future'];
      if (preference) {
        preferenceMap.set(preference, (preferenceMap.get(preference) || 0) + 1);
      }

      // Count potential
      const plausibility = metadata['plausibility'];
      if (plausibility !== null && plausibility !== undefined) {
        const key = String(plausibility);
        potentialMap.set(key, (potentialMap.get(key) || 0) + 1);
      }

      // Count type
      const screenshotType = metadata['screenshot_type'];
      if (screenshotType) {
        typeMap.set(screenshotType, (typeMap.get(screenshotType) || 0) + 1);
      }

      // Count topics (per theme and per sub-theme)
      const topics: string[] = metadata['topics'] || [];
      if (topics.length === 0) {
        topicMap.set('none', (topicMap.get('none') || 0) + 1);
      } else {
        const themes = new Set<string>();
        topics.forEach((t: string) => {
          topicMap.set(t, (topicMap.get(t) || 0) + 1);
          themes.add(t.split('/')[0]);
        });
        themes.forEach(theme => topicMap.set(theme, (topicMap.get(theme) || 0) + 1));
      }
    });

    return {
      status: statusMap,
      author: authorMap,
      preference: preferenceMap,
      potential: potentialMap,
      type: typeMap,
      topic: topicMap
    };
  });
  
  // Total photo count for filters bar
  totalPhotoCount = computed(() => {
    if (!this.photoRepository) return 0;
    return this.photoRepository.getAllPhotos().length;
  });
  fisheyeSettings = signal<FisheyeSettings>({
    enabled: true,
    maxMagnification: 10.0,
    radius: 700,
    maxHeight: 50
  });
  
  // Search state
  searchText = signal<string>('');
  searchActive = signal<boolean>(false);
  private searchIndex = new Map<string, string>();
  
  // Filter state (admin only)
  filtersBarOpen = signal<boolean>(false);
  currentFilters = signal<FiltersBarState>({
    status: ['new', 'flagged', 'not-flagged', 'approved', 'highlighted', 'rejected'],
    author: 'all',
    preference: ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent', 'none'],
    potential: ['100', '75', '50', '25', '0', 'none'],
    type: 'all',
    topic: [],
    search: '',
    orderBy: 'date'
  });

  // Initialize topic filter when taxonomy loads
  private topicInitEffect = effect(() => {
    const allIds = this.taxonomyService.allSubThemeIds();
    if (allIds.length > 0 && this.currentFilters().topic.length === 0) {
      this.currentFilters.update(f => ({ ...f, topic: allIds }));
    }
  });

  /**
   * Determine which auth token to use (prefers admin when provided)
   */
  private resolveAuthToken(): string | null {
    const adminKey = this.admin_key();
    if (adminKey && adminKey !== 'ADMIN_KEY_NOT_SET') {
      return adminKey;
    }

    const apiKey = this.api_key();
    if (apiKey && apiKey !== 'API_KEY_NOT_SET') {
      return apiKey;
    }

    return null;
  }

  /**
   * Build (and cache) lowercase searchable text for a photo by flattening all metadata values
   */
  private getSearchableText(photo: PhotoData): string {
    const cached = this.searchIndex.get(photo.metadata.id);
    if (cached) return cached;

    const parts: string[] = [];
    const visit = (val: any): void => {
      if (val === null || val === undefined) return;
      const t = typeof val;
      if (t === 'string' || t === 'number' || t === 'boolean') {
        parts.push(String(val));
      } else if (Array.isArray(val)) {
        val.forEach(visit);
      } else if (t === 'object') {
        Object.values(val).forEach(visit);
      }
    };

    visit(photo.metadata);
    const text = parts.join(' ').toLowerCase();
    this.searchIndex.set(photo.metadata.id, text);
    return text;
  }

  // Loading state for initial content
  isLoading = signal(true);
  
  // Loading state for layout composition
  isLayoutLoading = signal(true);
  
  // View initialized flag (for lazy-loaded components)
  viewInitialized = signal(false);

  // Computed: whether title needs animation (is truncated)
  titleNeedsAnimation = signal(false);

  // Check if currently dragging (for cursor style)
  isDragging = computed(() => this.rendererService.isDraggingItem());
  
  // Check if hovering over an item (for cursor style) - directly use the signal
  isHoveringItem = computed(() => {
    const hovering = this.rendererService.isHoveringItem()();
    return hovering;
  });

  // Track if fisheye is currently enabled
  // No longer needed: private currentFisheyeValue = 0;
  loadedPhotoIds = new Set<string>();
  private layoutChangeInProgress = false;
  private svgBackgroundStrategy: SvgBackgroundLayoutStrategy | null = null;
  private circlePackingForSvg: CirclePackingLayoutStrategy | null = null;
  private readonly svgCircleRadius = 15000;
  qrUrl = computed(() => 
    `https://mapfutur.es/${this.lang()}prescan?workspace=${this.workspace()}&api_key=${this.api_key()}&ws=true`
  );
  
  // Check if device is mobile
  isMobile = computed(() => this.platform.isMobile);


  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private apiService: ApiService,
    private http: HttpClient,
    private platform: PlatformService,
    private rendererService: ThreeRendererService
  ) {
    this.activatedRoute = route;
    this.photoRepository = new PhotoDataRepository();

    // Search effect - automatically applies filter when searchText changes
    effect(() => {
      const search = this.searchText();
      // Only apply if we have photos loaded
      if (this.photoRepository.getAllPhotos().length > 0) {
        // Debounce the search application slightly to avoid excessive updates while typing
        setTimeout(() => this.applySearchFilter(), 50);
      }
    });
    
    // Filter effect - automatically applies filters when they change (admin only)
    effect(() => {
      const filters = this.currentFilters();
      const isAdminUser = this.isAdmin();
      // Only apply filters if admin mode is active and we have photos loaded
      if (isAdminUser && this.photoRepository && this.photoRepository.getAllPhotos().length > 0) {
        setTimeout(() => this.applyFilters(), 50);
      }
    });
    this.loop.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(async (items) => {
      items = items.sort((item1, item2) => {
        const createdAt1 = typeof item1?.created_at === 'string' ? item1.created_at : '';
        const createdAt2 = typeof item2?.created_at === 'string' ? item2.created_at : '';
        return createdAt1.localeCompare(createdAt2);
      });
      
      // First pass: load existing photos immediately
      if (this.lastCreatedAt === '0' && items.length > 0) {

        // Process photos sequentially and then refresh layout
        const photoPromises = items.map(async (item) => {
          const id = item._id;
          const placeholderUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=';
          const screenshotUrl = item.screenshot_url || placeholderUrl;
          if (!item.screenshot_url) {
            console.warn('[SHOWCASE_WS] Missing screenshot_url for item', id, 'using placeholder image');
          }
          const thumbnailUrl = this.deriveThumbnailUrl(screenshotUrl);
          const enhancedUrl = this.deriveEnhancedUrl(screenshotUrl);
          // Generate transition_bar_position if not provided by API
          const transitionBarPosition = item.transition_bar_position || this.getDefaultTransitionBarPosition(item);
          // Include all item fields to make search work across every string field
          const metadata: PhotoMetadata = {
            ...item,
            id,
            url: thumbnailUrl,
            created_at: item.created_at,
            screenshot_url: screenshotUrl,
            thumbnail_url: thumbnailUrl,
            enhanced_url: enhancedUrl,
            layout_x: item.layout_x,
            layout_y: item.layout_y,
            plausibility: item.plausibility,
            favorable_future: item.favorable_future,
            transition_bar_position: transitionBarPosition,
            item_key: item._key ?? item.item_key ?? item._key // Prefer explicit key but keep fallbacks
          };
          
          try {
            await this.photoRepository.addPhoto(metadata); // Add initial photos
            this.loadedPhotoIds.add(id);
          } catch (error) {
            console.error('Error loading photo immediately:', error);
          }
        });
        
        await Promise.all(photoPromises);
        this.searchIndex.clear();
        
        // Resolve author_id for the current viewer's item_key.
        // This enables authors to drag all their own items.
        this.resolveUserAuthorId(items);

        this.qrSmall.set(true);
        this.isLoading.set(false); // Content is now loaded
        
        // Switch to the desired layout if not the default circle-packing
        if (this.currentLayout() !== 'circle-packing') {
          try {
            switch (this.currentLayout()) {
              case 'tsne':
                await this.switchToTsneLayout();
                break;
              case 'svg':
                await this.switchToSvgLayout();
                break;
            }
          } catch (error) {
            console.error('Error switching initial layout:', error);
          }
        }
        
        // Wait for layout to stabilize and camera animation to complete
        // Using a timeout to allow the Three.js renderer to complete layout calculations
        setTimeout(() => {
          this.isLayoutLoading.set(false); // Layout composition is now complete
        }, 2000); // 2 second delay for layout and camera animation to settle
        
        // Apply search filter if query was provided in URL
        if (this.searchText()) {
          this.applySearchFilter();
        }

        // Focus on permalink target after layout is fully applied
        const focusId = this.focusItemId();
        if (focusId) {
          this.rendererService.setCameraMode('user-controlled');
          this.focusOnItem(focusId, { animateFromFull: true, fromShowOnMap: true });
        }

        // Set lastCreatedAt to the most recent item
        const latestItem = items[items.length - 1];
        this.lastCreatedAt = latestItem.created_at;
        this.lastFetchedAt = this.computeMaxTimestamp(items);
      } else {
        // Second pass onwards: add new photos to queue for showcase
        const newItems = items.filter(item => {
          const created_at = item.created_at;
          return created_at && created_at > this.lastCreatedAt;
        });
        
        if (newItems.length > 0) {
          this.lastActivityAt = Date.now();
          // Process new photos immediately - they'll be added to the showcase queue
          const photoPromises = newItems.map(async (item) => {
            const id = item._id;
            const placeholderUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=';
            const screenshotUrl = item.screenshot_url || placeholderUrl;
            if (!item.screenshot_url) {
              console.warn('[SHOWCASE_WS] Missing screenshot_url for item', id, 'using placeholder image');
            }
            const thumbnailUrl = this.deriveThumbnailUrl(screenshotUrl);
            const enhancedUrl = this.deriveEnhancedUrl(screenshotUrl);
            // Generate transition_bar_position if not provided by API
            const transitionBarPosition = item.transition_bar_position || this.getDefaultTransitionBarPosition(item);
            const metadata: PhotoMetadata = {
              ...item,
              id,
              url: thumbnailUrl,
              created_at: item.created_at,
              screenshot_url: screenshotUrl,
              thumbnail_url: thumbnailUrl,
              enhanced_url: enhancedUrl,
              plausibility: item.plausibility,
              favorable_future: item.favorable_future,
              transition_bar_position: transitionBarPosition,
              item_key: item._key ?? item.item_key ?? item._key
            };

            try {
              await this.photoRepository.addPhoto(metadata); // Add to queue for showcase
              this.loadedPhotoIds.add(id);
              this.lastCreatedAt = item.created_at;
            } catch (error) {
              console.error('Error adding photo to queue:', error);
            }
          });

          await Promise.all(photoPromises);
          this.searchIndex.clear();
        }

        // Update lastFetchedAt from all items in this response
        if (items.length > 0) {
          this.lastFetchedAt = this.computeMaxTimestamp(items);
        }

        // Sync tracked properties on existing items from the latest API data
        const SYNC_PROPERTIES = ['layout_x', 'layout_y', 'plausibility', 'favorable_future', 'transition_bar_position'] as const;
        let metadataChanged = false;
        for (const item of items) {
          const id = item._id;
          if (!this.loadedPhotoIds.has(id)) continue;
          const photo = this.photoRepository.getPhoto(id);
          if (!photo) continue;

          const updates: Partial<PhotoMetadata> = {};
          let hasChanges = false;
          for (const prop of SYNC_PROPERTIES) {
            const newVal = item[prop] ?? (prop === 'transition_bar_position' ? this.getDefaultTransitionBarPosition(item) : undefined);
            if (photo.metadata[prop] !== newVal) {
              (updates as any)[prop] = newVal;
              hasChanges = true;
            }
          }

          if (hasChanges) {
            photo.updateMetadata(updates);
            metadataChanged = true;
            if ((updates['layout_x'] !== undefined || updates['layout_y'] !== undefined)
                && this.currentLayout() === 'svg') {
              this.repositionPhoto(photo);
            }
          }
        }
        if (metadataChanged) {
          this.searchIndex.clear();
        }
      }

      // Update showcase behavior
      this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase());
      
      // Schedule next poll unless inactive for too long
      if (Date.now() - this.lastActivityAt < ANIMATION_CONSTANTS.INACTIVITY_TIMEOUT) {
        setTimeout(() => {
          this.getItems(this.lastFetchedAt || undefined).pipe(
            takeUntilDestroyed(this.destroyRef)
          ).subscribe(items_ => {
            this.loop.next(items_);
          });
        }, ANIMATION_CONSTANTS.API_POLLING_INTERVAL);
      } else {
        this.isPollingActive.set(false);
      }
    });
    
    const qp = this.activatedRoute.snapshot.queryParams;
    this.workspace.set(qp['workspace'] || 'WORKSPACE_NOT_SET');
    this.api_key.set(qp['api_key'] || 'API_KEY_NOT_SET');
    this.admin_key.set(qp['admin_key'] || 'ADMIN_KEY_NOT_SET');
    this.lang.set(qp['lang'] ? qp['lang'] + '/' : '');

    // Parse item_key from URL ?key= param (authors visiting showcase with their key)
    const urlItemKey = qp['key'] || '';
    this.userItemKey.set(urlItemKey);
    
    // Set drag permissions immediately based on admin status
    // This must be done before photos are added to the repository
    const adminKeyValue = this.admin_key();
    const isAdminUser = adminKeyValue !== '' && adminKeyValue !== 'ADMIN_KEY_NOT_SET';
    this.photoRepository.setDragEnabled(isAdminUser);
    
    // Effect: propagate drag_all and author permission changes to the repository atomically
    effect(() => {
      this.photoRepository.updateDragPermissions(this.dragAllActive(), this.userAuthorId());
    });
    
    // Check for item permalink in URL hash (e.g. #item-id)
    if (this.platform.browser()) {
      const hashParts = window.location.hash.slice(1).split('?')[0];
      if (hashParts && !hashParts.includes('search=')) {
        this.focusItemId.set(hashParts);
      }
    }

    // When loading with a focus target, default to svg+bg with autopositioning
    if (this.focusItemId()) {
      this.currentLayout.set('svg');
      this.enableSvgAutoPositioning.set(true);
    }
    
    // Fetch workspace data to get title and drag_all_until flag
    if (this.workspace() !== 'WORKSPACE_NOT_SET') {
      this.fetchWorkspaceData();
    }
    
    // Check for fisheye parameters
    if (qp['fisheye'] === '1' || qp['fisheye'] === 'true') {
      this.fisheyeEnabled.set(true);
    }
    
    apiService.updateFromRoute(this.activatedRoute.snapshot);
    const authToken = this.resolveAuthToken();
    if (authToken) {
      apiService.api_key.set(authToken);
    }
  }

  /**
   * Toggle the random showcase behavior
   */
  toggleRandomShowcase() {
    this.enableRandomShowcase.set(!this.enableRandomShowcase());
    this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase());
  }

  /**
   * Toggle QR code size between small and large
   */
  toggleQrSize() {
    this.qrSmall.set(!this.qrSmall());
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // drag_all management (admin-only controls)
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Enable temporary collaboration for the given number of minutes (default 15).
   * Uses POST /temporary-collaboration with properties to set allowed fields.
   */
  enableDragAllMode(minutes: number = DRAG_ALL_DEFAULT_MINUTES): void {
    const workspaceId = this.workspace();
    const adminKey = this.admin_key();
    if (!workspaceId || workspaceId === 'WORKSPACE_NOT_SET'
        || !adminKey || adminKey === 'ADMIN_KEY_NOT_SET') {
      return;
    }
    const timeSeconds = minutes * 60;
    this.apiService.setTemporaryCollaboration(workspaceId, adminKey, timeSeconds, DRAG_ALL_ALLOWED_PROPERTIES)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.dragAllUntil.set(new Date(Date.now() + resp.ttl * 1000));
        },
        error: (err) => console.error('[DRAG_ALL] Error enabling temporary collaboration:', err)
      });
  }

  /**
   * Disable temporary collaboration immediately via DELETE.
   */
  disableDragAllMode(): void {
    const workspaceId = this.workspace();
    const adminKey = this.admin_key();
    if (!workspaceId || workspaceId === 'WORKSPACE_NOT_SET'
        || !adminKey || adminKey === 'ADMIN_KEY_NOT_SET') {
      return;
    }
    this.apiService.deleteTemporaryCollaboration(workspaceId, adminKey)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.dragAllUntil.set(null);
          this.dragAllControlsOpen.set(false);
        },
        error: (err) => console.error('[DRAG_ALL] Error disabling temporary collaboration:', err)
      });
  }

  toggleDragAllControls(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.dragAllControlsOpen.update((open) => !open);
  }

  closeDragAllControls(): void {
    this.dragAllControlsOpen.set(false);
  }

  /**
   * Adjust the temporary collaboration countdown by the given number of minutes.
   * Omits properties so the server treats time as a delta on existing expiry.
   */
  adjustDragAllTime(minutes: number): void {
    const workspaceId = this.workspace();
    const adminKey = this.admin_key();
    if (!workspaceId || workspaceId === 'WORKSPACE_NOT_SET'
        || !adminKey || adminKey === 'ADMIN_KEY_NOT_SET') {
      return;
    }
    const deltaSeconds = minutes * 60;
    this.apiService.setTemporaryCollaboration(workspaceId, adminKey, deltaSeconds)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          if (resp.ttl <= 0) {
            this.dragAllUntil.set(null);
            this.dragAllControlsOpen.set(false);
          } else {
            this.dragAllUntil.set(new Date(Date.now() + resp.ttl * 1000));
          }
        },
        error: (err) => console.error('[DRAG_ALL] Error adjusting temporary collaboration:', err)
      });
  }

  /**
   * Toggle fisheye lens effect
   */
  toggleFisheyeEffect() {
    const willBeEnabled = !this.fisheyeEnabled();
    this.fisheyeEnabled.set(willBeEnabled);
    this.rendererService.resetTaxonomyHoverOpacityFocus();
    this.rendererService.enableFisheyeEffect(willBeEnabled);
    this.syncThematicFisheyeEffects();
    
    // When enabling, immediately apply current settings
    if (willBeEnabled) {
      const settings = this.fisheyeSettings();
      this.rendererService.setFisheyeConfig({
        magnification: settings.maxMagnification,
        radius: settings.radius,
        maxHeight: settings.maxHeight,
        viewportHeight: window.innerHeight
      });
    }
  }

  /**
   * Toggle SVG auto-positioning based on metadata
   */
  async toggleSvgAutoPositioning() {
    if (this.layoutChangeInProgress) {
      console.warn('[TOGGLE] Layout change in progress, ignoring auto-position toggle');
      return;
    }

    const wasEnabled = this.enableSvgAutoPositioning();
    const willBeEnabled = !wasEnabled;

    this.enableSvgAutoPositioning.set(willBeEnabled);
    this.photoRepository.setSvgAutoPositioningEnabled(willBeEnabled);

    if (this.currentLayout() === 'svg') {
      this.layoutChangeInProgress = true;
      try {
        await this.applySvgLayoutMode(willBeEnabled);
      } finally {
        this.layoutChangeInProgress = false;
      }
    }
  }

  private async applySvgLayoutMode(enableAutoPositioning: boolean): Promise<void> {
    if (!this.svgBackgroundStrategy || !this.circlePackingForSvg) {
      console.warn('[SVG] Strategies not initialized; run switchToSvgLayout first');
      return;
    }

    const strategy = enableAutoPositioning
      ? this.svgBackgroundStrategy
      : this.circlePackingForSvg;

    await this.photoRepository.setLayoutStrategy(strategy);
    this.rendererService.setLayoutStrategyReference(strategy);
  }

  /**
   * Generate a default transition_bar_position if the API doesn't provide one
   * Distributes photos evenly across 'before', 'during', and 'after' based on photo ID hash
   */
  private getDefaultTransitionBarPosition(item: any): 'before' | 'during' | 'after' {
    // If API provides it, return it (this handles the fallback case)
    if (item.transition_bar_position) {
      return item.transition_bar_position;
    }
    
    // Use photo ID to generate a stable hash
    const positions = ['before', 'during', 'after'] as const;
    let hash = 0;
    const id = item._id || '';
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Distribute evenly across the three positions
    const index = Math.abs(hash) % 3;
    return positions[index];
  }

  private deriveThumbnailUrl(screenshotUrl: string): string {
    return screenshotUrl.replace(/screenshot\.jpeg$/, 'screenshot.thumbnail.jpeg');
  }

  private deriveEnhancedUrl(screenshotUrl: string): string {
    return screenshotUrl.replace(/screenshot\.jpeg$/, 'screenshot.enhanced.jpeg');
  }

  /**
   * Recalculate layout for all photos in a specific cluster (by author_id).
   * Computes new positions via the active layout strategy and animates
   * any photos whose mesh position differs from the new target.
   */
  /**
   * Reposition a single photo according to the active layout strategy.
   * Computes the correct position and animates the mesh if it moved.
   */
  private async repositionPhoto(photo: PhotoData): Promise<void> {
    const strategy = this.photoRepository.getLayoutStrategy();
    if (!strategy) return;

    const allPhotos = this.photoRepository.getAllPhotos();
    const enableAutoPositioning = this.enableSvgAutoPositioning();
    const newPosition = await strategy.getPositionForPhoto(photo, allPhotos, { enableAutoPositioning });
    if (!newPosition || !photo.mesh) return;

    const target = { x: newPosition.x, y: newPosition.y, z: 0 };
    photo.setTargetPosition(target);

    const mesh = photo.mesh;
    const dx = mesh.position.x - target.x;
    const dy = mesh.position.y - target.y;
    if (Math.sqrt(dx * dx + dy * dy) > 1) {
      const from = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z };
      await this.rendererService.animateToPosition(mesh, from, target, 0.5);
      photo.setCurrentPosition(target);
    }
  }

  private async recalculateClusterLayout(authorId: string): Promise<void> {
    if (!authorId) return;

    const allPhotos = this.photoRepository.getAllPhotos();
    const clusterPhotos = allPhotos.filter(photo => photo.metadata['author_id'] === authorId);
    if (clusterPhotos.length === 0) return;

    await Promise.all(clusterPhotos.map(photo => this.repositionPhoto(photo)));
  }

  /**
   * Resolve the author_id for the current viewer based on their URL item_key.
   * The item whose _key or item_key matches the viewer's key determines the author_id.
   * Once resolved, the repository allows dragging of all same-author items.
   */
  private resolveUserAuthorId(items: any[]): void {
    const key = this.userItemKey();
    if (!key || this.userAuthorId()) return; // already resolved or no key
    const match = items.find(item =>
      (item._key && item._key === key) || (item.item_key && item.item_key === key)
    );
    if (match?.author_id) {
      this.userAuthorId.set(match.author_id);
    }
  }

  /**
   * Fetch workspace data to get the display title and temporary_collaboration_ttl.
   * Called on init and polled periodically to pick up admin-set flags.
   */
  private fetchWorkspaceData(): void {
    const workspaceId = this.workspace();
    if (!workspaceId || workspaceId === 'WORKSPACE_NOT_SET') {
      return;
    }

    const authToken = this.resolveAuthToken() ?? undefined;

    this.apiService.fetchWorkspaceRaw(workspaceId, authToken).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
        next: (workspace) => {
          if (!workspace) {
            return;
          }

          const displayTitle = workspace.source || workspace.title || '';
          this.workspaceTitle.set(displayTitle);

          const allowContributions = workspace.collaborate !== false;
          this.allowAdditionalContributions.set(allowContributions);

          const ttl = workspace.temporary_collaboration_ttl;
          if (typeof ttl === 'number' && ttl > 0) {
            this.dragAllUntil.set(new Date(Date.now() + ttl * 1000));
            if (!this.dragModeDefaultLayoutApplied) {
              this.dragModeDefaultLayoutApplied = true;
              if (this.currentLayout() !== 'svg') {
                if (this.isLoading()) {
                  this.currentLayout.set('svg');
                } else {
                  void this.switchToSvgLayout();
                }
              }
            }
          } else {
            this.dragAllUntil.set(null);
            this.dragAllControlsOpen.set(false);
            this.dragModeDefaultLayoutApplied = false;
          }
        }
      });
  }

  getItems(since?: string): Observable<any[]> {
    const httpOptions: { headers?: Record<string, string> } = {};
    const authToken = this.resolveAuthToken();
    if (authToken) {
      httpOptions.headers = { 'Authorization': authToken };
    }
    let url = `https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace()}/items?page_size=10000`;
    if (since) {
      url += `&filters=${encodeURIComponent('updated_at>' + since)}`;
    }
    return this.http.get<any[]>(url, httpOptions).pipe(
      catchError((error) => {
        console.error('Error loading items:', error);
        return of([]);
      })
    );
  }

  private computeMaxTimestamp(items: any[]): string {
    let max = this.lastFetchedAt;
    for (const item of items) {
      const created = item?.created_at;
      const updated = item?.updated_at;
      if (typeof created === 'string' && created > max) max = created;
      if (typeof updated === 'string' && updated > max) max = updated;
    }
    return max;
  }

  async ngAfterViewInit() {
    this.taxonomyService.fetch();
    if (this.platform.browser()) {
      fromEvent<MessageEvent>(window, 'message').pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((event) => {
        const data = event.data;
        if (!data || typeof data !== 'object') return;
        if (data.type === 'show-on-map') {
          const itemId = typeof data.itemId === 'string' ? data.itemId : null;
          if (!itemId) return;
          this.sidebarOpen.set(false);
          this.selectedItemId.set(null);
          this.focusOnItem(itemId, { animateFromFull: true, fromShowOnMap: true });
        }
      });
      fromEvent(window, 'hashchange').pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => this.updateActiveItemZIndex());
      fromEvent(window, 'resize').pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => this.measureTitle());
      fromEvent<KeyboardEvent>(window, 'keydown').pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((event) => this.onKeyDown(event));

      this.measureTitle();
      await this.initialize(this.container.nativeElement);

      // Mark view as initialized (safe to render filters bar in lazy-loaded context)
      this.viewInitialized.set(true);
    }
  }

  /**
   * Handle keyboard shortcuts
   */
  private onKeyDown(event: KeyboardEvent): void {
    // Press 'P' to toggle performance monitoring
    if (event.key === 'p' || event.key === 'P') {
      const currentMetrics = this.rendererService.getPerformanceMetrics();
      this.rendererService.enablePerformanceMonitoring(!currentMetrics.isMonitoring);
    }
  }

  private measureTitle(): void {
    if (this.titleElement) {
      // Give the DOM a chance to render
      setTimeout(() => {
        const element = this.titleElement?.nativeElement;
        if (element) {
          const isTitleOverflowing = element.scrollWidth > element.clientWidth;
          this.titleNeedsAnimation.set(isTitleOverflowing);
        }
      }, 0);
    }
  }

  private async initialize(container: HTMLElement) {
    // Initialize Three.js renderer
    await this.rendererService.initialize(container, {
      photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
      photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT
    });

    // Set up click callbacks for evaluation sidebar
    this.rendererService.setPhotoClickCallback((photoId: string) => {
      this.onPhotoClick(photoId);
    });
    this.rendererService.setBackgroundClickCallback(() => {
      this.onBackgroundClick();
    });

    // Apply default fisheye settings immediately on init
    const settings = this.fisheyeSettings();
    this.fisheyeEnabled.set(settings.enabled);
    if (settings.enabled) {
      this.rendererService.enableFisheyeEffect(true);
      this.syncThematicFisheyeEffects();
      this.rendererService.setFisheyeConfig({
        magnification: settings.maxMagnification,
        radius: settings.radius,
        maxHeight: settings.maxHeight,
        viewportHeight: window.innerHeight
      });
    }

    // Apply fisheye settings from query parameters (override defaults)
    const qp = this.activatedRoute.snapshot.queryParams;
    if (qp['fisheye'] === '0' || qp['fisheye'] === 'false') {
      this.rendererService.enableFisheyeEffect(false);
      this.syncThematicFisheyeEffects();
    }
    
    // Enable performance monitoring via query parameter
    if (qp['perf'] === '1' || qp['perf'] === 'true') {
      this.rendererService.enablePerformanceMonitoring(true);
    }
    
    // Read optional fisheye configuration from query params
    if (qp['fisheye_radius']) {
      const radius = parseFloat(qp['fisheye_radius']);
      if (!isNaN(radius)) {
        this.rendererService.setFisheyeConfig({ radius });
      }
    }
    if (qp['fisheye_magnification']) {
      const magnification = parseFloat(qp['fisheye_magnification']);
      if (!isNaN(magnification)) {
        this.rendererService.setFisheyeConfig({ magnification });
      }
    }
    if (qp['fisheye_distortion']) {
      const distortion = parseFloat(qp['fisheye_distortion']);
      if (!isNaN(distortion)) {
        this.rendererService.setFisheyeConfig({ distortion });
      }
    }

    // Initialize PhotoDataRepository with circle-packing as the default strategy.
    // Photos are positioned incrementally as they load (requiresFullRecalculationOnAdd).
    const defaultStrategy = new CirclePackingLayoutStrategy({
      photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
      photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
      spacingX: PHOTO_CONSTANTS.SPACING_X,
      spacingY: PHOTO_CONSTANTS.SPACING_Y,
      groupBuffer: 1500,
      photoBuffer: 0,
      useFanLayout: !this.isMobile()
    });

    await this.photoRepository.initialize(
      defaultStrategy,
      this.rendererService,
      {
        enableRandomShowcase: this.enableRandomShowcase(),
        showcaseInterval: ANIMATION_CONSTANTS.SHOWCASE_INTERVAL,
        newPhotoAnimationDelay: ANIMATION_CONSTANTS.NEW_PHOTO_ANIMATION_DELAY
      }
    );

    // Set up repository event subscriptions
    this.photoRepository.photoAdded$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photoData) => {
      });

    this.photoRepository.photoRemoved$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photoId) => {

      });

    this.photoRepository.layoutChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {

      });
    
    // Poll zoom level every 500ms for UI display (non-critical update)
    interval(500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.currentZoomLevel.set(this.rendererService.getCurrentZoomLevel());
        this.syncThematicFisheyeEffects();
        this.updateFisheyeTaxonomyFocusLabel();
      });
    
    // Update drag_all countdown every second
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const until = this.dragAllUntil();
        if (until) {
          const remaining = Math.max(0, Math.ceil((until.getTime() - Date.now()) / 1000));
          this.dragAllRemainingSeconds.set(remaining);
          // Auto-clear expired flag
          if (remaining === 0) {
            this.dragAllUntil.set(null);
          }
        }
      });

    // Poll workspace metadata every 30 seconds to pick up drag_all_until changes
    interval(ANIMATION_CONSTANTS.API_POLLING_INTERVAL)
      .pipe(
        filter(() => this.isPollingActive()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (this.workspace() !== 'WORKSPACE_NOT_SET') {
          this.fetchWorkspaceData();
        }
      });
    
    // Start initial polling after component is ready
    if (this.platform.browser()) {
      // Read search from URL hash on init
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const searchParam = params.get('search');
      if (searchParam) {
        const searchText = searchParam.replace(/\+/g, ' ');
        this.searchText.set(searchText);
        if (searchText) {
          this.searchActive.set(true);
        }
      }
      
      timer(ANIMATION_CONSTANTS.INITIAL_POLLING_DELAY).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.getItems().pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe((items) => {
          this.loop.next(items);
        });
      });
    }
  }

  private updateFisheyeTaxonomyFocusLabel(): void {
    if (this.currentLayout() !== 'tsne' || !this.fisheyeEnabled()) {
      this.fisheyeTaxonomyFocusLabel.set(null);
      return;
    }

    const focusedTaxonomy = this.rendererService.getTopFisheyeTaxonomyIds();
    if (!focusedTaxonomy) {
      this.fisheyeTaxonomyFocusLabel.set(null);
      return;
    }

    const label = focusedTaxonomy.topicId
      ? this.taxonomyService.resolveTopic(focusedTaxonomy.topicId)
      : (focusedTaxonomy.themeId ? this.taxonomyService.resolveThemeName(focusedTaxonomy.themeId) : null);

    this.fisheyeTaxonomyFocusLabel.set(label ?? null);
  }

  private syncThematicFisheyeEffects(): void {
    this.rendererService.setThematicFisheyeEffectsEnabled(
      this.currentLayout() === 'tsne' && this.fisheyeEnabled()
    );
  }

  /**
   * Switch to TSNE layout using the current workspace ID
   */
  public async switchToTsneLayout() {
    if (this.layoutChangeInProgress) {
      return;
    }
    
    if (!this.workspace()) {
      console.error('Workspace not set');
      return;
    }

    this.layoutChangeInProgress = true;
    try {

      
      // Update UI immediately for responsive feedback
      this.currentLayout.set('tsne');
      this.syncThematicFisheyeEffects();
      
      // Create TSNE layout strategy with same dimensions as grid layout
      const tsneStrategy = new TaxonomyLayoutStrategy({
        photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
        photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
        spacingX: PHOTO_CONSTANTS.SPACING_X,
        spacingY: PHOTO_CONSTANTS.SPACING_Y
      });
      
      // Initialize the strategy
      await tsneStrategy.initialize();
      
      // Remove SVG background if switching from SVG layout
      this.rendererService.removeSvgBackground();
      this.photoRepository.setSvgVisible(false);

      // Switch the layout using PhotoDataRepository
      await this.photoRepository.setLayoutStrategy(tsneStrategy);

      // Store reference and compute taxonomy overlay labels
      this.currentTsneStrategy = tsneStrategy;
      this.computeTaxonomyLabels(tsneStrategy);
      
    } catch (error) {
      console.error('Error switching to TSNE layout:', error);
    } finally {
      this.layoutChangeInProgress = false;
    }
  }

  /**
   * Compute taxonomy overlay label positions from the loaded TSNE strategy and
   * the topics stored in each photo's metadata.
   *
   * Theme and sub-theme labels are read from simulated label nodes in the
   * active taxonomy layout strategy.
   */
  private computeTaxonomyLabels(tsneStrategy: TaxonomyLayoutStrategy): void {
    let subThemeLabels: TaxonomyClusterLabel[] = tsneStrategy
      .getSubThemeLabelNodes()
      .map(node => {
        const localizedTopic = this.taxonomyService.resolveTopic(node.id);
        const subThemeName = localizedTopic.includes('>')
          ? localizedTopic.split('>').pop()?.trim() || localizedTopic
          : localizedTopic;

        return {
          id: node.id,
          name: subThemeName,
          worldX: node.worldX,
          worldY: node.worldY,
          itemCount: node.itemCount,
        };
      });

    // Fallback to TSNE cluster labels when topic metadata is unavailable.
    if (subThemeLabels.length === 0) {
      const clusters = tsneStrategy.getClustersWithWorldCoords();
      subThemeLabels = clusters.map((c, i) => ({
        id: `cluster-${i}`,
        name: this.taxonomyService.localizeName(c.title),
        worldX: c.centerX,
        worldY: c.centerY,
        itemCount: 1,
      }));
    }

    this.taxonomySubThemeLabels.set(subThemeLabels);

    const themeLabels: TaxonomyClusterLabel[] = tsneStrategy
      .getThemeLabelNodes()
      .map(node => ({
        id: node.id,
        name: this.taxonomyService.resolveThemeName(node.id),
        worldX: node.worldX,
        worldY: node.worldY,
        itemCount: node.itemCount,
      }));
    this.taxonomyThemeLabels.set(themeLabels);
  }

  onTaxonomyLabelHover(event: TaxonomyLabelHoverEvent | null): void {
    if (!event || this.currentLayout() !== 'tsne') {
      this.rendererService.resetTaxonomyHoverOpacityFocus();
      return;
    }

    if (event.level === 'sub-theme') {
      this.rendererService.setTaxonomyHoverOpacityFocus({ topicId: event.id });
      return;
    }

    this.rendererService.setTaxonomyHoverOpacityFocus({ themeId: event.id });
  }

  /**
   * Switch to SVG background layout
   */
  public async switchToSvgLayout() {
    if (this.layoutChangeInProgress) {
      return;
    }
    
    this.layoutChangeInProgress = true;
    try {
      // UI mode indicator only; we keep existing item positions (circle packing)
      this.currentLayout.set('svg');
      this.syncThematicFisheyeEffects();

      // Clear taxonomy overlay labels
      this.currentTsneStrategy = null;
      this.taxonomyThemeLabels.set([]);
      this.taxonomySubThemeLabels.set([]);
      this.rendererService.resetTaxonomyHoverOpacityFocus();
      
      // Read optional `svg` query param to override background path
      const svgParam = this.activatedRoute.snapshot.queryParams['svg'];
      const svgPath = svgParam || '/showcase-bg.svg';

      const svgOffsetX = -this.svgCircleRadius * 1.6; // further left to avoid overlap
      const svgOffsetY = 0;

      // Load SVG once for background plane
      this.svgBackgroundStrategy = new SvgBackgroundLayoutStrategy({
        svgPath,
        centerX: 0,
        centerY: 0,
        circleRadius: this.svgCircleRadius,
        radiusVariation: 0, // no layout variation needed; positions unchanged
        svgOffsetX,
        svgOffsetY
      });

      await this.svgBackgroundStrategy.initialize();

      // Create reusable circle-packing strategy for when auto-positioning is off
      this.circlePackingForSvg = new CirclePackingLayoutStrategy({
        photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
        photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
        spacingX: PHOTO_CONSTANTS.SPACING_X,
        spacingY: PHOTO_CONSTANTS.SPACING_Y,
        groupBuffer: 1500,
        photoBuffer: 0,
        useFanLayout: !this.isMobile()
      });

      // Register hotspot drop callback to update photo metadata and recalculate layout
      this.rendererService.setDragCompleteCallback(async (photoId, { position, isOutOfBounds, hotspotData }) => {
        const photo = this.photoRepository.getPhotoById(photoId);
        if (!photo) {
          console.warn('[DRAG] Photo not found:', photoId);
          return;
        }

        const oldAuthorId = photo.metadata['author_id'] as string;
        const previousMetadata: Record<string, any> = {
          layout_x: photo.metadata['layout_x'],
          layout_y: photo.metadata['layout_y']
        };
        if (hotspotData) {
          Object.keys(hotspotData).forEach((key) => {
            previousMetadata[key] = photo.metadata[key];
          });
        }

        // Build a single metadata payload for the API
        const metadataToSave: { [key: string]: string | number | null } = {};

        if (isOutOfBounds) {
          // Clear position but keep evaluation metadata
          photo.updateMetadata({
            layout_x: undefined,
            layout_y: undefined
          });
          metadataToSave['layout_x'] = null;
          metadataToSave['layout_y'] = null;
        } else {
          // Compute normalized position
          const { layout_x, layout_y } = this.svgBackgroundStrategy!.worldToNormalized(position.x, position.y);
          photo.updateMetadata({ layout_x, layout_y });
          metadataToSave['layout_x'] = layout_x;
          metadataToSave['layout_y'] = layout_y;

          // Merge hotspot data if present
          if (hotspotData) {
            photo.updateMetadata(hotspotData);
            Object.assign(metadataToSave, hotspotData);
          }
        }

        // Single API call with all metadata.
        // Determine auth: prefer admin/api_key; fall back to photo's item_key for authors
        // and drag_all participants.
        const workspace = this.workspace();
        const adminKey = this.admin_key();
        const apiKey = this.api_key();
        const photoItemKey = photo.metadata['item_key'] as string | null | undefined;
        const userKey = this.userItemKey();

        const hasAdminKey = adminKey && adminKey !== 'ADMIN_KEY_NOT_SET';
        const hasApiKey = apiKey && apiKey !== 'API_KEY_NOT_SET';
        // During temporary collaboration, the collaborate key (api_key) can update
        // any item's allowed properties without needing an item_key.
        const tempCollabActive = this.dragAllActive();
        const useItemKey: string | undefined = (!hasAdminKey && !tempCollabActive)
          ? (photoItemKey || userKey || undefined)
          : undefined;

        const canSave = workspace && workspace !== 'WORKSPACE_NOT_SET'
          && (hasAdminKey || hasApiKey || !!useItemKey);

        let saveSucceeded = false;

        if (canSave) {
          try {
            await new Promise<void>((resolve, reject) => {
              this.apiService.updateProperties(metadataToSave, photoId, useItemKey).subscribe({
                next: () => resolve(),
                error: (error) => {
                  console.error('[DRAG] Error saving to API:', error);
                  reject(error);
                }
              });
            });
            saveSucceeded = true;
          } catch (error) {
            console.error('[DRAG] Error saving to API:', error);
          }
        }

        if (!saveSucceeded) {
          if (!canSave) {
            console.warn('[DRAG] Skipping save due to missing authorization context', {
              hasAdminKey,
              hasApiKey,
              hasItemKey: !!useItemKey
            });
          }

          // Do not keep a local-only state that never reaches other clients.
          // Revert metadata and visual position if persistence failed.
          photo.updateMetadata(previousMetadata);

          const prevLayoutX = previousMetadata['layout_x'];
          const prevLayoutY = previousMetadata['layout_y'];
          if (this.svgBackgroundStrategy
            && typeof prevLayoutX === 'number'
            && typeof prevLayoutY === 'number') {
            const previousWorld = this.svgBackgroundStrategy.normalizedToWorld(prevLayoutX, prevLayoutY);
            const previousPosition = { x: previousWorld.x, y: previousWorld.y, z: 0 };
            photo.setTargetPosition(previousPosition);
            photo.setCurrentPosition(previousPosition);
            if (photo.mesh) {
              photo.mesh.position.set(previousPosition.x, previousPosition.y, previousPosition.z);
            }
          } else {
            await this.repositionPhoto(photo);
          }
          return;
        }

        // In SVG mode the dropped coordinates are the source of truth. Avoid cluster-style
        // relayout there, otherwise free drops can snap back off the map.
        if (this.currentLayout() !== 'svg') {
          await this.recalculateClusterLayout(oldAuthorId);
          const newAuthorId = photo.metadata['author_id'] as string;
          if (newAuthorId && newAuthorId !== oldAuthorId) {
            await this.recalculateClusterLayout(newAuthorId);
          }
        }

        // Reposition the dragged photo (handles photos with no author_id,
        // and ensures the dragged photo itself animates to its correct position)
        if (isOutOfBounds) {
          await this.repositionPhoto(photo);
        }
      });

      const svgElement = this.svgBackgroundStrategy.getSvgElement();

      if (svgElement) {
        // Place SVG to the left of clusters; keep items untouched
        this.rendererService.setSvgBackground(svgElement, {
          scale: 1,
          offsetX: svgOffsetX,
          offsetY: 0,
          radius: this.svgCircleRadius,
          desiredOpacity: 1
        });

        // Set layout strategy reference for debug visualization
        this.rendererService.setLayoutStrategyReference(this.svgBackgroundStrategy);

        // Camera will be handled by applySvgLayoutMode() → setLayoutStrategy() → updateCamera()
      } else {
        console.warn('❌ SVG element is null, cannot set background');
      }
      
      // Enable drag when SVG is visible
      this.photoRepository.setSvgVisible(true, this.svgBackgroundStrategy!);

      // Always apply SVG layout mode — when auto-positioning is off, this ensures
      // photos with saved drag positions (layout_x/layout_y) are placed correctly
      this.photoRepository.setSvgAutoPositioningEnabled(this.enableSvgAutoPositioning());
      await this.applySvgLayoutMode(this.enableSvgAutoPositioning());
    } catch (error) {
      console.error('Error switching to SVG layout:', error);
    } finally {
      this.layoutChangeInProgress = false;
    }
  }

  /**
   * Switch to Circle Packing layout
   */
  public async switchToCirclePackingLayout() {
    if (this.layoutChangeInProgress) {
      return;
    }
    
    this.layoutChangeInProgress = true;
    try {
      // Update UI immediately for responsive feedback
      this.currentLayout.set('circle-packing');
      this.syncThematicFisheyeEffects();

      // Clear taxonomy overlay labels
      this.currentTsneStrategy = null;
      this.taxonomyThemeLabels.set([]);
      this.taxonomySubThemeLabels.set([]);
      this.rendererService.resetTaxonomyHoverOpacityFocus();
      
      // Create circle packing layout strategy
      const circlePackingStrategy = new CirclePackingLayoutStrategy({
        photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
        photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
        spacingX: PHOTO_CONSTANTS.SPACING_X,
        spacingY: PHOTO_CONSTANTS.SPACING_Y,
        groupBuffer: 1500,  // Ample buffer between groups
        photoBuffer: 0,   // Buffer between photos within groups
        useFanLayout: !this.isMobile()
      });
      
      // Remove SVG background if switching from SVG layout
      this.rendererService.removeSvgBackground();
      this.photoRepository.setSvgVisible(false);

      // Switch the layout using PhotoDataRepository
      await this.photoRepository.setLayoutStrategy(circlePackingStrategy);
      
    } catch (error) {
      console.error('Error switching to Circle Packing layout:', error);
    } finally {
      this.layoutChangeInProgress = false;
    }
  }

  /**
   * Calculate transform for layout selection indicator
   */
  getLayoutIndicatorTransform(): string {
    const layoutIndex = this.currentLayout() === 'svg' ? 0 : 1; // Map=0, Clusters=1
    const translateX = layoutIndex * 108; // Button width (100px) + gap (8px)
    return `translateX(${translateX}px)`;
  }

  /**
   * Reset camera view to fit all content
   */
  resetView(): void {
    this.rendererService.resetCameraView(true);
  }

  /**
   * Zoom in at the viewport center
   */
  zoomIn(): void {
    this.rendererService.zoomAtCenter(0.65);
  }

  /**
   * Zoom out at the viewport center
   */
  zoomOut(): void {
    this.rendererService.zoomAtCenter(1.5);
  }

  /**
   * Handle search input
   */
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText.set(target.value);
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.searchText.set('');
    this.searchActive.set(false);
  }

  /**
   * Update URL hash with search parameter
   */
  private updateSearchHash(): void {
    const search = this.searchText();
    const params = new URLSearchParams(window.location.hash.substring(1));
    
    if (search) {
      params.set('search', search.replace(/ /g, '+'));
    } else {
      params.delete('search');
    }
    
    const newHash = params.toString();
    if (newHash) {
      window.location.hash = newHash;
    } else {
      // Remove hash if empty (but preserve the # for consistency)
      window.location.hash = '';
    }
  }

  /**
   * Apply search filter to photos
   * Matching items: 100% opacity, higher z-index
   * Non-matching items: 20% opacity, lower z-index
   */
  private applySearchFilter(): void {
    const search = this.searchText().toLowerCase().trim();
    const allPhotos = this.photoRepository.getAllPhotos();
    
    
    // Update URL hash
    this.updateSearchHash();
    
    if (!search) {
      // No search - reset all items to full opacity and normal z-index
      let resetCount = 0;
      this.searchIndex.clear();
      allPhotos.forEach(photo => {
        this.rendererService.setPhotoOpacity(photo.metadata.id, 1.0);
        this.rendererService.setPhotoZIndex(photo.metadata.id, 0);
        resetCount++;
      });
      return;
    }
    
    // Apply filter
    let matchCount = 0;
    let nonMatchCount = 0;
    
    allPhotos.forEach(photo => {
      const searchable = this.getSearchableText(photo);
      const matches = searchable.includes(search);
      
      if (matches) {
        // Matching item: full opacity, higher z-index
        this.rendererService.setPhotoOpacity(photo.metadata.id, 1.0);
        this.rendererService.setPhotoZIndex(photo.metadata.id, 100);
        matchCount++;
      } else {
        // Non-matching item: 20% opacity, lower z-index
        this.rendererService.setPhotoOpacity(photo.metadata.id, 0.2);
        this.rendererService.setPhotoZIndex(photo.metadata.id, -100);
        nonMatchCount++;
      }
    });
    
  }

  /**
   * Navigate back to the homepage
   */
  goBack(): void {
    this.router.navigate(['/'], { queryParamsHandling: 'preserve' });
  }
  
  /**
   * Toggle the filters bar visibility
   */
  toggleFiltersBar(): void {
    this.filtersBarOpen.set(!this.filtersBarOpen());
  }
  
  /**
   * Handle filter changes from the filters bar
   */
  onFiltersChange(filters: FiltersBarState): void {
    this.currentFilters.set(filters);
  }
  
  /**
   * Apply filters to photos (admin only)
   * Matching items: 100% opacity, normal z-index
   * Non-matching items: 20% opacity, lower z-index
   */
  private applyFilters(): void {
    // Guard: Return early if repository not initialized
    if (!this.photoRepository) {
      return;
    }
    
    if (!this.isAdmin()) {
      // Not in admin mode - reset all items to default state
      const allPhotos = this.photoRepository.getAllPhotos();
      allPhotos.forEach(photo => {
        this.rendererService.setPhotoOpacity(photo.metadata.id, 1.0);
        this.rendererService.setPhotoZIndex(photo.metadata.id, 0);
      });
      return;
    }
    
    const filters = this.currentFilters();
    const allPhotos = this.photoRepository.getAllPhotos();
    
    allPhotos.forEach(photo => {
      // Only filter photos that have meshes rendered
      if (!photo.mesh) {
        return;
      }
      
      const matches = this.photoMatchesFilters(photo, filters);
      
      if (matches) {
        // Matching item: full opacity, normal z-index
        this.rendererService.setPhotoOpacity(photo.metadata.id, 1.0);
        this.rendererService.setPhotoZIndex(photo.metadata.id, 0);
      } else {
        // Non-matching item: 20% opacity, lower z-index
        this.rendererService.setPhotoOpacity(photo.metadata.id, 0.2);
        this.rendererService.setPhotoZIndex(photo.metadata.id, -100);
      }
    });
  }
  
  /**
   * Check if a photo matches the current filters
   */
  private photoMatchesFilters(photo: PhotoData, filters: FiltersBarState): boolean {
    const metadata = photo.metadata;
    // Status filter (based on _private_moderation)
    // Only filter if not all statuses are selected (6 total statuses)
    if (filters.status.length > 0 && filters.status.length < 6) {
      const moderation = metadata['_private_moderation'];
      const statusMatches = this.matchesStatusFilter(moderation, filters.status);
      if (!statusMatches) return false;
    }
    
    // Author filter
    if (filters.author !== 'all') {
      const authorId = metadata['author_id'];
      if (authorId !== filters.author) return false;
    }
    
    // Preference filter (favorable_future)
    // Only filter if not all preferences are selected (6 total: 5 + none)
    if (filters.preference.length > 0 && filters.preference.length < 6) {
      const favorableFuture = metadata['favorable_future'] || metadata['_svgZoneFavorableFuture'];
      const preferenceMatches = this.matchesPreferenceFilter(favorableFuture, filters.preference);
      if (!preferenceMatches) return false;
    }
    
    // Potential filter (plausibility)
    // Only filter if not all potentials are selected (6 total: 5 + none)
    if (filters.potential.length > 0 && filters.potential.length < 6) {
      const plausibility = metadata['plausibility'];
      const potentialMatches = this.matchesPotentialFilter(plausibility, filters.potential);
      if (!potentialMatches) return false;
    }

    // Type filter (screenshot_type)
    if (filters.type !== 'all') {
      const screenshotType = metadata['screenshot_type'];
      if (screenshotType !== filters.type) return false;
    }

    // Topic filter (sub-theme paths)
    // Items with no topics are always shown (taxonomy may not have tagged them yet)
    if (filters.topic && filters.topic.length > 0) {
      const topics: string[] = metadata['topics'] || [];
      if (topics.length > 0) {
        const hasMatch = topics.some((t: string) => filters.topic.includes(t));
        if (!hasMatch) return false;
      }
    }

    // Search filter
    if (filters.search) {
      const searchable = this.getSearchableText(photo);
      if (!searchable.includes(filters.search.toLowerCase().trim())) return false;
    }

    return true;
  }
  
  /**
   * Check if a moderation value matches the selected status filters
   */
  private matchesStatusFilter(moderation: number | undefined | null, selectedStatuses: string[]): boolean {
    if (selectedStatuses.length === 0) return true;
    
    // Map status names to moderation values
    const statusMap: { [key: string]: number | null } = {
      'new': 2,
      'flagged': 1,
      'not-flagged': 3,
      'approved': 4,
      'highlighted': 5,
      'rejected': 0
    };
    
    // Check if moderation matches any selected status
    for (const status of selectedStatuses) {
      const expectedValue = statusMap[status];
      if (expectedValue === null || expectedValue === undefined) continue;
      
      // Handle "new" status - includes undefined, null, or 2
      if (status === 'new') {
        if (moderation === undefined || moderation === null || moderation === 2) {
          return true;
        }
      } else if (moderation === expectedValue) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check if a favorable_future value matches the selected preference filters
   */
  private matchesPreferenceFilter(favorableFuture: string | undefined | null, selectedPreferences: string[]): boolean {
    if (selectedPreferences.length === 0 || selectedPreferences.length === 6) return true;
    
    if (!favorableFuture) {
      return selectedPreferences.includes('none');
    }
    
    const normalized = favorableFuture.toLowerCase().trim();
    
    // Map normalized values to filter options
    const preferenceMap: { [key: string]: string } = {
      'prefer': 'prefer',
      'favor': 'prefer',
      'favorable': 'prefer',
      'preferred': 'prefer',
      'mostly prefer': 'mostly prefer',
      'uncertain': 'uncertain',
      'mostly prevent': 'mostly prevent',
      'prevent': 'prevent',
      'unfavorable': 'prevent'
    };
    
    const mappedValue = preferenceMap[normalized];
    return mappedValue ? selectedPreferences.includes(mappedValue) : false;
  }
  
  /**
   * Check if a plausibility value matches the selected potential filters
   */
  private matchesPotentialFilter(plausibility: number | undefined | null, selectedPotentials: string[]): boolean {
    if (selectedPotentials.length === 0 || selectedPotentials.length === 6) return true;
    
    if (typeof plausibility !== 'number' || !isFinite(plausibility)) {
      return selectedPotentials.includes('none');
    }
    
    // Map plausibility values to potential categories
    let category: string;
    if (plausibility >= 90) {
      category = '100'; // Projected
    } else if (plausibility >= 70) {
      category = '75'; // Probable
    } else if (plausibility >= 40) {
      category = '50'; // Plausible
    } else if (plausibility >= 10) {
      category = '25'; // Possible
    } else {
      category = '0'; // Preposterous
    }
    
    return selectedPotentials.includes(category);
  }

  /**
   * Handle camera settings changes from the settings panel
   * Applies all slider adjustments to the renderer
   */
  onSettingsChange(settings: FisheyeSettings): void {
    this.fisheyeSettings.set(settings);
    this.fisheyeEnabled.set(settings.enabled);
    
    // Enable/disable the fisheye effect in the renderer
    this.rendererService.enableFisheyeEffect(settings.enabled);
    this.syncThematicFisheyeEffects();
    
    // Apply fisheye configuration (magnification, radius, maxHeight)
    this.rendererService.setFisheyeConfig({
      magnification: settings.maxMagnification,
      radius: settings.radius,
      maxHeight: settings.maxHeight,
      viewportHeight: window.innerHeight
    });
  }

  /**
   * Handle photo click
   * If user has edit permissions: open evaluation sidebar
   * If user does not have edit permissions: trigger zoom animation (like "show on map")
   * Also updates URL hash with item ID
   */
  onPhotoClick(photoId: string): void {
    
    // Save item ID to URL hash
    window.location.hash = photoId;
    // Bump z-index for this item
    this.updateActiveItemZIndex();
    
    if (this.isAdmin()) {
      // User has edit permissions - open sidebar for evaluation
      this.selectedItemId.set(photoId);
      this.sidebarOpen.set(true);
    } else {
      // User does not have edit permissions - trigger zoom animation instead
      this.focusOnItem(photoId, { animateFromFull: true, fromShowOnMap: true });
    }
  }

  /**
   * Focus camera on a specific item
   */
  async focusOnItem(itemId: string, options?: { animateFromFull?: boolean; fromShowOnMap?: boolean }): Promise<void> {
    // Mark this item as the permalink target to allow high-res loading when focused
    this.rendererService.setPermalinkTarget(itemId);
    this.rendererService.setCameraMode('user-controlled');

    // Wait for photo to be loaded
    let attempts = 0;
    
    while (attempts < this.MAX_FOCUS_ATTEMPTS) {
      const photo = this.photoRepository.getPhoto(itemId);
      if (photo && photo.mesh && photo.animationState === PhotoAnimationState.POSITIONED) {
        // Photo is loaded and positioned in its final layout location
        const position = photo.mesh.position;
        
        const shouldAnimate = options?.animateFromFull === true;

        if (shouldAnimate && options?.fromShowOnMap) {
          // "Show on map" flow: smooth pan + zoom to item (50% screen size)
          await this.rendererService.focusOnItemFromShowOnMap(position.x, position.y, photo);
        } else if (shouldAnimate) {
          // Standard permalink animation (currently unused, kept for compatibility)
          this.rendererService.setCameraMode('user-controlled');
          const bounds = this.rendererService.getCurrentBounds();
          
          const fullViewZ = this.rendererService.computeFitZWithMargin(
            bounds,
            Math.PI * 45 / 180,
            window.innerWidth / window.innerHeight,
            300
          );
          
          await this.rendererService.focusOnPositionAnimated(position.x, position.y, fullViewZ, 1.0);
          const targetZ = fullViewZ * 0.5;
          await this.rendererService.focusOnPositionAnimated(position.x, position.y, targetZ, 2.0);
        } else {
          // Focus camera on this position with appropriate zoom
          this.rendererService.focusOnPosition(position.x, position.y, this.DEFAULT_FOCUS_ZOOM);
        }
        
        return;
      }
      
      // Wait before trying again
      await new Promise(resolve => setTimeout(resolve, this.FOCUS_RETRY_DELAY_MS));
      attempts++;
    }
    
    console.warn('[SHOWCASE_WS] Could not find photo to focus on:', itemId);
  }

  /**
   * Update z-index (renderOrder) for the active hash item
   */
  private updateActiveItemZIndex(): void {
    const activeItemId = window.location.hash.slice(1);
    
    if (activeItemId) {
      // Boost the active item
      const photo = this.photoRepository.getPhoto(activeItemId);
      if (photo && photo.mesh) {
        photo.mesh.renderOrder = 100; // High z-index
      }
    } else {
      // No active item, reset all
      this.resetAllItemsZIndex();
    }
  }

  /**
   * Reset z-index for all items back to normal
   */
  private resetAllItemsZIndex(): void {
    // Get all photos and reset their renderOrder
    const allPhotos = this.photoRepository.getAllPhotos?.();
    if (allPhotos) {
      allPhotos.forEach(photo => {
        if (photo.mesh) {
          photo.mesh.renderOrder = 0; // Normal z-index
        }
      });
    }
  }

  // Check if the current user is an editor (has admin_key)
  canEdit = computed(() => this.isAdmin());
  
  // Focus attempt configuration
  private readonly MAX_FOCUS_ATTEMPTS = 50; // 5 seconds max wait (50 * 100ms)
  private readonly FOCUS_RETRY_DELAY_MS = 100;
  private readonly DEFAULT_FOCUS_ZOOM = 800;

  /**
   * Handle background click - close evaluation sidebar
   */
  onBackgroundClick(): void {
    this.sidebarOpen.set(false);
    this.selectedItemId.set(null);
    // Clear URL hash when closing
    window.location.hash = '';
    // Reset z-index for all items
    this.resetAllItemsZIndex();
  }

  /**
   * Handle sidebar close
   */
  onSidebarClose(): void {
    this.sidebarOpen.set(false);
    this.selectedItemId.set(null);
    // Clear URL hash when closing
    window.location.hash = '';
    // Reset z-index for all items
    this.resetAllItemsZIndex();
  }

  /**
   * Handle metadata updates from the sidebar
   */
  async onMetadataUpdated(event: { itemId: string; metadata: any }): Promise<void> {
    
    const { itemId, metadata } = event;
    const photo = this.photoRepository.getPhoto(itemId);
    
    if (photo) {
      // Update photo metadata
      photo.updateMetadata(metadata);
      
      // If on SVG layout with auto-positioning, trigger layout recalculation
      if (this.currentLayout() === 'svg' && this.enableSvgAutoPositioning()) {
        const authorId = photo.metadata['author_id'] as string;
        if (authorId) {
          await this.recalculateClusterLayout(authorId);
        }
      }
    }
  }


  ngOnDestroy() {
    this.rendererService.dispose();
  }
}
