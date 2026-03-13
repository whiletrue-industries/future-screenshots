import { Component, output, input, signal, inject, effect, ChangeDetectionStrategy, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AdminApiService } from '../../../admin-api.service';
import { ImageComparisonComponent } from '../../shared/image-comparison/image-comparison.component';

declare const jscanify: any;

type CropPoint = { x: number; y: number };
type ReplaceTab = 'crop' | 'swap' | 'scan' | 'upload';

@Component({
  selector: 'app-image-replacement-modal',
  imports: [
    CommonModule,
    FormsModule,
    ImageComparisonComponent
  ],
  templateUrl: './image-replacement-modal.component.html',
  styleUrl: './image-replacement-modal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageReplacementModalComponent {
  workspaceId = input.required<string>();
  apiKey = input.required<string>();
  itemId = input.required<string>();
  currentImageUrl = input.required<string>();
  
  closed = output<void>();
  imageReplaced = output<{ screenshot_url: string }>();
  itemDuplicated = output<{ item_id: string }>();
  
  displayedImageUrl = signal<string>('');
  workspaceItems = signal<any[]>([]);
  currentItem = signal<any | null>(null);
  selectedItemId = signal<string | null>(null);
  loading = signal<boolean>(false);
  pendingNewImage = signal<string | null>(null);
  showComparison = signal<boolean>(false);
  showCropEditor = signal<boolean>(false);
  activeTab = signal<ReplaceTab>('crop');
  cropCorners = signal<CropPoint[]>([]);
  cropFrameWidth = signal<number>(0);
  cropFrameHeight = signal<number>(0);
  cropBusy = signal<boolean>(false);
  cropError = signal<string | null>(null);
  croppedImageDataUrl = signal<string | null>(null);
  pendingActionSource = signal<'existing' | 'cropped' | null>(null);
  cropImageBlobUrl = signal<string | null>(null); // For CORS workaround
  uploadedImageDataUrl = signal<string | null>(null);
  uploadDragOver = signal<boolean>(false);
  reanalyzeImage = signal<boolean>(true); // Run AI analysis on new image by default

  @ViewChild('cropFrame') cropFrame?: ElementRef<HTMLDivElement>;
  @ViewChild('cropImage') cropImage?: ElementRef<HTMLImageElement>;
  @ViewChild('uploadInput') uploadInput?: ElementRef<HTMLInputElement>;

  private dragCornerIndex: number | null = null;
  private cropPreviewTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly pointerMoveHandler = (event: PointerEvent) => this.onPointerMove(event);
  private readonly pointerUpHandler = () => this.stopDraggingCorner();
  
  private router = inject(Router);
  private adminApi = inject(AdminApiService);
  
  constructor() {
    // Initialize displayed image URL from input
    effect(() => {
      const urlInput = this.currentImageUrl();
      // Only update if we haven't replaced the image yet (displayedImageUrl is still empty)
      if (this.displayedImageUrl() === '' && urlInput) {
        this.displayedImageUrl.set(urlInput);
      }
    });

    // Load workspace items immediately when component is initialized
    effect(() => {
      // Access workspaceId to establish dependency
      const workspaceId = this.workspaceId();
      const apiKey = this.apiKey();
      
      // Only load if we have valid inputs and haven't loaded yet
      if (workspaceId && apiKey && this.workspaceItems().length === 0) {
        this.loadWorkspaceItems();
      }
    });

    effect(() => {
      const tab = this.activeTab();
      const hasBlob = !!this.cropImageBlobUrl();
      const sourceImage = this.currentImageUrl();
      if (tab === 'crop' && !hasBlob && sourceImage) {
        this.openCropEditor();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopDraggingCorner();
    if (this.cropPreviewTimer) {
      clearTimeout(this.cropPreviewTimer);
      this.cropPreviewTimer = null;
    }
    // Clean up blob URL to prevent memory leaks
    const blobUrl = this.cropImageBlobUrl();
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }
  }
  
  private loadWorkspaceItems() {
    this.loading.set(true);
    this.adminApi.getItems(this.workspaceId(), this.apiKey(), 0, '').subscribe({
      next: (items: any) => {
        if (Array.isArray(items)) {
          const currentItem = items.find((item: any) => item._id === this.itemId());
          const currentType = currentItem?.screenshot_type || null;
          this.currentItem.set(currentItem || null);

          const filtered = items
            .filter((item: any) => item._id !== this.itemId() && !!item.screenshot_url)
            .map((item: any) => ({
              ...item,
              screenshot_url: this.fixUrl(item.screenshot_url)
            }));

          let prioritized: any[] = [];
          if (currentType) {
            const sameType = this.sortByDateDesc(filtered.filter((item: any) => item.screenshot_type === currentType));
            const otherTypes = filtered.filter((item: any) => item.screenshot_type !== currentType);
            const orderedOthers = currentItem && Array.isArray(currentItem.embedding)
              ? this.sortBySimilarity(otherTypes, currentItem.embedding)
              : this.sortByDateDesc(otherTypes);
            prioritized = [...sameType, ...orderedOthers];
          } else {
            prioritized = currentItem && Array.isArray(currentItem?.embedding)
              ? this.sortBySimilarity(filtered, currentItem.embedding)
              : this.sortByDateDesc(filtered);
          }

          this.workspaceItems.set(prioritized);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching workspace items:', error);
        this.workspaceItems.set([]);
        this.loading.set(false);
      }
    });
  }

  private sortBySimilarity(items: any[], currentEmbedding: number[]): any[] {
    return items.sort((a, b) => {
      const scoreA = this.computeSimilarity(currentEmbedding, a.embedding);
      const scoreB = this.computeSimilarity(currentEmbedding, b.embedding);
      return scoreB - scoreA; // Sort descending (highest similarity first)
    });
  }

  private sortByDateDesc(items: any[]): any[] {
    return items.sort((a, b) => this.getTimestamp(b) - this.getTimestamp(a));
  }

  private getTimestamp(item: any): number {
    const candidate = item?.created_at || item?.createdAt || item?.created || item?._created || item?.updated_at || item?.updatedAt || 0;
    return new Date(candidate || 0).getTime();
  }

  private computeSimilarity(embedding1: number[], embedding2: any): number {
    if (!embedding2 || !Array.isArray(embedding2)) {
      return 0;
    }
    
    // Compute cosine similarity
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    
    const length = Math.min(embedding1.length, embedding2.length);
    for (let i = 0; i < length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      magnitude1 += embedding1[i] * embedding1[i];
      magnitude2 += embedding2[i] * embedding2[i];
    }
    
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);
    
    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }
    
    return dotProduct / (magnitude1 * magnitude2);
  }
  
  close() {
    // Clean up blob URL
    const blobUrl = this.cropImageBlobUrl();
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      this.cropImageBlobUrl.set(null);
    }
    this.closed.emit();
  }
  
  onComparisonCancelled() {
    this.showComparison.set(false);
    this.pendingNewImage.set(null);
    this.pendingActionSource.set(null);
  }

  setActiveTab(tab: ReplaceTab) {
    this.activeTab.set(tab);
    this.cropError.set(null);
    this.uploadDragOver.set(false);
  }
  
  selectExistingImage(sourceItemId: string) {
    this.selectedItemId.set(sourceItemId);
  }
  
  confirmExistingImage() {
    const sourceItemId = this.selectedItemId();
    if (!sourceItemId) return;
    
    const sourceItem = this.workspaceItems().find(item => item._id === sourceItemId);
    if (!sourceItem) return;
    
    this.pendingNewImage.set(sourceItem.screenshot_url);
    this.pendingActionSource.set('existing');
    this.showComparison.set(true);
  }

  openCropEditor() {
    this.showCropEditor.set(true);
    this.cropError.set(null);
    this.croppedImageDataUrl.set(null);
    this.pendingNewImage.set(null);
    
    // Load image as blob to avoid CORS issues
    const imageUrl = this.currentImageUrl();
    fetch(imageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        // Revoke previous blob URL if it exists
        const prevUrl = this.cropImageBlobUrl();
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
        }
        
        const blobUrl = URL.createObjectURL(blob);
        this.cropImageBlobUrl.set(blobUrl);
        // Corners will be initialized when the image fires its load event (onCropImageLoaded)
      })
      .catch(error => {
        console.error('❌ Failed to load image as blob:', error);
        this.cropError.set(`Failed to load image: ${error.message}`);
      });
  }

  triggerUploadSelect() {
    this.uploadInput?.nativeElement.click();
  }

  onUploadSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.processUploadedFile(file);
  }

  onUploadDragOver(event: DragEvent) {
    event.preventDefault();
    this.uploadDragOver.set(true);
  }

  onUploadDragLeave(event: DragEvent) {
    event.preventDefault();
    this.uploadDragOver.set(false);
  }

  onUploadDrop(event: DragEvent) {
    event.preventDefault();
    this.uploadDragOver.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    this.processUploadedFile(file);
  }

  private processUploadedFile(file: File) {
    if (!file.type.startsWith('image/')) {
      this.cropError.set('Please choose an image file.');
      return;
    }

    this.cropError.set(null);

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      this.uploadedImageDataUrl.set(result);
    };
    reader.onerror = () => {
      this.cropError.set('Failed to read the selected image.');
    };
    reader.readAsDataURL(file);
  }

  confirmUploadedReplace() {
    const uploaded = this.uploadedImageDataUrl();
    if (!uploaded) return;
    this.pendingNewImage.set(uploaded);
    this.pendingActionSource.set('cropped');
    this.showComparison.set(true);
  }

  uploadAndCrop() {
    const uploaded = this.uploadedImageDataUrl();
    if (!uploaded) return;
    
    // Clean up previous crop blob URL
    const prevUrl = this.cropImageBlobUrl();
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }

    // Convert data URL to blob and create object URL for crop editor
    fetch(uploaded)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        this.cropImageBlobUrl.set(blobUrl);
        this.croppedImageDataUrl.set(null);
        this.cropError.set(null);
        this.activeTab.set('crop');
        // Corners will be initialized when the image fires its load event (onCropImageLoaded)
      })
      .catch(error => {
        console.error('❌ Failed to convert uploaded image for cropping:', error);
        this.cropError.set(`Failed to prepare image for cropping: ${error.message}`);
      });
  }

  scanUrl(): string {
    if (typeof window === 'undefined') return '';
    const params: Record<string, string> = {
      workspace: this.workspaceId(),
      api_key: this.apiKey(),
      replace_item: this.itemId()
    };
    const itemKey = this.currentItem()?._key;
    if (itemKey) {
      params['replace_item_key'] = itemKey;
    }
    const query = new URLSearchParams(params);
    return `${window.location.origin}/scan?${query.toString()}`;
  }

  scanQrUrl(): string {
    const scanUrl = this.scanUrl();
    if (!scanUrl) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(scanUrl)}`;
  }

  onCropImageLoaded() {
    // Wait for the image to be fully laid out before reading dimensions
    const tryInit = (retries = 5) => {
      const imageEl = this.cropImage?.nativeElement;
      if (imageEl && imageEl.clientWidth > 0 && imageEl.clientHeight > 0) {
        this.initializeCropCorners();
      } else if (retries > 0) {
        requestAnimationFrame(() => tryInit(retries - 1));
      }
    };
    requestAnimationFrame(() => tryInit());
  }

  private initializeCropCorners() {
    const frameEl = this.cropFrame?.nativeElement;
    const imageEl = this.cropImage?.nativeElement;
    if (!frameEl || !imageEl) {
      return;
    }

    // Use image's display dimensions, not frame dimensions
    const width = imageEl.clientWidth;
    const height = imageEl.clientHeight;
    
    if (width <= 0 || height <= 0) {
      return;
    }
    
    this.cropFrameWidth.set(width);
    this.cropFrameHeight.set(height);
    
    // Default corners inset at 25%/75% so handles are clearly visible within the image
    const initialCorners = [
      { x: width * 0.25, y: height * 0.25 },
      { x: width * 0.75, y: height * 0.25 },
      { x: width * 0.75, y: height * 0.75 },
      { x: width * 0.25, y: height * 0.75 }
    ];
    
    this.cropCorners.set(initialCorners);
    this.scheduleCropPreviewUpdate(true);
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
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;

    this.cropCorners.update(points => {
      if (points.length !== 4) return points;
      const next = [...points];
      next[this.dragCornerIndex as number] = { x: nextX, y: nextY };
      return next;
    });

    this.scheduleCropPreviewUpdate();
  }

  private stopDraggingCorner() {
    this.dragCornerIndex = null;
    window.removeEventListener('pointermove', this.pointerMoveHandler);
    window.removeEventListener('pointerup', this.pointerUpHandler);
    this.scheduleCropPreviewUpdate(true);
  }

  cropPolygonPoints(): string {
    return this.cropCorners().map(point => `${point.x},${point.y}`).join(' ');
  }

  private scheduleCropPreviewUpdate(immediate = false) {
    if (this.activeTab() !== 'crop') return;

    if (immediate) {
      if (this.cropPreviewTimer) {
        clearTimeout(this.cropPreviewTimer);
        this.cropPreviewTimer = null;
      }
      this.updateCroppedPreview();
      return;
    }

    if (this.cropPreviewTimer) return;
    this.cropPreviewTimer = setTimeout(() => {
      this.cropPreviewTimer = null;
      this.updateCroppedPreview();
    }, 80);
  }

  private updateCroppedPreview() {
    const previewUrl = this.extractCrop(false);
    if (previewUrl) {
      this.croppedImageDataUrl.set(previewUrl);
    }
  }

  private getLightestColor(imageEl: HTMLImageElement): string {
    // Use light gray as background fill color for any pixels outside the original image
    return '#eee';
  }

  private extractCrop(reportErrors: boolean): string | null {
    const imageEl = this.cropImage?.nativeElement;
    const frameEl = this.cropFrame?.nativeElement;
    const corners = this.cropCorners();

    if (!imageEl || !frameEl || corners.length !== 4) {
      if (reportErrors) {
        this.cropError.set('Crop area is not ready yet.');
      }
      return null;
    }

    if (imageEl.naturalWidth === 0 || imageEl.naturalHeight === 0) {
      if (reportErrors) {
        this.cropError.set('Image not fully loaded. Please wait and try again.');
      }
      return null;
    }

    if (!(window as any).jscanify) {
      if (reportErrors) {
        this.cropError.set('JSscanify is not available in this environment.');
      }
      return null;
    }

    if (!(window as any).cv || !(window as any).cv.Mat) {
      if (reportErrors) {
        this.cropError.set('OpenCV is still loading. Please wait a moment and try again.');
      }
      return null;
    }

    // IMPORTANT: jscanify/OpenCV reads from cv.imread(imageEl), which uses the image's rendered pixel space.
    // Map corners into that same source space (not naturalWidth/naturalHeight) to avoid warped/black output.
    const imageDisplayWidth = imageEl.clientWidth;
    const imageDisplayHeight = imageEl.clientHeight;
    const cvSourceWidth = imageEl.width || imageDisplayWidth;
    const cvSourceHeight = imageEl.height || imageDisplayHeight;
    
    if (imageDisplayWidth <= 0 || imageDisplayHeight <= 0) {
      if (reportErrors) {
        this.cropError.set('Image not fully loaded. Please try again.');
      }
      return null;
    }

    const scaleX = cvSourceWidth / imageDisplayWidth;
    const scaleY = cvSourceHeight / imageDisplayHeight;
    const mappedCorners = {
      topLeftCorner: { x: corners[0].x * scaleX, y: corners[0].y * scaleY },
      topRightCorner: { x: corners[1].x * scaleX, y: corners[1].y * scaleY },
      bottomRightCorner: { x: corners[2].x * scaleX, y: corners[2].y * scaleY },
      bottomLeftCorner: { x: corners[3].x * scaleX, y: corners[3].y * scaleY }
    };

    // Calculate natural dimensions from the corner positions
    const topWidth = Math.sqrt(
      Math.pow(mappedCorners.topRightCorner.x - mappedCorners.topLeftCorner.x, 2) +
      Math.pow(mappedCorners.topRightCorner.y - mappedCorners.topLeftCorner.y, 2)
    );
    const bottomWidth = Math.sqrt(
      Math.pow(mappedCorners.bottomRightCorner.x - mappedCorners.bottomLeftCorner.x, 2) +
      Math.pow(mappedCorners.bottomRightCorner.y - mappedCorners.bottomLeftCorner.y, 2)
    );
    const leftHeight = Math.sqrt(
      Math.pow(mappedCorners.bottomLeftCorner.x - mappedCorners.topLeftCorner.x, 2) +
      Math.pow(mappedCorners.bottomLeftCorner.y - mappedCorners.topLeftCorner.y, 2)
    );
    const rightHeight = Math.sqrt(
      Math.pow(mappedCorners.bottomRightCorner.x - mappedCorners.topRightCorner.x, 2) +
      Math.pow(mappedCorners.bottomRightCorner.y - mappedCorners.topRightCorner.y, 2)
    );

    // Use the average width and height to preserve natural aspect ratio
    const avgWidth = (topWidth + bottomWidth) / 2;
    const avgHeight = (leftHeight + rightHeight) / 2;
    // Scale to a reasonable output size while maintaining aspect ratio
    const maxDimension = 2000;
    const scale = Math.min(maxDimension / avgWidth, maxDimension / avgHeight);
    const outputWidth = Math.round(avgWidth * scale);
    const outputHeight = Math.round(avgHeight * scale);
    try {
      const scanner = new jscanify();
      const extractedCanvas = scanner.extractPaper(imageEl, outputWidth, outputHeight, mappedCorners);
      
      if (!extractedCanvas) {
        throw new Error('extractPaper returned null or undefined');
      }
      
      const dataUrl = extractedCanvas.toDataURL('image/jpeg', 0.92);
      return dataUrl;
    } catch (error) {
      if (reportErrors) {
        this.cropError.set(`Failed to crop: ${(error as any)?.message || 'Unknown error'}. Check browser console for details.`);
      }
      return null;
    }
  }

  runCrop() {
    this.cropError.set(null);
    this.cropBusy.set(true);
    try {
      const dataUrl = this.extractCrop(true);
      if (!dataUrl) return;
      this.croppedImageDataUrl.set(dataUrl);
    } finally {
      this.cropBusy.set(false);
    }
  }

  confirmCroppedReplace() {
    // Execute crop if not already done
    let cropped = this.croppedImageDataUrl();
    if (!cropped) {
      this.cropError.set(null);
      this.cropBusy.set(true);
      try {
        cropped = this.extractCrop(true);
        if (!cropped) {
          this.cropBusy.set(false);
          return;
        }
        this.croppedImageDataUrl.set(cropped);
      } finally {
        this.cropBusy.set(false);
      }
    }
    
    this.pendingNewImage.set(cropped);
    this.pendingActionSource.set('cropped');
    this.showComparison.set(true);
  }

  confirmCroppedDuplicate() {
    // Execute crop if not already done
    let cropped = this.croppedImageDataUrl();
    if (!cropped) {
      this.cropError.set(null);
      this.cropBusy.set(true);
      try {
        cropped = this.extractCrop(true);
        if (!cropped) {
          console.error('❌ Failed to extract crop');
          this.cropBusy.set(false);
          return;
        }
        this.croppedImageDataUrl.set(cropped);
      } finally {
        this.cropBusy.set(false);
      }
    }
    
    if (!cropped) {
      console.error('❌ No cropped image available');
      return;
    }
    const current = this.currentItem();
    if (!current) {
      console.error('❌ No current item available');
      return;
    }

    const duplicatePayload = this.buildDuplicatePayload(current, cropped);

    this.loading.set(true);
    this.adminApi.createItem(this.workspaceId(), this.apiKey(), duplicatePayload).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.itemDuplicated.emit({ item_id: response?.item_id || response?.item_key });
        alert(`Success! New item created with ID: ${response?.item_id || 'unknown'}`);
        this.close();
      },
      error: (error) => {
        console.error('❌ Error duplicating item with cropped image:', error);
        console.error('Error details:', {
          status: error?.status,
          statusText: error?.statusText,
          message: error?.message,
          error: error?.error
        });
        this.loading.set(false);
        alert(`Failed to duplicate item: ${error?.message || error?.statusText || 'Unknown error'}. Check console for details.`);
      }
    });
  }

  private buildDuplicatePayload(current: any, screenshotUrl: string): any {
    const blockedKeys = new Set([
      '_id',
      'id',
      'item_id',
      'item_key',
      '_key',
      'key',
      'created_at',
      'updated_at',
      'embedding',  // Remove embedding - needs to be regenerated for the new image
      'screenshot_type',  // Clear screenshot type - will be reprocessed
      'automatic',  // Clear automatic flag
      '_created',
      '_updated'
    ]);

    const payload: Record<string, any> = {};
    Object.entries(current || {}).forEach(([key, value]) => {
      if (blockedKeys.has(key)) return;
      if (key.startsWith('_')) return;
      payload[key] = value;
    });

    // Set the screenshot URL (base64 data URL)
    payload['screenshot_url'] = screenshotUrl;
    
    // Mark for reprocessing
    payload['needs_processing'] = true;
    
    // CRITICAL: Set default moderation status so item appears in lists
    // Status 2 = "pending" - shows in the default filter
    if (!payload['_private_moderation']) {
      payload['_private_moderation'] = 2;
    }
    
    return payload;
  }
  
  onComparisonApproved() {
    const source = this.pendingActionSource();
    if (!source) return;

    const currentItem = this.currentItem();
    const itemKey = currentItem?._key || '';

    this.loading.set(true);

    // Get the image as a Blob
    const getImageBlob = (): Promise<Blob> => {
      if (source === 'existing') {
        const sourceItemId = this.selectedItemId();
        const sourceItem = this.workspaceItems().find(item => item._id === sourceItemId);
        const url = sourceItem?.screenshot_url || '';
        if (!url) return Promise.reject(new Error('No source image URL'));
        return fetch(url).then(r => r.blob());
      } else {
        const dataUrl = this.pendingNewImage();
        if (!dataUrl) return Promise.reject(new Error('No pending image'));
        return Promise.resolve(this.base64ToBlob(dataUrl));
      }
    };

    getImageBlob().then(blob => {
      let replace$ = this.adminApi.replaceImage(
        this.workspaceId(), this.apiKey(), this.itemId(), itemKey, blob
      );

      if (this.reanalyzeImage()) {
        replace$ = replace$.pipe(
          switchMap((result) => this.adminApi.reanalyzeItem(
            this.workspaceId(), this.apiKey(), this.itemId(), itemKey
          ).pipe(switchMap(() => [result])))
        );
      }

      replace$.subscribe({
        next: (result) => {
          this.loading.set(false);
          const newUrl = result.screenshot_url || '';
          this.displayedImageUrl.set(newUrl);
          this.imageReplaced.emit({ screenshot_url: newUrl });
          this.pendingActionSource.set(null);
          alert('Success! Image has been replaced.');
          this.close();
        },
        error: (error) => {
          console.error('Error replacing item image:', error);
          this.loading.set(false);
          alert('Failed to replace image. Please try again.');
        }
      });
    }).catch(error => {
      console.error('Error preparing image blob:', error);
      this.loading.set(false);
      alert('Failed to prepare image. Please try again.');
    });
  }

  private base64ToBlob(dataUrl: string): Blob {
    const parts = dataUrl.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const byteString = atob(parts[1]);
    const bytes = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      bytes[i] = byteString.charCodeAt(i);
    }
    return new Blob([bytes], { type: mime });
  }
  
  scanAgain() {
    const queryParams: Record<string, string> = {
      workspace: this.workspaceId(),
      api_key: this.apiKey(),
      replace_item: this.itemId()
    };
    const itemKey = this.currentItem()?._key;
    if (itemKey) {
      queryParams['replace_item_key'] = itemKey;
    }
    this.router.navigate(['/scan'], { queryParams });
  }
  
  private fixUrl(url: string): string {
    return url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
  }
}
