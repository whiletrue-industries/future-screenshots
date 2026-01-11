import { AfterViewInit, Component, DestroyRef, ElementRef, signal, ViewChild, computed } from '@angular/core';
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
  
  // Template gallery
  templates: Template[] = [
    { id: 'camera', name: 'Camera', url: '/templates/template1.png', preview: '/templates/template1.png' },
    { id: 'messages', name: 'Messages', url: '/templates/template2.png', preview: '/templates/template2.png' },
    { id: 'map', name: 'Map', url: '/templates/template3.png', preview: '/templates/template3.png' },
    { id: 'notification', name: 'Notification', url: '/templates/template4.png', preview: '/templates/template4.png' },
    { id: 'blank', name: 'Blank', url: '/templates/template5.png', preview: '/templates/template5.png' },
  ];
  
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
    this.api.updateFromRoute(this.route.snapshot);
    // Select random color on init
    this.currentColor.set(this.markerColors[Math.floor(Math.random() * this.markerColors.length)]);
  }
  
  ngAfterViewInit(): void {
    if (!this.platform.browser()) {
      return;
    }
  }
  
  selectTemplate(template: Template) {
    this.selectedTemplate.set(template);
    this.showTemplateGallery.set(false);
    this.showModeSelection.set(false);
    this.initCanvas();
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
    }
  }
  
  selectMode(mode: 'draw' | 'type') {
    this.currentMode.set(mode);
    this.showModeSelection.set(false);
    this.initCanvas();
  }
  
  initCanvas() {
    if (!this.canvasEl) return;
    
    const canvasElement = this.canvasEl.nativeElement;
    const container = canvasElement.parentElement;
    const containerWidth = container?.clientWidth || 360;
    const containerHeight = container?.clientHeight || 640;
    
    // Calculate dimensions maintaining aspect ratio
    const aspectRatio = 9 / 16; // Phone screen
    let canvasWidth = containerWidth - 32; // padding
    let canvasHeight = canvasWidth / aspectRatio;
    
    if (canvasHeight > containerHeight - 32) {
      canvasHeight = containerHeight - 32;
      canvasWidth = canvasHeight * aspectRatio;
    }
    
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      width: canvasWidth,
      height: canvasHeight,
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
    
    // Configure drawing brush with Rough.js sketchy effect
    if (this.currentMode() === 'draw') {
      this.setupRoughBrush(fabricCanvas);
    }
    
    this.canvas.set(fabricCanvas);
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
    
    const randomFont = this.handwritingFonts[Math.floor(Math.random() * this.handwritingFonts.length)];
    const text = new fabric.IText('Type here...', {
      left: 100,
      top: 100,
      fontFamily: randomFont,
      fontSize: 24,
      fill: this.currentColor(),
    });
    
    // Detect text direction
    text.on('changed', () => {
      const textContent = text.text || '';
      const isRTL = this.detectRTL(textContent);
      text.set({ direction: isRTL ? 'rtl' : 'ltr' });
      fabricCanvas.renderAll();
    });
    
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    text.enterEditing();
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
    
    const randomFont = this.handwritingFonts[Math.floor(Math.random() * this.handwritingFonts.length)];
    const text = new fabric.IText('Type above transition...', {
      left: 180,
      top: 1850,
      fontFamily: randomFont,
      fontSize: 20,
      fill: this.currentColor(),
      textAlign: 'center',
    });
    
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
    
    // Export canvas to blob
    const dataURL = fabricCanvas.toDataURL({
      format: 'jpeg',
      quality: 0.95,
      multiplier: 1,
    });
    
    const blob = await fetch(dataURL).then(r => r.blob());
    this.state.setImage(blob);
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
}
