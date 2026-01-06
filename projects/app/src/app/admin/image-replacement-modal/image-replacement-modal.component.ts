import { Component, output, input, signal, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../../../admin-api.service';
import { ApiService } from '../../../api.service';
import { ImageComparisonComponent } from '../../shared/image-comparison/image-comparison.component';

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
  
  selectedOption = signal<'upload' | 'existing' | 'scan' | null>('existing');
  workspaceItems = signal<any[]>([]);
  currentItem = signal<any | null>(null);
  selectedItemId = signal<string | null>(null);
  uploading = signal<boolean>(false);
  pendingNewImage = signal<string | null>(null);
  showComparison = signal<boolean>(false);
  
  private router = inject(Router);
  private apiService = inject(ApiService);
  private adminApi = inject(AdminApiService);
  
  constructor() {
    // Load workspace items immediately when component is initialized
    effect(() => {
      // Access workspaceId to establish dependency
      const workspaceId = this.workspaceId();
      const apiKey = this.apiKey();
      
      // Only load if we have valid inputs and haven't loaded yet
      if (workspaceId && apiKey && this.selectedOption() === 'existing' && this.workspaceItems().length === 0) {
        this.loadWorkspaceItems();
      }
    });
  }
  
  selectOption(option: 'upload' | 'existing' | 'scan') {
    this.selectedOption.set(option);
    
    if (option === 'existing' && this.workspaceItems().length === 0) {
      this.loadWorkspaceItems();
    }
  }
  
  private loadWorkspaceItems() {
    this.uploading.set(true);
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
        this.uploading.set(false);
      },
      error: (error) => {
        console.error('Error fetching workspace items:', error);
        this.workspaceItems.set([]);
        this.uploading.set(false);
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
    this.closed.emit();
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.readAndPreviewFile(file);
    }
  }
  
  private readAndPreviewFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        this.pendingNewImage.set(e.target.result as string);
        this.showComparison.set(true);
      }
    };
    reader.readAsDataURL(file);
  }
  
  onComparisonApproved() {
    const newImageData = this.pendingNewImage();
    if (newImageData) {
      const file = this.dataUrlToFile(newImageData, 'replacement.jpg');
      this.uploadImage(file);
    }
  }
  
  onComparisonCancelled() {
    this.showComparison.set(false);
    this.pendingNewImage.set(null);
  }
  
  private dataUrlToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }
  
  uploadImage(file: File) {
    this.uploading.set(true);
    
    const formData = new FormData();
    formData.append('image', file);
    
    const params = {
      workspace: this.workspaceId(),
      api_key: this.apiKey(),
      item_id: this.itemId(),
    };
    
    fetch(`${this.apiService.SCREENSHOT_HANDLER_URL}?${new URLSearchParams(params).toString()}`, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data: any) => {
      this.uploading.set(false);
      if (data.metadata && data.metadata.screenshot_url) {
        this.imageReplaced.emit({ screenshot_url: this.fixUrl(data.metadata.screenshot_url) });
        this.close();
      } else {
        throw new Error('Invalid response: missing screenshot URL');
      }
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      this.uploading.set(false);
      alert('Failed to upload image. Please try again.');
    });
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
    this.showComparison.set(true);
  }
  
  onExistingComparisonApproved() {
    const sourceItemId = this.selectedItemId();
    if (!sourceItemId) return;
    
    const sourceItem = this.workspaceItems().find(item => item._id === sourceItemId);
    if (!sourceItem) return;
    
    this.uploading.set(true);

    const targetUpdate = this.buildTargetUpdatePayload(sourceItem);

    this.adminApi.updateItem(this.workspaceId(), this.apiKey(), this.itemId(), targetUpdate).subscribe({
      next: () => {
        // Build archive note with link to target item
        const targetItem = this.currentItem();
        const targetTitle = targetItem?.future_scenario_tagline || 'item';
        const targetLink = `${window.location.origin}/admin?workspace=${this.workspaceId()}&api_key=${this.apiKey()}&item=${this.itemId()}`;
        const archivalNote = `duplicate of [${targetTitle}](${targetLink})`;
        
        // Mark the source item as duplicate and rejected
        this.adminApi.updateItem(this.workspaceId(), this.apiKey(), sourceItemId, { archival_note: archivalNote }).subscribe({
          next: () => {
            this.adminApi.updateItemModeration(this.workspaceId(), this.apiKey(), sourceItemId, 0).subscribe({
              next: () => {
                this.uploading.set(false);
                this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
                this.close();
              },
              error: (error) => {
                console.error('Error marking source as rejected:', error);
                this.uploading.set(false);
                this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
                this.close();
              }
            });
          },
          error: (error) => {
            console.error('Error setting archival note on source item:', error);
            // Still attempt to set status to rejected
            this.adminApi.updateItemModeration(this.workspaceId(), this.apiKey(), sourceItemId, 0).subscribe({
              next: () => {
                this.uploading.set(false);
                this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
                this.close();
              },
              error: (err) => {
                console.error('Error marking source as rejected after archival note failure:', err);
                this.uploading.set(false);
                this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
                this.close();
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Error updating item:', error);
        this.uploading.set(false);
        alert('Failed to replace image. Please try again.');
      }
    });
  }

  private buildTargetUpdatePayload(sourceItem: any): Record<string, any> {
    const target = this.currentItem();
    const payload: Record<string, any> = {
      screenshot_url: sourceItem.screenshot_url
    };

    const needsPlausibility = target?.plausibility === undefined || target?.plausibility === null || target?.plausibility === '';
    const needsFavorable = target?.favorable_future === undefined || target?.favorable_future === null || target?.favorable_future === '';

    if (needsPlausibility && sourceItem.plausibility !== undefined && sourceItem.plausibility !== null) {
      payload['plausibility'] = sourceItem.plausibility;
    }

    if (needsFavorable && sourceItem.favorable_future) {
      payload['favorable_future'] = sourceItem.favorable_future;
    }

    return payload;
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
