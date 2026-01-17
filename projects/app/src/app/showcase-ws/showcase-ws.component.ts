import { AfterViewInit, Component, computed, ElementRef, signal, ViewChild, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { catchError, distinctUntilChanged, filter, forkJoin, from, interval, Observable, of, Subject, timer, takeUntil } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QrcodeComponent } from "./qrcode/qrcode.component";
import { SettingsPanelComponent, FisheyeSettings } from './settings-panel.component';
import { PhotoData, PhotoAnimationState, PhotoMetadata } from './photo-data';
import { ThreeRendererService } from './three-renderer.service';
import { LayoutStrategy } from './layout-strategy.interface';
import { GridLayoutStrategy } from './grid-layout-strategy';
import { TsneLayoutStrategy } from './tsne-layout-strategy';
import { SvgBackgroundLayoutStrategy } from './svg-background-layout-strategy';
import { CirclePackingLayoutStrategy } from './circle-packing-layout-strategy';
import { PhotoDataRepository } from './photo-data-repository';
import { PHOTO_CONSTANTS } from './photo-constants';
import { ANIMATION_CONSTANTS } from './animation-constants';
import { ApiService } from '../../api.service';
import e from 'express';

@Component({
  selector: 'app-showcase-ws',
  imports: [QrcodeComponent, SettingsPanelComponent],
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
  api_key = signal('');
  admin_key = signal('');
  lang = signal('');
  currentLayout = signal<'grid' | 'tsne' | 'svg' | 'circle-packing'>('circle-packing');
  enableRandomShowcase = signal(false);
  enableSvgAutoPositioning = signal(false);
  fisheyeEnabled = signal(false);
  fisheyeSettings = signal<FisheyeSettings>({
    fov: 75,
    fisheye: 0,
    zoom: 1,
    rotationSpeed: 1,
    panSensitivity: 1,
    depthOfField: 0,
    maxMagnification: 2,
    radius: 800,
    zoomRelative: 0.5
  });

  // Track if fisheye is currently enabled
  // No longer needed: private currentFisheyeValue = 0;
  loadedPhotoIds = new Set<string>();
  private layoutChangeInProgress = false;
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
      items = items.sort((item1, item2) => item1.created_at.localeCompare(item2.created_at));
      
      // First pass: load existing photos immediately
      if (this.lastCreatedAt === '0' && items.length > 0) {

        // Process photos sequentially and then refresh layout
        const photoPromises = items.map(async (item) => {
          const id = item._id;
          const url = item.screenshot_url;
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
            const url = item.screenshot_url;
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
    this.fisheyeEnabled.set(willBeEnabled);
    this.rendererService.enableFisheyeEffect(willBeEnabled);
  }

  /**
   * Toggle SVG auto-positioning based on metadata
   */
  toggleSvgAutoPositioning() {
    const wasEnabled = this.enableSvgAutoPositioning();
    const willBeEnabled = !wasEnabled;
    
    console.log('[TOGGLE] SVG Auto-Positioning button clicked');
    console.log('[TOGGLE] Current state:', { wasEnabled, willBeEnabled, currentLayout: this.currentLayout() });
    
    this.enableSvgAutoPositioning.set(willBeEnabled);
    this.photoRepository.setSvgAutoPositioningEnabled(willBeEnabled);
    
    // Show/hide debug visualization immediately (before layout refresh)
    if (willBeEnabled) {
      console.log('[TOGGLE] Auto-positioning enabled, showing debug visualization NOW');
      this.showSvgHotspotDebugVisualization();
    } else {
      console.log('[TOGGLE] Auto-positioning disabled, hiding debug visualization');
      // Hide the debug overlay
      const strategy = this.photoRepository.getLayoutStrategy();
      if (strategy && (strategy as any).removeDebugOverlay) {
        (strategy as any).removeDebugOverlay();
      }
    }
    
    if (this.currentLayout() === 'svg') {
      console.log('[TOGGLE] On SVG layout, refreshing layout...');
      this.photoRepository.refreshLayout();
      
      // Show visualization again after layout refresh
      setTimeout(() => {
        if (willBeEnabled) {
          console.log('[TOGGLE] Refreshing debug visualization after layout');
          this.showSvgHotspotDebugVisualization();
        }
      }, 500);
    } else {
      console.log('[TOGGLE] Not on SVG layout, skipping visualization');
    }
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
        console.log('[HOTSPOT-VIZ] Calling showAllHotspotsDebug()...');
        showDebugMethod.call(strategy);
        console.log('[HOTSPOT-VIZ] Successfully called showAllHotspotsDebug()');
      } else {
        console.warn('[HOTSPOT-VIZ] showAllHotspotsDebug is not a function:', typeof showDebugMethod);
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

  getItems(): Observable<any[]> {
    const httpOptions: { headers?: Record<string, string> } = {};
    if (this.api_key()) {
      httpOptions.headers = { 'Authorization': this.api_key()! };
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
      await this.initialize(this.container.nativeElement);
    }
  }

  private async initialize(container: HTMLElement) {
    // Initialize Three.js renderer
    await this.rendererService.initialize(container, {
      photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
      photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT
    });

    // Apply fisheye settings from query parameters
    const qp = this.activatedRoute.snapshot.queryParams;
    if (this.fisheyeEnabled()) {
      this.rendererService.enableFisheyeEffect(true);
      
      // Fisheye settings are already initialized in fisheyeSettings signal
      // No additional updates needed here
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
      // Update UI immediately for responsive feedback
      this.currentLayout.set('svg');
      
      // Read optional `svg` query param to override background path
      const svgParam = this.activatedRoute.snapshot.queryParams['svg'];
      const svgPath = svgParam || '/showcase-bg.svg';

      // Create SVG background layout strategy (without callback since three-renderer handles it)
      const svgStrategy = new SvgBackgroundLayoutStrategy({
        svgPath,
        centerX: 0,
        centerY: 0,
        circleRadius: 20000,
        radiusVariation: 2000
      });
      
      // Set up hotspot drop callback on three-renderer service with access to circleRadius
      const circleRadius = 20000; // Use same value as SVG strategy
      this.rendererService.setHotspotDropCallback(async (photoId: string, hotspotData: { [key: string]: string | number }, position: { x: number, y: number, z: number }) => {
        return new Promise<void>((resolve, reject) => {
          try {
            const photo = this.photoRepository.getPhoto(photoId);
            
            if (photo) {              
              // Calculate normalized coordinates [-1, 1] based on circleRadius
              const layout_x = Math.max(-1, Math.min(1, position.x / circleRadius));
              const layout_y = Math.max(-1, Math.min(1, position.y / circleRadius));
              
              // Add normalized coordinates to hotspot data
              const dataWithCoords = {
                ...hotspotData,
                layout_x,
                layout_y
              };
              
              console.log('🚀 SHOWCASE: Calling updateItem API', {
                hotspotData: dataWithCoords,
                photoId,
                normalizedPosition: { layout_x, layout_y },
                originalPosition: position
              });
              
              this.apiService.updateProperties(dataWithCoords, photoId).subscribe({
                next: (result) => {
                  console.log('Successfully updated item with hotspot data:', result);
                  resolve();
                },
                error: (error) => {
                  console.error('Failed to update item with hotspot data:', error);
                  reject(error);
                }
              });
            } else {
              console.warn('Photo not found for hotspot drop:', photoId);
              resolve();
            }
          } catch (error) {
            console.error('Error processing hotspot drop:', error);
            reject(error);
          }
        });
      });
      
      // Switch the layout using PhotoDataRepository (this will initialize the strategy)
      await this.photoRepository.setLayoutStrategy(svgStrategy);
      
      // Pass layout strategy reference to renderer for debug visualization
      this.rendererService.setLayoutStrategyReference(svgStrategy);
      
      // Set up SVG background in Three.js renderer
      const svgElement = svgStrategy.getSvgElement();

      if (svgElement) {

        this.rendererService.setSvgBackground(svgElement, {
          scale: 1,
          offsetX: 0,
          offsetY: 0,
          radius: 20000 // Use the same radius as the layout strategy
        });
      } else {
        console.warn('❌ SVG element is null, cannot set background');
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
    const layoutIndex = this.currentLayout() === 'grid' ? 0 : 
                       this.currentLayout() === 'tsne' ? 1 :
                       this.currentLayout() === 'svg' ? 2 : 3;
    const translateX = layoutIndex * 48; // 44px width + 4px gap
    return `translateX(${translateX}px)`;
  }

  /**
   * Reset camera view to fit all content
   */
  resetView(): void {
    this.rendererService.resetCameraView(true);
  }

  /**
   * Zoom in at the cursor position (or center if unavailable)
   */
  zoomIn(): void {
    this.rendererService.zoomAtCursor(0.65);
  }

  /**
   * Zoom out at the cursor position (or center if unavailable)
   */
  zoomOut(): void {
    this.rendererService.zoomAtCursor(1.5);
  }

  /**
   * Handle camera settings changes from the settings panel
   * Applies all slider adjustments to the renderer
   */
  onSettingsChange(settings: FisheyeSettings): void {
    this.fisheyeSettings.set(settings);
    console.log('[SHOWCASE_WS] onFisheyeSettingsChange', { ...settings });
    
    // Apply fisheye configuration (magnification, radius, distortion)
    this.rendererService.setFisheyeConfig({
      magnification: settings.maxMagnification,
      radius: settings.radius,
      distortion: settings.fisheye * 0.5, // Map 0-2 to 0-1 distortion range
      zoomRelative: settings.zoomRelative
    });
    
    // Apply camera settings
    this.rendererService.updateCameraFov(settings.fov);
    this.rendererService.updateCameraZoom(settings.zoom);
    
    // Apply control sensitivity settings
    this.rendererService.setRotationSpeed(settings.rotationSpeed);
    this.rendererService.setPanSensitivity(settings.panSensitivity);
    
    // Apply depth of field effect
    this.rendererService.setDepthOfField(settings.depthOfField * 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
