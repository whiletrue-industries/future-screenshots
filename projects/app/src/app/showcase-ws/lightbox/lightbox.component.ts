import { Component, computed, inject } from '@angular/core';
import { LightboxService } from '../lightbox.service';
import { LightboxChatComponent } from '../lightbox-chat/lightbox-chat.component';

@Component({
  selector: 'app-lightbox',
  imports: [LightboxChatComponent],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.less'
})
export class LightboxComponent {
  private lightboxService = inject(LightboxService);
  
  state = this.lightboxService.state;
  
  imageUrl = computed(() => {
    const photo = this.state().photoMetadata;
    return photo?.screenshot_url || photo?.url || '';
  });

  close(): void {
    this.lightboxService.closeLightbox();
  }

  toggleChat(): void {
    this.lightboxService.toggleChat();
  }

  onBackdropClick(event: MouseEvent): void {
    // Close lightbox only if clicking on backdrop itself, not on content
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
