import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';
import { FormsModule } from '@angular/forms';
import { CropCornerPoints } from '../../state.service';

declare const jscanify: any;
declare const cv: any;
declare const window: any;

type CropPoint = { x: number; y: number };

@Component({
  selector: 'app-confirm',
  imports: [
    RouterLink,
    LtrDirective,
    FormsModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements AfterViewInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('cropImage') cropImage?: ElementRef<HTMLImageElement>;
  @ViewChild('cropFrame') cropFrame?: ElementRef<HTMLDivElement>;

  isTemplateFlow = false;

  // ── Manual Crop ──────────────────────────────────────────────────────────
  cropCorners = signal<CropPoint[]>([]);
  cropFrameWidth = signal<number>(0);
  cropFrameHeight = signal<number>(0);
  cropBusy = signal<boolean>(false);
  cropError = signal<string | null>(null);

  cropPolygonPoints = computed(() =>
    this.cropCorners().map(p => `${p.x},${p.y}`).join(' ')
  );

  private dragCornerIndex: number | null = null;
  private readonly pointerMoveHandler = (e: PointerEvent) => this.onPointerMove(e);
  private readonly pointerUpHandler = () => this.stopDraggingCorner();
  // ─────────────────────────────────────────────────────────────────────────

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

  ngAfterViewInit(): void {
    // Crop corners are initialized via the (load) event on the crop image element.
    // No action needed here for the manual crop flow.
  }

  ngOnDestroy(): void {
    window.removeEventListener('pointermove', this.pointerMoveHandler);
    window.removeEventListener('pointerup', this.pointerUpHandler);
  }

  // ── Crop handle helpers ───────────────────────────────────────────────────

  initializeCropCorners() {
    const imageEl = this.cropImage?.nativeElement;
    if (!imageEl) return;

    const tryInit = (retries = 10) => {
      const width = imageEl.clientWidth;
      const height = imageEl.clientHeight;
      if ((width <= 0 || height <= 0) && retries > 0) {
        requestAnimationFrame(() => tryInit(retries - 1));
        return;
      }
      this.cropFrameWidth.set(width);
      this.cropFrameHeight.set(height);

      // Try to pre-populate from auto-detected corners
      const detected = this.state.pendingCropCorners();
      if (detected && imageEl.naturalWidth > 0 && imageEl.naturalHeight > 0) {
        const scaleX = width / imageEl.naturalWidth;
        const scaleY = height / imageEl.naturalHeight;
        this.cropCorners.set([
          { x: detected.topLeftCorner.x * scaleX,     y: detected.topLeftCorner.y * scaleY },
          { x: detected.topRightCorner.x * scaleX,    y: detected.topRightCorner.y * scaleY },
          { x: detected.bottomRightCorner.x * scaleX, y: detected.bottomRightCorner.y * scaleY },
          { x: detected.bottomLeftCorner.x * scaleX,  y: detected.bottomLeftCorner.y * scaleY },
        ]);
      } else {
        this.cropCorners.set([
          { x: width * 0.15,  y: height * 0.15 },
          { x: width * 0.85,  y: height * 0.15 },
          { x: width * 0.85,  y: height * 0.85 },
          { x: width * 0.15,  y: height * 0.85 },
        ]);
      }
      this.cdr.markForCheck();
    };

    if (imageEl.complete && imageEl.naturalWidth > 0) {
      tryInit();
    } else {
      imageEl.onload = () => tryInit();
    }
  }

  startDraggingCorner(index: number, event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCornerIndex = index;
    window.addEventListener('pointermove', this.pointerMoveHandler);
    window.addEventListener('pointerup', this.pointerUpHandler, { once: true });
  }

  private onPointerMove(event: PointerEvent) {
    if (this.dragCornerIndex === null) return;
    const imageEl = this.cropImage?.nativeElement;
    if (!imageEl) return;
    const rect = imageEl.getBoundingClientRect();
    const nextX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const nextY = Math.max(0, Math.min(event.clientY - rect.top, rect.height));
    this.cropCorners.update(pts => {
      const next = [...pts];
      next[this.dragCornerIndex as number] = { x: nextX, y: nextY };
      return next;
    });
    this.cdr.markForCheck();
  }

  private stopDraggingCorner() {
    this.dragCornerIndex = null;
    window.removeEventListener('pointermove', this.pointerMoveHandler);
    window.removeEventListener('pointerup', this.pointerUpHandler);
  }

  /**
   * Apply the perspective crop on the raw captured image using the chosen corner
   * points, set the result as the current image, then proceed with normal upload.
   */
  private applyCropAndUpload(onReady: () => void) {
    if (!this.state.pendingManualCrop()) {
      onReady();
      return;
    }

    this.cropBusy.set(true);
    this.cropError.set(null);

    const imageEl = this.cropImage?.nativeElement;
    const corners = this.cropCorners();

    if (!imageEl || corners.length !== 4) {
      this.cropError.set($localize`Crop area is not ready.`);
      this.cropBusy.set(false);
      return;
    }

    if (!jscanify || !cv?.Mat) {
      this.cropError.set($localize`Image processing library is not ready yet. Please try again.`);
      this.cropBusy.set(false);
      return;
    }

    const imageDisplayWidth = imageEl.clientWidth;
    const imageDisplayHeight = imageEl.clientHeight;
    const imageNaturalWidth = imageEl.width || imageDisplayWidth;
    const imageNaturalHeight = imageEl.height || imageDisplayHeight;
    const scaleX = imageNaturalWidth / imageDisplayWidth;
    const scaleY = imageNaturalHeight / imageDisplayHeight;

    const mappedCorners: CropCornerPoints = {
      topLeftCorner:     { x: corners[0].x * scaleX, y: corners[0].y * scaleY },
      topRightCorner:    { x: corners[1].x * scaleX, y: corners[1].y * scaleY },
      bottomRightCorner: { x: corners[2].x * scaleX, y: corners[2].y * scaleY },
      bottomLeftCorner:  { x: corners[3].x * scaleX, y: corners[3].y * scaleY },
    };

    const topWidth = Math.hypot(
      mappedCorners.topRightCorner.x - mappedCorners.topLeftCorner.x,
      mappedCorners.topRightCorner.y - mappedCorners.topLeftCorner.y
    );
    const bottomWidth = Math.hypot(
      mappedCorners.bottomRightCorner.x - mappedCorners.bottomLeftCorner.x,
      mappedCorners.bottomRightCorner.y - mappedCorners.bottomLeftCorner.y
    );
    const leftHeight = Math.hypot(
      mappedCorners.bottomLeftCorner.x - mappedCorners.topLeftCorner.x,
      mappedCorners.bottomLeftCorner.y - mappedCorners.topLeftCorner.y
    );
    const rightHeight = Math.hypot(
      mappedCorners.bottomRightCorner.x - mappedCorners.topRightCorner.x,
      mappedCorners.bottomRightCorner.y - mappedCorners.topRightCorner.y
    );
    const avgWidth = (topWidth + bottomWidth) / 2;
    const avgHeight = (leftHeight + rightHeight) / 2;
    const scale = Math.min(2000 / avgWidth, 2000 / avgHeight, 1);
    const outputWidth = Math.round(avgWidth * scale);
    const outputHeight = Math.round(avgHeight * scale);

    try {
      const scanner = new jscanify();
      const extracted = scanner.extractPaper(imageEl, outputWidth, outputHeight, mappedCorners);
      extracted.toBlob((blob: Blob | null) => {
        if (!blob) {
          this.cropError.set($localize`Failed to crop image.`);
          this.cropBusy.set(false);
          this.cdr.markForCheck();
          return;
        }
        this.state.setImage(blob);
        this.state.clearRawImage();
        this.cropBusy.set(false);
        this.cdr.markForCheck();
        onReady();
      }, 'image/jpeg', 0.95);
    } catch (e: unknown) {
      this.cropError.set($localize`Failed to crop image.`);
      this.cropBusy.set(false);
      this.cdr.markForCheck();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────

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

  upload() {
    // If there's a pending manual crop, apply the crop first before uploading
    if (this.state.pendingManualCrop()) {
      this.applyCropAndUpload(() => this.performUpload());
      return;
    }
    this.performUpload();
  }

  private performUpload() {
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
