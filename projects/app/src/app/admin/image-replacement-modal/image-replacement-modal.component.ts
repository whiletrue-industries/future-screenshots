import { Component, output, input, signal, inject, effect, ChangeDetectionStrategy, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../../../admin-api.service';
import { ImageComparisonComponent } from '../../shared/image-comparison/image-comparison.component';

declare const jscanify: any;

type CropPoint = { x: number; y: number };

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
  
  workspaceItems = signal<any[]>([]);
  currentItem = signal<any | null>(null);
  selectedItemId = signal<string | null>(null);
  loading = signal<boolean>(false);
  pendingNewImage = signal<string | null>(null);
  showComparison = signal<boolean>(false);
  showCropEditor = signal<boolean>(false);
  cropCorners = signal<CropPoint[]>([]);
  cropFrameWidth = signal<number>(0);
  cropFrameHeight = signal<number>(0);
  cropBusy = signal<boolean>(false);
  cropError = signal<string | null>(null);
  croppedImageDataUrl = signal<string | null>(null);
  pendingActionSource = signal<'existing' | 'cropped' | null>(null);
  cropImageBlobUrl = signal<string | null>(null); // For CORS workaround

  @ViewChild('cropFrame') cropFrame?: ElementRef<HTMLDivElement>;
  @ViewChild('cropImage') cropImage?: ElementRef<HTMLImageElement>;

  private dragCornerIndex: number | null = null;
  private readonly pointerMoveHandler = (event: PointerEvent) => this.onPointerMove(event);
  private readonly pointerUpHandler = () => this.stopDraggingCorner();
  
  private router = inject(Router);
  private adminApi = inject(AdminApiService);
  
  constructor() {
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
  }

  ngOnDestroy(): void {
    this.stopDraggingCorner();
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
    console.log('🔄 Loading image as blob to avoid CORS:', imageUrl);
    
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
        console.log('✅ Image loaded as blob:', blobUrl);
        this.cropImageBlobUrl.set(blobUrl);
        requestAnimationFrame(() => this.initializeCropCorners());
      })
      .catch(error => {
        console.error('❌ Failed to load image as blob:', error);
        this.cropError.set(`Failed to load image: ${error.message}`);
      });
  }

  onCropImageLoaded() {
    console.log('🖼️ Crop image loaded event fired');
    // Wait a moment for the image to fully render
    setTimeout(() => {
      this.initializeCropCorners();
    }, 100);
  }

  private initializeCropCorners() {
    const frameEl = this.cropFrame?.nativeElement;
    const imageEl = this.cropImage?.nativeElement;
    if (!frameEl || !imageEl) {
      console.log('⚠️ Frame or image not ready for corner initialization');
      return;
    }
    
    console.log('📐 Initializing crop corners');
    console.log('Frame dimensions:', frameEl.clientWidth, 'x', frameEl.clientHeight);
    console.log('Image natural dimensions:', imageEl.naturalWidth, 'x', imageEl.naturalHeight);
    console.log('Image display dimensions:', imageEl.clientWidth, 'x', imageEl.clientHeight);
    
    // Use image's display dimensions, not frame dimensions
    const width = imageEl.clientWidth;
    const height = imageEl.clientHeight;
    
    if (width <= 0 || height <= 0) {
      console.log('⚠️ Image not yet visible, dimensions:', width, 'x', height);
      return;
    }
    
    this.cropFrameWidth.set(width);
    this.cropFrameHeight.set(height);
    
    const marginX = Math.max(12, width * 0.08);
    const marginY = Math.max(12, height * 0.08);
    
    const initialCorners = [
      { x: marginX, y: marginY },
      { x: width - marginX, y: marginY },
      { x: width - marginX, y: height - marginY },
      { x: marginX, y: height - marginY }
    ];
    
    console.log('Initial corners (display space):', initialCorners);
    this.cropCorners.set(initialCorners);
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
    const nextX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const nextY = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

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

  cropPolygonPoints(): string {
    return this.cropCorners().map(point => `${point.x},${point.y}`).join(' ');
  }

  runCrop() {
    this.cropError.set(null);
    const imageEl = this.cropImage?.nativeElement;
    const frameEl = this.cropFrame?.nativeElement;
    const corners = this.cropCorners();

    console.log('🔍 Crop Debug - Starting crop operation');
    console.log('Image element:', imageEl);
    console.log('Frame element:', frameEl);
    console.log('Corners:', corners);

    if (!imageEl || !frameEl || corners.length !== 4) {
      console.error('❌ Missing required elements or corners');
      this.cropError.set('Crop area is not ready yet.');
      return;
    }

    console.log('Image natural dimensions:', imageEl.naturalWidth, 'x', imageEl.naturalHeight);
    console.log('Image rendered dimensions (client):', imageEl.clientWidth, 'x', imageEl.clientHeight);
    console.log('Image rendered dimensions (width/height):', imageEl.width, 'x', imageEl.height);
    console.log('Frame client dimensions:', frameEl.clientWidth, 'x', frameEl.clientHeight);

    if (imageEl.naturalWidth === 0 || imageEl.naturalHeight === 0) {
      console.error('❌ Image natural dimensions are zero!');
      this.cropError.set('Image not fully loaded. Please wait and try again.');
      return;
    }

    if (!(window as any).jscanify) {
      console.error('❌ JSscanify not available');
      this.cropError.set('JSscanify is not available in this environment.');
      return;
    }
    console.log('✅ JSscanify available');

    if (!(window as any).cv || !(window as any).cv.Mat) {
      console.error('❌ OpenCV not loaded');
      this.cropError.set('OpenCV is still loading. Please wait a moment and try again.');
      return;
    }
    console.log('✅ OpenCV loaded');

    // IMPORTANT: jscanify/OpenCV reads from cv.imread(imageEl), which uses the image's rendered pixel space.
    // Map corners into that same source space (not naturalWidth/naturalHeight) to avoid warped/black output.
    const imageDisplayWidth = imageEl.clientWidth;
    const imageDisplayHeight = imageEl.clientHeight;
    const cvSourceWidth = imageEl.width || imageDisplayWidth;
    const cvSourceHeight = imageEl.height || imageDisplayHeight;
    
    console.log('Image display size:', imageDisplayWidth, 'x', imageDisplayHeight);
    
    if (imageDisplayWidth <= 0 || imageDisplayHeight <= 0) {
      console.error('❌ Image not properly displayed');
      this.cropError.set('Image not fully loaded. Please try again.');
      return;
    }

    const scaleX = cvSourceWidth / imageDisplayWidth;
    const scaleY = cvSourceHeight / imageDisplayHeight;
    console.log('Source-space dimensions for OpenCV:', cvSourceWidth, 'x', cvSourceHeight);
    console.log('Scale factors (display -> source) - X:', scaleX, 'Y:', scaleY);
    
    console.log('📍 Display space corners (what you see):');
    corners.forEach((c, i) => {
      console.log(`  Corner ${i}: (${c.x.toFixed(1)}, ${c.y.toFixed(1)})`);
    });

    const mappedCorners = {
      topLeftCorner: { x: corners[0].x * scaleX, y: corners[0].y * scaleY },
      topRightCorner: { x: corners[1].x * scaleX, y: corners[1].y * scaleY },
      bottomRightCorner: { x: corners[2].x * scaleX, y: corners[2].y * scaleY },
      bottomLeftCorner: { x: corners[3].x * scaleX, y: corners[3].y * scaleY }
    };
    console.log('Mapped corners (OpenCV source image space):');
    console.log('  Top-Left:', mappedCorners.topLeftCorner);
    console.log('  Top-Right:', mappedCorners.topRightCorner);
    console.log('  Bottom-Right:', mappedCorners.bottomRightCorner);
    console.log('  Bottom-Left:', mappedCorners.bottomLeftCorner);

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
    console.log('Calculated dimensions - Width:', avgWidth, 'Height:', avgHeight);
    
    // Scale to a reasonable output size while maintaining aspect ratio
    const maxDimension = 2000;
    const scale = Math.min(maxDimension / avgWidth, maxDimension / avgHeight);
    const outputWidth = Math.round(avgWidth * scale);
    const outputHeight = Math.round(avgHeight * scale);
    console.log('Output dimensions:', outputWidth, 'x', outputHeight);

    this.cropBusy.set(true);
    try {
      console.log('🚀 Calling scanner.extractPaper...');
      const scanner = new jscanify();
      const extractedCanvas = scanner.extractPaper(imageEl, outputWidth, outputHeight, mappedCorners);
      console.log('✅ Extract successful, canvas:', extractedCanvas);
      
      if (!extractedCanvas) {
        throw new Error('extractPaper returned null or undefined');
      }
      
      const dataUrl = extractedCanvas.toDataURL('image/jpeg', 0.92);
      console.log('✅ Data URL created, length:', dataUrl.length);
      console.log('✅ Canvas dimensions:', extractedCanvas.width, 'x', extractedCanvas.height);
      console.log('✅ Data URL prefix:', dataUrl.substring(0, 50));
      this.croppedImageDataUrl.set(dataUrl);
      console.log('✅ Crop completed successfully!');
      console.log('✅ croppedImageDataUrl signal value:', this.croppedImageDataUrl()?.substring(0, 50));
      this.cropError.set(null); // Clear any previous errors
    } catch (error) {
      console.error('❌ Crop extraction failed:', error);
      console.error('Error details:', {
        message: (error as any)?.message,
        stack: (error as any)?.stack,
        type: typeof error,
        error
      });
      this.cropError.set(`Failed to crop: ${(error as any)?.message || 'Unknown error'}. Check browser console for details.`);
    } finally {
      this.cropBusy.set(false);
    }
  }

  confirmCroppedReplace() {
    const cropped = this.croppedImageDataUrl();
    if (!cropped) return;
    this.pendingNewImage.set(cropped);
    this.pendingActionSource.set('cropped');
    this.showComparison.set(true);
  }

  confirmCroppedDuplicate() {
    const cropped = this.croppedImageDataUrl();
    console.log('🔄 Duplicate - cropped image length:', cropped?.length);
    if (!cropped) {
      console.error('❌ No cropped image available');
      return;
    }
    const current = this.currentItem();
    if (!current) {
      console.error('❌ No current item available');
      return;
    }

    console.log('📦 Building duplicate payload from current item:', current._id);
    const duplicatePayload = this.buildDuplicatePayload(current, cropped);
    console.log('📦 Duplicate payload:', {
      ...duplicatePayload,
      screenshot_url: `[data URL, ${cropped.length} bytes]`
    });
    
    this.loading.set(true);
    console.log('🚀 Calling createItem API...');
    this.adminApi.createItem(this.workspaceId(), this.apiKey(), duplicatePayload).subscribe({
      next: (response) => {
        console.log('✅ Item duplicated successfully:', response);
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
    
    console.log('📋 Duplicate payload keys:', Object.keys(payload));
    console.log('📋 Payload has screenshot_url:', !!payload['screenshot_url']);
    console.log('📋 Payload has content:', !!payload['content']);
    console.log('📋 Payload moderation status:', payload['_private_moderation']);
    
    return payload;
  }
  
  onComparisonApproved() {
    const source = this.pendingActionSource();
    if (!source) return;

    this.loading.set(true);

    const updatePayload = source === 'existing'
      ? (() => {
          const sourceItemId = this.selectedItemId();
          const sourceItem = this.workspaceItems().find(item => item._id === sourceItemId);
          return { screenshot_url: sourceItem?.screenshot_url || '' };
        })()
      : { screenshot_url: this.pendingNewImage() || '' };

    if (!updatePayload.screenshot_url) {
      this.loading.set(false);
      return;
    }

    this.adminApi.updateItem(this.workspaceId(), this.apiKey(), this.itemId(), updatePayload).subscribe({
      next: () => {
        this.loading.set(false);
        this.imageReplaced.emit({ screenshot_url: updatePayload.screenshot_url });
        this.pendingActionSource.set(null);
        alert('Success! Image has been replaced.');
        this.close();
      },
      error: (error) => {
        console.error('Error updating item screenshot:', error);
        this.loading.set(false);
        alert('Failed to replace image. Please try again.');
      }
    });
  }
  
  scanAgain() {
    this.router.navigate(['/scan'], {
      queryParams: {
        workspace: this.workspaceId(),
        api_key: this.apiKey(),
        replace_item: this.itemId()
      }
    });
  }
  
  private fixUrl(url: string): string {
    return url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
  }
}
