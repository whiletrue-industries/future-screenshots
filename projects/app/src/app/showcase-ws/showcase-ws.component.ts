import { AfterViewInit, Component, computed, ElementRef, signal, ViewChild, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { catchError, distinctUntilChanged, filter, forkJoin, from, interval, map, Observable, of, Subject, timer, takeUntil } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QrcodeComponent } from "./qrcode/qrcode.component";
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
  imports: [QrcodeComponent],
  templateUrl: './showcase-ws.component.html',
  styleUrl: './showcase-ws.component.less'
})
export class ShowcaseWsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
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
  currentLayout = signal<'grid' | 'tsne' | 'svg' | 'circle-packing'>('circle-packing');
  enableRandomShowcase = signal(false);
  enableSvgAutoPositioning = signal(true);
  fisheyeEnabled = signal(false);
  currentZoomLevel = signal(1.0); // Track current zoom level for UI display
  
  // Check if user has admin access
  isAdmin = computed(() => this.admin_key() !== '' && this.admin_key() !== 'ADMIN_KEY_NOT_SET');
  fisheyeSettings = signal<FisheyeSettings>({
    enabled: true,
    maxMagnification: 10.0,
    radius: 700,
    maxHeight: 40
  });

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
    this.loop.pipe(
      distinctUntilChanged()
    ).subscribe(async (items) => {
      console.log('[SHOWCASE_WS_LOOP] Received', items.length, 'items from API');
      if (items.length > 0) {
        console.log('[SHOWCASE_WS_LOOP] First item:', { _id: items[0]._id, screenshot_url: items[0].screenshot_url, created_at: items[0].created_at });
      }
      items = items.sort((item1, item2) => item1.created_at.localeCompare(item2.created_at));
      
      // First pass: load existing photos immediately
      if (this.lastCreatedAt === '0' && items.length > 0) {

        // Process photos sequentially and then refresh layout
        const photoPromises = items.map(async (item) => {
          const id = item._id;
          // Create a proper placeholder image (100x100 gray canvas) instead of 1x1 pixel
          const placeholderUrl = this.createPlaceholderImage();
          const url = item.screenshot_url || placeholderUrl;
          if (!item.screenshot_url) {
            console.warn('[SHOWCASE_WS] Missing screenshot_url for item', id, 'using placeholder image');
          }
          // Generate transition_bar_position if not provided by API
          const transitionBarPosition = item.transition_bar_position || this.getDefaultTransitionBarPosition(item);
          const metadata: PhotoMetadata = {
            id,
            url,
            created_at: item.created_at,
            screenshot_url: url,
            author_id: item.author_id,
            layout_x: item.layout_x,
            layout_y: item.layout_y,
            plausibility: item.plausibility,
            favorable_future: item.favorable_future,
            transition_bar_position: transitionBarPosition
          };
          
          try {
            await this.photoRepository.addPhoto(metadata); // Add initial photos
            this.loadedPhotoIds.add(id);
          } catch (error) {
            console.error('Error loading photo immediately:', error);
          }
        });
        
        await Promise.all(photoPromises);
        
        this.qrSmall.set(true);
        
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
              id,
              url,
              created_at: item.created_at,
              screenshot_url: url,
              author_id: item.author_id,
              plausibility: item.plausibility,
              favorable_future: item.favorable_future,
              transition_bar_position: transitionBarPosition
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
    
    // Fetch workspace data to get title
    if (this.workspace() !== 'WORKSPACE_NOT_SET') {
      this.fetchWorkspaceData();
    }
    
    const layoutParam = qp['layout'];
    if (layoutParam && ['grid','tsne','svg','circle-packing'].includes(layoutParam)) {
      this.currentLayout.set(layoutParam as any);
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
          photoBuffer: 0
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
   * Fetch workspace data to get the title
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
          if (workspace && workspace.title) {
            this.workspaceTitle.set(workspace.title);
          }
        },
        error: (error) => {
          console.error('Error fetching workspace data:', error);
        }
      });
  }

  /**
   * Create a proper placeholder image for items missing screenshot_url
   * Returns a data URL with a 200x300 gray canvas image (matches typical photo dimensions)
   */
  private createPlaceholderImage(): string {
    // Fallback for server-side rendering or when document is not available
    if (!this.platform.browser()) {
      // Return a minimal valid PNG data URL (light gray 1x1 pixel - but larger than before)
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg==';
    }
    
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Light gray background
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add a subtle border
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Add loading indicator text
        ctx.fillStyle = '#9ca3af';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);
      }
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error creating placeholder image:', error);
      // Fallback SVG if canvas fails
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg==';
    }
  }

  getItems(): Observable<any[]> {
    const httpOptions: { headers?: Record<string, string> } = {};
    if (this.api_key()) {
      httpOptions.headers = { 'Authorization': this.api_key()! };
    }
    const url = `https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace()}/items?page_size=10000`;
    console.log('[SHOWCASE_WS_API] Fetching items from:', url, 'with auth:', !!httpOptions.headers);
    return this.http.get<any>(url, httpOptions).pipe(
      catchError((error) => {
        console.error('[SHOWCASE_WS_API] Error loading items:', error);
        return of([]);
      }),
      map((response: any) => {
        // Handle both flat array responses and nested responses
        console.log('[SHOWCASE_WS_API] Response type:', Array.isArray(response) ? 'array' : 'object', 'Keys:', Object.keys(response || {}).slice(0, 5));
        const items = Array.isArray(response) ? response : (response?.items || []);
        // If items have nested metadata, flatten them
        return items.map((item: any) => {
          if (item.metadata && !item.screenshot_url) {
            // Flatten metadata to top level
            console.log('[SHOWCASE_WS_API] Flattening nested metadata for item:', item.id);
            return { ...item.metadata, _id: item.id || item._id };
          }
          return item;
        });
      })
    );
  }

  async ngAfterViewInit() {
    if (this.platform.browser()) {
      await this.initialize(this.container.nativeElement);
    }
  }

  private async initialize(container: HTMLElement) {
    // Initialize Three.js renderer
    await this.rendererService.initialize(container, {
      photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
      photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT
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
      this.rendererService.disableAllDragging();
      
      // Switch the layout using PhotoDataRepository
      await this.photoRepository.setLayoutStrategy(tsneStrategy);
      
      // Ensure camera shows all content
      this.rendererService.resetCameraView(true);
      
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
      
      // Ensure camera shows all content
      this.rendererService.resetCameraView(true);
      
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
        svgRadius: this.svgCircleRadius
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
        const minX = Math.min(svgMinX, clusterMinX);
        const maxX = Math.max(svgMaxX, clusterMaxX);
        const minY = -this.svgCircleRadius;
        const maxY = this.svgCircleRadius;
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
        photoBuffer: 0   // Buffer between photos within groups
      });
      
      // Remove SVG background if switching from SVG layout
      this.rendererService.removeSvgBackground();
      this.rendererService.disableAllDragging();
      
      // Switch the layout using PhotoDataRepository
      await this.photoRepository.setLayoutStrategy(circlePackingStrategy);
      
      // Ensure camera shows all content
      this.rendererService.resetCameraView(true);
      
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
