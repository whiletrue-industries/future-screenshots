import { Component, computed, signal, effect, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';
import { FormsModule } from '@angular/forms';

declare const jscanify: any;

type CropPoint = { x: number; y: number };

@Component({
  selector: 'app-confirm',
  imports: [
    RouterLink,
    LtrDirective,
    FormsModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less'
})
export class ConfirmComponent implements OnDestroy {
  isTemplateFlow = false;

  // Crop overlay state (used when rawCapturedImageUrl is present)
  cropCorners = signal<CropPoint[]>([]);
  cropFrameWidth = signal<number>(0);
  cropFrameHeight = signal<number>(0);
  cropPolygonPoints = computed(() =>
    this.cropCorners().map(p => `${p.x},${p.y}`).join(' ')
  );

  private dragCornerIndex: number | null = null;
  private readonly pointerMoveHandler = (event: PointerEvent) => this.onPointerMove(event);
  private readonly pointerUpHandler = () => this.stopDraggingCorner();

  @ViewChild('rawImage') rawImageEl?: ElementRef<HTMLImageElement>;

  preferenceOptions = [
    { label: $localize`Preferred`, value: 'prefer' },
    { label: $localize`Mostly Preferred`, value: 'mostly prefer' },
    { label: $localize`Mostly Prevented`, value: 'mostly prevent' },
    { label: $localize`Prevented`, value: 'prevent' }
  ];

  potentialOptions = [
    { label: $localize`Projected`, value: 100 },
    { label: $localize`Probable`, value: 75 },
    { label: $localize`Plausible`, value: 50 },
    { label: $localize`Possible`, value: 25 },
    { label: $localize`Preposterous`, value: 0 }
  ];

  availableTags = computed(() => this.api.getAvailableTags());
  showSuggestions = signal(false);
  
  filteredTags = computed(() => {
    const input = this.state.batchTagsInput().toLowerCase().trim();
    if (!input) {
      return this.availableTags();
    }
    
    const currentTags = this.state.batchTags();
    return this.availableTags().filter(tag => 
      tag.toLowerCase().includes(input) && 
      !currentTags.includes(tag)
    );
  });

  constructor(public state: StateService, private router: Router, public api: ApiService, private route: ActivatedRoute) { 
    this.api.updateFromRoute(this.route.snapshot);
    this.isTemplateFlow = this.route.snapshot.queryParamMap.get('template') === 'true';

    if (!this.state.currentImageUrl() && !this.state.rawCapturedImageUrl()) {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }

  onTagInputChange(value: string): void {
    this.state.batchTagsInput.set(value);
    this.showSuggestions.set(value.trim().length > 0);
  }

  onKeyDown(event: KeyboardEvent): void {
    const currentInput = this.state.batchTagsInput();
    
    // Check for Enter or Comma to add tag
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const tag = currentInput.trim().replace(/,$/g, '');
      if (tag) {
        this.addTag(tag);
      }
    }
    // Check for Backspace to remove last tag when input is empty
    else if (event.key === 'Backspace' && !currentInput && this.state.batchTags().length > 0) {
      event.preventDefault();
      const tags = this.state.batchTags();
      this.removeTag(tags[tags.length - 1]);
    }
  }

  handleSuggestionClick(tag: string, event: MouseEvent): void {
    event.preventDefault();
    this.onSuggestionSelect(tag);
  }

  addTag(tag: string): void {
    const trimmedTag = tag.trim();
    if (trimmedTag && !this.state.batchTags().includes(trimmedTag)) {
      const newTags = [...this.state.batchTags(), trimmedTag];
      this.state.batchTags.set(newTags);
      this.state.batchTagsInput.set('');
      this.showSuggestions.set(false);
    }
  }

  removeTag(tag: string): void {
    const newTags = this.state.batchTags().filter(t => t !== tag);
    this.state.batchTags.set(newTags);
  }

  onSuggestionSelect(tag: string): void {
    this.addTag(tag);
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions.set(false);
    }, 200);
  }

  scanAgain() {
    this.state.clearRawImage();
    this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
  }

  onRawImageLoaded() {
    const tryInit = (retries = 5) => {
      const imageEl = this.rawImageEl?.nativeElement;
      if (imageEl && imageEl.clientWidth > 0 && imageEl.clientHeight > 0) {
        this.initCropCorners(imageEl);
      } else if (retries > 0) {
        requestAnimationFrame(() => tryInit(retries - 1));
      }
    };
    requestAnimationFrame(() => tryInit());
  }

  private initCropCorners(imageEl: HTMLImageElement) {
    const w = imageEl.clientWidth;
    const h = imageEl.clientHeight;
    this.cropFrameWidth.set(w);
    this.cropFrameHeight.set(h);

    const pending = this.state.pendingCropCorners();
    if (pending && imageEl.naturalWidth > 0) {
      // Scale from natural (video) coordinates to display coordinates
      const scaleX = w / imageEl.naturalWidth;
      const scaleY = h / imageEl.naturalHeight;
      this.cropCorners.set([
        { x: pending.topLeftCorner.x * scaleX,     y: pending.topLeftCorner.y * scaleY },
        { x: pending.topRightCorner.x * scaleX,    y: pending.topRightCorner.y * scaleY },
        { x: pending.bottomRightCorner.x * scaleX, y: pending.bottomRightCorner.y * scaleY },
        { x: pending.bottomLeftCorner.x * scaleX,  y: pending.bottomLeftCorner.y * scaleY },
      ]);
    } else {
      const m = 0.15;
      this.cropCorners.set([
        { x: w * m,       y: h * m },
        { x: w * (1 - m), y: h * m },
        { x: w * (1 - m), y: h * (1 - m) },
        { x: w * m,       y: h * (1 - m) },
      ]);
    }
  }

  startDraggingCorner(index: number, event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCornerIndex = index;
    window.addEventListener('pointermove', this.pointerMoveHandler);
    window.addEventListener('pointerup', this.pointerUpHandler);
  }

  private onPointerMove(event: PointerEvent) {
    if (this.dragCornerIndex === null) return;
    const imageEl = this.rawImageEl?.nativeElement;
    if (!imageEl) return;
    const rect = imageEl.getBoundingClientRect();
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;
    this.cropCorners.update(points => {
      const next = [...points];
      next[this.dragCornerIndex!] = { x: nextX, y: nextY };
      return next;
    });
  }

  private stopDraggingCorner() {
    this.dragCornerIndex = null;
    window.removeEventListener('pointermove', this.pointerMoveHandler);
    window.removeEventListener('pointerup', this.pointerUpHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('pointermove', this.pointerMoveHandler);
    window.removeEventListener('pointerup', this.pointerUpHandler);
  }

  upload() {
    const rawBlob = this.state.rawCapturedImage();
    if (rawBlob) {
      this.applyCropAndUpload(rawBlob);
      return;
    }
    this.proceedWithUpload();
  }

  private applyCropAndUpload(rawBlob: Blob) {
    const imageEl = this.rawImageEl?.nativeElement;
    if (!imageEl) { this.proceedWithUpload(); return; }

    const corners = this.cropCorners();
    if (corners.length !== 4) { this.proceedWithUpload(); return; }

    if (!(window as any).jscanify || !(window as any).cv?.Mat) {
      // jscanify not available — fall back to uploading raw
      this.state.setImage(rawBlob);
      this.state.clearRawImage();
      this.proceedWithUpload();
      return;
    }

    // Scale display corners to natural pixel space (what jscanify reads from the canvas)
    const scaleX = imageEl.naturalWidth / imageEl.clientWidth;
    const scaleY = imageEl.naturalHeight / imageEl.clientHeight;
    const naturalCorners = {
      topLeftCorner:     { x: corners[0].x * scaleX, y: corners[0].y * scaleY },
      topRightCorner:    { x: corners[1].x * scaleX, y: corners[1].y * scaleY },
      bottomRightCorner: { x: corners[2].x * scaleX, y: corners[2].y * scaleY },
      bottomLeftCorner:  { x: corners[3].x * scaleX, y: corners[3].y * scaleY },
    };

    // Draw the raw image onto an offscreen canvas at natural resolution and extract
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')!.drawImage(img, 0, 0);

      const scanner = new jscanify();
      const resultCanvas: HTMLCanvasElement = scanner.extractPaper(canvas, 1060, 2000, naturalCorners);
      resultCanvas.toBlob((blob: Blob | null) => {
        if (blob) {
          this.state.setImage(blob);
        }
        this.state.clearRawImage();
        this.proceedWithUpload();
      }, 'image/jpeg', 0.95);
    };
    img.src = this.state.rawCapturedImageUrl()!;
  }

  private proceedWithUpload() {
    const currentImage = this.state.currentImage();
    if (!currentImage) {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
      return;
    }

    // Check if this is a replace flow (replacing an existing item's image)
    const replaceItemId = this.api.replaceItemId();
    if (replaceItemId) {
      this.uploadReplace(currentImage, replaceItemId, this.api.replaceItemKey() || undefined);
      return;
    }

    const metadata: any = {};

    // Add preference if selected
    const pref = this.state.batchPreference();
    if (pref) {
      metadata['favorable_future'] = pref;
    }

    // Add potential if selected
    const pot = this.state.batchPotential();
    if (pot !== null) {
      metadata['plausibility'] = pot;
    }

    // Add textbox data if available
    const textboxData = this.state.currentTextboxData();
    if (textboxData) {
      metadata.textbox_content = textboxData;
    }

    // Add tags - merge batch tags with template tags
    const tags = this.state.batchTags();
    if (this.isTemplateFlow) {
      metadata.tags = ['no-paper', ...tags];
    } else if (tags.length > 0) {
      metadata.tags = tags;
    }

    if (!this.api.automatic()) {
      this.api.uploadImage(currentImage, metadata).subscribe({
        next: (res) => {
          const params: any = {
            'item-id': res.item_id,
            'key': res.item_key
          };
          if (this.isTemplateFlow) {
            params['template'] = 'true';
          }
          this.router.navigate(['/props'], { queryParams: params, queryParamsHandling: 'merge' });
        },
        error: (error) => {
          console.error('[CONFIRM] Failed to upload image:', error);
          if (error.status === 403) {
            alert('Access denied. Please check that you have the correct API key with write permissions for this workspace.');
          } else {
            alert('Failed to upload image. Please try again or contact support.');
          }
        }
      });
    } else {
      this.api.uploadImageAuto(currentImage, metadata).subscribe(() => {
        this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
      });
    }
  }

  private uploadReplace(image: Blob, replaceItemId: string, itemKey?: string) {
    this.api.replaceImage(image, replaceItemId, itemKey).subscribe({
      next: () => {
        this.api.replaceItemId.set(null);
        this.api.replaceItemKey.set(null);
        const cleanParams = { ...this.route.snapshot.queryParams };
        delete cleanParams['replace_item'];
        delete cleanParams['replace_item_key'];
        if (this.api.automatic()) {
          this.router.navigate(['/scan'], { queryParams: cleanParams });
        } else {
          alert('Image replaced successfully.');
          this.router.navigate(['/scan'], { queryParams: cleanParams });
        }
      },
      error: (error) => {
        console.error('[CONFIRM] Failed to replace image:', error);
        if (error.status === 403) {
          alert('Access denied. Please check that you have the correct API key.');
        } else {
          alert('Failed to replace image. Please try again.');
        }
      }
    });
  }
}
