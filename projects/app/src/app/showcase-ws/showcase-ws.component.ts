import { AfterViewInit, Component, computed, ElementRef, signal, ViewChild, inject, OnDestroy } from '@angular/core';
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
import { PhotoDataRepository } from './photo-data-repository';
import { PHOTO_CONSTANTS } from './photo-constants';
import { ANIMATION_CONSTANTS } from './animation-constants';

@Component({
  selector: 'app-showcase-ws',
  imports: [QrcodeComponent],
  templateUrl: './showcase-ws.component.html',
  styleUrl: './showcase-ws.component.less'
})
export class ShowcaseWsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
  private photoRepository: PhotoDataRepository;
  private destroy$ = new Subject<void>();
  loop = new Subject<any[]>();
  lastCreatedAt = '0';
  qrSmall = signal(false);
  workspace = signal('');
  api_key = signal('');
  admin_key = signal('');
  lang = signal('');
  currentLayout = signal<'grid' | 'tsne'>('grid');
  enableRandomShowcase = signal(false);
  loadedPhotoIds = new Set<string>();
  qrUrl = computed(() => 
    `https://mapfutur.es/${this.lang()}?workspace=${this.workspace()}&api_key=${this.api_key()}&ws=true`
  );

  constructor(
    private platform: PlatformService, 
    private http: HttpClient, 
    private el: ElementRef, 
    private activatedRoute: ActivatedRoute,
    private rendererService: ThreeRendererService,
    private photoDataRepository: PhotoDataRepository
  ) {
    this.photoRepository = photoDataRepository;
    timer(ANIMATION_CONSTANTS.QR_SHRINK_DELAY).subscribe(() => {
      this.qrSmall.set(true);
    });
    
    this.loop.pipe(
      distinctUntilChanged()
    ).subscribe(async (items) => {
      items = items.sort((item1, item2) => item1.created_at.localeCompare(item2.created_at));
      console.log(`GOT ${items.length} items`);
      
      // First pass: load existing photos immediately
      if (this.lastCreatedAt === '0' && items.length > 0) {
        console.log('Loading existing photos immediately...');
        this.qrSmall.set(true);
        
        // Process photos in parallel to avoid blocking
        const photoPromises = items.map(async (item) => {
          const id = item._id;
          const url = item.screenshot_url;
          const metadata: PhotoMetadata = {
            id,
            url,
            created_at: item.created_at,
            screenshot_url: url
          };
          
          try {
            await this.photoRepository.addPhoto(metadata, false); // Don't animate existing photos
            this.loadedPhotoIds.add(id);
          } catch (error) {
            console.error('Error loading photo immediately:', error);
          }
        });
        
        // Wait for all photos to load, but don't block the loop
        Promise.all(photoPromises).then(() => {
          console.log(`Loaded ${items.length} existing photos`);
        });
        
        // Set lastCreatedAt to the most recent item
        const latestItem = items[items.length - 1];
        this.lastCreatedAt = latestItem.created_at;
      } else {
        // Second pass onwards: animate only new photos
        const newItems = items.filter(item => {
          const created_at = item.created_at;
          return created_at && created_at > this.lastCreatedAt;
        });
        
        if (newItems.length > 0) {
          console.log(`Processing ${newItems.length} new photos`);
          
          // Process new photos one by one with delays to avoid blocking
          newItems.forEach((item, index) => {
            setTimeout(async () => {
              const id = item._id;
              const url = item.screenshot_url;
              const metadata: PhotoMetadata = {
                id,
                url,
                created_at: item.created_at,
                screenshot_url: url
              };
              
              try {
                await this.photoRepository.addPhoto(metadata, true); // Animate new photos
                this.loadedPhotoIds.add(id);
                this.lastCreatedAt = item.created_at;
              } catch (error) {
                console.error('Error animating photo:', error);
              }
            }, index * ANIMATION_CONSTANTS.NEW_PHOTO_STAGGER_DELAY);
          });
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
  }

  /**
   * Toggle the random showcase behavior
   */
  toggleRandomShowcase() {
    this.enableRandomShowcase.set(!this.enableRandomShowcase());
    this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase());
    console.log('Random showcase:', this.enableRandomShowcase() ? 'enabled' : 'disabled');
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

    // Create initial layout strategy
    const gridStrategy = new GridLayoutStrategy({
      photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
      photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
      spacingX: PHOTO_CONSTANTS.SPACING_X,
      spacingY: PHOTO_CONSTANTS.SPACING_Y,
      useRandomPositioning: true
    });

    // Initialize PhotoDataRepository
    await this.photoRepository.initialize(
      gridStrategy, 
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
        console.log('Photo added to repository:', photoData.id);
      });

    this.photoRepository.photoRemoved$
      .pipe(takeUntil(this.destroy$))
      .subscribe((photoId) => {
        console.log('Photo removed from repository:', photoId);
      });

    this.photoRepository.layoutChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Layout changed in repository');
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
    if (!this.workspace()) {
      console.error('Workspace not set');
      return;
    }

    try {
      console.log('Switching to TSNE layout for workspace:', this.workspace());
      
      // Create TSNE layout strategy with same dimensions as grid layout
      const tsneStrategy = new TsneLayoutStrategy(this.workspace(), undefined, {
        photoWidth: PHOTO_CONSTANTS.PHOTO_WIDTH,
        photoHeight: PHOTO_CONSTANTS.PHOTO_HEIGHT,
        spacingX: PHOTO_CONSTANTS.SPACING_X,
        spacingY: PHOTO_CONSTANTS.SPACING_Y
      });
      
      // Initialize the strategy
      await tsneStrategy.initialize();
      
      // Switch the layout using PhotoDataRepository
      await this.photoRepository.setLayoutStrategy(tsneStrategy);
      
      this.currentLayout.set('tsne');
      console.log('Successfully switched to TSNE layout');
      
    } catch (error) {
      console.error('Error switching to TSNE layout:', error);
    }
  }

  /**
   * Switch back to grid layout
   */
  public async switchToGridLayout() {
    try {
      console.log('Switching to Grid layout');
      
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
      
      // Switch the layout using PhotoDataRepository
      await this.photoRepository.setLayoutStrategy(gridStrategy);
      
      this.currentLayout.set('grid');
      console.log('Successfully switched to Grid layout');
      
    } catch (error) {
      console.error('Error switching to Grid layout:', error);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
