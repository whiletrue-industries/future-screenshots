import { Component, computed, signal, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';
import { FormsModule } from '@angular/forms';

declare const jscanify: any;
declare const cv: any;

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
export class ConfirmComponent {
  @ViewChild('cropImageEl') cropImageEl!: ElementRef<HTMLImageElement>;
  @ViewChild('cropOverlaySvg') cropOverlaySvg!: ElementRef<SVGSVGElement>;

  isTemplateFlow = false;

  cropCorners = signal<{x: number, y: number}[]>([]);
  cropDisplayWidth = signal<number>(0);
  cropDisplayHeight = signal<number>(0);
  private dragCornerIndex: number | null = null;
  private readonly pointerMoveHandler = this.onPointerMove.bind(this);
  private readonly pointerUpHandler = this.stopDraggingCorner.bind(this);

  cropPolygonPoints = computed(() =>
    this.cropCorners().map(p => `${p.x},${p.y}`).join(' ')
  );

  cropViewBox = computed(() =>
    `0 0 ${this.cropDisplayWidth()} ${this.cropDisplayHeight()}`
  );

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

    if (!this.state.currentImageUrl()) {
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

  onImageLoaded() {
    const imageEl = this.cropImageEl?.nativeElement;
    if (!imageEl) return;
    const tryInit = (retries = 5) => {
      if (imageEl.clientWidth > 0 && imageEl.clientHeight > 0) {
        this.initCropCorners(imageEl);
      } else if (retries > 0) {
        requestAnimationFrame(() => tryInit(retries - 1));
      }
    };
    requestAnimationFrame(() => tryInit());
  }

  private initCropCorners(imageEl: HTMLImageElement) {
    const displayW = imageEl.clientWidth;
    const displayH = imageEl.clientHeight;
    const rawW = imageEl.naturalWidth;
    const rawH = imageEl.naturalHeight;
    if (displayW <= 0 || displayH <= 0 || rawW <= 0 || rawH <= 0) return;

    this.cropDisplayWidth.set(displayW);
    this.cropDisplayHeight.set(displayH);

    const scaleX = displayW / rawW;
    const scaleY = displayH / rawH;
    const savedCorners = this.state.scanCropCorners();

    if (savedCorners && savedCorners.length === 4) {
      // Map raw pixel corners to display pixel positions
      this.cropCorners.set(savedCorners.map(c => ({
        x: c.x * scaleX,
        y: c.y * scaleY,
      })));
    } else {
      // Default corners at 15% margin
      const margin = 0.15;
      this.cropCorners.set([
        { x: displayW * margin, y: displayH * margin },
        { x: displayW * (1 - margin), y: displayH * margin },
        { x: displayW * (1 - margin), y: displayH * (1 - margin) },
        { x: displayW * margin, y: displayH * (1 - margin) },
      ]);
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
    const imageEl = this.cropImageEl?.nativeElement;
    if (!imageEl) return;
    const rect = imageEl.getBoundingClientRect();
    const nextX = Math.max(0, Math.min(event.clientX - rect.left, imageEl.clientWidth));
    const nextY = Math.max(0, Math.min(event.clientY - rect.top, imageEl.clientHeight));
    this.cropCorners.update(points => {
      if (points.length !== 4) return points;
      const next = [...points];
      next[this.dragCornerIndex as number] = { x: nextX, y: nextY };
      return next;
    });
  }

  private stopDraggingCorner() {
    this.dragCornerIndex = null;
    window.removeEventListener('pointermove', this.pointerMoveHandler);
    window.removeEventListener('pointerup', this.pointerUpHandler);
  }

  private applyCropAndUpload(rawBlob: Blob, callback: (cropped: Blob) => void) {
    const imageEl = document.createElement('img');
    const url = URL.createObjectURL(rawBlob);
    imageEl.onload = () => {
      const rawW = imageEl.naturalWidth;
      const rawH = imageEl.naturalHeight;
      const displayW = this.cropImageEl?.nativeElement?.clientWidth || rawW;
      const displayH = this.cropImageEl?.nativeElement?.clientHeight || rawH;
      const scaleX = rawW / displayW;
      const scaleY = rawH / displayH;

      const corners = this.cropCorners();
      const cornerPoints = {
        topLeftCorner: { x: corners[0].x * scaleX, y: corners[0].y * scaleY },
        topRightCorner: { x: corners[1].x * scaleX, y: corners[1].y * scaleY },
        bottomRightCorner: { x: corners[2].x * scaleX, y: corners[2].y * scaleY },
        bottomLeftCorner: { x: corners[3].x * scaleX, y: corners[3].y * scaleY },
      };

      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Failed to get 2D canvas context');
        }
        canvas.width = rawW;
        canvas.height = rawH;
        ctx.drawImage(imageEl, 0, 0);
        const scanner = new jscanify();
        const frame = scanner.extractPaper(canvas, 1060, 2000, cornerPoints);
        frame.toBlob((blob: Blob | null) => {
          URL.revokeObjectURL(url);
          if (blob) {
            callback(blob);
          }
        }, 'image/jpeg', 0.95);
      } catch (e) {
        console.error('Crop failed, uploading uncropped image', e);
        URL.revokeObjectURL(url);
        callback(rawBlob);
      }
    };
    imageEl.src = url;
  }

  upload() {
    const currentImage = this.state.currentImage();
    if (!currentImage) {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
      return;
    }

    // Check if this is a replace flow (replacing an existing item's image)
    const replaceItemId = this.api.replaceItemId();
    if (replaceItemId) {
      // Apply crop before replacing
      this.applyCropAndUpload(currentImage, (croppedImage) => {
        this.uploadReplace(croppedImage, replaceItemId, this.api.replaceItemKey() || undefined);
      });
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

    // Apply perspective crop before uploading
    this.applyCropAndUpload(currentImage, (croppedImage) => {
      if (!this.api.automatic()) {
        this.api.uploadImage(croppedImage, metadata).subscribe({
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
        this.api.uploadImageAuto(croppedImage, metadata).subscribe(() => {
          this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
        });
      }
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
