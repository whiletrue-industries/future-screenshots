import { Component, output, input, signal, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../../../admin-api.service';
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
  
  workspaceItems = signal<any[]>([]);
  currentItem = signal<any | null>(null);
  selectedItemId = signal<string | null>(null);
  loading = signal<boolean>(false);
  pendingNewImage = signal<string | null>(null);
  showComparison = signal<boolean>(false);
  
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
    this.closed.emit();
  }
  
  onComparisonCancelled() {
    this.showComparison.set(false);
    this.pendingNewImage.set(null);
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
    if (!sourceItem || !sourceItem.screenshot_url) return;
    
    this.loading.set(true);

    // Simply update the screenshot_url field in the target item
    const updatePayload = {
      screenshot_url: sourceItem.screenshot_url
    };

    this.adminApi.updateItem(this.workspaceId(), this.apiKey(), this.itemId(), updatePayload).subscribe({
      next: () => {
        this.loading.set(false);
        this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
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
