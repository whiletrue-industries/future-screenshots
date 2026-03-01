import { AfterViewInit, Component, computed, effect, ElementRef, signal, ViewChild, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { catchError, distinctUntilChanged, filter, forkJoin, from, interval, Observable, of, Subject, timer, takeUntil } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { QrcodeComponent } from "./qrcode/qrcode.component";
import { EvaluationSidebarComponent } from "./evaluation-sidebar/evaluation-sidebar.component";
import { FiltersBarComponent, FiltersBarState } from '../shared/filters-bar/filters-bar.component';
import { FisheyeSettings } from './settings-panel.component';
import { PhotoData, PhotoAnimationState, PhotoMetadata } from './photo-data';
import { ThreeRendererService } from './three-renderer.service';
import { LayoutStrategy } from './layout-strategy.interface';
import { TsneLayoutStrategy } from './tsne-layout-strategy';
import { SvgBackgroundLayoutStrategy } from './svg-background-layout-strategy';
import { CirclePackingLayoutStrategy } from './circle-packing-layout-strategy';
import { PhotoDataRepository } from './photo-data-repository';
import { PHOTO_CONSTANTS } from './photo-constants';
import { ANIMATION_CONSTANTS } from './animation-constants';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-showcase-ws',
  imports: [QrcodeComponent, EvaluationSidebarComponent, FiltersBarComponent],
  templateUrl: './showcase-ws.component.html',
  styleUrl: './showcase-ws.component.less'
})
export class ShowcaseWsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('titleElement') titleElement?: ElementRef;
  private router = inject(Router);
  private photoRepository: PhotoDataRepository;
  private activatedRoute: ActivatedRoute;
  private destroy$ = new Subject<void>();
  loop = new Subject<any[]>();
  lastCreatedAt = '0';
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
  
  // Evaluation sidebar state
  sidebarOpen = signal(false);
  selectedItemId = signal<string | null>(null);
  
  // Permalink support - item to focus on after load
  focusItemId = signal<string | null>(null);
  
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
        type: new Map<string, number>()
      };
    }
    
    const allPhotos = this.photoRepository.getAllPhotos();
    const statusMap = new Map<string, number>();
    const authorMap = new Map<string, number>();
    const preferenceMap = new Map<string, number>();
    const potentialMap = new Map<string, number>();
    const typeMap = new Map<string, number>();
    
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
    });
    
    return {
      status: statusMap,
      author: authorMap,
      preference: preferenceMap,
      potential: potentialMap,
      type: typeMap
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
    search: '',
    orderBy: 'date'
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

  private onMessageFromChild = (event: MessageEvent) => {
    const data = event.data;
    if (!data || typeof data !== 'object') {
      return;
    }
    if (data.type === 'show-on-map') {
      const itemId = typeof data.itemId === 'string' ? data.itemId : null;
      if (!itemId) {
        return;
      }
      this.sidebarOpen.set(false);
      this.selectedItemId.set(null);
      // Trigger animated focus from "show on map" click
      this.focusOnItem(itemId, { animateFromFull: true, fromShowOnMap: true });
    }
  };

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
      distinctUntilChanged()
    ).subscribe(async (items) => {
      items = items.sort((item1, item2) => item1.created_at.localeCompare(item2.created_at));
      
      // First pass: load existing photos immediately
      if (this.lastCreatedAt === '0' && items.length > 0) {

        // Process photos sequentially and then refresh layout
        const photoPromises = items.map(async (item) => {
          const id = item._id;
          const placeholderUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=';
          const url = item.screenshot_url || placeholderUrl;
          if (!item.screenshot_url) {
            console.warn('[SHOWCASE_WS] Missing screenshot_url for item', id, 'using placeholder image');
          }
          // Generate transition_bar_position if not provided by API
          const transitionBarPosition = item.transition_bar_position || this.getDefaultTransitionBarPosition(item);
          // Include all item fields to make search work across every string field
          const metadata: PhotoMetadata = {
            ...item,
            id,
            url,
            created_at: item.created_at,
            screenshot_url: url,
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
      } else {
        // Second pass onwards: add new photos to queue for showcase
        const newItems = items.filter(item => {
          const created_at = item.created_at;
          return created_at && created_at > this.lastCreatedAt;
        });
        
        if (newItems.length > 0) {
          // Process new photos immediately - they'll be added to the showcase queue
          const photoPromises = newItems.map(async (item) => {
            const id = item._id;
            const placeholderUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=';
            const url = item.screenshot_url || placeholderUrl;
            if (!item.screenshot_url) {
              console.warn('[SHOWCASE_WS] Missing screenshot_url for item', id, 'using placeholder image');
            }
            // Generate transition_bar_position if not provided by API
            const transitionBarPosition = item.transition_bar_position || this.getDefaultTransitionBarPosition(item);
            const metadata: PhotoMetadata = {
              ...item,
              id,
              url,
              created_at: item.created_at,
              screenshot_url: url,
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
      }

      // Update showcase behavior
      this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase());
      
      // Schedule next poll (avoid recursive loop)
      setTimeout(() => {
        if (!this.destroy$.closed) {
          this.getItems().subscribe(items_ => {
            this.loop.next(items_);
          });
        }
      }, ANIMATION_CONSTANTS.API_POLLING_INTERVAL);
    });
    
    const qp = this.activatedRoute.snapshot.queryParams;
    this.workspace.set(qp['workspace'] || 'WORKSPACE_NOT_SET');
    this.api_key.set(qp['api_key'] || 'API_KEY_NOT_SET');
    this.admin_key.set(qp['admin_key'] || 'ADMIN_KEY_NOT_SET');
    this.lang.set(qp['lang'] ? qp['lang'] + '/' : '');
    
    // Set drag permissions immediately based on admin status
    // This must be done before photos are added to the repository
    const adminKeyValue = this.admin_key();
    const isAdminUser = adminKeyValue !== '' && adminKeyValue !== 'ADMIN_KEY_NOT_SET';
    this.photoRepository.setDragEnabled(isAdminUser);
    
    // Check for item permalink (query param or URL hash)
    if (qp['item-id']) {
      this.focusItemId.set(qp['item-id']);
    }
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
    
    // Fetch workspace data to get title
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

  /**
   * Toggle fisheye lens effect
   */
  toggleFisheyeEffect() {
    const willBeEnabled = !this.fisheyeEnabled();
    this.fisheyeEnabled.set(willBeEnabled);
    this.rendererService.enableFisheyeEffect(willBeEnabled);
    
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
   * Fetch workspace data to get the display title (workspace source preferred)
   */
  private fetchWorkspaceData(): void {
    const workspaceId = this.workspace();
    const apiKey = this.resolveAuthToken();
    
    if (!workspaceId || workspaceId === 'WORKSPACE_NOT_SET' || !apiKey) {
      return;
    }
    
    const httpOptions = {
      headers: { 'Authorization': apiKey }
    };
    
    this.http.get<any>(`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${workspaceId}`, httpOptions)
      .subscribe({
        next: (workspace) => {
          if (workspace) {
            const displayTitle = workspace.source || workspace.title || '';
            this.workspaceTitle.set(displayTitle);
            
            // Check if additional contributions are allowed
            const allowContributions = workspace.collaborate !== false; // Default to true if not specified
            this.allowAdditionalContributions.set(allowContributions);
          }
        },
        error: (error) => {
          console.error('Error fetching workspace data:', error);
        }
      });
  }

  getItems(): Observable<any[]> {
    const httpOptions: { headers?: Record<string, string> } = {};
    const authToken = this.resolveAuthToken();
    if (authToken) {
      httpOptions.headers = { 'Authorization': authToken };
    }
    return this.http.get<any[]>(`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace()}/items?page_size=10000`, httpOptions).pipe(
      catchError((error) => {
        console.error('Error loading items:', error);
        return of([]);
      })
    );
  }

  async ngAfterViewInit() {
    if (this.platform.browser()) {
      window.addEventListener('message', this.onMessageFromChild);
      // Listen for hash changes to update z-index
      window.addEventListener('hashchange', () => this.updateActiveItemZIndex());
      // Listen for resize to re-measure title
      window.addEventListener('resize', () => this.measureTitle());
      // Listen for keyboard shortcuts
      window.addEventListener('keydown', this.onKeyDown.bind(this));
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
    if (settings.enabled) {
      this.rendererService.enableFisheyeEffect(true);
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((photoData) => {
      });

    this.photoRepository.photoRemoved$
      .pipe(takeUntil(this.destroy$))
      .subscribe((photoId) => {

      });

    this.photoRepository.layoutChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {

      });
    
    // Poll zoom level every 500ms for UI display (non-critical update)
    interval(500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentZoomLevel.set(this.rendererService.getCurrentZoomLevel());
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
      
      timer(ANIMATION_CONSTANTS.INITIAL_POLLING_DELAY).subscribe(() => {
        this.getItems().subscribe((items) => {
          this.loop.next(items);
        });
      });
    }
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
      
      // Create TSNE layout strategy with same dimensions as grid layout
      const tsneStrategy = new TsneLayoutStrategy(this.workspace(), undefined, {
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
      
    } catch (error) {
      console.error('Error switching to TSNE layout:', error);
    } finally {
      this.layoutChangeInProgress = false;
    }
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

        // Single API call with all metadata
        const workspace = this.workspace();
        const adminKey = this.admin_key();
        if (workspace && adminKey && workspace !== 'WORKSPACE_NOT_SET' && adminKey !== 'ADMIN_KEY_NOT_SET') {
          try {
            await new Promise<void>((resolve, reject) => {
              this.apiService.updateProperties(metadataToSave, photoId).subscribe({
                next: () => resolve(),
                error: (error) => {
                  console.error('[DRAG] Error saving to API:', error);
                  reject(error);
                }
              });
            });
          } catch (error) {
            console.error('[DRAG] Error saving to API:', error);
          }
        }

        // Recalculate layout for affected cluster(s)
        await this.recalculateClusterLayout(oldAuthorId);
        const newAuthorId = photo.metadata['author_id'] as string;
        if (newAuthorId && newAuthorId !== oldAuthorId) {
          await this.recalculateClusterLayout(newAuthorId);
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
    
    // Enable/disable the fisheye effect in the renderer
    this.rendererService.enableFisheyeEffect(settings.enabled);
    
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
    if (this.platform.browser()) {
      window.removeEventListener('message', this.onMessageFromChild);
    }
    this.rendererService.dispose();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
