import { AfterViewInit, Component, DestroyRef, ElementRef, signal, ViewChild, computed, afterNextRender, Injector, inject, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { PlatformService } from '../../platform.service';
import { StateService } from '../../state.service';
import * as fabric from 'fabric';
import { getStroke } from 'perfect-freehand';

interface Template {
  id: string;
  name: string;
  url: string;
  preview: string;
}

@Component({
  selector: 'app-canvas-creator',
  imports: [RouterLink],
  templateUrl: './canvas-creator.component.html',
  styleUrl: './canvas-creator.component.less'
})
export class CanvasCreatorComponent implements AfterViewInit {
  @ViewChild('canvasEl', { static: false}) canvasEl!: ElementRef<HTMLCanvasElement>;
  
  // Color palette: vibrant markers with WCAG AA contrast (4.5:1) from white paper
  private readonly colorPalette = [
    '#FF0000', // Red
    '#0066FF', // Blue
    '#00BB00', // Green
    '#FF6600', // Orange
    '#BB00FF', // Purple
    '#FF0099', // Hot Pink
    '#00CCFF', // Cyan
    '#FFAA00', // Amber
  ];
  
  canvas = signal<any | null>(null);
  selectedTemplate = signal<Template | null>(null);
  isTemplateExpanding = signal(false);
  isTransitioning = signal(false);
  isEditorShowing = signal(false);
  currentMode = signal<'draw' | 'type'>('draw'); // Default to draw mode
  currentColor = signal<string>(this.colorPalette[0]); // Start with red
  currentColorIndex = signal(0);
  hasContent = signal(false);
  showTemplateGallery = signal(true);
  showModeSelection = signal(false);
  transitionChoice = signal<'before' | 'during' | 'after' | null>(null);
  currentTemplateIndex = signal(0); // For carousel navigation
  isCarouselAnimating = signal(false);
  carouselDragOffset = signal<number>(0);
  carouselDragging = signal<boolean>(false);
  carouselTransform = computed(() => {
    const index = this.currentTemplateIndex();
    const dragOffset = this.carouselDragOffset();
    // Center item: viewport is 100vw, item is 75vw, so center offset is 12.5vw
    // Item n is at position n*75vw, so translate to 12.5vw: translateX(12.5vw - n*75vw)
    const baseOffset = 12.5 - (index * 75);
    const dragOffsetVw = (dragOffset / window.innerWidth) * 100;
    return `translateX(calc(${baseOffset}vw + ${dragOffsetVw}vw))`;
  });
  carouselTransition = computed(() => {
    return this.carouselDragging() ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  });
  drawerState = signal<'minimal' | 'default' | 'full'>('default');
  selectedFont = signal<string>('Caveat, cursive');
  selectedLineHeight = signal<number>(1.16);
  selectedHeight = signal<number>(40);
  activeTextboxAlignment = signal<'left' | 'center' | 'right'>('left');
  showAlignmentToggle = signal(false);
  drawerDragOffset = signal<number>(0);
  drawerDragging = signal<boolean>(false);
  private touchStartX: number | null = null;
  private touchDeltaX = 0;
  private isSwiping = false;
  private drawerTouchStartY: number | null = null;
  private drawerTouchDeltaY = 0;
  private placeholderTexts: any[] = [];
  private templateBaseWidth = 1060;
  private templateBaseHeight = 2000;
  private templateScaleX = 1;
  private templateScaleY = 1;
  
  // Font scale factors to match x-height across languages
  private readonly FONT_SCALE_HEBREW = 0.65; // 30% reduction for Gadi Almog
  private readonly FONT_SCALE_ARABIC = 0.65; // 30% reduction for Mikhak
  private readonly FONT_SCALE_ENGLISH = 1.0;  // No scaling for Caveat
  
  // Line-height scale factors for Hebrew and Arabic (140% of standard)
  private readonly LINE_HEIGHT_SCALE_HEBREW = 1.38;
  private readonly LINE_HEIGHT_SCALE_ARABIC = 1.38;
  private readonly LINE_HEIGHT_SCALE_ENGLISH = 1.0;
  
  private injector = inject(Injector);
  
  // Template gallery with new order
  templates: Template[] = [
    { id: 'post', name: 'Post', url: '/templates/FS_template_post.png', preview: '/templates/FS_template_post.png' },
    { id: 'chat', name: 'Chat', url: '/templates/FS_template_chat.png', preview: '/templates/FS_template_chat.png' },
    { id: 'notification', name: 'Notification', url: '/templates/FS_template_notification.png', preview: '/templates/FS_template_notification.png' },
    { id: 'review', name: 'Review', url: '/templates/FS_template_review.png', preview: '/templates/FS_template_review.png' },
    { id: 'prompt', name: 'Prompt', url: '/templates/FS_template_prompt.png', preview: '/templates/FS_template_prompt.png' },
    { id: 'photo', name: 'Photo', url: '/templates/FS_template_photo.png', preview: '/templates/FS_template_photo.png' },
    { id: 'sign', name: 'Sign', url: '/templates/FS_template_sign.png', preview: '/templates/FS_template_sign.png' },
    { id: 'holyland', name: 'Holy Land', url: '/templates/FS_template_holyland.png', preview: '/templates/FS_template_holyland.png' },
    { id: 'world', name: 'World', url: '/templates/FS_template_world.png', preview: '/templates/FS_template_world.png' },
    { id: 'jerusalem', name: 'Jerusalem', url: '/templates/FS_template_jerusalem.png', preview: '/templates/FS_template_jerusalem.png' },
    { id: 'europe', name: 'Europe', url: '/templates/FS_template_europe.png', preview: '/templates/FS_template_europe.png' },
    { id: 'us', name: 'United States', url: '/templates/FS_template_US.png', preview: '/templates/FS_template_US.png' },
  ];

  // Template presets: GeoJSON with textbox positions and properties
  templatePresets: { [key: string]: any } = {
    post: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [80, 604] },
          properties: {
            id: 'textbox-0',
            placeholder: 'transition',
            'line-height': 0.75,
            width: 175,
            height: 32,
            textAlign: 'center',
            originY: 'bottom',
          },
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [80, 55] },
          properties: {
            id: 'textbox-1',
            placeholder: 'Name',
            'line-height': 1,
              width: 202,
              height: 32,
          },
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [46, 114] },
          properties: {
            id: 'textbox-2',
            placeholder: 'Type here...',
            'line-height': 1,
            width: 243,
            height: 32,
          },
        },
      ],
    },
    chat: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              geometry: { type: 'Point', coordinates: [80, 610] },
              "properties": {
                "id": "textbox-0",
                "placeholder": "transition",
                "line-height": 1,
                "width": 156,
                "height": 32,
                "textAlign": "center",
                "originY": "bottom"
              }
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  72,
                  79
                ]
              },
              "properties": {
                "id": "textbox-1",
                "placeholder": "Type here...",
                "line-height": 1,
                "width": 225,
                "height": 32
              }
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  42,
                  300
                ]
              },
              "properties": {
                "id": "textbox-2",
                "placeholder": "and here...",
                "line-height": 1,
                "width": 222,
                "height": 32
              }
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  69,
                  494
                ]
              },
              "properties": {
                "id": "textbox-3",
                "placeholder": "maybe here",
                "line-height": 1,
                "width": 220,
                "height": 32
              }
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  73,
                  46
                ]
              },
              "properties": {
                "id": "textbox-4",
                "placeholder": "Name-1",
                "line-height": 1,
                "width": 219,
                "height": 32
              }
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  43,
                  268
                ]
              },
              "properties": {
                "id": "textbox-5",
                "placeholder": "Name-2",
                "line-height": 1,
                "width": 217,
                "height": 32
              }
            }
          ]
        },
    notification: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          geometry: { type: 'Point', coordinates: [80, 604] },
          "properties": {
            "id": "textbox-0",
            "placeholder": "transition",
            "line-height": 1,
            "width": 175,
            "height": 32,
            "textAlign": "center",
            "originY": "bottom"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              81,
              203
            ]
          },
          "properties": {
            "id": "textbox-1",
            "placeholder": "App name",
            "line-height": 1,
            "width": 202,
            "height": 32
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              44,
              251
            ]
          },
          "properties": {
            "id": "textbox-2",
            "placeholder": "Type here...",
            "line-height": 1,
            "width": 247,
            "height": 32
          }
        }
      ]
    },
    world: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [80, 604] },
          properties: {
            id: 'textbox-0',
            placeholder: 'transition',
            'line-height': 0.75,
            width: 175,
            height: 59,
            textAlign: 'center',
            originY: 'bottom',
          },
        },
      ],
    },
    photo: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [80, 604] },
          properties: {
            id: 'textbox-0',
            placeholder: 'transition',
            'line-height': 0.75,
            width: 175,
            height: 59,
            textAlign: 'center',
            originY: 'bottom',
          },
        },
      ],
    },
    review: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              71,
              600
            ]
          },
          "properties": {
            "id": "textbox-0",
            "placeholder": "transition",
            "line-height": 1,
            "width": 175,
            "height": 32,
            "textAlign": "center",
            "originY": "bottom"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              118,
              62
            ]
          },
          "properties": {
            "id": "textbox-1",
            "placeholder": "Title",
            "line-height": 1,
            "width": 160,
            "height": 32
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              43,
              205
            ]
          },
          "properties": {
            "id": "textbox-2",
            "placeholder": "factor a",
            "line-height": 1,
            "width": 132,
            "height": 32
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              42,
              232
            ]
          },
          "properties": {
            "id": "textbox-3",
            "placeholder": "factor b",
            "line-height": 1,
            "width": 126,
            "height": 32
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              42,
              260
            ]
          },
          "properties": {
            "id": "textbox-4",
            "placeholder": "factor c",
            "line-height": 1,
            "width": 123,
            "height": 32
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              42,
              306
            ]
          },
          "properties": {
            "id": "textbox-5",
            "placeholder": "Review here...",
            "line-height": 1.1,
            "width": 247,
            "height": 32
          }
        }
      ]
    },
    prompt: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              71,
              600
            ]
          },
          "properties": {
            "id": "textbox-0",
            "placeholder": "transition",
            "line-height": 1,
            "width": 175,
            "height": 32,
            "textAlign": "center",
            "originY": "bottom"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              41,
              157
            ]
          },
          "properties": {
            "id": "textbox-1",
            "placeholder": "Type here...",
            "line-height": 1,
            "width": 253,
            "height": 32
          }
        }
      ]
    },
    sign: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [71, 600] },
          properties: {
            id: 'textbox-0',
            placeholder: 'transition',
            'line-height': 0.75,
            width: 175,
            height: 59,
            textAlign: 'center',
            originY: 'bottom',
          },
        },
      ],
    },
    holyland: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [71, 600] },
          properties: {
            id: 'textbox-0',
            placeholder: 'transition',
            'line-height': 0.75,
            width: 175,
            height: 59,
            textAlign: 'center',
            originY: 'bottom',
          },
        },
      ],
    },
    jerusalem: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [71, 600] },
          properties: {
            id: 'textbox-0',
            placeholder: 'transition',
            'line-height': 0.75,
            width: 175,
            height: 59,
            textAlign: 'center',
            originY: 'bottom',
          },
        },
      ],
    },
    europe: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [71, 600] },
          properties: {
            id: 'textbox-0',
            placeholder: 'transition',
            'line-height': 0.75,
            width: 175,
            height: 59,
            textAlign: 'center',
            originY: 'bottom',
          },
        },
      ],
    },
    us: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [71, 600] },
          properties: {
            id: 'textbox-0',
            placeholder: 'transition',
            'line-height': 0.75,
            width: 175,
            height: 59,
            textAlign: 'center',
            originY: 'bottom',
          },
        },
      ],
    },
  };
  
  currentTemplate = computed(() => this.templates[this.currentTemplateIndex()]);
  
  // Marker colors (random selection)
  markerColors = ['#4E02B2', '#B969FF', '#698CFF', '#F73C3C', '#FF6B35', '#2A9D8F'];
  
  // Handwriting fonts (with multi-script support)
  handwritingFonts = [
    'Caveat, cursive',
    'Permanent Marker, cursive',
    'Shadows Into Light, cursive', 
    'Indie Flower, cursive',
    'Gadi Almog, Miriam Libre, serif', // Hebrew support
    'Mikhak, Readex Pro, sans-serif', // Arabic support
  ];
  
  constructor(
    private el: ElementRef,
    private platform: PlatformService,
    private destroyRef: DestroyRef,
    private state: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    this.api.updateFromRoute(this.route.snapshot);
    // Select random color on init
    this.currentColor.set(this.markerColors[Math.floor(Math.random() * this.markerColors.length)]);
    
    // Set default font based on user's language
    const userLocale = this.api.locale;
    if (userLocale === 'he') {
      // Hebrew - use Gadi Almog font
      this.selectedFont.set('Gadi Almog, Miriam Libre, serif');
    } else if (userLocale === 'ar') {
      // Arabic - use Mikhak font
      this.selectedFont.set('Mikhak, Readex Pro, sans-serif');
    }
    // Otherwise keep default (Caveat)
    
    this.preloadFonts();
    
    // Clear resize timeout on component destroy to prevent memory leaks
    this.destroyRef.onDestroy(() => {
      if (this.resizeTimeout !== null) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;
      }
    });
  }
  
  ngAfterViewInit(): void {
    if (!this.platform.browser()) {
      return;
    }
    // If a specific template was requested (re-edit flow), open it
    const requestedId = this.route.snapshot.queryParamMap.get('template_id');
    if (requestedId) {
      const idx = this.templates.findIndex(t => t.id === requestedId);
      if (idx >= 0) {
        this.currentTemplateIndex.set(idx);
        // Open editor directly with the requested template
        this.useCurrentTemplate();
        // After canvas initializes, restore state if available
        setTimeout(() => {
          this.restoreCanvasState();
        }, 500);
        return;
      }
    }
    // Otherwise start carousel spin animation
    this.spinCarouselToRandomTemplate();
  }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.key === 'E') {
      event.preventDefault();
      this.exportTextboxesAsGeoJSON();
    }
    
    // Escape key: exit draw mode and return to type mode
    if (event.key === 'Escape' && this.currentMode() === 'draw') {
      event.preventDefault();
      const fabricCanvas = this.canvas();
      if (fabricCanvas) {
        fabricCanvas.discardActiveObject();
        fabricCanvas.isDrawingMode = false;
      }
      this.setMode('type');
    }
  }

  private resizeTimeout: number | null = null;
  
  @HostListener('window:resize')
  handleResize() {
    // Debounce resize events for better performance
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = window.setTimeout(() => {
      this.resizeCanvas();
    }, 250);
  }

  private resizeCanvas() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas || !this.canvasEl?.nativeElement) {
      return;
    }

    const canvasElement = this.canvasEl.nativeElement;
    const container = canvasElement.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Account for container padding (8px on each side = 16px total per dimension)
    const containerPadding = 16;
    const availableWidth = Math.max(100, containerWidth - containerPadding);
    const availableHeight = Math.max(100, containerHeight - containerPadding);

    // Fixed dimensions: 1060x2000px
    const targetWidth = 1060;
    const targetHeight = 2000;
    const aspectRatio = targetWidth / targetHeight;

    const oldWidth = fabricCanvas.getWidth();
    const oldHeight = fabricCanvas.getHeight();

    // Guard against zero dimensions
    if (!oldWidth || !oldHeight || oldWidth === 0 || oldHeight === 0) {
      return;
    }

    let displayWidth = availableWidth;
    let displayHeight = displayWidth / aspectRatio;

    if (displayHeight > availableHeight) {
      displayHeight = availableHeight;
      displayWidth = displayHeight * aspectRatio;
    }

    // Only resize if dimensions have actually changed
    if (Math.abs(displayWidth - oldWidth) < 1 && Math.abs(displayHeight - oldHeight) < 1) {
      return;
    }

    // Calculate scale factors based on old dimensions
    const scaleX = displayWidth / oldWidth;
    const scaleY = displayHeight / oldHeight;

    // Resize canvas
    fabricCanvas.setDimensions({
      width: displayWidth,
      height: displayHeight
    });

    // Scale all objects based on the dimension change
    fabricCanvas.getObjects().forEach((obj: any) => {
      if (obj.scaleX && obj.scaleY && obj.left !== undefined && obj.top !== undefined) {
        obj.scaleX = obj.scaleX * scaleX;
        obj.scaleY = obj.scaleY * scaleY;
        obj.left = obj.left * scaleX;
        obj.top = obj.top * scaleY;
        obj.setCoords();
      }
    });

    // Update template scale factors
    this.templateScaleX = displayWidth / this.templateBaseWidth;
    this.templateScaleY = displayHeight / this.templateBaseHeight;

    // Update background image scale
    const bgImage = fabricCanvas.backgroundImage;
    if (bgImage && typeof bgImage !== 'string' && 'scaleX' in bgImage && 'scaleY' in bgImage) {
      bgImage.scaleX = this.templateScaleX;
      bgImage.scaleY = this.templateScaleY;
    }

    fabricCanvas.renderAll();
  }
  
  selectTemplate(template: Template) {
    this.selectedTemplate.set(template);
    this.showTemplateGallery.set(false);
    this.showModeSelection.set(false);
    // Wait for view to update before initializing canvas
    afterNextRender(() => {
      this.initCanvas();
    }, { injector: this.injector });
  }
  
  previousTemplate() {
    if (this.isCarouselAnimating() || this.carouselDragging()) return;
    const index = this.currentTemplateIndex();
    this.currentTemplateIndex.set(index > 0 ? index - 1 : this.templates.length - 1);
  }

  nextTemplate() {
    if (this.isCarouselAnimating() || this.carouselDragging()) return;
    const index = this.currentTemplateIndex();
    this.currentTemplateIndex.set((index + 1) % this.templates.length);
  }
  
  backToGallery() {
    this.showTemplateGallery.set(true);
    this.isEditorShowing.set(false);
  }

  cycleColor() {
    const nextIndex = (this.currentColorIndex() + 1) % this.colorPalette.length;
    this.currentColorIndex.set(nextIndex);
    this.currentColor.set(this.colorPalette[nextIndex]);
    
    // If in draw mode, re-setup the brush with the new color
    if (this.currentMode() === 'draw') {
      const fabricCanvas = this.canvas();
      if (fabricCanvas) {
        this.setupRoughBrush(fabricCanvas);
      }
    }
  }

  useCurrentTemplate() {
    const template = this.currentTemplate();
    this.selectTemplate(template);
    this.isTemplateExpanding.set(true);
    this.isTransitioning.set(true);
    
    // Show editor while image is zooming, and fade out gallery
    setTimeout(() => {
      this.isEditorShowing.set(true);
    }, 50);
    
    // Hide gallery after it fades out (0.3s delay + 0.5s fade)
    setTimeout(() => {
      this.showTemplateGallery.set(false);
      this.isTemplateExpanding.set(false);
      this.isTransitioning.set(false);
    }, 800);
  }

  private spinCarouselToRandomTemplate() {
    if (!this.platform.browser()) return;
    
    const randomIndex = Math.floor(Math.random() * this.templates.length);
    // Make animation slower, softer, and shorter - only go through templates once plus landing
    const totalSpins = randomIndex + Math.floor(Math.random() * 1 + 1) * this.templates.length;
    const animationDuration = 2500; // 2.5 seconds (slower)
    
    this.isCarouselAnimating.set(true);
    let currentSpin = 0;
    const startTime = Date.now();
    
    const spin = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Ease-out quartic for softer deceleration: 1 - (1-t)^4
      const easeOutProgress = 1 - Math.pow(1 - progress, 4);
      const targetSpin = Math.round(totalSpins * easeOutProgress);
      
      this.currentTemplateIndex.set(targetSpin % this.templates.length);
      
      if (progress < 1) {
        requestAnimationFrame(spin);
      } else {
        // Final settle on random index
        this.currentTemplateIndex.set(randomIndex);
        this.isCarouselAnimating.set(false);
      }
    };
    
    requestAnimationFrame(spin);
  }
  
  setMode(mode: 'draw' | 'type') {
    this.currentMode.set(mode);
    const fabricCanvas = this.canvas();
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = (mode === 'draw');
      if (mode === 'draw') {
        this.setupRoughBrush(fabricCanvas);
      }
      this.updatePlaceholderVisibility(mode === 'type');
    }
  }
  
  selectMode(mode: 'draw' | 'type') {
    this.currentMode.set(mode);
    this.showModeSelection.set(false);
    this.initCanvas();
  }
  
  async initCanvas() {
    if (!this.canvasEl || !this.canvasEl.nativeElement) {
      console.error('Canvas element not available');
      return;
    }
    
    const canvasElement = this.canvasEl.nativeElement;
    const container = canvasElement.parentElement;
    
    // Wait for layout to settle before reading dimensions
    await new Promise(resolve => setTimeout(resolve, 0));
    
    let containerWidth = container?.clientWidth || 0;
    let containerHeight = container?.clientHeight || 0;
    
    // If container dimensions are not available, wait and try again
    if (containerWidth === 0 || containerHeight === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      containerWidth = container?.clientWidth || window.innerWidth;
      containerHeight = container?.clientHeight || window.innerHeight;
    }
    
    // Account for container padding (8px on each side = 16px total per dimension)
    const containerPadding = 16;
    const availableWidth = Math.max(100, containerWidth - containerPadding);
    const availableHeight = Math.max(100, containerHeight - containerPadding);
    
    console.log('Canvas dimensions - Container:', containerWidth, 'x', containerHeight, '| Available:', availableWidth, 'x', availableHeight);
    
    // Fixed dimensions: 1060x2000px
    const targetWidth = 1060;
    const targetHeight = 2000;
    
    // Calculate display dimensions to fit in available space while maintaining aspect ratio
    const aspectRatio = targetWidth / targetHeight;
    let displayWidth = availableWidth;
    let displayHeight = displayWidth / aspectRatio;
    
    if (displayHeight > availableHeight) {
      displayHeight = availableHeight;
      displayWidth = displayHeight * aspectRatio;
    }
    
    console.log('Canvas display size:', displayWidth, 'x', displayHeight);
    
    // Set canvas dimensions - only set attributes, let CSS handle display size
    canvasElement.width = displayWidth;
    canvasElement.height = displayHeight;
    
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      width: displayWidth,
      height: displayHeight,
      backgroundColor: '#f5f0e7',
      isDrawingMode: this.currentMode() === 'draw',
      enableRetinaScaling: false,
    });
    
    // Load template as background
    const template = this.selectedTemplate();
    if (template) {
      const isSVG = template.url.endsWith('.svg');
      
      if (isSVG) {
        // Load SVG template
        const { objects, options } = await fabric.loadSVGFromURL(template.url);
        const filteredObjects = objects.filter((obj): obj is NonNullable<typeof obj> => obj !== null);
        const obj = fabric.util.groupSVGElements(filteredObjects, options);
        this.templateBaseWidth = obj.width || this.templateBaseWidth;
        this.templateBaseHeight = obj.height || this.templateBaseHeight;
        this.templateScaleX = fabricCanvas.width! / this.templateBaseWidth;
        this.templateScaleY = fabricCanvas.height! / this.templateBaseHeight;
        obj.set({
          scaleX: this.templateScaleX,
          scaleY: this.templateScaleY,
          left: 0,
          top: 0,
          originX: 'left',
          originY: 'top',
          selectable: false,
          evented: false,
        });
        fabricCanvas.set('backgroundImage', obj);
        fabricCanvas.renderAll();
      } else {
        // Load PNG/JPG template
        const img = await fabric.FabricImage.fromURL(template.url);
        this.templateBaseWidth = img.width || this.templateBaseWidth;
        this.templateBaseHeight = img.height || this.templateBaseHeight;
        this.templateScaleX = fabricCanvas.width! / this.templateBaseWidth;
        this.templateScaleY = fabricCanvas.height! / this.templateBaseHeight;
        img.set({
          scaleX: this.templateScaleX,
          scaleY: this.templateScaleY,
          left: 0,
          top: 0,
          originX: 'left',
          originY: 'top',
          selectable: false,
          evented: false,
        });
        fabricCanvas.set('backgroundImage', img);
        fabricCanvas.renderAll();
      }
    }
    
    this.canvas.set(fabricCanvas);
    // Clear any previous placeholder references
    this.placeholderTexts = [];
    // Configure drawing brush with Rough.js sketchy effect (default mode is draw)
    this.setupRoughBrush(fabricCanvas);
    // Track mode based on textbox selection frames
    this.setupSelectionModeTracking(fabricCanvas);
    // Place initial chat placeholders (needs canvas to be registered first)
    this.placeInitialChatBoxes(fabricCanvas);
    this.updatePlaceholderVisibility(this.currentMode() === 'type');
    
    // Expose console debug helpers directly
    (window as any).textboxDebug = {
      getLineHeight: () => {
        const active = this.canvas()?.getActiveObject();
        if (active) {
          return active.lineHeight;
        }
        console.warn('No textbox selected');
      },
      setLineHeight: (value: number) => {
        this.setLineHeight(value);
      },
      getHeight: () => {
        const active = this.canvas()?.getActiveObject();
        if (active) {
          return active.height;
        }
        console.warn('No textbox selected');
      },
      setHeight: (value: number) => {
        this.setHeight(value);
      },
      showAll: () => {
        // Available commands: getLineHeight(), setLineHeight(value), getHeight(), setHeight(value), export()
      },
      export: () => {
        this.exportTextboxesAsGeoJSON();
      },
    };
  }
  
  setupRoughBrush(fabricCanvas: any) {
    const color = this.currentColor();
    const component = this;
    
    // Create custom brush using perfect-freehand for crisp, smooth strokes
    const componentRef = component;
    const BaseBrush: any = fabric.PencilBrush;
    class PerfectFreehandBrush extends BaseBrush {
      color = color;
      width = 3;
      points: number[][] = [];
      started = false;

      private _resolvePointer(pointer: any, options: any) {
        if (pointer && typeof pointer.x === 'number' && typeof pointer.y === 'number') {
          return pointer;
        }
        const canvas = (this as any).canvas;
        if (canvas && typeof canvas.getPointer === 'function' && options?.e) {
          return canvas.getPointer(options.e, false);
        }
        return null;
      }

      onMouseDown(pointer: any, options: any) {
        const resolved = this._resolvePointer(pointer, options);
        if (!resolved) {
          console.warn('pointer is undefined in onMouseDown');
          return;
        }
        
        const target = (this as any).canvas.findTarget(options.e, false);
        if (target && target.type === 'textbox') {
          // Textbox detected: switch to text mode and select (first click frame, no edit yet)
          (this as any).canvas.isDrawingMode = false;
          component.currentMode.set('type');
          (this as any).canvas.setActiveObject(target);
          (this as any).canvas.renderAll();
          return; // Do not draw
        }

        this.started = true;
        this.points = [[resolved.x, resolved.y, 0.5]];
        (this as any)._render();
      }

      onMouseMove(pointer: any, options: any) {
        if (!this.started) return;
        const resolved = this._resolvePointer(pointer, options);
        if (!resolved) return;
        this.points.push([resolved.x, resolved.y, 0.5]);
        (this as any)._render();
      }

      onMouseUp() {
        if (!this.started) return;
        this.started = false;
        (this as any)._finalizeAndAddPath();
      }

      _render() {
        const canvas = (this as any).canvas;
        const ctx = canvas.contextTop;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (this.points.length > 1) {
          const outlinePoints = getStroke(this.points, {
            size: 4,
            thinning: 0.6,
            smoothing: 0.5,
            streamline: 0.5,
          });

          (this as any)._drawStroke(ctx, outlinePoints);
        }
      }

      _drawStroke(ctx: CanvasRenderingContext2D, outlinePoints: number[][]) {
        if (outlinePoints.length < 2) return;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(outlinePoints[0][0], outlinePoints[0][1]);

        for (let i = 1; i < outlinePoints.length; i++) {
          ctx.lineTo(outlinePoints[i][0], outlinePoints[i][1]);
        }

        ctx.closePath();
        ctx.fill();
      }

      _finalizeAndAddPath() {
        if (this.points.length < 2) {
          this.points = [];
          return;
        }

        const outlinePoints = getStroke(this.points, {
          size: 4,
          thinning: 0.6,
          smoothing: 0.5,
          streamline: 0.5,
        });

        // Convert outline to SVG path for vector output
        if (outlinePoints.length > 2) {
          const xs = outlinePoints.map((p) => p[0]);
          const ys = outlinePoints.map((p) => p[1]);
          const minX = Math.min(...xs);
          const minY = Math.min(...ys);
          const normalized = outlinePoints.map(([x, y]) => [x - minX, y - minY]);

          const pathData = this._outlineToSvgPath(normalized);
          const strokePath = new fabric.Path(pathData, {
            fill: this.color,
            strokeWidth: 0,
            left: minX,
            top: minY,
            originX: 'left',
            originY: 'top',
            selectable: false,
            evented: false,
            objectCaching: false,
            globalCompositeOperation: 'multiply',
          });

          (this as any).canvas.add(strokePath);
          (this as any).canvas.requestRenderAll();
        }

        componentRef.hasContent.set(true);
        this.points = [];
      }

      _outlineToSvgPath(points: number[][]): string {
        if (points.length < 2) return '';
        const len = points.length;
        const commands: string[] = [];
        for (let i = 0; i < len; i++) {
          const [x0, y0] = points[i];
          const [x1, y1] = points[(i + 1) % len];
          commands.push(`${x0},${y0} ${(x0 + x1) / 2},${(y0 + y1) / 2}`);
        }
        return `M ${commands[0]} Q ${commands.slice(1).join(' ')} Z`;
      }
    }

    fabricCanvas.freeDrawingBrush = new (PerfectFreehandBrush as any)(fabricCanvas);
    fabricCanvas.freeDrawingBrush.color = color;
    fabricCanvas.freeDrawingBrush.width = 3;
  }
  
  addText() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    this.addTextboxAt(100, 100, true);
  }
  
  setupSelectionModeTracking(fabricCanvas: any) {
    // Track mode based on textbox selection frames
    // Frame visible = text mode, no frame = draw mode
    const component = this;
    let mouseDownPos: { x: number; y: number } | null = null;
    let mouseDownTarget: any = null;
    
    // Track mouse down position and find target manually
    fabricCanvas.on('mouse:down', (e: any) => {
      const pointer = e.pointer || e.scenePoint;
      if (!pointer) {
        mouseDownPos = null;
        mouseDownTarget = null;
        return;
      }
      mouseDownPos = { x: pointer.x, y: pointer.y };
      
      // Get target from event
      let target = e.target;
      
      // If clicked object is a textbox, switch to text mode immediately
      if (target && target.type === 'textbox') {
        fabricCanvas.isDrawingMode = false;
        component.currentMode.set('type');
        mouseDownTarget = target;
      } else {
        mouseDownTarget = null;
      }
    });
    
    // On mouse up, handle click vs drag for textboxes
    fabricCanvas.on('mouse:up', (e: any) => {
      if (!mouseDownPos) {
        mouseDownTarget = null;
        return;
      }
      
      const pointer = e.pointer || e.scenePoint;
      if (!pointer) {
        mouseDownPos = null;
        mouseDownTarget = null;
        return;
      }
      
      // Calculate distance to distinguish click from drag
      const distance = Math.sqrt(
        Math.pow(pointer.x - mouseDownPos.x, 2) + 
        Math.pow(pointer.y - mouseDownPos.y, 2)
      );
      
      // If small movement, treat as click on textbox
      if (distance < 5 && mouseDownTarget && mouseDownTarget.type === 'textbox') {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject !== mouseDownTarget) {
          // First click: select the textbox frame
          fabricCanvas.setActiveObject(mouseDownTarget);
          fabricCanvas.requestRenderAll();
        } else {
          // Second click on same textbox: enter editing
          mouseDownTarget.editable = true;
          mouseDownTarget.enterEditing();
          const targetRef = mouseDownTarget;
          setTimeout(() => {
            if (targetRef && targetRef.isEditing) {
              targetRef.selectAll();
            }
          }, 50);
        }
      }
      
      mouseDownPos = null;
      mouseDownTarget = null;
    });
    
    // When a textbox is selected (frame appears), switch to text mode
    fabricCanvas.on('selection:created', (e: any) => {
      const target = e.selected?.[0];
      if (target && target.type === 'textbox') {
        fabricCanvas.isDrawingMode = false;
        component.currentMode.set('type');
        component.activeTextboxAlignment.set(target.textAlign || 'left');
        component.showAlignmentToggle.set(false); // Show toggle when textbox is selected but not editing
      }
    });
    
    // When selection changes to another textbox
    fabricCanvas.on('selection:updated', (e: any) => {
      const target = e.selected?.[0];
      if (target && target.type === 'textbox') {
        fabricCanvas.isDrawingMode = false;
        component.currentMode.set('type');
        component.activeTextboxAlignment.set(target.textAlign || 'left');
        component.showAlignmentToggle.set(false); // Show toggle when textbox is selected but not editing
        // Exit editing mode if we were in it
        if (target.isEditing) {
          target.exitEditing();
        }
      }
    });
    
    // When selection is cleared (frame disappears), switch back to draw mode
    fabricCanvas.on('selection:cleared', () => {
      fabricCanvas.isDrawingMode = true;
      component.currentMode.set('draw');
      component.setupRoughBrush(fabricCanvas);
      component.showAlignmentToggle.set(false);
      fabricCanvas.renderAll();
    });
    
    // When text editing exits, disable editable again and hide alignment toggle
    fabricCanvas.on('text:editing:exited', (e: any) => {
      const target = e.target;
      if (target && target.type === 'textbox') {
        target.editable = false;
        component.showAlignmentToggle.set(false);
      }
    });
    
    // When text editing enters, show alignment toggle
    fabricCanvas.on('text:editing:entered', (e: any) => {
      const target = e.target;
      if (target && target.type === 'textbox') {
        component.activeTextboxAlignment.set(target.textAlign || 'left');
        component.showAlignmentToggle.set(true);
      }
    });
  }

  detectRTL(text: string): boolean {
    // Hebrew: \u0590-\u05FF, Arabic: \u0600-\u06FF
    const rtlPattern = /[\u0590-\u05FF\u0600-\u06FF]/;
    return rtlPattern.test(text);
  }

  /**
   * Calculate font size scale factor for Hebrew and Arabic fonts to match English x-height.
   * Hebrew (Gadi Almog) and Arabic (Mikhak) fonts need to be scaled down to match
   * the x-height and line spacing of the English Caveat font.
   */
  private getFontSizeScale(fontFamily: string): number {
    if (fontFamily.includes('Gadi Almog')) {
      return this.FONT_SCALE_HEBREW;
    } else if (fontFamily.includes('Mikhak')) {
      return this.FONT_SCALE_ARABIC;
    }
    return this.FONT_SCALE_ENGLISH;
  }

  /**
   * Calculate line-height scale factor for Hebrew and Arabic texts.
   * Hebrew and Arabic texts need 140% line-height compared to English for better readability.
   */
  private getLineHeightScale(fontFamily: string): number {
    if (fontFamily.includes('Gadi Almog')) {
      return this.LINE_HEIGHT_SCALE_HEBREW;
    } else if (fontFamily.includes('Mikhak')) {
      return this.LINE_HEIGHT_SCALE_ARABIC;
    }
    return this.LINE_HEIGHT_SCALE_ENGLISH;
  }

  /**
   * Apply font size scaling when switching between languages.
   * Adjusts font size to maintain consistent visual x-height across different scripts.
   */
  private applyFontScaling(textbox: any, newFontFamily: string): void {
    const prevFont = textbox.fontFamily || this.selectedFont();
    
    // Only adjust font size if the font family is actually changing
    if (prevFont !== newFontFamily) {
      // Get scale factors for old and new fonts
      const prevFontScale = this.getFontSizeScale(prevFont);
      const newFontScale = this.getFontSizeScale(newFontFamily);
      // Adjust font size to maintain consistent visual size
      textbox.fontSize = (textbox.fontSize / prevFontScale) * newFontScale;
      
      // Also adjust line-height scaling for the new font
      const prevLineHeightScale = this.getLineHeightScale(prevFont);
      const newLineHeightScale = this.getLineHeightScale(newFontFamily);
      // Recalculate line-height with new scaling factor
      textbox.lineHeight = (textbox.lineHeight / prevLineHeightScale) * newLineHeightScale;
    }
  }
  
  async selectTransition(choice: 'before' | 'during' | 'after') {
    this.transitionChoice.set(choice);
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    
    // Add circle around the selected transition option using canvas arc
    let x = 60;
    if (choice === 'during') x = 180;
    if (choice === 'after') x = 300;
    
    // Draw circle using canvas native arc
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = fabricCanvas.width;
    offscreenCanvas.height = fabricCanvas.height;
    const ctx = offscreenCanvas.getContext('2d');
    
    ctx!.strokeStyle = this.currentColor();
    ctx!.lineWidth = 3;
    ctx!.beginPath();
    ctx!.arc(x, 1930, 60, 0, Math.PI * 2);
    ctx!.stroke();
    
    // Convert to fabric image and add to canvas
    const dataURL = offscreenCanvas.toDataURL();
    const img = await fabric.FabricImage.fromURL(dataURL);
    img.set({
      left: 0,
      top: 0,
      selectable: false,
      evented: false,
      globalCompositeOperation: 'multiply',
    });
    fabricCanvas.add(img);
    fabricCanvas.renderAll();
  }
  
  addTransitionText() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    
    const fontFamily = this.selectedFont();
    const lineHeightScale = this.getLineHeightScale(fontFamily);
    const scaledLineHeight = this.selectedLineHeight() * lineHeightScale;
    
    const text = new fabric.Textbox('Type above transition...', {
      left: 180,
      top: 1850,
      fontFamily: fontFamily,
      fontSize: 20,
      fill: this.currentColor(),
      textAlign: 'center',
      width: 320,
      lineHeight: scaledLineHeight,
    });
    this.configureTextbox(text);
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    text.enterEditing();
  }
  
  clearCanvas() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    
    // Remove all objects except background
    fabricCanvas.getObjects().forEach((obj: any) => {
      fabricCanvas.remove(obj);
    });
    this.hasContent.set(false);
  }
  
  restart() {
    this.clearCanvas();
    this.canvas.set(null);
    this.selectedTemplate.set(null);
    this.transitionChoice.set(null);
    this.showTemplateGallery.set(true);
    this.showModeSelection.set(false);
  }
  
  async submit() {
    if (!this.hasContent()) return; // Prevent submit if no content
    
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;

    // Extract textbox content before removing placeholders
    const allTextboxes = fabricCanvas.getObjects().filter((obj: any) => obj.type === 'textbox');
    const textboxData = allTextboxes
      .filter((tb: any) => !(tb as any)._placeholder && tb.text && tb.text.trim() !== '')
      .map((tb: any) => tb.text.trim())
      .join(' | ');
    
    // Store textbox data in state service
    this.state.currentTextboxData.set(textboxData || null);

    // Save canvas state as JSON before removing placeholders (for re-edit)
    const canvasJSON = JSON.stringify(fabricCanvas.toJSON(['globalCompositeOperation', 'paintFirst', '_placeholder', '_placeholderText']));
    this.state.currentCanvasState.set(canvasJSON);

    // Remove untouched placeholders before export
    const placeholders = this.placeholderTexts.filter(t => (t as any)._placeholder || ((t.text || '').trim() === ((t as any)._placeholderText || 'Type here...')));
    if (placeholders.length) {
      placeholders.forEach(tb => fabricCanvas.remove(tb));
      this.placeholderTexts = this.placeholderTexts.filter(t => !placeholders.includes(t));
      fabricCanvas.requestRenderAll();
    }
    
    // Calculate multiplier to export at full resolution (1060x2000)
    // Current canvas is display size, we need to scale up to target size
    const targetWidth = 1060;
    const targetHeight = 2000;
    const multiplier = targetWidth / fabricCanvas.width!;
    
    // Export canvas to JPEG data URL at full resolution
    const dataURL = fabricCanvas.toDataURL({
      format: 'jpeg',    // Use JPEG like scanner
      quality: 0.95,     // Match scanner quality
      multiplier: multiplier,  // Scale up to 1060x2000
    });
    
    // Convert data URL to blob with explicit MIME type
    const response = await fetch(dataURL);
    const blob = await response.blob();
    
    // Create JPEG blob with explicit MIME type (matching scanner)
    const jpegBlob = new Blob([blob], { type: 'image/jpeg' });
    
    this.state.setImage(jpegBlob);
    const sel = this.selectedTemplate();
    this.router.navigate(['/confirm'], { queryParamsHandling: 'merge', queryParams: { template: 'true', template_id: sel?.id } });
  }
  
  undo() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    
    const objects = fabricCanvas.getObjects();
    if (objects.length > 0) {
      fabricCanvas.remove(objects[objects.length - 1]);
    }
  }

  // ----- Carousel swipe handlers -----
  onCarouselTouchStart(ev: TouchEvent) {
    if (ev.touches.length !== 1 || this.isCarouselAnimating()) return;
    this.touchStartX = ev.touches[0].clientX;
    this.touchDeltaX = 0;
    this.isSwiping = true;
    this.carouselDragging.set(true);
    this.carouselDragOffset.set(0);
  }

  onCarouselTouchMove(ev: TouchEvent) {
    if (!this.isSwiping || this.touchStartX === null) return;
    this.touchDeltaX = ev.touches[0].clientX - this.touchStartX;
    this.carouselDragOffset.set(this.touchDeltaX);
  }

  onCarouselTouchEnd() {
    if (!this.isSwiping) return;
    const threshold = 75; // 75px swipe distance to trigger navigation
    const velocity = Math.abs(this.touchDeltaX);
    
    // Determine if we should navigate based on distance and velocity
    // Reset drag state before triggering navigation so guards don't block
    this.isSwiping = false;
    this.carouselDragging.set(false);

    if (this.touchDeltaX > threshold || (velocity > 30 && this.touchDeltaX > 0)) {
      this.previousTemplate();
    } else if (this.touchDeltaX < -threshold || (velocity > 30 && this.touchDeltaX < 0)) {
      this.nextTemplate();
    }

    // Final cleanup
    this.touchStartX = null;
    this.touchDeltaX = 0;
    this.carouselDragOffset.set(0);
  }

  // ----- Drawer helpers -----
  toggleControls() {
    const state = this.drawerState();
    if (state === 'default') {
      this.drawerState.set('full');
    } else if (state === 'full') {
      this.drawerState.set('minimal');
    } else {
      this.drawerState.set('default');
    }
    this.drawerDragOffset.set(0);
    this.drawerDragging.set(false);
  }

  setFont(font: string) {
    this.selectedFont.set(font);
    this.loadFont(font);
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    const active = fabricCanvas.getActiveObject();
    if (active && active.type === 'textbox') {
      active.set('fontFamily', font);
      fabricCanvas.requestRenderAll();
    }
  }
  
  toggleAlignment() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    const active = fabricCanvas.getActiveObject();
    if (active && active.type === 'textbox') {
      const currentAlign = active.textAlign || 'left';
      // Toggle between left, center, and right
      let newAlign: 'left' | 'center' | 'right' = 'left';
      if (currentAlign === 'left') {
        newAlign = 'center';
      } else if (currentAlign === 'center') {
        newAlign = 'right';
      } else {
        newAlign = 'left';
      }
      
      // If aligning right, also set RTL
      const isRTL = newAlign === 'right';
      active.set({ 
        textAlign: newAlign,
        direction: isRTL ? 'rtl' : 'ltr'
      });
      this.activeTextboxAlignment.set(newAlign);
      fabricCanvas.requestRenderAll();
    }
  }

  setLineHeight(lineHeight: number) {
    this.selectedLineHeight.set(lineHeight);
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    const active = fabricCanvas.getActiveObject();
    if (active && active.type === 'textbox') {
      // Apply line-height scale factor for Hebrew and Arabic
      const fontFamily = active.fontFamily || this.selectedFont();
      const scale = this.getLineHeightScale(fontFamily);
      const scaledLineHeight = lineHeight * scale;
      active.set('lineHeight', scaledLineHeight);
      fabricCanvas.requestRenderAll();
    }
  }

  setHeight(height: number) {
    this.selectedHeight.set(height);
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    const active = fabricCanvas.getActiveObject();
    if (active && active.type === 'textbox') {
      active.set('height', height);
      fabricCanvas.requestRenderAll();
    }
  }

  private addTextboxAt(x: number, y: number, focus = false, placeholderText = 'Type here...', width?: number, fabricCanvas?: any, textAlign?: string, originY?: string, originX?: string) {
    const canvasRef = fabricCanvas || this.canvas();
    const targetCanvas = canvasRef;
    if (!targetCanvas) return;
    const placeholderColor = '#9aa0a6';
    // Create textbox with placeholder text visible
    const fontFamily = this.selectedFont();
    const lineHeightScale = this.getLineHeightScale(fontFamily);
    const scaledLineHeight = this.selectedLineHeight() * lineHeightScale;
    
    const text = new fabric.Textbox(placeholderText, {
      left: x,
      top: y,
      fontFamily: fontFamily,
      fontSize: 28,
      fill: placeholderColor,
      width: width || Math.min(360, targetCanvas.getWidth() * 0.6),
      height: this.selectedHeight(),
      editable: false,
      lineHeight: scaledLineHeight,
      textAlign: (textAlign as any) || 'left',
      originY: (originY as any) || 'top',
      originX: (originX as any) || 'left',
      selectable: true,
      evented: true,
      _placeholder: true,
      _placeholderText: placeholderText, // Store original placeholder
    });
    this.configureTextbox(text);
    // Placeholder behavior - select all on focus so typing replaces it
    text.on('editing:entered', () => {
      if ((text as any)._placeholder) {
        text.set({ fill: this.currentColor(), _placeholder: false });
        // Select all text so first keystroke replaces it
        text.selectAll();
        targetCanvas.requestRenderAll();
      }
    });
    // Detect text direction on change
    text.on('changed', () => {
      const effectiveText = text.text || '';
      const isRTL = this.detectRTL(effectiveText);
      
      // Determine which RTL font to use based on character set
      let rtlFont = this.selectedFont();
      if (isRTL) {
        // Check if Hebrew or Arabic
        const hasHebrew = /[\u0590-\u05FF]/.test(effectiveText);
        const hasArabic = /[\u0600-\u06FF]/.test(effectiveText);
        if (hasHebrew) {
          rtlFont = 'Gadi Almog, Miriam Libre, serif';
        } else if (hasArabic) {
          rtlFont = 'Mikhak, Readex Pro, sans-serif';
        }
      }
      
      // Apply font size scaling when switching fonts
      this.applyFontScaling(text, rtlFont);
      
      text.set({ 
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: rtlFont
      });
      targetCanvas.requestRenderAll();
    });
    // Restore placeholder if empty
    text.on('editing:exited', () => {
      const content = text.text || '';
      if (content.trim() === '') {
        const originalPlaceholder = (text as any)._placeholderText || 'Type here...';
        text.set({ text: originalPlaceholder, fill: placeholderColor, _placeholder: true });
      }
    });

    targetCanvas.add(text);
    this.hasContent.set(true);
    if (focus) {
      targetCanvas.setActiveObject(text);
      text.enterEditing();
      // If focusing and it's a placeholder, select all so typing replaces it
      if ((text as any)._placeholder) {
        text.set({ fill: this.currentColor(), _placeholder: false });
        text.selectAll();
        targetCanvas.requestRenderAll();
      }
    }
    return text; // Return the textbox so caller can track it
  }

  private configureTextbox(text: any) {
    // Prevent entering edit mode on single click - only allow double-click
    text.editable = false; // Disable editing by default
    text.lockMovementX = false;
    text.lockMovementY = false;
    
    // Add multiply blend mode for text by overriding render
    text.set({ globalCompositeOperation: 'multiply' });
    const originalRender = text.render;
    text.render = function(ctx: any) {
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      originalRender.call(this, ctx);
      ctx.restore();
    };
    
    // Allow width resize via side handles only; corners will resize font uniformly
    text.setControlsVisibility({
      ml: true, mr: true,
      mt: false, mb: false,
      tl: true, tr: true, bl: true, br: true,
      mtr: true, // Show rotation handle
    });

    // Prevent letter stretching: convert side scaling to width changes
    text.on('scaling', (e: any) => {
      const t = e.transform?.target;
      if (!t) return;
      const corner = e.transform?.corner;
      if (corner === 'ml' || corner === 'mr') {
        const newW = Math.max(80, t.width * t.scaleX);
        t.set({ width: newW, scaleX: 1 });
      } else if (corner === 'mt' || corner === 'mb') {
        // disallow vertical-only scaling for textboxes
        t.set({ scaleY: 1 });
      }
    });

    // Convert corner uniform scaling into font size + width change
    text.on('scaled', (e: any) => {
      const t = e.transform?.target;
      if (!t) return;
      const corner = e.transform?.corner;
      if (corner === 'tl' || corner === 'tr' || corner === 'bl' || corner === 'br') {
        // Use average scale to keep proportions
        const s = (t.scaleX + t.scaleY) / 2;
        const nextFont = Math.max(8, Math.min(128, t.fontSize * s));
        const nextWidth = Math.max(80, t.width * s);
        t.set({ fontSize: nextFont, width: nextWidth, scaleX: 1, scaleY: 1 });
        t.setCoords();
      } else {
        t.set({ scaleX: 1, scaleY: 1 });
      }
      t.canvas?.requestRenderAll();
    });
  }

  private placeInitialChatBoxes(fabricCanvas: any) {
    if (this.placeholderTexts.length) return;
    
    const template = this.selectedTemplate();
    if (!template) return;

    // Presets were authored on a downscaled view (~320px wide) of the template.
    // Convert authoring-space coordinates back to template-space, then map to canvas using background scale.
    const templateWidth = this.templateBaseWidth || 1060;
    const templateHeight = this.templateBaseHeight || 2000;
    const authoringWidth = 320; // width used when presets were originally captured
    const authoringHeight = authoringWidth * (templateHeight / templateWidth); // keep template aspect
    const authorToTemplateX = templateWidth / authoringWidth;
    const authorToTemplateY = templateHeight / authoringHeight;
    const scaleX = this.templateScaleX || ((fabricCanvas?.getWidth?.() ?? templateWidth) / templateWidth);
    const scaleY = this.templateScaleY || ((fabricCanvas?.getHeight?.() ?? templateHeight) / templateHeight);
    const contentScale = 0.95; // Shrink presets by 5% relative to anchor to correct drift

    // Optional per-template alignment adjustment using textbox-0 as anchor
    let dxTemplate = 0;
    let dyTemplate = 0;
    const preset = this.templatePresets[template.id];
    if (preset && preset.features && template.id === 'chat') {
      const anchor = preset.features.find((f: any) => f.properties?.id === 'textbox-0');
      if (anchor) {
        // Convert anchor from authoring-space to template-space
        const ax_t = anchor.geometry.coordinates[0] * authorToTemplateX;
        const aw_t = (anchor.properties?.width ?? 0) * authorToTemplateX;
        const anchorCenterX_t = ax_t + aw_t / 2;
        // Center horizontally in template space
        dxTemplate = (templateWidth / 2) - anchorCenterX_t;
        // Lift slightly from the bottom for a small margin (convert authoring margin into template units)
        const marginAuthor = 10; // ~10px at authoring scale
        dyTemplate = -(marginAuthor * authorToTemplateY);
      }
    }

    // Global upward adjustment: pop all presets up by 3% of template height
    const yPopFraction = 0.045;
    const yPopTemplate = yPopFraction * templateHeight;
    
    // Load textboxes from template preset if available
    if (preset && preset.features) {
      // Determine anchor reference in template-space after dx/dy, for centric scaling
      let anchorRefX_t: number | null = null;
      let anchorRefY_t: number | null = null;
      const anchorF = preset.features.find((f: any) => f.properties?.id === 'textbox-0');
      if (anchorF) {
        const axAuthor = anchorF.geometry.coordinates[0];
        const ayAuthor = anchorF.geometry.coordinates[1];
        const ax_t = (axAuthor * authorToTemplateX) + dxTemplate;
        const ay_t = (ayAuthor * authorToTemplateY) + dyTemplate;
        const aw_t = (anchorF.properties?.width ?? 0) * authorToTemplateX;
        anchorRefX_t = ax_t + aw_t / 2; // center-x as reference
        anchorRefY_t = ay_t; // use provided y (respects originY)
      }

      preset.features.forEach((feature: any) => {
        const props = feature.properties;
        const [xAuthor, yAuthor] = feature.geometry.coordinates;
        // Convert authoring-space to template-space and apply centric content scaling around anchor
        let xTemplate = (xAuthor * authorToTemplateX) + dxTemplate;
        let yTemplate = (yAuthor * authorToTemplateY) + dyTemplate;
        if (anchorRefX_t !== null && anchorRefY_t !== null) {
          const vx = xTemplate - anchorRefX_t;
          const vy = yTemplate - anchorRefY_t;
          xTemplate = anchorRefX_t + contentScale * vx;
          yTemplate = anchorRefY_t + contentScale * vy;
        }
        // Apply global upward pop for chat
        yTemplate -= yPopTemplate;
        const sx = xTemplate * scaleX;
        const sy = yTemplate * scaleY;
        const presetWidth = props.width ? ((props.width * authorToTemplateX) * scaleX * contentScale) : undefined;
        const presetHeight = props.height ? ((props.height * authorToTemplateY) * scaleY * contentScale) : undefined;
        
        // Set current values from preset
        this.selectedLineHeight.set(props['line-height'] || 1.16);
        this.selectedHeight.set(presetHeight || props.height || 40);
        
        // Create textbox with preset placeholder and width
        const textbox = this.addTextboxAt(
          sx,
          sy,
          false,
          props.placeholder,
          presetWidth,
          fabricCanvas,
          props.textAlign,
          props.originY,
          props.originX
        );
        if (textbox) {
          this.placeholderTexts.push(textbox);
        }
      });
    } else {
      // Fallback to default positions
      const boxes = [
        { x: 150 * scaleX, y: 360 * scaleY },
        { x: 150 * scaleX, y: 640 * scaleY },
      ];
      boxes.forEach(pos => {
        const textbox = this.addTextboxAt(pos.x, pos.y, false, 'Type here...', undefined, fabricCanvas);
        if (textbox) this.placeholderTexts.push(textbox);
      });
    }
  }

  private loadFont(font: string) {
    if (typeof document === 'undefined' || !(document as any).fonts?.load) return;
    (document as any).fonts.load(`400 16px ${font}`).catch(() => {});
  }

  private preloadFonts() {
    this.handwritingFonts.forEach(f => this.loadFont(f));
  }

  // Drawer touch (swipe) handlers
  onDrawerTouchStart(ev: TouchEvent) {
    if (ev.touches.length !== 1) return;
    this.drawerTouchStartY = ev.touches[0].clientY;
    this.drawerTouchDeltaY = 0;
    this.drawerDragging.set(true);
  }

  onDrawerTouchMove(ev: TouchEvent) {
    if (this.drawerTouchStartY === null) return;
    this.drawerTouchDeltaY = ev.touches[0].clientY - this.drawerTouchStartY;
    const clamped = Math.max(-100, Math.min(60, this.drawerTouchDeltaY));
    this.drawerDragOffset.set(clamped);
  }

  onDrawerTouchEnd() {
    const threshold = 30;
    if (this.drawerTouchDeltaY > threshold) {
      this.openMoreDrawer();
    } else if (this.drawerTouchDeltaY < -threshold) {
      this.closeDrawerLevel();
    }
    this.drawerTouchStartY = null;
    this.drawerTouchDeltaY = 0;
    this.drawerDragOffset.set(0);
    this.drawerDragging.set(false);
  }

  private openMoreDrawer() {
    const state = this.drawerState();
    if (state === 'minimal') this.drawerState.set('default');
    else if (state === 'default') this.drawerState.set('full');
    this.drawerDragOffset.set(0);
    this.drawerDragging.set(false);
  }

  private closeDrawerLevel() {
    const state = this.drawerState();
    if (state === 'full') this.drawerState.set('default');
    else if (state === 'default') this.drawerState.set('minimal');
    this.drawerDragOffset.set(0);
    this.drawerDragging.set(false);
  }

  drawerTransform(): string {
    const base = this.drawerBaseOffset();
    const drag = this.drawerDragOffset();
    return `translateY(${base + drag}px)`;
  }

  drawerTransition(): string {
    return this.drawerDragging() ? 'none' : 'transform 0.22s cubic-bezier(0.25, 0.8, 0.3, 1)';
  }

  private drawerBaseOffset(): number {
    const state = this.drawerState();
    if (state === 'full') return 0;
    if (state === 'default') return -30;
    return -70; // minimal
  }

  private updatePlaceholderVisibility(show: boolean) {
    // Always show text boxes, regardless of mode - they should be visible and editable in both modes
    this.placeholderTexts.forEach(t => {
      t.set({ visible: true });
    });
    this.canvas()?.requestRenderAll();
  }

  private restoreCanvasState() {
    const savedState = this.state.currentCanvasState();
    if (!savedState) return;
    
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;

    try {
      const stateObj = JSON.parse(savedState);
      // Clear current objects (keep background)
      const existingObjects = fabricCanvas.getObjects();
      existingObjects.forEach((obj: any) => fabricCanvas.remove(obj));
      
      // Load saved state with full async completion
      fabricCanvas.loadFromJSON(stateObj, () => {
        // Wait for all assets to load
        setTimeout(() => {
          // After loading, reconfigure textboxes and reattach handlers
          const allObjects = fabricCanvas.getObjects();
          const textboxes: any[] = [];
          
          allObjects.forEach((obj: any) => {
            if (obj.type === 'textbox') {
              textboxes.push(obj);
              this.configureTextbox(obj);
              
              // Clear placeholder state that was saved (don't restore it)
              obj._placeholder = false;
              
              // Apply line-height scaling based on font family when loading
              const fontFamily = obj.fontFamily || this.selectedFont();
              const lineHeightScale = this.getLineHeightScale(fontFamily);
              if (obj.lineHeight) {
                obj.lineHeight = obj.lineHeight * lineHeightScale;
              }
              
              // Re-attach event handlers
              obj.on('editing:entered', () => {
                if ((obj as any)._placeholder) {
                  obj.set({ fill: this.currentColor(), _placeholder: false });
                  obj.selectAll();
                  fabricCanvas.requestRenderAll();
                }
              });
              obj.on('changed', () => {
                const effectiveText = obj.text || '';
                const isRTL = this.detectRTL(effectiveText);
                
                let rtlFont = this.selectedFont();
                if (isRTL) {
                  const hasHebrew = /[\u0590-\u05FF]/.test(effectiveText);
                  const hasArabic = /[\u0600-\u06FF]/.test(effectiveText);
                  if (hasHebrew) {
                    rtlFont = 'Gadi Almog, Miriam Libre, serif';
                  } else if (hasArabic) {
                    rtlFont = 'Mikhak, Readex Pro, sans-serif';
                  }
                }
                
                // Apply font size scaling when switching fonts
                this.applyFontScaling(obj, rtlFont);
                
                obj.set({ 
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: isRTL ? 'right' : 'left',
                  fontFamily: rtlFont
                });
                fabricCanvas.requestRenderAll();
              });
              obj.on('editing:exited', () => {
                const content = obj.text || '';
                if (content.trim() === '') {
                  const originalPlaceholder = (obj as any)._placeholderText || 'Type here...';
                  obj.set({ text: originalPlaceholder, fill: '#9aa0a6', _placeholder: true });
                }
              });
            }
          });
          
          this.placeholderTexts = textboxes;
          // Count only non-placeholder objects for hasContent
          const contentObjects = allObjects.filter((obj: any) => 
            obj.type !== 'textbox' || (!(obj as any)._placeholder && obj.text && obj.text.trim() !== '')
          );
          this.hasContent.set(contentObjects.length > 0);
          fabricCanvas.renderAll();
          console.log('Canvas state restored successfully with', textboxes.length, 'textboxes');
        }, 100);
      });
    } catch (error) {
      console.error('Failed to restore canvas state:', error);
    }
  }

  private exportTextboxesAsGeoJSON() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) {
      console.warn('Canvas not initialized');
      return;
    }

    // Get all textbox objects from the canvas
    const textboxes = fabricCanvas.getObjects().filter((obj: any) => obj.type === 'textbox');
    
    if (textboxes.length === 0) {
      console.warn('No textboxes found on canvas');
      return;
    }

    const roundNumber = (value: number | undefined) => Math.round(value ?? 0);
    
    const features = textboxes.map((textbox: any, index: number) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [roundNumber(textbox.left), roundNumber(textbox.top)],
      },
      properties: {
        id: `textbox-${index}`,
        placeholder: textbox._placeholderText || textbox.text || 'message…',
        'line-height': roundNumber(textbox.lineHeight || 1.16),
        width: roundNumber(textbox.width),
        height: roundNumber(textbox.height || 40),
        ...(textbox.textAlign !== 'left' && { textAlign: textbox.textAlign }),
        ...(textbox.originY !== 'top' && { originY: textbox.originY }),
      },
    }));

    const geojson = {
      type: 'FeatureCollection',
      features,
    };

    console.log('Textbox Positions (GeoJSON)');
    console.log(JSON.stringify(geojson, null, 2));
  }
}
