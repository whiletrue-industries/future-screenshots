import { AfterViewInit, Component, DestroyRef, ElementRef, signal, ViewChild, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { PlatformService } from '../../platform.service';
import { StateService } from '../../state.service';

declare const fabric: any;

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
  currentMode = signal<'draw' | 'type'>('draw');
  currentColor = signal<string>('#4E02B2'); // Default purple
  showTemplateGallery = signal(true);
  showModeSelection = signal(false);
  transitionChoice = signal<'before' | 'during' | 'after' | null>(null);
  
  // Template gallery
  templates: Template[] = [
    { id: 'camera', name: 'Camera', url: '/templates/template1-camera.svg', preview: '/templates/template1-camera.svg' },
    { id: 'messages', name: 'Messages', url: '/templates/template2-messages.svg', preview: '/templates/template2-messages.svg' },
    { id: 'map', name: 'Map', url: '/templates/template3-map.svg', preview: '/templates/template3-map.svg' },
    { id: 'notification', name: 'Notification', url: '/templates/template4-notification.svg', preview: '/templates/template4-notification.svg' },
    { id: 'blank', name: 'Blank', url: '/templates/template5-blank.svg', preview: '/templates/template5-blank.svg' },
  ];
  
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
    this.showModeSelection.set(true);
  }
  
  selectMode(mode: 'draw' | 'type') {
    this.currentMode.set(mode);
    this.showModeSelection.set(false);
    this.initCanvas();
  }
  
  initCanvas() {
    if (!this.canvasEl) return;
    
    const canvasElement = this.canvasEl.nativeElement;
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      width: 1060,
      height: 2000,
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
    
    // Configure drawing brush
    if (this.currentMode() === 'draw') {
      fabricCanvas.freeDrawingBrush.color = this.currentColor();
      fabricCanvas.freeDrawingBrush.width = 3;
    }
    
    this.canvas.set(fabricCanvas);
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
    
    // Add circle around the selected transition option
    // The transition section is at bottom: y ~1900, x positions: before=60, during=180, after=300
    let x = 60;
    if (choice === 'during') x = 180;
    if (choice === 'after') x = 300;
    
    const circle = new fabric.Circle({
      left: x - 40,
      top: 1900,
      radius: 30,
      stroke: this.currentColor(),
      strokeWidth: 3,
      fill: 'transparent',
      selectable: false,
    });
    
    fabricCanvas.add(circle);
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
