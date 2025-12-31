import { Component, input, output, signal, effect, HostListener } from '@angular/core';
import { PhotoMetadata } from '../photo-data';

@Component({
  selector: 'app-showcase-lightbox',
  templateUrl: './showcase-lightbox.component.html',
  styleUrl: './showcase-lightbox.component.less'
})
export class ShowcaseLightboxComponent {
  // Inputs
  isOpen = input<boolean>(false);
  photos = input<PhotoMetadata[]>([]);
  currentPhotoId = input<string | null>(null);

  // Outputs
  close = output<void>();
  navigate = output<'prev' | 'next'>();

  // Internal state
  currentPhoto = signal<PhotoMetadata | null>(null);
  currentIndex = signal<number>(-1);

  constructor() {
    // Update current photo when inputs change
    effect(() => {
      const photoId = this.currentPhotoId();
      const photoList = this.photos();
      
      if (photoId && photoList.length > 0) {
        const index = photoList.findIndex(p => p.id === photoId);
        if (index !== -1) {
          this.currentPhoto.set(photoList[index]);
          this.currentIndex.set(index);
        } else {
          this.currentPhoto.set(null);
          this.currentIndex.set(-1);
        }
      } else {
        this.currentPhoto.set(null);
        this.currentIndex.set(-1);
      }
    });
  }

  /**
   * Handle keyboard navigation
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isOpen()) {
      return;
    }

    switch (event.key) {
      case 'Escape':
        this.onClose();
        event.preventDefault();
        break;
      case 'ArrowLeft':
        this.onNavigate('prev');
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.onNavigate('next');
        event.preventDefault();
        break;
    }
  }

  /**
   * Close the lightbox
   */
  onClose(): void {
    this.close.emit();
  }

  /**
   * Navigate to previous or next photo
   */
  onNavigate(direction: 'prev' | 'next'): void {
    this.navigate.emit(direction);
  }

  /**
   * Handle overlay click (close lightbox)
   */
  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  /**
   * Check if previous navigation is available
   */
  hasPrev(): boolean {
    return this.currentIndex() > 0;
  }

  /**
   * Check if next navigation is available
   */
  hasNext(): boolean {
    return this.currentIndex() < this.photos().length - 1;
  }
}
