import { AfterViewInit, Component, computed, ElementRef, signal, ViewChild, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { catchError, distinctUntilChanged, filter, forkJoin, from, interval, Observable, of, Subject, timer, takeUntil } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QrcodeComponent } from "./qrcode/qrcode.component";
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
import { ShowcaseFiltersComponent, LayoutType } from './showcase-filters/showcase-filters.component';
import { ShowcaseLightboxComponent } from './showcase-lightbox/showcase-lightbox.component';
import e from 'express';

@Component({
  selector: 'app-showcase-ws',
  imports: [QrcodeComponent, ShowcaseFiltersComponent, ShowcaseLightboxComponent],
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
  currentLayout = signal<LayoutType>('circle-packing');
  enableRandomShowcase = signal(false);
  resetLayoutOnFilter = signal(false);
  loadedPhotoIds = new Set<string>();
  private layoutChangeInProgress = false;
  
  // Lightbox state
  lightboxOpen = signal(false);
  lightboxPhotoId = signal<string | null>(null);
  allPhotos = signal<PhotoMetadata[]>([]);
  
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
          const metadata: PhotoMetadata = {
            id,
            url,
            created_at: item.created_at,
            screenshot_url: url,
            author_id: item.author_id,
            layout_x: item.layout_x,
            layout_y: item.layout_y
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
            const metadata: PhotoMetadata = {
              id,
              url,
              created_at: item.created_at,
              screenshot_url: url,
              author_id: item.author_id,
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

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace()}/items?page_size=10000`).pipe(
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

    // Set up photo click callback for lightbox
    this.rendererService.setPhotoClickCallback((photoId: string) => {
      this.openLightbox(photoId);
    });

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
        this.updateAllPhotos();
      });

    this.photoRepository.photoRemoved$
      .pipe(takeUntil(this.destroy$))
      .subscribe((photoId) => {
        this.updateAllPhotos();
      });

    this.photoRepository.layoutChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateAllPhotos();
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
      
      // Create SVG background layout strategy (without callback since three-renderer handles it)
      const svgStrategy = new SvgBackgroundLayoutStrategy({
        svgPath: '/showcase-bg.svg',
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
   * Handle layout change from filters component
   */
  onLayoutChange(layout: LayoutType): void {
    // Note: resetLayoutOnFilter feature is for future enhancement
    // Currently, we just switch layouts without clearing photos
    
    switch (layout) {
      case 'grid':
        this.switchToGridLayout();
        break;
      case 'tsne':
        this.switchToTsneLayout();
        break;
      case 'svg':
        this.switchToSvgLayout();
        break;
      case 'circle-packing':
        this.switchToCirclePackingLayout();
        break;
    }
  }

  /**
   * Handle random showcase toggle from filters component
   */
  onRandomShowcaseToggle(): void {
    this.toggleRandomShowcase();
  }

  /**
   * Handle reset layout toggle from filters component
   */
  onResetLayoutToggle(): void {
    this.resetLayoutOnFilter.set(!this.resetLayoutOnFilter());
  }

  /**
   * Open lightbox with specific photo
   */
  openLightbox(photoId: string): void {
    this.lightboxPhotoId.set(photoId);
    this.lightboxOpen.set(true);
  }

  /**
   * Close lightbox
   */
  closeLightbox(): void {
    this.lightboxOpen.set(false);
    this.lightboxPhotoId.set(null);
  }

  /**
   * Navigate to previous or next photo in lightbox
   */
  navigateLightbox(direction: 'prev' | 'next'): void {
    const photos = this.allPhotos();
    const currentId = this.lightboxPhotoId();
    
    if (!currentId || photos.length === 0) {
      return;
    }
    
    const currentIndex = photos.findIndex(p => p.id === currentId);
    if (currentIndex === -1) {
      return;
    }
    
    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : currentIndex;
    }
    
    if (newIndex !== currentIndex) {
      this.lightboxPhotoId.set(photos[newIndex].id);
    }
  }

  /**
   * Update all photos list whenever photos are added
   */
  private updateAllPhotos(): void {
    const photos = this.photoRepository.getAllPhotos();
    this.allPhotos.set(photos.map(p => p.metadata));
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
