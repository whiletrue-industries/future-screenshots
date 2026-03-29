import { Component, computed, signal, effect, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';
import { FormsModule } from '@angular/forms';

declare const jscanify: any;

type CropPoint = { x: number; y: number };
type CropRect = { left: number; top: number; right: number; bottom: number };

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
  private readonly MIN_CROP_SIZE = 64;

  // Crop overlay state (used when rawCapturedImageUrl is present)
  cropCorners = signal<CropPoint[]>([]);
  cropFrameWidth = signal<number>(0);
  cropFrameHeight = signal<number>(0);
  initialCropCorners = signal<CropPoint[]>([]);
  cropDirty = signal<boolean>(false);
  showCropEditor = signal<boolean>(true);
  activeCornerIndex = signal<number | null>(null);
  private preserveCornersOnNextImageLoad = false;
  private dragPointerOffset: CropPoint | null = null;
  cropPolygonPoints = computed(() =>
    this.cropCorners().map((p) => `${p.x},${p.y}`).join(' ')
  );
  cropRect = computed<CropRect>(() => {
    const points = this.cropCorners();
    if (points.length !== 4) {
      return { left: 0, top: 0, right: 0, bottom: 0 };
    }
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    return {
      left: Math.min(...xs),
      top: Math.min(...ys),
      right: Math.max(...xs),
      bottom: Math.max(...ys),
    };
  });

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

  reopenCropEditor() {
    this.preserveCornersOnNextImageLoad = true;
    this.cropDirty.set(true);
    this.showCropEditor.set(true);
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
    const preserveExisting = this.preserveCornersOnNextImageLoad;
    this.preserveCornersOnNextImageLoad = false;

    const previousWidth = this.cropFrameWidth();
    const previousHeight = this.cropFrameHeight();
    const previousCorners = this.cropCorners();

    const w = imageEl.clientWidth;
    const h = imageEl.clientHeight;
    this.cropFrameWidth.set(w);
    this.cropFrameHeight.set(h);

    if (preserveExisting && previousCorners.length === 4 && previousWidth > 0 && previousHeight > 0) {
      const scaleX = w / previousWidth;
      const scaleY = h / previousHeight;
      const preserved = previousCorners.map((p) => ({
        x: this.clamp(p.x * scaleX, 0, w),
        y: this.clamp(p.y * scaleY, 0, h),
      }));
      this.cropCorners.set(preserved);
      return;
    }

    const pending = this.state.pendingCropCorners();
    if (pending && imageEl.naturalWidth > 0) {
      // Scale from natural (video) coordinates to display coordinates
      const scaleX = w / imageEl.naturalWidth;
      const scaleY = h / imageEl.naturalHeight;
      const scaledPoints = [
        { x: pending.topLeftCorner.x * scaleX,     y: pending.topLeftCorner.y * scaleY },
        { x: pending.topRightCorner.x * scaleX,    y: pending.topRightCorner.y * scaleY },
        { x: pending.bottomRightCorner.x * scaleX, y: pending.bottomRightCorner.y * scaleY },
        { x: pending.bottomLeftCorner.x * scaleX,  y: pending.bottomLeftCorner.y * scaleY },
      ];

      const normalizedPoints = this.normalizeCorners(scaledPoints, w, h);
      this.cropCorners.set(normalizedPoints);
      this.initialCropCorners.set(normalizedPoints.map((p) => ({ ...p })));
      this.cropDirty.set(false);
      this.showCropEditor.set(true);
    } else {
      const m = 0.15;
      const corners = [
        { x: this.clamp(w * m, 0, w),       y: this.clamp(h * m, 0, h) },
        { x: this.clamp(w * (1 - m), 0, w), y: this.clamp(h * m, 0, h) },
        { x: this.clamp(w * (1 - m), 0, w), y: this.clamp(h * (1 - m), 0, h) },
        { x: this.clamp(w * m, 0, w),       y: this.clamp(h * (1 - m), 0, h) },
      ];
      this.cropCorners.set(corners);
      this.initialCropCorners.set(corners.map((p) => ({ ...p })));
      this.cropDirty.set(false);
      this.showCropEditor.set(true);
    }
  }

  startDraggingCorner(index: number, event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    const pointer = this.mapPointerToFrame(event.clientX, event.clientY);
    const currentCorner = this.cropCorners()[index];
    if (!pointer || !currentCorner) {
      return;
    }

    this.dragPointerOffset = {
      x: pointer.x - currentCorner.x,
      y: pointer.y - currentCorner.y,
    };
    this.dragCornerIndex = index;
    this.activeCornerIndex.set(index);
    (event.currentTarget as HTMLElement | null)?.setPointerCapture?.(event.pointerId);
    if (typeof window !== 'undefined') {
      window.addEventListener('pointermove', this.pointerMoveHandler);
      window.addEventListener('pointerup', this.pointerUpHandler);
    }
  }

  private onPointerMove(event: PointerEvent) {
    if (this.dragCornerIndex === null) return;
    this.updateCornerFromPointer(this.dragCornerIndex, event.clientX, event.clientY);
  }

  private updateCornerFromPointer(index: number, clientX: number, clientY: number) {
    const pointer = this.mapPointerToFrame(clientX, clientY);
    if (!pointer) return;
    const frameWidth = this.cropFrameWidth();
    const frameHeight = this.cropFrameHeight();
    const offset = this.dragPointerOffset || { x: 0, y: 0 };
    const nextX = this.clamp(pointer.x - offset.x, 0, frameWidth);
    const nextY = this.clamp(pointer.y - offset.y, 0, frameHeight);
    this.cropCorners.update((points) => {
      if (points.length !== 4) {
        return points;
      }
      this.cropDirty.set(true);
      const next = [...points];
      next[index] = { x: nextX, y: nextY };
      return next;
    });
  }

  private mapPointerToFrame(clientX: number, clientY: number): CropPoint | null {
    const imageEl = this.rawImageEl?.nativeElement;
    if (!imageEl) {
      return null;
    }
    const rect = imageEl.getBoundingClientRect();
    return {
      x: this.clamp(clientX - rect.left, 0, this.cropFrameWidth()),
      y: this.clamp(clientY - rect.top, 0, this.cropFrameHeight()),
    };
  }

  handleRadius(index: number): number {
    return this.activeCornerIndex() === index ? 64 : 60;
  }

  cancelCropChanges() {
    const initial = this.initialCropCorners();
    if (initial.length !== 4) {
      return;
    }
    this.cropCorners.set(initial.map((p) => ({ ...p })));
    this.cropDirty.set(false);
    this.showCropEditor.set(true);
    this.activeCornerIndex.set(null);
  }

  cropPreview() {
    const rawBlob = this.state.rawCapturedImage();
    if (!rawBlob) {
      return;
    }

    this.extractCroppedBlob(rawBlob, (blob) => {
      if (blob) {
        this.state.setImage(blob);
      }
      // Keep raw image to allow returning to crop editor.
      this.cropDirty.set(false);
      this.showCropEditor.set(false);
      this.activeCornerIndex.set(null);
    });
  }

  private clamp(value: number, min: number, max: number): number {
    if (!Number.isFinite(value)) {
      return min;
    }
    return Math.min(max, Math.max(min, value));
  }

  private normalizeCorners(points: CropPoint[], w: number, h: number): CropPoint[] {
    const clamped = points.map((p) => ({
      x: this.clamp(p.x, 0, w),
      y: this.clamp(p.y, 0, h),
    }));

    // If input is clearly unusable, fall back to a centered rectangle.
    if (clamped.some((p) => !Number.isFinite(p.x) || !Number.isFinite(p.y))) {
      const m = 0.15;
      return [
        { x: this.clamp(w * m, 0, w),       y: this.clamp(h * m, 0, h) },
        { x: this.clamp(w * (1 - m), 0, w), y: this.clamp(h * m, 0, h) },
        { x: this.clamp(w * (1 - m), 0, w), y: this.clamp(h * (1 - m), 0, h) },
        { x: this.clamp(w * m, 0, w),       y: this.clamp(h * (1 - m), 0, h) },
      ];
    }

    // Keep incoming order (TL, TR, BR, BL) to preserve scanner geometry.
    // If points collapse to duplicates after clamping, reset to a safe rectangle.
    const uniquePointCount = new Set(clamped.map((p) => `${Math.round(p.x)}:${Math.round(p.y)}`)).size;
    if (uniquePointCount < 4) {
      const m = 0.15;
      return [
        { x: this.clamp(w * m, 0, w),       y: this.clamp(h * m, 0, h) },
        { x: this.clamp(w * (1 - m), 0, w), y: this.clamp(h * m, 0, h) },
        { x: this.clamp(w * (1 - m), 0, w), y: this.clamp(h * (1 - m), 0, h) },
        { x: this.clamp(w * m, 0, w),       y: this.clamp(h * (1 - m), 0, h) },
      ];
    }

    return clamped;
  }

  private rectFromPoints(points: CropPoint[], w: number, h: number, inset: number): CropRect {
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minSize = Math.max(this.MIN_CROP_SIZE, inset * 2);

    let left = this.clamp(Math.min(...xs), inset, w - inset);
    let right = this.clamp(Math.max(...xs), inset, w - inset);
    let top = this.clamp(Math.min(...ys), inset, h - inset);
    let bottom = this.clamp(Math.max(...ys), inset, h - inset);

    if (right - left < minSize) {
      right = this.clamp(left + minSize, inset, w - inset);
      left = this.clamp(right - minSize, inset, w - inset);
    }
    if (bottom - top < minSize) {
      bottom = this.clamp(top + minSize, inset, h - inset);
      top = this.clamp(bottom - minSize, inset, h - inset);
    }

    return { left, top, right, bottom };
  }

  private cornersFromRect(rect: CropRect): CropPoint[] {
    return [
      { x: rect.left, y: rect.top },
      { x: rect.right, y: rect.top },
      { x: rect.right, y: rect.bottom },
      { x: rect.left, y: rect.bottom },
    ];
  }

  private stopDraggingCorner() {
    this.dragCornerIndex = null;
    this.dragPointerOffset = null;
    this.activeCornerIndex.set(null);
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this.pointerMoveHandler);
      window.removeEventListener('pointerup', this.pointerUpHandler);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this.pointerMoveHandler);
      window.removeEventListener('pointerup', this.pointerUpHandler);
    }
  }

  upload() {
    const rawBlob = this.state.rawCapturedImage();
    if (rawBlob) {
      this.applyCropAndUpload(rawBlob);
      return;
    }
    this.proceedWithUpload();
  }

  private extractCroppedBlob(rawBlob: Blob, done: (blob: Blob | null) => void) {
    const imageEl = this.rawImageEl?.nativeElement;
    if (!imageEl) {
      done(null);
      return;
    }

    // Use the exact assigned corner order (TL, TR, BR, BL) from the editor.
    const corners = this.cropCorners();
    if (corners.length !== 4) {
      done(null);
      return;
    }

    const frameWidth = this.cropFrameWidth();
    const frameHeight = this.cropFrameHeight();
    const rect = this.rectFromPoints(corners, frameWidth, frameHeight, 0);
    const minSize = Math.max(2, this.MIN_CROP_SIZE);
    if (rect.right - rect.left < minSize || rect.bottom - rect.top < minSize) {
      done(null);
      return;
    }

    if (!(window as any).cv?.Mat) {
      done(rawBlob);
      return;
    }

    const scaleX = imageEl.naturalWidth / imageEl.clientWidth;
    const scaleY = imageEl.naturalHeight / imageEl.clientHeight;
    const naturalCorners = {
      topLeftCorner:     { x: corners[0].x * scaleX, y: corners[0].y * scaleY },
      topRightCorner:    { x: corners[1].x * scaleX, y: corners[1].y * scaleY },
      bottomRightCorner: { x: corners[2].x * scaleX, y: corners[2].y * scaleY },
      bottomLeftCorner:  { x: corners[3].x * scaleX, y: corners[3].y * scaleY },
    };

    // Compute output dimensions from the polygon's actual edge lengths to avoid top/bottom margins.
    const topW = Math.hypot(
      naturalCorners.topRightCorner.x - naturalCorners.topLeftCorner.x,
      naturalCorners.topRightCorner.y - naturalCorners.topLeftCorner.y,
    );
    const bottomW = Math.hypot(
      naturalCorners.bottomRightCorner.x - naturalCorners.bottomLeftCorner.x,
      naturalCorners.bottomRightCorner.y - naturalCorners.bottomLeftCorner.y,
    );
    const leftH = Math.hypot(
      naturalCorners.bottomLeftCorner.x - naturalCorners.topLeftCorner.x,
      naturalCorners.bottomLeftCorner.y - naturalCorners.topLeftCorner.y,
    );
    const rightH = Math.hypot(
      naturalCorners.bottomRightCorner.x - naturalCorners.topRightCorner.x,
      naturalCorners.bottomRightCorner.y - naturalCorners.topRightCorner.y,
    );
    const outW = Math.max(2, Math.round((topW + bottomW) / 2));
    const outH = Math.max(2, Math.round((leftH + rightH) / 2));

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        done(rawBlob);
        return;
      }
      ctx.drawImage(img, 0, 0);

      try {
        const cv = (window as any).cv;
        const src = cv.imread(canvas);
        const dst = new cv.Mat();
        const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
          naturalCorners.topLeftCorner.x, naturalCorners.topLeftCorner.y,
          naturalCorners.topRightCorner.x, naturalCorners.topRightCorner.y,
          naturalCorners.bottomRightCorner.x, naturalCorners.bottomRightCorner.y,
          naturalCorners.bottomLeftCorner.x, naturalCorners.bottomLeftCorner.y,
        ]);
        const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
          0, 0,
          outW - 1, 0,
          outW - 1, outH - 1,
          0, outH - 1,
        ]);

        const transform = cv.getPerspectiveTransform(srcTri, dstTri);
        cv.warpPerspective(
          src,
          dst,
          transform,
          new cv.Size(outW, outH),
          cv.INTER_LINEAR,
          cv.BORDER_REPLICATE,
          new cv.Scalar(),
        );

        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = outW;
        outputCanvas.height = outH;
        cv.imshow(outputCanvas, dst);

        src.delete();
        dst.delete();
        srcTri.delete();
        dstTri.delete();
        transform.delete();

        outputCanvas.toBlob((blob: Blob | null) => done(blob), 'image/jpeg', 0.95);
      } catch {
        if ((window as any).jscanify) {
          const scanner = new jscanify();
          const resultCanvas: HTMLCanvasElement = scanner.extractPaper(canvas, outW, outH, naturalCorners);
          resultCanvas.toBlob((blob: Blob | null) => done(blob), 'image/jpeg', 0.95);
          return;
        }
        done(rawBlob);
      }
    };
    img.src = this.state.rawCapturedImageUrl()!;
  }

  private applyCropAndUpload(rawBlob: Blob) {
    this.extractCroppedBlob(rawBlob, (blob) => {
      if (blob) {
        this.state.setImage(blob);
      }
      this.state.clearRawImage();
      this.cropDirty.set(false);
      this.showCropEditor.set(false);
      this.proceedWithUpload();
    });
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
