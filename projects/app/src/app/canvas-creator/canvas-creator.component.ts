import { AfterViewInit, Component, DestroyRef, ElementRef, signal, ViewChild, computed, afterNextRender, Injector, inject, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { PlatformService } from '../../platform.service';
import { StateService } from '../../state.service';

declare const fabric: any;
declare const rough: any;

interface Template {
  id: string;
  name: string;
  url: string;
  preview: string;
}

@Component({
  selector: 'app-canvas-creator',
  imports: [],
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
  carouselTransform = computed(() => {
    const index = this.currentTemplateIndex();
    // Center item: viewport is 100vw, item is 75vw, so center offset is 12.5vw
    // Item n is at position n*75vw, so translate to 12.5vw: translateX(12.5vw - n*75vw)
    return `translateX(calc(12.5vw - ${index * 75}vw))`;
  });
  drawerState = signal<'minimal' | 'default' | 'full'>('default');
  selectedFont = signal<string>('Caveat, cursive');
  selectedLineHeight = signal<number>(1.16);
  selectedHeight = signal<number>(40);
  drawerDragOffset = signal<number>(0);
  drawerDragging = signal<boolean>(false);
  private touchStartX: number | null = null;
  private touchDeltaX = 0;
  private isSwiping = false;
  private drawerTouchStartY: number | null = null;
  private drawerTouchDeltaY = 0;
  private placeholderTexts: any[] = [];
  
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
            'line-height': 0.75,
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
            'line-height': 0.75,
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
              "geometry": {
                "type": "Point",
                "coordinates": [
                  80,
                  604
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
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [81, 203] },
          properties: {
            id: 'textbox-1',
            placeholder: 'App name',
            'line-height': 1.16,
            width: 202,
            height: 32,
          },
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [150, 640] },
          properties: {
            id: 'textbox-2',
            placeholder: 'Notification text',
            'line-height': 1.16,
            width: 202,
            height: 32,
          },
        },
      ],
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
    review: {
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
    prompt: {
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
    sign: {
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
    holyland: {
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
    jerusalem: {
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
    europe: {
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
    us: {
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
    'Miriam Libre, serif', // Hebrew support
    'Readex Pro, sans-serif', // Arabic support
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
    console.log('🔵🔵🔵 CanvasCreatorComponent constructor called');
    console.log('🔵 Platform browser?:', this.platform.browser());
    console.log('🔵 Route snapshot:', this.route.snapshot);
    this.api.updateFromRoute(this.route.snapshot);
    // Select random color on init
    this.currentColor.set(this.markerColors[Math.floor(Math.random() * this.markerColors.length)]);
    console.log('🔵 Selected color:', this.currentColor());
    this.preloadFonts();
    console.log('🔵 Constructor complete');
  }
  
  ngAfterViewInit(): void {
    console.log('🔵🔵🔵 ngAfterViewInit called');
    console.log('🔵 Templates loaded:', this.templates.length);
    console.log('🔵 Show template gallery:', this.showTemplateGallery());
    if (!this.platform.browser()) {
      console.log('❌ Not in browser, exiting');
      return;
    }
    // Start carousel spin animation
    this.spinCarouselToRandomTemplate();
    console.log('🔵 ngAfterViewInit complete');
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
  
  selectTemplate(template: Template) {
    console.log('🔵 selectTemplate called with:', template.id, template.name);
    this.selectedTemplate.set(template);
    this.showTemplateGallery.set(false);
    this.showModeSelection.set(false);
    // Wait for view to update before initializing canvas
    console.log('🔵 Scheduling initCanvas after next render');
    afterNextRender(() => {
      console.log('🔵 afterNextRender callback executing');
      this.initCanvas();
    }, { injector: this.injector });
  }
  
  previousTemplate() {
    if (this.isCarouselAnimating()) return;
    const index = this.currentTemplateIndex();
    this.currentTemplateIndex.set(index > 0 ? index - 1 : this.templates.length - 1);
  }

  nextTemplate() {
    if (this.isCarouselAnimating()) return;
    const index = this.currentTemplateIndex();
    this.currentTemplateIndex.set((index + 1) % this.templates.length);
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
    // Calculate spins to reach the random index in ~1.5 seconds
    const totalSpins = randomIndex + Math.floor(Math.random() * 2 + 3) * this.templates.length;
    const animationDuration = 1500; // 1.5 seconds
    
    this.isCarouselAnimating.set(true);
    let currentSpin = 0;
    const startTime = Date.now();
    
    const spin = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Ease-out cubic: 1 - (1-t)^3
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
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
  
  initCanvas() {
    console.log('🔵 initCanvas called');
    if (!this.canvasEl || !this.canvasEl.nativeElement) {
      console.error('❌ Canvas element not available - canvasEl:', !!this.canvasEl, 'nativeElement:', !!this.canvasEl?.nativeElement);
      return;
    }
    
    console.log('🔵 Canvas element found, initializing...');
    const canvasElement = this.canvasEl.nativeElement;
    const container = canvasElement.parentElement;
    const containerWidth = container?.clientWidth || 360;
    const containerHeight = container?.clientHeight || 640;
    
    console.log('🔵 Container dimensions:', containerWidth, 'x', containerHeight);
    
    // Fixed dimensions: 1060x2000px
    const targetWidth = 1060;
    const targetHeight = 2000;
    
    // Calculate display dimensions to fit in container while maintaining aspect ratio
    const aspectRatio = targetWidth / targetHeight;
    let displayWidth = containerWidth - 32; // padding
    let displayHeight = displayWidth / aspectRatio;
    
    if (displayHeight > containerHeight - 32) {
      displayHeight = containerHeight - 32;
      displayWidth = displayHeight * aspectRatio;
    }
    
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      width: displayWidth,
      height: displayHeight,
      backgroundColor: '#f5f0e7',
      isDrawingMode: this.currentMode() === 'draw',
    });
    
    // Load template as background
    const template = this.selectedTemplate();
    if (template) {
      const isSVG = template.url.endsWith('.svg');
      
      if (isSVG) {
        // Load SVG template
        fabric.loadSVGFromURL(template.url, (objects: any, options: any) => {
          const obj = fabric.util.groupSVGElements(objects, options);
          obj.set({
            scaleX: fabricCanvas.width! / obj.width!,
            scaleY: fabricCanvas.height! / obj.height!,
            selectable: false,
            evented: false,
          });
          fabricCanvas.setBackgroundImage(obj, fabricCanvas.renderAll.bind(fabricCanvas));
        });
      } else {
        // Load PNG/JPG template
        fabric.Image.fromURL(template.url, (img: any) => {
          img.set({
            scaleX: fabricCanvas.width! / img.width!,
            scaleY: fabricCanvas.height! / img.height!,
            selectable: false,
            evented: false,
          });
          fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
        });
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
          console.log('Current textbox lineHeight:', active.lineHeight);
          return active.lineHeight;
        }
        console.warn('No textbox selected');
      },
      setLineHeight: (value: number) => {
        this.setLineHeight(value);
        const active = this.canvas()?.getActiveObject();
        console.log('LineHeight set to:', value, '- Current:', active?.lineHeight);
      },
      getHeight: () => {
        const active = this.canvas()?.getActiveObject();
        if (active) {
          console.log('Current textbox height:', active.height);
          return active.height;
        }
        console.warn('No textbox selected');
      },
      setHeight: (value: number) => {
        this.setHeight(value);
        const active = this.canvas()?.getActiveObject();
        console.log('Height set to:', value, '- Current:', active?.height);
      },
      showAll: () => {
        console.log('Available commands:');
        console.log('  textboxDebug.getLineHeight() - Get current lineHeight');
        console.log('  textboxDebug.setLineHeight(1.2) - Set lineHeight (try 0.8-2.0)');
        console.log('  textboxDebug.getHeight() - Get current height');
        console.log('  textboxDebug.setHeight(50) - Set height in pixels');
        console.log('  textboxDebug.export() - Export all textboxes as GeoJSON');
      },
      export: () => {
        this.exportTextboxesAsGeoJSON();
      },
    };
    console.log('✅ textboxDebug is now available!');
  }
  
  setupRoughBrush(fabricCanvas: any) {
    const color = this.currentColor();
    const component = this; // Capture component context for callbacks
    
    // Create custom Rough.js brush that avoids drawing over textboxes
    const RoughBrush = fabric.util.createClass(fabric.PencilBrush, {
      color: color,
      width: 3,
      
      onMouseDown: function(pointer: any, options: any) {
        // Check if we're clicking on a textbox - if so, don't start drawing
        const target = this.canvas.findTarget(options.e, false);
        if (target && target.type === 'textbox') {
          // Switch to text editing mode instead
          this.canvas.isDrawingMode = false;
          this.canvas.setActiveObject(target);
          target.enterEditing();
          target.selectAll();
          this.canvas.renderAll();
          return; // Don't start drawing
        }
        
        this.started = true;
        this._prepareForDrawing(pointer);
        this._captureDrawingPath(pointer);
        this._render();
      },
      
      onMouseMove: function(pointer: any, options: any) {
        if (!this.started) return;
        this._captureDrawingPath(pointer);
        this._render();
      },
      
      onMouseUp: function(options: any) {
        if (!this.started) return;
        this.started = false;
        this._finalizeAndAddPath();
      },
      
      _render: function() {
        const canvas = this.canvas;
        const ctx = canvas.contextTop;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (this._points.length > 1) {
          // Draw rough preview path
          this._drawRoughPath(ctx, this._points, false);
        }
      },
      
      _finalizeAndAddPath: function() {
        if (this._points.length < 2) {
          this._reset();
          return;
        }
        
        // Create an offscreen canvas for rough.js
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = this.canvas.width;
        offscreenCanvas.height = this.canvas.height;
        const rc = rough.canvas(offscreenCanvas);
        
        // Draw the rough path
        const points = this._points.map((p: any) => [p.x, p.y]);
        rc.linearPath(points, {
          stroke: this.color,
          strokeWidth: this.width,
          roughness: 1.2,
          bowing: 0.5,
        });
        
        // Convert to fabric image and add to canvas
        const dataURL = offscreenCanvas.toDataURL();
        const brushCanvas = this.canvas;
        fabric.Image.fromURL(dataURL, (img: any) => {
          img.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
          });
          brushCanvas.add(img);
          brushCanvas.renderAll();
          component.hasContent.set(true);
        });
        
        this._reset();
      },
      
      _drawRoughPath: function(ctx: any, points: any[], finalize: boolean) {
        if (points.length < 2) return;
        
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Simple preview (smooth)
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }
    });
    
    fabricCanvas.freeDrawingBrush = new RoughBrush(fabricCanvas);
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
    let wasAlreadySelected = false;
    let selectionTime = 0; // Track when a textbox was selected
    const MIN_DELAY_MS = 300; // Minimum delay between selection and edit mode
    
    // Track mouse down position and selection state
    fabricCanvas.on('mouse:down', (e: any) => {
      mouseDownPos = { x: e.pointer.x, y: e.pointer.y };
      const target = e.target;
      const activeObject = fabricCanvas.getActiveObject();
      // Track if the clicked textbox was already selected
      wasAlreadySelected = (target && target.type === 'textbox' && activeObject === target);
    });
    
    // On mouse up, check if it was a click (not a drag) on an already-selected textbox
    fabricCanvas.on('mouse:up', (e: any) => {
      const target = e.target;
      const now = Date.now();
      const timeSinceSelection = now - selectionTime;
      
      if (target && target.type === 'textbox' && mouseDownPos && wasAlreadySelected && timeSinceSelection >= MIN_DELAY_MS) {
        // Check if this was a click (not a drag)
        const distance = Math.sqrt(
          Math.pow(e.pointer.x - mouseDownPos.x, 2) + 
          Math.pow(e.pointer.y - mouseDownPos.y, 2)
        );
        
        // If it's a small movement (less than 5 pixels), treat it as a click
        if (distance < 5 && !target.isEditing) {
          // Enter editing mode only if the textbox was already selected
          target.editable = true;
          target.enterEditing();
          setTimeout(() => {
            if (target.isEditing) {
              target.selectAll();
            }
          }, 50);
        }
      }
      mouseDownPos = null;
      wasAlreadySelected = false;
    });
    
    // When a textbox is selected (frame appears), switch to text mode
    fabricCanvas.on('selection:created', (e: any) => {
      const target = e.selected?.[0];
      if (target && target.type === 'textbox') {
        selectionTime = Date.now(); // Record when this textbox was selected
        fabricCanvas.isDrawingMode = false;
        component.currentMode.set('type');
        // First click - just show handles, don't enter editing
      }
    });
    
    // When selection changes to another textbox
    fabricCanvas.on('selection:updated', (e: any) => {
      const target = e.selected?.[0];
      if (target && target.type === 'textbox') {
        selectionTime = Date.now(); // Record when this textbox was selected
        fabricCanvas.isDrawingMode = false;
        component.currentMode.set('type');
        // Exit editing mode if we were in it
        if (target.isEditing) {
          target.exitEditing();
        }
      }
    });
    
    // When selection is cleared (frame disappears), switch back to draw mode
    fabricCanvas.on('selection:cleared', () => {
      selectionTime = 0; // Reset selection time
      fabricCanvas.isDrawingMode = true;
      component.currentMode.set('draw');
      component.setupRoughBrush(fabricCanvas);
      fabricCanvas.renderAll();
    });
    
    // When text editing exits, disable editable again
    fabricCanvas.on('text:editing:exited', (e: any) => {
      const target = e.target;
      if (target && target.type === 'textbox') {
        target.editable = false;
      }
    });
  }

  detectRTL(text: string): boolean {
    // Hebrew: \u0590-\u05FF, Arabic: \u0600-\u06FF
    const rtlPattern = /[\u0590-\u05FF\u0600-\u06FF]/;
    return rtlPattern.test(text);
  }
  
  selectTransition(choice: 'before' | 'during' | 'after') {
    this.transitionChoice.set(choice);
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    
    // Add sketchy circle around the selected transition option using Rough.js
    // The transition section is at bottom: y ~1900, x positions: before=60, during=180, after=300
    let x = 60;
    if (choice === 'during') x = 180;
    if (choice === 'after') x = 300;
    
    // Create an offscreen canvas for rough.js circle
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = fabricCanvas.width;
    offscreenCanvas.height = fabricCanvas.height;
    const rc = rough.canvas(offscreenCanvas);
    
    // Draw rough circle
    rc.circle(x, 1930, 60, {
      stroke: this.currentColor(),
      strokeWidth: 3,
      roughness: 1.2,
      fill: 'transparent',
    });
    
    // Convert to fabric image and add to canvas
    const dataURL = offscreenCanvas.toDataURL();
    fabric.Image.fromURL(dataURL, (img: any) => {
      img.set({
        left: 0,
        top: 0,
        selectable: false,
        evented: false,
      });
      fabricCanvas.add(img);
      fabricCanvas.renderAll();
    });
  }
  
  addTransitionText() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    
    const text = new fabric.Textbox('Type above transition...', {
      left: 180,
      top: 1850,
      fontFamily: this.selectedFont(),
      fontSize: 20,
      fill: this.currentColor(),
      textAlign: 'center',
      width: 320,
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
    
    console.log('[Canvas Creator] Starting export...');
    console.log('[Canvas Creator] Canvas dimensions:', fabricCanvas.width, 'x', fabricCanvas.height);

    // Remove untouched placeholders before export
    const placeholders = this.placeholderTexts.filter(t => (t as any)._placeholder || ((t.text || '').trim() === ((t as any)._placeholderText || 'Type here...')));
    if (placeholders.length) {
      console.log('[Canvas Creator] Removing placeholder textboxes:', placeholders.length);
      placeholders.forEach(tb => fabricCanvas.remove(tb));
      this.placeholderTexts = this.placeholderTexts.filter(t => !placeholders.includes(t));
      fabricCanvas.requestRenderAll();
    }
    
    // Calculate multiplier to export at full resolution (1060x2000)
    // Current canvas is display size, we need to scale up to target size
    const targetWidth = 1060;
    const targetHeight = 2000;
    const multiplier = targetWidth / fabricCanvas.width!;
    
    console.log('[Canvas Creator] Export multiplier:', multiplier, `(${fabricCanvas.width}x${fabricCanvas.height} -> ${targetWidth}x${targetHeight})`);
    
    // Export canvas to JPEG data URL at full resolution
    const dataURL = fabricCanvas.toDataURL({
      format: 'jpeg',    // Use JPEG like scanner
      quality: 0.95,     // Match scanner quality
      multiplier: multiplier,  // Scale up to 1060x2000
    });
    
    console.log('[Canvas Creator] Data URL length:', dataURL.length);
    
    // Convert data URL to blob with explicit MIME type
    const response = await fetch(dataURL);
    const blob = await response.blob();
    
    // Create JPEG blob with explicit MIME type (matching scanner)
    const jpegBlob = new Blob([blob], { type: 'image/jpeg' });
    
    console.log('[Canvas Creator] Final blob - Type:', jpegBlob.type, 'Size:', jpegBlob.size, 'bytes');
    
    this.state.setImage(jpegBlob);
    this.router.navigate(['/confirm'], { queryParamsHandling: 'merge', queryParams: { template: 'true' } });
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
    if (ev.touches.length !== 1) return;
    this.touchStartX = ev.touches[0].clientX;
    this.touchDeltaX = 0;
    this.isSwiping = true;
  }

  onCarouselTouchMove(ev: TouchEvent) {
    if (!this.isSwiping || this.touchStartX === null) return;
    this.touchDeltaX = ev.touches[0].clientX - this.touchStartX;
  }

  onCarouselTouchEnd() {
    if (!this.isSwiping) return;
    const threshold = 50;
    if (this.touchDeltaX > threshold) {
      this.previousTemplate();
    } else if (this.touchDeltaX < -threshold) {
      this.nextTemplate();
    }
    this.touchStartX = null;
    this.touchDeltaX = 0;
    this.isSwiping = false;
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

  setLineHeight(lineHeight: number) {
    this.selectedLineHeight.set(lineHeight);
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) return;
    const active = fabricCanvas.getActiveObject();
    if (active && active.type === 'textbox') {
      active.set('lineHeight', lineHeight);
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

  private addTextboxAt(x: number, y: number, focus = false, placeholderText = 'Type here...', width?: number, fabricCanvas?: any, textAlign?: string, originY?: string) {
    const canvasRef = fabricCanvas || this.canvas();
    const targetCanvas = canvasRef;
    if (!targetCanvas) return;
    const placeholderColor = '#9aa0a6';
    // Create textbox with placeholder text visible
    const text = new fabric.Textbox(placeholderText, {
      left: x,
      top: y,
      fontFamily: this.selectedFont(),
      fontSize: 28,
      fill: placeholderColor,
      width: width || Math.min(360, targetCanvas.getWidth() * 0.6),
      height: this.selectedHeight(),
      editable: true,
      lineHeight: this.selectedLineHeight(),
      textAlign: textAlign || 'left',
      originY: originY || 'top',
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
      text.set({ direction: isRTL ? 'rtl' : 'ltr' });
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
    console.log('🔵 placeInitialChatBoxes called, existing boxes:', this.placeholderTexts.length);
    if (this.placeholderTexts.length) return;
    
    const template = this.selectedTemplate();
    console.log('🔵 Selected template:', template?.id);
    if (!template) return;
    
    // Load textboxes from template preset if available
    const preset = this.templatePresets[template.id];
    console.log('🔵 Preset found:', preset ? 'yes' : 'no', preset);
    if (preset && preset.features) {
      console.log('🔵 Creating', preset.features.length, 'textboxes');
      preset.features.forEach((feature: any) => {
        const props = feature.properties;
        const [x, y] = feature.geometry.coordinates;
        
        console.log('🔵 Creating textbox at', x, y, 'with placeholder:', props.placeholder);
        
        // Set current values from preset
        this.selectedLineHeight.set(props['line-height'] || 1.16);
        this.selectedHeight.set(props.height || 40);
        
        // Create textbox with preset placeholder and width
        const textbox = this.addTextboxAt(x, y, false, props.placeholder, props.width, fabricCanvas, props.textAlign, props.originY);
        if (textbox) {
          this.placeholderTexts.push(textbox);
          console.log('🔵 Textbox created and added to array');
        }
      });
    } else {
      // Fallback to default positions
      const boxes = [
        { x: 150, y: 360 },
        { x: 150, y: 640 },
      ];
      boxes.forEach(pos => {
        const textbox = this.addTextboxAt(pos.x, pos.y, false, 'Type here...', undefined, fabricCanvas);
        if (textbox) this.placeholderTexts.push(textbox);
      });
    }
    console.log('🔵 Total textboxes after placement:', this.placeholderTexts.length);
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

  private exportTextboxesAsGeoJSON() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) {
      console.warn('Canvas not initialized');
      return;
    }

    // Get all textbox objects from the canvas
    const textboxes = fabricCanvas.getObjects().filter((obj: any) => obj.type === 'textbox');
    console.log('Debug: textboxes on canvas:', textboxes.length);
    
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

    console.log('📍 Textbox Positions (GeoJSON)');
    console.log(JSON.stringify(geojson, null, 2));
    console.log('Copy the above JSON to use as a preset.');
  }
}
