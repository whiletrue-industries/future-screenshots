import { Component, output, input, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../../../admin-api.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-image-replacement-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './image-replacement-modal.component.html',
  styleUrl: './image-replacement-modal.component.less'
})
export class ImageReplacementModalComponent {
  workspaceId = input.required<string>();
  apiKey = input.required<string>();
  itemId = input.required<string>();
  
  closed = output<void>();
  imageReplaced = output<{ screenshot_url: string }>();
  
  selectedOption = signal<'upload' | 'existing' | 'scan' | null>(null);
  workspaceItems = signal<any[]>([]);
  selectedItemId = signal<string | null>(null);
  uploading = signal<boolean>(false);
  
  private router = inject(Router);
  private apiService = inject(ApiService);
  
  constructor(private api: AdminApiService) {}
  
  selectOption(option: 'upload' | 'existing' | 'scan') {
    this.selectedOption.set(option);
    
    if (option === 'existing') {
      // Fetch workspace items
      this.api.getItems(this.workspaceId(), this.apiKey(), 0, '').subscribe((items: any) => {
        if (Array.isArray(items)) {
          // Filter out the current item and items without screenshots
          const filtered = items.filter((item: any) => 
            item._id !== this.itemId() && !!item.screenshot_url
          );
          filtered.forEach((item: any) => {
            item.screenshot_url = this.fix_url(item.screenshot_url);
          });
          this.workspaceItems.set(filtered);
        }
      });
    }
  }
  
  close() {
    this.closed.emit();
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadImage(file);
    }
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
    .then(response => response.json())
    .then((data: any) => {
      this.uploading.set(false);
      if (data.metadata && data.metadata.screenshot_url) {
        this.imageReplaced.emit({ screenshot_url: this.fix_url(data.metadata.screenshot_url) });
        this.close();
      }
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      this.uploading.set(false);
      // Display error in the modal instead of alert
      // Could be improved with a toast notification service
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
    
    this.uploading.set(true);
    
    // Update the current item with the screenshot URL from the source item
    this.api.updateItem(this.workspaceId(), this.apiKey(), this.itemId(), {
      screenshot_url: sourceItem.screenshot_url
    }).subscribe({
      next: () => {
        // Mark the source item as duplicate (archive it by setting moderation to 0)
        this.api.updateItemModeration(this.workspaceId(), this.apiKey(), sourceItemId, 0).subscribe({
          next: () => {
            this.uploading.set(false);
            this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
            this.close();
          },
          error: (error) => {
            console.error('Error marking source as duplicate:', error);
            this.uploading.set(false);
            // Still emit the replacement even if marking as duplicate fails
            this.imageReplaced.emit({ screenshot_url: sourceItem.screenshot_url });
            this.close();
          }
        });
      },
      error: (error) => {
        console.error('Error updating item:', error);
        this.uploading.set(false);
        // Display error in the modal instead of alert
        // Could be improved with a toast notification service
        alert('Failed to replace image. Please try again.');
      }
    });
  }
  
  scanAgain() {
    // Navigate to scanner with item context using Angular Router
    this.router.navigate(['/scan'], {
      queryParams: {
        workspace: this.workspaceId(),
        api_key: this.apiKey(),
        replace_item: this.itemId()
      }
    });
  }
  
  fix_url(url: string) {
    return url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
  }
}
