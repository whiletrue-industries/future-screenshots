import { Component, computed, signal, effect, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';
import { FormsModule } from '@angular/forms';

declare const jscanify: any;

type CropPoint = { x: number; y: number };
type CropRect = { left: number; top: number; right: number; bottom: number };
type CropCorners = {
  topLeftCorner: CropPoint;
  topRightCorner: CropPoint;
  bottomRightCorner: CropPoint;
  bottomLeftCorner: CropPoint;
};

type CaptureSource = 'video' | 'still';
type SourceCornerState = {
  corners: CropPoint[];
  frameWidth: number;
  frameHeight: number;
  edited: boolean;
};

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
  alternateCapturePreviewUrl = signal<string | null>(null);
  alternateCapturePreviewBusy = signal<boolean>(false);
  private preserveCornersOnNextImageLoad = false;
  private dragPointerOffset: CropPoint | null = null;
  private frameResizeObserver?: ResizeObserver;
  private frameSyncRafId: number | null = null;
  private alternatePreviewTimerId: ReturnType<typeof setTimeout> | null = null;
  private alternatePreviewRequestId = 0;
  private sourceCornerState: Partial<Record<CaptureSource, SourceCornerState>> = {};
  cropPolygonPoints = computed(() =>
    this.cropCorners().map((p) => `${p.x},${p.y}`).join(' ')
  );
  private dragCornerIndex: number | null = null;
  private readonly pointerMoveHandler = (event: PointerEvent) => this.onPointerMove(event);
  private readonly pointerUpHandler = () => this.stopDraggingCorner();
  overlayOffsetX = signal<number>(0);
  overlayOffsetY = signal<number>(0);

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

  canToggleCaptureSource = computed(() =>
    !!this.state.rawCapturedImageVideo() && !!this.state.rawCapturedImageStill()
  );

  alternateCaptureLabel = computed(() =>
    this.state.rawCaptureSource() === 'still' ? 'ALT: VID' : 'ALT: STILL'
  );

  constructor(public state: StateService, private router: Router, public api: ApiService, private route: ActivatedRoute) { 
    this.api.updateFromRoute(this.route.snapshot);
    this.isTemplateFlow = this.route.snapshot.queryParamMap.get('template') === 'true';

    if (!this.state.currentImageUrl() && !this.state.rawCapturedImageUrl()) {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }

    // If pending corners are updated asynchronously (e.g. still-image analysis),
    // apply them only while the active source has not been user-edited.
    effect(() => {
      const pending = this.state.pendingCropCorners();
      const source = this.activeCaptureSource();
      const sourceState = source ? this.sourceCornerState[source] : null;
      const imageEl = this.rawImageEl?.nativeElement;
      const frameW = this.cropFrameWidth();
      const frameH = this.cropFrameHeight();

      if (!pending || !source || sourceState?.edited || !this.showCropEditor() || !imageEl || imageEl.naturalWidth <= 0 || frameW <= 0 || frameH <= 0) {
        return;
      }

      const scaleX = frameW / imageEl.naturalWidth;
      const scaleY = frameH / imageEl.naturalHeight;
      const clampedPendingPoints = [
        { x: this.clamp(pending.topLeftCorner.x * scaleX, 0, frameW), y: this.clamp(pending.topLeftCorner.y * scaleY, 0, frameH) },
        { x: this.clamp(pending.topRightCorner.x * scaleX, 0, frameW), y: this.clamp(pending.topRightCorner.y * scaleY, 0, frameH) },
        { x: this.clamp(pending.bottomRightCorner.x * scaleX, 0, frameW), y: this.clamp(pending.bottomRightCorner.y * scaleY, 0, frameH) },
        { x: this.clamp(pending.bottomLeftCorner.x * scaleX, 0, frameW), y: this.clamp(pending.bottomLeftCorner.y * scaleY, 0, frameH) },
      ];

      this.setInitialCropFromPoints(clampedPendingPoints);
      this.saveCurrentCornersForSource(false);
      this.refreshAlternateCapturePreview();
    });
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

  toggleCaptureSource() {
    if (!this.canToggleCaptureSource()) {
      return;
    }

    const shouldKeepPreview = !this.showCropEditor();
    if (!shouldKeepPreview) {
      this.saveCurrentCornersForSource(this.cropDirty());
    }
    this.preserveCornersOnNextImageLoad = false;
    const nextSource = this.state.rawCaptureSource() === 'still' ? 'video' : 'still';
    this.state.setRawCaptureSource(nextSource);
    this.refreshAlternateCapturePreview();

    if (shouldKeepPreview) {
      const nextRawBlob = this.state.rawCapturedImage();
      if (nextRawBlob && this.cropCorners().length === 4) {
        this.extractCroppedBlob(nextRawBlob, (blob) => {
          if (blob) {
            this.state.setImage(blob);
          }
          this.showCropEditor.set(false);
          this.activeCornerIndex.set(null);
        });
      }
      return;
    }

    this.showCropEditor.set(true);
    this.activeCornerIndex.set(null);
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
        this.observeImageFrameSize(imageEl);
        this.startFrameSyncLoop();
        this.refreshAlternateCapturePreview();
      } else if (retries > 0) {
        requestAnimationFrame(() => tryInit(retries - 1));
      }
    };
    requestAnimationFrame(() => tryInit());
  }

  private syncFrameSizeFromDom(imageEl: HTMLImageElement): void {
    const bounds = imageEl.getBoundingClientRect();
    const frameRect = imageEl.parentElement?.getBoundingClientRect();
    if (frameRect) {
      this.overlayOffsetX.set(bounds.left - frameRect.left);
      this.overlayOffsetY.set(bounds.top - frameRect.top);
    } else {
      this.overlayOffsetX.set(0);
      this.overlayOffsetY.set(0);
    }

    const nextW = bounds.width;
    const nextH = bounds.height;
    if (nextW <= 0 || nextH <= 0) {
      return;
    }

    const prevW = this.cropFrameWidth();
    const prevH = this.cropFrameHeight();
    if (Math.abs(nextW - prevW) < 0.75 && Math.abs(nextH - prevH) < 0.75) {
      return;
    }

    this.cropFrameWidth.set(nextW);
    this.cropFrameHeight.set(nextH);

    const currentCorners = this.cropCorners();
    if (currentCorners.length === 4 && prevW > 0 && prevH > 0) {
      const scaleX = nextW / prevW;
      const scaleY = nextH / prevH;
      const scaled = currentCorners.map((p) => ({
        x: this.clamp(p.x * scaleX, 0, nextW),
        y: this.clamp(p.y * scaleY, 0, nextH),
      }));
      this.cropCorners.set(scaled);
      if (!this.cropDirty()) {
        this.initialCropCorners.set(scaled.map((p) => ({ ...p })));
      }
    }
  }

  private startFrameSyncLoop(): void {
    if (typeof window === 'undefined') {
      return;
    }
    if (this.frameSyncRafId !== null) {
      window.cancelAnimationFrame(this.frameSyncRafId);
    }

    const tick = () => {
      const imageEl = this.rawImageEl?.nativeElement;
      if (!imageEl || !this.state.rawCapturedImageUrl() || !this.showCropEditor()) {
        this.frameSyncRafId = null;
        return;
      }

      this.syncFrameSizeFromDom(imageEl);
      this.frameSyncRafId = window.requestAnimationFrame(tick);
    };

    this.frameSyncRafId = window.requestAnimationFrame(tick);
  }

  private observeImageFrameSize(imageEl: HTMLImageElement) {
    if (typeof window === 'undefined' || !(window as any).ResizeObserver) {
      return;
    }

    this.frameResizeObserver?.disconnect();
    this.frameResizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      this.syncFrameSizeFromDom(imageEl);
    });

    this.frameResizeObserver.observe(imageEl);
  }

  private initCropCorners(imageEl: HTMLImageElement) {
    const preserveExisting = this.preserveCornersOnNextImageLoad;
    this.preserveCornersOnNextImageLoad = false;

    const previousWidth = this.cropFrameWidth();
    const previousHeight = this.cropFrameHeight();
    const previousCorners = this.cropCorners();

    const bounds = imageEl.getBoundingClientRect();
    const w = bounds.width;
    const h = bounds.height;
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
      this.refreshAlternateCapturePreview();
      return;
    }

    const source = this.activeCaptureSource();
    if (source) {
      const sourceState = this.sourceCornerState[source];
      const shouldUseStored = !!sourceState && (
        sourceState.edited
        || (source === 'still' && !!this.sourceCornerState.video?.edited)
      );
      const stored = shouldUseStored
        ? this.getStoredCornersForSource(source, w, h)
        : null;
      if (stored) {
        this.setInitialCropFromPoints(stored);
        this.refreshAlternateCapturePreview();
        return;
      }
    }

    const pending = this.state.pendingCropCorners();
    if (pending && imageEl.naturalWidth > 0) {
      // Scale from natural coordinates to display coordinates while preserving
      // the exact scanner corner order/shape (TL, TR, BR, BL).
      const scaleX = w / imageEl.naturalWidth;
      const scaleY = h / imageEl.naturalHeight;
      const scaledPoints = [
        { x: pending.topLeftCorner.x * scaleX,     y: pending.topLeftCorner.y * scaleY },
        { x: pending.topRightCorner.x * scaleX,    y: pending.topRightCorner.y * scaleY },
        { x: pending.bottomRightCorner.x * scaleX, y: pending.bottomRightCorner.y * scaleY },
        { x: pending.bottomLeftCorner.x * scaleX,  y: pending.bottomLeftCorner.y * scaleY },
      ];

      const clampedPendingPoints = scaledPoints.map((p) => ({
        x: this.clamp(p.x, 0, w),
        y: this.clamp(p.y, 0, h),
      }));
      this.setInitialCropFromPoints(clampedPendingPoints);
      this.saveCurrentCornersForSource(false);
      this.refreshAlternateCapturePreview();
    } else {
      const detectedCorners = this.detectCornersFromStill(imageEl, w, h);
      if (detectedCorners && detectedCorners.length === 4) {
        this.setInitialCropFromPoints(detectedCorners);
        this.saveCurrentCornersForSource(false);
        this.refreshAlternateCapturePreview();
        return;
      }

      const m = 0.15;
      const corners = [
        { x: this.clamp(w * m, 0, w),       y: this.clamp(h * m, 0, h) },
        { x: this.clamp(w * (1 - m), 0, w), y: this.clamp(h * m, 0, h) },
        { x: this.clamp(w * (1 - m), 0, w), y: this.clamp(h * (1 - m), 0, h) },
        { x: this.clamp(w * m, 0, w),       y: this.clamp(h * (1 - m), 0, h) },
      ];
      this.setInitialCropFromPoints(corners);
      this.saveCurrentCornersForSource(false);
      this.refreshAlternateCapturePreview();
    }
  }

  startDraggingCorner(index: number, event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setGlobalSelectionLock(true);
    const pointer = this.mapPointerToFrame(event.clientX, event.clientY);
    const currentCorner = this.cropCorners()[index];
    if (!pointer || !currentCorner) {
      this.setGlobalSelectionLock(false);
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
    event.preventDefault();
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
      this.refreshAlternateCapturePreview();
      return next;
    });
    this.saveCurrentCornersForSource(true);
  }

  private mapPointerToFrame(clientX: number, clientY: number): CropPoint | null {
    const imageEl = this.rawImageEl?.nativeElement;
    if (!imageEl) {
      return null;
    }
    const rect = imageEl.getBoundingClientRect();
    const frameWidth = this.cropFrameWidth() || rect.width;
    const frameHeight = this.cropFrameHeight() || rect.height;
    return {
      x: this.clamp(clientX - rect.left, 0, frameWidth),
      y: this.clamp(clientY - rect.top, 0, frameHeight),
    };
  }

  handleRadius(index: number): number {
    return this.activeCornerIndex() === index ? 64 : 60;
  }

  centerHandleRadius(index: number): number {
    return this.activeCornerIndex() === index ? 14 : 12;
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
    this.saveCurrentCornersForSource(false);
    this.refreshAlternateCapturePreview();
  }

  private activeCaptureSource(): CaptureSource | null {
    const source = this.state.rawCaptureSource();
    return source === 'video' || source === 'still' ? source : null;
  }

  private setInitialCropFromPoints(points: CropPoint[]): void {
    this.cropCorners.set(points.map((p) => ({ ...p })));
    this.initialCropCorners.set(points.map((p) => ({ ...p })));
    this.cropDirty.set(false);
    this.showCropEditor.set(true);
  }

  private getStoredCornersForSource(source: CaptureSource, targetWidth: number, targetHeight: number): CropPoint[] | null {
    const stored = this.sourceCornerState[source];
    if (!stored || stored.corners.length !== 4 || stored.frameWidth <= 0 || stored.frameHeight <= 0) {
      return null;
    }

    const scaleX = targetWidth / stored.frameWidth;
    const scaleY = targetHeight / stored.frameHeight;
    return stored.corners.map((p) => ({
      x: this.clamp(p.x * scaleX, 0, targetWidth),
      y: this.clamp(p.y * scaleY, 0, targetHeight),
    }));
  }

  private saveCurrentCornersForSource(edited: boolean): void {
    const source = this.activeCaptureSource();
    const corners = this.cropCorners();
    const frameWidth = this.cropFrameWidth();
    const frameHeight = this.cropFrameHeight();
    if (!source || corners.length !== 4 || frameWidth <= 0 || frameHeight <= 0) {
      return;
    }

    this.sourceCornerState[source] = {
      corners: corners.map((p) => ({ ...p })),
      frameWidth,
      frameHeight,
      edited,
    };

    // If video corners were updated, make them the canonical baseline for both
    // sources by replacing still corners as well.
    if (source === 'video' && edited) {
      this.sourceCornerState.still = {
        corners: corners.map((p) => ({ ...p })),
        frameWidth,
        frameHeight,
        edited: true,
      };
    }
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
      this.refreshAlternateCapturePreview();
    });
  }

  private clamp(value: number, min: number, max: number): number {
    if (!Number.isFinite(value)) {
      return min;
    }
    return Math.min(max, Math.max(min, value));
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image for crop extraction'));
      img.src = url;
    });
  }

  private getAlternateSourceUrl(): string | null {
    if (!this.canToggleCaptureSource()) {
      return null;
    }
    return this.state.rawCaptureSource() === 'still'
      ? this.state.rawCapturedImageVideoUrl()
      : this.state.rawCapturedImageStillUrl();
  }

  private clearAlternateCapturePreview(): void {
    const current = this.alternateCapturePreviewUrl();
    if (current) {
      URL.revokeObjectURL(current);
    }
    this.alternateCapturePreviewUrl.set(null);
  }

  private refreshAlternateCapturePreview(): void {
    if (!this.canToggleCaptureSource() || this.cropCorners().length !== 4) {
      this.clearAlternateCapturePreview();
      this.alternateCapturePreviewBusy.set(false);
      return;
    }

    if (this.alternatePreviewTimerId !== null) {
      clearTimeout(this.alternatePreviewTimerId);
    }
    this.alternatePreviewTimerId = setTimeout(() => {
      this.alternatePreviewTimerId = null;
      this.renderAlternateCapturePreview();
    }, 70);
  }

  private renderAlternateCapturePreview(): void {
    const sourceUrl = this.getAlternateSourceUrl();
    const corners = this.cropCorners();
    if (!sourceUrl || corners.length !== 4) {
      this.clearAlternateCapturePreview();
      this.alternateCapturePreviewBusy.set(false);
      return;
    }

    const requestId = ++this.alternatePreviewRequestId;
    this.alternateCapturePreviewBusy.set(true);

    this.loadImage(sourceUrl).then((img) => {
      if (requestId !== this.alternatePreviewRequestId) {
        return;
      }

      const sourceCanvas = document.createElement('canvas');
      sourceCanvas.width = img.naturalWidth;
      sourceCanvas.height = img.naturalHeight;
      const sourceCtx = sourceCanvas.getContext('2d');
      if (!sourceCtx) {
        this.alternateCapturePreviewBusy.set(false);
        return;
      }
      sourceCtx.drawImage(img, 0, 0);

      const sourceCorners = this.toSourceCornersFromSvg(corners, sourceCanvas.width, sourceCanvas.height);
      const { outW, outH } = this.computeOutputSize(sourceCorners);
      const maxThumbEdge = 220;
      const scale = Math.min(1, maxThumbEdge / Math.max(outW, outH));
      const thumbW = Math.max(2, Math.round(outW * scale));
      const thumbH = Math.max(2, Math.round(outH * scale));

      try {
        const cv = (window as any).cv;
        if (cv?.Mat) {
          const src = cv.imread(sourceCanvas);
          const dst = new cv.Mat();
          const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
            sourceCorners.topLeftCorner.x, sourceCorners.topLeftCorner.y,
            sourceCorners.topRightCorner.x, sourceCorners.topRightCorner.y,
            sourceCorners.bottomRightCorner.x, sourceCorners.bottomRightCorner.y,
            sourceCorners.bottomLeftCorner.x, sourceCorners.bottomLeftCorner.y,
          ]);
          const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
            0, 0,
            thumbW - 1, 0,
            thumbW - 1, thumbH - 1,
            0, thumbH - 1,
          ]);
          const transform = cv.getPerspectiveTransform(srcTri, dstTri);
          cv.warpPerspective(src, dst, transform, new cv.Size(thumbW, thumbH), cv.INTER_LINEAR, cv.BORDER_REPLICATE, new cv.Scalar());

          const outputCanvas = document.createElement('canvas');
          outputCanvas.width = thumbW;
          outputCanvas.height = thumbH;
          cv.imshow(outputCanvas, dst);

          src.delete();
          dst.delete();
          srcTri.delete();
          dstTri.delete();
          transform.delete();

          outputCanvas.toBlob((blob: Blob | null) => {
            if (requestId !== this.alternatePreviewRequestId) {
              return;
            }
            if (!blob) {
              this.alternateCapturePreviewBusy.set(false);
              return;
            }
            this.clearAlternateCapturePreview();
            this.alternateCapturePreviewUrl.set(URL.createObjectURL(blob));
            this.alternateCapturePreviewBusy.set(false);
          }, 'image/jpeg', 0.85);
          return;
        }
      } catch {
        // Fall through to jscanify fallback.
      }

      if ((window as any).jscanify) {
        try {
          const scanner = new jscanify();
          const outputCanvas: HTMLCanvasElement = scanner.extractPaper(sourceCanvas, thumbW, thumbH, sourceCorners);
          outputCanvas.toBlob((blob: Blob | null) => {
            if (requestId !== this.alternatePreviewRequestId) {
              return;
            }
            if (!blob) {
              this.alternateCapturePreviewBusy.set(false);
              return;
            }
            this.clearAlternateCapturePreview();
            this.alternateCapturePreviewUrl.set(URL.createObjectURL(blob));
            this.alternateCapturePreviewBusy.set(false);
          }, 'image/jpeg', 0.85);
          return;
        } catch {
          // no-op
        }
      }

      this.alternateCapturePreviewBusy.set(false);
    }).catch(() => {
      if (requestId !== this.alternatePreviewRequestId) {
        return;
      }
      this.alternateCapturePreviewBusy.set(false);
    });
  }

  private toSourceCornersFromSvg(corners: CropPoint[], srcWidth: number, srcHeight: number): CropCorners {
    const frameWidth = this.cropFrameWidth();
    const frameHeight = this.cropFrameHeight();
    const safeFrameWidth = Math.max(1, frameWidth);
    const safeFrameHeight = Math.max(1, frameHeight);
    const scaleX = srcWidth / safeFrameWidth;
    const scaleY = srcHeight / safeFrameHeight;

    return {
      topLeftCorner: {
        x: this.clamp(corners[0].x * scaleX, 0, srcWidth - 1),
        y: this.clamp(corners[0].y * scaleY, 0, srcHeight - 1),
      },
      topRightCorner: {
        x: this.clamp(corners[1].x * scaleX, 0, srcWidth - 1),
        y: this.clamp(corners[1].y * scaleY, 0, srcHeight - 1),
      },
      bottomRightCorner: {
        x: this.clamp(corners[2].x * scaleX, 0, srcWidth - 1),
        y: this.clamp(corners[2].y * scaleY, 0, srcHeight - 1),
      },
      bottomLeftCorner: {
        x: this.clamp(corners[3].x * scaleX, 0, srcWidth - 1),
        y: this.clamp(corners[3].y * scaleY, 0, srcHeight - 1),
      },
    };
  }

  private computeOutputSize(corners: CropCorners): { outW: number; outH: number } {
    const topW = Math.hypot(
      corners.topRightCorner.x - corners.topLeftCorner.x,
      corners.topRightCorner.y - corners.topLeftCorner.y,
    );
    const bottomW = Math.hypot(
      corners.bottomRightCorner.x - corners.bottomLeftCorner.x,
      corners.bottomRightCorner.y - corners.bottomLeftCorner.y,
    );
    const leftH = Math.hypot(
      corners.bottomLeftCorner.x - corners.topLeftCorner.x,
      corners.bottomLeftCorner.y - corners.topLeftCorner.y,
    );
    const rightH = Math.hypot(
      corners.bottomRightCorner.x - corners.topRightCorner.x,
      corners.bottomRightCorner.y - corners.topRightCorner.y,
    );

    const avgWidth = (topW + bottomW) / 2;
    const avgHeight = (leftH + rightH) / 2;
    const targetBaseWidth = 1060;
    const targetBaseHeight = 2000;
    const scale = Math.max(
      1,
      Math.min(avgWidth / targetBaseWidth, avgHeight / targetBaseHeight),
    );

    return {
      outW: Math.max(2, Math.round(targetBaseWidth * scale)),
      outH: Math.max(2, Math.round(targetBaseHeight * scale)),
    };
  }

  private orderQuadPoints(points: CropPoint[]): CropPoint[] {
    if (points.length !== 4) {
      return points;
    }

    const bySum = [...points].sort((a, b) => (a.x + a.y) - (b.x + b.y));
    const byDiff = [...points].sort((a, b) => (a.y - a.x) - (b.y - b.x));

    const topLeft = bySum[0];
    const bottomRight = bySum[3];
    const topRight = byDiff[0];
    const bottomLeft = byDiff[3];

    return [topLeft, topRight, bottomRight, bottomLeft];
  }

  private selectContourCorners(points: CropPoint[]): CropPoint[] | null {
    if (points.length < 4) {
      return null;
    }

    const topLeft = points.reduce((best, point) =>
      (point.x + point.y) < (best.x + best.y) ? point : best
    );
    const topRight = points.reduce((best, point) =>
      (point.x - point.y) > (best.x - best.y) ? point : best
    );
    const bottomRight = points.reduce((best, point) =>
      (point.x + point.y) > (best.x + best.y) ? point : best
    );
    const bottomLeft = points.reduce((best, point) =>
      (point.y - point.x) > (best.y - best.x) ? point : best
    );

    const uniquePointCount = new Set([
      `${Math.round(topLeft.x)}:${Math.round(topLeft.y)}`,
      `${Math.round(topRight.x)}:${Math.round(topRight.y)}`,
      `${Math.round(bottomRight.x)}:${Math.round(bottomRight.y)}`,
      `${Math.round(bottomLeft.x)}:${Math.round(bottomLeft.y)}`,
    ]).size;

    if (uniquePointCount < 4) {
      return null;
    }

    return [topLeft, topRight, bottomRight, bottomLeft];
  }

  private extractQuadFromContour(contour: any): CropPoint[] | null {
    const cv = (window as any).cv;
    if (!cv || !contour) {
      return null;
    }

    const perimeter = cv.arcLength(contour, true);
    const approx = new cv.Mat();
    const hull = new cv.Mat();

    try {
      cv.convexHull(contour, hull, false, true);
      const hullPoints: CropPoint[] = [];
      for (let index = 0; index < hull.rows; index += 1) {
        hullPoints.push({
          x: hull.intPtr(index, 0)[0],
          y: hull.intPtr(index, 0)[1],
        });
      }

      const hullCorners = this.selectContourCorners(hullPoints);
      if (hullCorners) {
        return hullCorners;
      }

      cv.approxPolyDP(contour, approx, 0.02 * perimeter, true);
      if (approx.rows === 4) {
        const points: CropPoint[] = [];
        for (let index = 0; index < 4; index += 1) {
          points.push({
            x: approx.intPtr(index, 0)[0],
            y: approx.intPtr(index, 0)[1],
          });
        }
        return this.orderQuadPoints(points);
      }

      const rotatedRect = cv.minAreaRect(contour);
      const rectPoints = cv.RotatedRect.points(rotatedRect);
      return this.orderQuadPoints(rectPoints.map((point: CropPoint) => ({ x: point.x, y: point.y })));
    } catch {
      return null;
    } finally {
      approx.delete();
      hull.delete();
    }
  }

  private detectCornersFromStill(imageEl: HTMLImageElement, displayW: number, displayH: number): CropPoint[] | null {
    if (!(window as any).cv?.Mat || !(window as any).jscanify || imageEl.naturalWidth <= 0 || imageEl.naturalHeight <= 0) {
      return null;
    }

    const cv = (window as any).cv;
    const scanner = new jscanify();
    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = imageEl.naturalWidth;
    sourceCanvas.height = imageEl.naturalHeight;
    const sourceCtx = sourceCanvas.getContext('2d');
    if (!sourceCtx) {
      return null;
    }
    sourceCtx.drawImage(imageEl, 0, 0, imageEl.naturalWidth, imageEl.naturalHeight);

    let sourceMat: any = null;
    let detectMat: any = null;
    let contour: any = null;

    try {
      sourceMat = cv.imread(sourceCanvas);
      const maxDetectDim = 3000;
      const longestEdge = Math.max(sourceMat.cols, sourceMat.rows);
      const detectScale = longestEdge > maxDetectDim ? maxDetectDim / longestEdge : 1;

      if (detectScale < 1) {
        detectMat = new cv.Mat();
        const detectSize = new cv.Size(
          Math.max(2, Math.round(sourceMat.cols * detectScale)),
          Math.max(2, Math.round(sourceMat.rows * detectScale)),
        );
        cv.resize(sourceMat, detectMat, detectSize, 0, 0, cv.INTER_AREA);
      } else {
        detectMat = sourceMat;
      }

      contour = scanner.findPaperContour(detectMat);
      if (!contour) {
        return null;
      }

      const quadPoints = this.extractQuadFromContour(contour);
      if (!quadPoints || quadPoints.length !== 4) {
        return null;
      }

      const invScale = detectScale < 1 ? 1 / detectScale : 1;
      const toDisplayX = displayW / imageEl.naturalWidth;
      const toDisplayY = displayH / imageEl.naturalHeight;
      const detectedPoints = [
        { x: quadPoints[0].x * invScale * toDisplayX, y: quadPoints[0].y * invScale * toDisplayY },
        { x: quadPoints[1].x * invScale * toDisplayX, y: quadPoints[1].y * invScale * toDisplayY },
        { x: quadPoints[2].x * invScale * toDisplayX, y: quadPoints[2].y * invScale * toDisplayY },
        { x: quadPoints[3].x * invScale * toDisplayX, y: quadPoints[3].y * invScale * toDisplayY },
      ];

      return this.normalizeCorners(detectedPoints, displayW, displayH);
    } catch {
      return null;
    } finally {
      if (contour && typeof contour.delete === 'function') {
        contour.delete();
      }
      if (detectMat && detectMat !== sourceMat && typeof detectMat.delete === 'function') {
        detectMat.delete();
      }
      if (sourceMat && typeof sourceMat.delete === 'function') {
        sourceMat.delete();
      }
    }
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

  private setGlobalSelectionLock(enabled: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const value = enabled ? 'none' : '';

    html.style.userSelect = value;
    (html.style as any).webkitUserSelect = value;
    (html.style as any).webkitTouchCallout = enabled ? 'none' : '';
    body.style.userSelect = value;
    (body.style as any).webkitUserSelect = value;
    (body.style as any).webkitTouchCallout = enabled ? 'none' : '';
    body.style.cursor = enabled ? 'grabbing' : '';
  }

  private stopDraggingCorner() {
    this.dragCornerIndex = null;
    this.dragPointerOffset = null;
    this.activeCornerIndex.set(null);
    this.setGlobalSelectionLock(false);
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this.pointerMoveHandler);
      window.removeEventListener('pointerup', this.pointerUpHandler);
    }
  }

  ngOnDestroy() {
    if (this.alternatePreviewTimerId !== null) {
      clearTimeout(this.alternatePreviewTimerId);
      this.alternatePreviewTimerId = null;
    }
    this.alternatePreviewRequestId += 1;
    this.clearAlternateCapturePreview();
    if (typeof window !== 'undefined' && this.frameSyncRafId !== null) {
      window.cancelAnimationFrame(this.frameSyncRafId);
      this.frameSyncRafId = null;
    }
    this.frameResizeObserver?.disconnect();
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this.pointerMoveHandler);
      window.removeEventListener('pointerup', this.pointerUpHandler);
    }
    this.setGlobalSelectionLock(false);
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
    const rawImageUrl = this.state.rawCapturedImageUrl();
    if (!rawImageUrl) {
      done(rawBlob);
      return;
    }

    this.loadImage(rawImageUrl).then((img) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        done(rawBlob);
        return;
      }
      ctx.drawImage(img, 0, 0);

      const sourceCorners = this.toSourceCornersFromSvg(corners, canvas.width, canvas.height);
      const { outW, outH } = this.computeOutputSize(sourceCorners);

      try {
        const cv = (window as any).cv;
        const src = cv.imread(canvas);
        const dst = new cv.Mat();
        const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
          sourceCorners.topLeftCorner.x, sourceCorners.topLeftCorner.y,
          sourceCorners.topRightCorner.x, sourceCorners.topRightCorner.y,
          sourceCorners.bottomRightCorner.x, sourceCorners.bottomRightCorner.y,
          sourceCorners.bottomLeftCorner.x, sourceCorners.bottomLeftCorner.y,
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
          const resultCanvas: HTMLCanvasElement = scanner.extractPaper(canvas, outW, outH, sourceCorners);
          resultCanvas.toBlob((blob: Blob | null) => done(blob), 'image/jpeg', 0.95);
          return;
        }
        done(rawBlob);
      }
    }).catch(() => {
      done(rawBlob);
    });
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
      metadata.content_text = textboxData;
    }

    // Add tags - merge batch tags with template tags
    const tags = this.state.batchTags();
    if (this.isTemplateFlow) {
      metadata.tags = ['no-paper', ...tags];
    } else if (tags.length > 0) {
      metadata.tags = tags;
    }

    // Strategic workshop: add group, round, and author metadata
    if (this.api.wsStrategic()) {
      const wsGroupId = this.api.wsGroupId();
      if (wsGroupId) {
        metadata['ws_group_id'] = wsGroupId;
      }
      const wsGroupName = this.api.wsGroupName() || this.route.snapshot.queryParams['ws_group_name'];
      if (wsGroupName) {
        metadata['ws_group_name'] = wsGroupName;
      }
      const wsRound = this.route.snapshot.queryParams['ws_round'];
      if (wsRound) {
        metadata['ws_round'] = parseInt(wsRound, 10);
      }
      const participantName = this.api.wsParticipantName();
      if (participantName) {
        metadata['participant_name'] = participantName;
      }
      // Include participant email for strategic workshop links email
      const participantEmail = this.route.snapshot.queryParams['participant_email'];
      if (participantEmail) {
        metadata['_private_email'] = participantEmail;
        metadata['_ws_strategic_email'] = true; // flag for server to send strategic links
      }
      // Ensure author_id is set
      let authorId = localStorage.getItem('future_screenshots_author_id');
      if (!authorId) {
        authorId = this.generateFallbackUUID();
        localStorage.setItem('future_screenshots_author_id', authorId);
      }
      metadata['author_id'] = authorId;
    }

    if (!this.api.automatic()) {
      this.api.startBackgroundUpload(currentImage, metadata);

      if (this.api.wsStrategic()) {
        // Strategic workshop: navigate back to canvas-creator with ws_just_uploaded flag
        // Canvas-creator will show the add-another / advance / back CTAs
        const params = { ...this.route.snapshot.queryParams };
        delete params['template'];
        delete params['template_id'];
        params['ws_just_uploaded'] = 'true';
        params['ws_upload_nonce'] = Date.now().toString();
        this.router.navigate(['/canvas-creator'], { queryParams: params });
        return;
      }

      const params: any = { 'item-id': null, 'key': null };
      if (this.isTemplateFlow) {
        params['template'] = 'true';
      }
      this.router.navigate(['/props'], { queryParams: params, queryParamsHandling: 'merge' });
    } else {
      this.api.uploadImageAuto(currentImage, metadata).subscribe(() => {
        this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
      });
    }
  }

  private generateFallbackUUID(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      try {
        return crypto.randomUUID();
      } catch {
        // Fall through to fallback
      }
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
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
