import { Component, output, input, signal, inject, ChangeDetectionStrategy } from '@angular/core';
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
  
  selectedOption = signal<'upload' | 'existing' | 'scan' | null>(null);
  workspaceItems = signal<any[]>([]);
  selectedItemId = signal<string | null>(null);
  uploading = signal<boolean>(false);
  pendingNewImage = signal<string | null>(null);
  showComparison = signal<boolean>(false);
  
  private router = inject(Router);
  private apiService = inject(ApiService);
  private adminApi = inject(AdminApiService);
  
  selectOption(option: 'upload' | 'existing' | 'scan') {
    this.selectedOption.set(option);
    
    if (option === 'existing') {
      this.loadWorkspaceItems();
    }
  }
  
  private loadWorkspaceItems() {
    this.uploading.set(true);
    this.adminApi.getItems(this.workspaceId(), this.apiKey(), 0, '').subscribe({
      next: (items: any) => {
        if (Array.isArray(items)) {
          const filtered = items.filter((item: any) => 
            item._id !== this.itemId() && !!item.screenshot_url
          );
          filtered.forEach((item: any) => {
            item.screenshot_url = this.fixUrl(item.screenshot_url);
          });
          this.workspaceItems.set(filtered);
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
    
    this.adminApi.updateItem(this.workspaceId(), this.apiKey(), this.itemId(), {
      screenshot_url: sourceItem.screenshot_url
    }).subscribe({
      next: () => {
        this.adminApi.updateItemModeration(this.workspaceId(), this.apiKey(), sourceItemId, 0).subscribe({
          next: () => {
            this.uploading.set(false);
            this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
            this.close();
          },
          error: (error) => {
            console.error('Error marking source as duplicate:', error);
            this.uploading.set(false);
            this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
            this.close();
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
