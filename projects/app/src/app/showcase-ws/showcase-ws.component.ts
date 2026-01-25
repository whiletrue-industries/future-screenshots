import { AfterViewInit, Component, computed, effect, ElementRef, signal, ViewChild, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { catchError, distinctUntilChanged, filter, forkJoin, from, interval, Observable, of, Subject, timer, takeUntil } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { QrcodeComponent } from "./qrcode/qrcode.component";
import { EvaluationSidebarComponent } from "./evaluation-sidebar/evaluation-sidebar.component";
import { FisheyeSettings } from './settings-panel.component';
import { PhotoData, PhotoAnimationState, PhotoMetadata } from './photo-data';
import { ThreeRendererService } from './three-renderer.service';
import { LayoutStrategy } from './layout-strategy.interface';
import { GridLayoutStrategy } from './grid-layout-strategy';
import { TsneLayoutStrategy } from './tsne-layout-strategy';
import { SvgBackgroundLayoutStrategy } from './svg-background-layout-strategy';
import { SvgSideLayoutStrategy } from './svg-side-layout-strategy';
import { CirclePackingLayoutStrategy } from './circle-packing-layout-strategy';
import { PhotoDataRepository } from './photo-data-repository';
import { PHOTO_CONSTANTS } from './photo-constants';
import { ANIMATION_CONSTANTS } from './animation-constants';
import { ApiService } from '../../api.service';
import e from 'express';

@Component({
  selector: 'app-showcase-ws',
  imports: [QrcodeComponent, EvaluationSidebarComponent],
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
  currentLayout = signal<'grid' | 'tsne' | 'svg' | 'circle-packing'>('circle-packing');
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

  // Computed: whether title needs animation (is truncated)
  titleNeedsAnimation = signal(false);

  // Check if currently dragging (for cursor style)
  isDragging = computed(() => this.rendererService.isDraggingItem());
  
  // Check if hovering over an item (for cursor style) - directly use the signal
  isHoveringItem = computed(() => {
    const hovering = this.rendererService.isHoveringItem()();
    console.log('[SHOWCASE_WS_CURSOR] isHoveringItem computed changed to:', hovering);
    return hovering;
  });

  // Track if fisheye is currently enabled
  // No longer needed: private currentFisheyeValue = 0;
  loadedPhotoIds = new Set<string>();
  private layoutChangeInProgress = false;
  private svgBackgroundStrategy: SvgBackgroundLayoutStrategy | null = null;
  private svgSideStrategy: SvgSideLayoutStrategy | null = null;
  private readonly svgCircleRadius = 20000;
  qrUrl = computed(() => 
    `https://mapfutur.es/${this.lang()}prescan?workspace=${this.workspace()}&api_key=${this.api_key()}&ws=true`
  );
  
  // Check if device is mobile
  isMobile = computed(() => this.platform.isMobile);

  private onMessageFromChild = (event: MessageEvent) => {
    const data = event.data;
    console.log('[SHOWCASE_WS] Message received from child:', data);
    if (!data || typeof data !== 'object') {
      console.log('[SHOWCASE_WS] Message skipped - not an object');
      return;
    }
    if (data.type === 'show-on-map') {
      console.log('[SHOWCASE_WS] Processing show-on-map message');
      const itemId = typeof data.itemId === 'string' ? data.itemId : null;
      if (!itemId) {
        console.log('[SHOWCASE_WS] show-on-map message missing itemId, skipping');
        return;
      }
      console.log('[SHOWCASE_WS] Closing sidebar and focusing on item:', itemId);
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
        
        // Wait for layout to stabilize and camera animation to complete
        // Using a timeout to allow the Three.js renderer to complete layout calculations
        setTimeout(() => {
          this.isLayoutLoading.set(false); // Layout composition is now complete
        }, 2000); // 2 second delay for layout and camera animation to settle
        
        // Apply search filter if query was provided in URL
        if (this.searchText()) {
          this.applySearchFilter();
        }
        
        // Apply search filter if query was provided in URL
        if (this.searchText()) {
          this.applySearchFilter();
        }
        
        // Set lastCreatedAt to the most recent item
        const latestItem = items[items.length - 1];
        this.lastCreatedAt = latestItem.created_at;
      } else {
        console.log('lastCreatedAt:', this.lastCreatedAt);
        // Second pass onwards: add new photos to queue for showcase
        const newItems = items.filter(item => {
          const created_at = item.created_at;
          return created_at && created_at > this.lastCreatedAt;
        });
        console.log('num new items:', newItems.length);
        
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
            console.log('[METADATA] New photo:', id, '-> plausibility:', item.plausibility, 'favorable_future:', item.favorable_future, 'transition_bar_position:', transitionBarPosition);
            
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
    console.log('[SHOWCASE_WS_INIT] Query params - admin_key:', adminKeyValue);
    console.log('[SHOWCASE_WS_INIT] Drag permissions set during initialization:', isAdminUser ? 'enabled (admin)' : 'disabled (visitor)');
    
    // Check for item permalink
    if (qp['item-id']) {
      this.focusItemId.set(qp['item-id']);
    }
    
    // Fetch workspace data to get title
    if (this.workspace() !== 'WORKSPACE_NOT_SET') {
      this.fetchWorkspaceData();
    }
    
    // Map layout parameter aliases to actual layout names
    const layoutParam = qp['layout'];
    if (layoutParam) {
      // Map friendly names to internal layout names (map removed)
      const layoutMap: { [key: string]: 'grid' | 'tsne' | 'svg' | 'circle-packing' } = {
        'clusters': 'circle-packing',
        'themes': 'grid',
        'grid': 'grid',
        'tsne': 'tsne',
        'svg': 'svg',
        'circle-packing': 'circle-packing'
      };
      const mappedLayout = layoutMap[layoutParam.toLowerCase()];
      if (mappedLayout) {
        this.currentLayout.set(mappedLayout);
      }
    }
    
    // Check for fisheye parameters
    if (qp['fisheye'] === '1' || qp['fisheye'] === 'true') {
      this.fisheyeEnabled.set(true);
    }
    
    apiService.updateFromRoute(this.activatedRoute.snapshot);
    apiService.api_key.set(this.admin_key());
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
    console.log('[SHOWCASE_WS] Toggling fisheye to:', willBeEnabled);
    this.fisheyeEnabled.set(willBeEnabled);
    this.rendererService.enableFisheyeEffect(willBeEnabled);
    
    // When enabling, immediately apply current settings
    if (willBeEnabled) {
      const settings = this.fisheyeSettings();
      console.log('[SHOWCASE_WS] Applying fisheye settings on toggle:', settings);
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
    
    console.log('[TOGGLE] SVG Auto-Positioning button clicked');
    console.log('[TOGGLE] Current state:', { wasEnabled, willBeEnabled, currentLayout: this.currentLayout() });
    
    this.enableSvgAutoPositioning.set(willBeEnabled);
    this.photoRepository.setSvgAutoPositioningEnabled(willBeEnabled);
    
    if (this.currentLayout() === 'svg') {
      this.layoutChangeInProgress = true;
      try {
        await this.applySvgLayoutMode(willBeEnabled);
      } finally {
        this.layoutChangeInProgress = false;
      }
    } else {
      console.log('[TOGGLE] Not on SVG layout, skipping visualization');
    }
  }

  private async applySvgLayoutMode(enableAutoPositioning: boolean): Promise<void> {
    const backgroundStrategy = this.svgBackgroundStrategy;
    const sideStrategy = this.svgSideStrategy;

    if (!backgroundStrategy || !sideStrategy) {
      console.warn('[SVG] Strategies not initialized; run switchToSvgLayout first');
      return;
    }

    // Switch strategies based on requested mode
    const strategy = enableAutoPositioning
      ? backgroundStrategy
      : new CirclePackingLayoutStrategy({
          photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
          photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
          spacingX: PHOTO_CONSTANTS.SPACING_X,
          spacingY: PHOTO_CONSTANTS.SPACING_Y,
          groupBuffer: 1500,
          photoBuffer: 0,
          useFanLayout: !this.isMobile()
        });

    // Clear any lingering debug overlay when leaving auto-positioning mode
    if (!enableAutoPositioning) {
      const removeDebugOverlay = (backgroundStrategy as any).removeDebugOverlay;
      if (typeof removeDebugOverlay === 'function') {
        removeDebugOverlay.call(backgroundStrategy);
      }
    }

    await this.photoRepository.setLayoutStrategy(strategy);
    this.rendererService.setLayoutStrategyReference(strategy);

    if (enableAutoPositioning) {
      this.showSvgHotspotDebugVisualization();
    }

    // Don't refit camera here - it causes unwanted zoom-out
    // Camera was already fitted in switchToSvgLayout()
  }

  /**
   * Helper to show SVG hotspot debug visualization
   */
  private showSvgHotspotDebugVisualization() {
    try {
      const strategy = this.photoRepository.getLayoutStrategy();
      console.log('[HOTSPOT-VIZ] Got strategy:', strategy?.constructor.name);
      
      if (!strategy) {
        console.warn('[HOTSPOT-VIZ] No layout strategy available');
        return;
      }
      
      const showDebugMethod = (strategy as any).showAllHotspotsDebug;
      if (typeof showDebugMethod === 'function') {
        showDebugMethod.call(strategy);
      }
    } catch (error) {
      console.error('[HOTSPOT-VIZ] Error showing visualization:', error);
    }
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
   * Recalculate layout for all photos in a specific cluster (by author_id)
   * This triggers the circle-packing strategy to reposition photos based on their current evaluation
   */
  private async recalculateClusterLayout(authorId: string): Promise<void> {
    if (!authorId) return;
    
    console.log('[CLUSTER-RECALC] Recalculating layout for cluster:', authorId);
    
    // Get all photos in this cluster
    const allPhotos = this.photoRepository.getAllPhotos();
    const clusterPhotos = allPhotos.filter(photo => photo.metadata['author_id'] === authorId);
    
    if (clusterPhotos.length === 0) {
      console.log('[CLUSTER-RECALC] No photos found in cluster:', authorId);
      return;
    }
    
    // Get the current layout strategy
    const strategy = this.photoRepository.getLayoutStrategy();
    if (!strategy) {
      console.warn('[CLUSTER-RECALC] No layout strategy available');
      return;
    }
    
    // Recalculate positions for all photos in this cluster
    // The circle-packing strategy will use the updated evaluation data
    for (const photo of clusterPhotos) {
      const newPosition = await strategy.getPositionForPhoto(photo, allPhotos);
      if (newPosition) {
        photo.setTargetPosition({ x: newPosition.x, y: newPosition.y, z: 0 });
      }
    }
    
    console.log('[CLUSTER-RECALC] Recalculated positions for', clusterPhotos.length, 'photos in cluster:', authorId);
  }

  /**
   * Fetch workspace data to get the display title (workspace source preferred)
   */
  private fetchWorkspaceData(): void {
    const workspaceId = this.workspace();
    const apiKey = this.api_key() || this.admin_key();
    
    if (!workspaceId || workspaceId === 'WORKSPACE_NOT_SET' || !apiKey || apiKey === 'API_KEY_NOT_SET') {
      return;
    }
    
    const httpOptions = {
      headers: { 'Authorization': `Bearer ${apiKey}` }
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
            console.log('[WORKSPACE_DATA] allowAdditionalContributions:', allowContributions);
          }
        },
        error: (error) => {
          console.error('Error fetching workspace data:', error);
        }
      });
  }

  getItems(): Observable<any[]> {
    const httpOptions: { headers?: Record<string, string> } = {};
    if (this.api_key()) {
      httpOptions.headers = { 'Authorization': this.admin_key() || this.api_key()! };
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
      this.measureTitle();
      await this.initialize(this.container.nativeElement);
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
      console.log('[SHOWCASE_WS] Enabling fisheye on init with settings:', settings);
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

    // Initialize PhotoDataRepository with default grid strategy first
    const defaultGridStrategy = new GridLayoutStrategy({
      photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
      photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
      spacingX: PHOTO_CONSTANTS.SPACING_X,
      spacingY: PHOTO_CONSTANTS.SPACING_Y,
      useRandomPositioning: true
    });

    await this.photoRepository.initialize(
      defaultGridStrategy, 
      this.rendererService, 
      {
        enableRandomShowcase: this.enableRandomShowcase(),
        showcaseInterval: ANIMATION_CONSTANTS.SHOWCASE_INTERVAL,
        newPhotoAnimationDelay: ANIMATION_CONSTANTS.NEW_PHOTO_ANIMATION_DELAY
      }
    );

    // Switch to the desired initial layout if it's not grid
    if (this.currentLayout() !== 'grid') {
      switch (this.currentLayout()) {
        case 'circle-packing':
          await this.switchToCirclePackingLayout();
          break;
        case 'tsne':
          await this.switchToTsneLayout();
          break;
        case 'svg':
          await this.switchToSvgLayout();
          break;
      }
    }

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
          
          // Check for item to focus from URL hash first, then from query params
          // Extract item ID from hash (before any search parameter)
          const hashParts = window.location.hash.slice(1).split('?')[0];
          const focusId = hashParts || this.focusItemId();
          if (focusId && !focusId.includes('search=')) {
            console.log('[SHOWCASE_WS] Focusing on item from URL:', focusId);
            timer(500).subscribe(() => {
              this.focusOnItem(focusId, { animateFromFull: true, fromShowOnMap: true });
            });
          }
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
      this.rendererService.disableAllDragging();
      
      // Switch the layout using PhotoDataRepository
      await this.photoRepository.setLayoutStrategy(tsneStrategy);
      
    } catch (error) {
      console.error('Error switching to TSNE layout:', error);
    } finally {
      this.layoutChangeInProgress = false;
    }
  }

  /**
   * Switch back to grid layout
   */
  public async switchToGridLayout() {
    if (this.layoutChangeInProgress) {
      return;
    }
    
    this.layoutChangeInProgress = true;
    try {

      
      // Update UI immediately for responsive feedback
      this.currentLayout.set('grid');
      
      // Create grid layout strategy
      const gridStrategy = new GridLayoutStrategy({
        photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
        photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
        spacingX: PHOTO_CONSTANTS.SPACING_X,
        spacingY: PHOTO_CONSTANTS.SPACING_Y,
        useRandomPositioning: true
      });
      
      // Initialize the strategy
      await gridStrategy.initialize();
      
      // Remove SVG background if switching from SVG layout
      this.rendererService.removeSvgBackground();
      this.rendererService.disableAllDragging();
      
      // Switch the layout using PhotoDataRepository
      await this.photoRepository.setLayoutStrategy(gridStrategy);
      
    } catch (error) {
      console.error('Error switching to Grid layout:', error);
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

      // Register hotspot drop callback to update photo metadata and recalculate layout
      this.rendererService.setHotspotDropCallback(async (photoId: string, hotspotData: { [key: string]: string | number }, position: { x: number, y: number, z: number }) => {
        console.log('[HOTSPOT-DROP] Photo', photoId, 'dropped, hotspotData:', hotspotData);
        
        // Get the photo from repository
        const photo = this.photoRepository.getPhotoById(photoId);
        if (!photo) {
          console.warn('[HOTSPOT-DROP] Photo not found:', photoId);
          return;
        }

        // Store the old author_id to know which cluster to recalculate
        const oldAuthorId = photo.metadata['author_id'] as string;
        
        // Check if this is a "drag out of bounds" event (empty hotspotData)
        const isDraggedOut = Object.keys(hotspotData).length === 0;
        
        if (isDraggedOut) {
          // Clear evaluation metadata when dragged out of bounds
          console.log('[HOTSPOT-DROP] Photo dragged out of bounds, clearing evaluation metadata');
          photo.updateMetadata({
            plausibility: undefined,
            favorable_future: undefined,
            _svgZoneFavorableFuture: undefined
          });
        } else {
          // Update photo metadata with hotspot zone data
          photo.updateMetadata(hotspotData);
          console.log('[HOTSPOT-DROP] Updated metadata for photo', photoId, 'new metadata:', photo.metadata);
        }
        
        // Save metadata to API
        try {
          const workspace = this.workspace();
          const adminKey = this.admin_key();
          
          if (workspace && adminKey && workspace !== 'WORKSPACE_NOT_SET' && adminKey !== 'ADMIN_KEY_NOT_SET') {
            // For dragged out items, send deletion of evaluation fields
            const metadataToSave: { [key: string]: string | number | null } = isDraggedOut ? {
              plausibility: null,
              favorable_future: null,
              _svgZoneFavorableFuture: null
            } : hotspotData;
            
            // Use the original updateProperties method
            await new Promise<void>((resolve, reject) => {
              this.apiService.updateProperties(metadataToSave, photoId).subscribe({
                next: () => {
                  console.log('[HOTSPOT-DROP] Saved metadata to API for photo', photoId);
                  resolve();
                },
                error: (error) => {
                  console.error('[HOTSPOT-DROP] Error saving metadata to API:', error);
                  reject(error);
                }
              });
            });
          }
        } catch (error) {
          console.error('[HOTSPOT-DROP] Error saving metadata to API:', error);
        }
        
        // Recalculate layout for affected cluster(s)
        await this.recalculateClusterLayout(oldAuthorId);
        
        // If author_id changed, also recalculate the new cluster
        const newAuthorId = photo.metadata['author_id'] as string;
        if (newAuthorId && newAuthorId !== oldAuthorId) {
          await this.recalculateClusterLayout(newAuthorId);
        }
      });

      // Needed when auto-positioning is enabled
      this.svgSideStrategy = new SvgSideLayoutStrategy({
        photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
        photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
        svgRadius: this.svgCircleRadius,
        useFanLayout: !this.isMobile()
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

        // Fit camera to include SVG plane on the left and clusters centered at 0
        const svgMinX = svgOffsetX - this.svgCircleRadius;
        const svgMaxX = svgOffsetX + this.svgCircleRadius;
        const clusterMinX = -this.svgCircleRadius;
        const clusterMaxX = this.svgCircleRadius;
        let minX = Math.min(svgMinX, clusterMinX);
        let maxX = Math.max(svgMaxX, clusterMaxX);
        let minY = -this.svgCircleRadius;
        let maxY = this.svgCircleRadius;
        
        // Add extra padding (50% expansion) to zoom out more
        const centerX = (minX + maxX) * 0.5;
        const centerY = (minY + maxY) * 0.5;
        const rangeX = maxX - minX;
        const rangeY = maxY - minY;
        minX = centerX - rangeX * 0.75;
        maxX = centerX + rangeX * 0.75;
        minY = centerY - rangeY * 0.75;
        maxY = centerY + rangeY * 0.75;
        
        this.rendererService.fitCameraToBounds([
          { x: minX, y: minY },
          { x: maxX, y: maxY }
        ]);
      } else {
        console.warn('❌ SVG element is null, cannot set background');
      }
      
      // Apply auto-positioning only if enabled; otherwise keep circle packing positions intact
      this.photoRepository.setSvgAutoPositioningEnabled(this.enableSvgAutoPositioning());
      if (this.enableSvgAutoPositioning()) {
        await this.applySvgLayoutMode(true);
      }
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
      this.rendererService.disableAllDragging();
      
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
    
    console.log('[SEARCH] Applying filter. Search text:', search, 'Photo count:', allPhotos.length);
    
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
      console.log('[SEARCH] Reset', resetCount, 'photos to default state');
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
    
    console.log('[SEARCH] Filter applied. Matches:', matchCount, 'Non-matches:', nonMatchCount);
  }

  /**
   * Navigate back to the homepage
   */
  goBack(): void {
    this.router.navigate(['/']);
  }

  /**
   * Handle camera settings changes from the settings panel
   * Applies all slider adjustments to the renderer
   */
  onSettingsChange(settings: FisheyeSettings): void {
    this.fisheyeSettings.set(settings);
    console.log('[SHOWCASE_WS] onFisheyeSettingsChange', { ...settings });
    
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
    console.log('[SHOWCASE_WS] Photo clicked:', photoId, 'isAdmin:', this.isAdmin());
    
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
      console.log('[SHOWCASE_WS] User has no edit permissions, triggering zoom animation');
      this.focusOnItem(photoId, { animateFromFull: true, fromShowOnMap: true });
    }
  }

  /**
   * Focus camera on a specific item
   */
  async focusOnItem(itemId: string, options?: { animateFromFull?: boolean; fromShowOnMap?: boolean }): Promise<void> {
    console.log('[SHOWCASE_WS] Focusing on item:', itemId);
    
    // Wait for photo to be loaded
    let attempts = 0;
    
    while (attempts < this.MAX_FOCUS_ATTEMPTS) {
      const photo = this.photoRepository.getPhoto(itemId);
      if (photo && photo.mesh) {
        // Get the photo's position
        const position = photo.mesh.position;
        console.log('[SHOWCASE_WS] Found photo at position:', position);
        
        const shouldAnimate = options?.animateFromFull === true;

        if (shouldAnimate && options?.fromShowOnMap) {
          // "Show on map" flow: smooth pan + zoom to item (50% screen size)
          await this.rendererService.focusOnItemFromShowOnMap(position.x, position.y, photo);
        } else if (shouldAnimate) {
          // Standard permalink animation (currently unused, kept for compatibility)
          this.rendererService.setAutoFit(false);
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
        console.log('[SHOWCASE_WS] Bumping z-index for item:', activeItemId);
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
    console.log('[SHOWCASE_WS] Resetting z-index for all items');
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
    console.log('[SHOWCASE_WS] Background clicked');
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
    console.log('[SHOWCASE_WS] Sidebar closed');
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
    console.log('[SHOWCASE_WS] Metadata updated:', event);
    
    const { itemId, metadata } = event;
    const photo = this.photoRepository.getPhoto(itemId);
    
    if (photo) {
      // Update photo metadata
      photo.updateMetadata(metadata);
      
      // If on SVG layout with auto-positioning, trigger layout recalculation
      if (this.currentLayout() === 'svg' && this.enableSvgAutoPositioning()) {
        const authorId = photo.metadata['author_id'] as string;
        if (authorId) {
          console.log('[SHOWCASE_WS] Recalculating layout for cluster:', authorId);
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
