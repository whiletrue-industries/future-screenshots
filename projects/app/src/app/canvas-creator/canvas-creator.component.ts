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
  imports: [RouterLink],
  templateUrl: './canvas-creator.component.html',
  styleUrl: './canvas-creator.component.less'
})
export class CanvasCreatorComponent implements AfterViewInit {
  @ViewChild('canvasEl', { static: false}) canvasEl!: ElementRef<HTMLCanvasElement>;
  
  canvas = signal<any | null>(null);
  selectedTemplate = signal<Template | null>(null);
  currentMode = signal<'draw' | 'type'>('type'); // Default to write mode
  currentColor = signal<string>('#4E02B2'); // Default purple
  showTemplateGallery = signal(true);
  showModeSelection = signal(false);
  transitionChoice = signal<'before' | 'during' | 'after' | null>(null);
  currentTemplateIndex = signal(0); // For carousel navigation
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
  
  // Template gallery
  templates: Template[] = [
    { id: 'chat', name: 'Chat', url: '/templates/FS_template_chat.png', preview: '/templates/FS_template_chat.png' },
    { id: 'holyland', name: 'Map', url: '/templates/FS_template_holyland.png', preview: '/templates/FS_template_holyland.png' },
  ];

  // Template presets: GeoJSON with textbox positions and properties
  templatePresets: { [key: string]: any } = {
    chat: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [71.98606597335078, 78.890625],
          },
          properties: {
            id: 'textbox-1',
            placeholder: 'message 1a',
            'line-height': 1.1,
            width: 225.1559961000974,
            height: 31.64,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [42.01979548725569, 300.3671875],
          },
          properties: {
            id: 'textbox-2',
            placeholder: 'message 2',
            'line-height': 1.1,
            width: 222.44713078601603,
            height: 31.64,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [69.17226310413666, 494.140625],
          },
          properties: {
            id: 'textbox-3',
            placeholder: 'message 1b',
            'line-height': 1.1,
            width: 220.41225799712151,
            height: 31.64,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [90.24133548447011, 569.28125],
          },
          properties: {
            id: 'transition',
            placeholder: 'transition',
            'line-height': 1.1,
            width: 156.50540298992513,
            height: 31.64,
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
    console.log('🔵 ngAfterViewInit complete');
  }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.key === 'E') {
      event.preventDefault();
      this.exportTextboxesAsGeoJSON();
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
    const index = this.currentTemplateIndex();
    this.currentTemplateIndex.set(index > 0 ? index - 1 : this.templates.length - 1);
  }
  
  nextTemplate() {
    const index = this.currentTemplateIndex();
    this.currentTemplateIndex.set((index + 1) % this.templates.length);
  }
  
  useCurrentTemplate() {
    this.selectTemplate(this.currentTemplate());
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
    // Configure drawing brush with Rough.js sketchy effect
    if (this.currentMode() === 'draw') {
      this.setupRoughBrush(fabricCanvas);
    }
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
    
    // Create custom Rough.js brush
    const RoughBrush = fabric.util.createClass(fabric.PencilBrush, {
      color: color,
      width: 3,
      
      onMouseDown: function(pointer: any, options: any) {
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
        fabric.Image.fromURL(dataURL, (img: any) => {
          img.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
          });
          this.canvas.add(img);
          this.canvas.renderAll();
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
    
    // Export canvas to JPEG data URL (matching scanner format)
    const dataURL = fabricCanvas.toDataURL({
      format: 'jpeg',  // Use JPEG like scanner
      quality: 0.95,   // Match scanner quality
      multiplier: 1,   // Keep current size (1060x2000)
    });
    
    console.log('[Canvas Creator] Data URL length:', dataURL.length);
    
    // Convert data URL to blob with explicit MIME type
    const response = await fetch(dataURL);
    const blob = await response.blob();
    
    // Create JPEG blob with explicit MIME type (matching scanner)
    const jpegBlob = new Blob([blob], { type: 'image/jpeg' });
    
    console.log('[Canvas Creator] Final blob - Type:', jpegBlob.type, 'Size:', jpegBlob.size, 'bytes');
    
    this.state.setImage(jpegBlob);
    this.router.navigate(['/confirm'], { queryParamsHandling: 'merge' });
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

  private addTextboxAt(x: number, y: number, focus = false, placeholderText = 'Type here...', width?: number, fabricCanvas?: any) {
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
    // Allow width resize via side handles only; corners will resize font uniformly
    text.setControlsVisibility({
      ml: true, mr: true,
      mt: false, mb: false,
      tl: true, tr: true, bl: true, br: true,
      mtr: false,
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
        const textbox = this.addTextboxAt(x, y, false, props.placeholder, props.width, fabricCanvas);
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
    this.placeholderTexts.forEach(t => {
      t.set({ visible: show });
    });
    this.canvas()?.requestRenderAll();
  }

  private exportTextboxesAsGeoJSON() {
    const fabricCanvas = this.canvas();
    if (!fabricCanvas) {
      console.warn('Canvas not initialized');
      return;
    }

    console.log('Debug: placeholderTexts count:', this.placeholderTexts.length);
    if (this.placeholderTexts.length > 0) {
      console.log('Debug: first textbox sample:', this.placeholderTexts[0]);
    }
    
    const features = this.placeholderTexts.map((textbox, index) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [textbox.left, textbox.top],
      },
      properties: {
        id: `textbox-${index}`,
        placeholder: textbox._presetPlaceholder || textbox.text || 'message…',
        'line-height': textbox.lineHeight || 1.16,
        width: textbox.width,
        height: textbox.height || 40,
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
