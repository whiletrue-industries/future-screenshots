import { Injectable, signal } from '@angular/core';
import { PhotoMetadata } from './photo-data';

export interface LightboxState {
  isOpen: boolean;
  photoMetadata: PhotoMetadata | null;
  chatOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  private stateSignal = signal<LightboxState>({
    isOpen: false,
    photoMetadata: null,
    chatOpen: false
  });

  // Public read-only access to state
  state = this.stateSignal.asReadonly();

  /**
   * Open lightbox with selected photo
   */
  openLightbox(photoMetadata: PhotoMetadata): void {
    this.stateSignal.set({
      isOpen: true,
      photoMetadata,
      chatOpen: false
    });
  }

  /**
   * Close lightbox
   */
  closeLightbox(): void {
    this.stateSignal.set({
      isOpen: false,
      photoMetadata: null,
      chatOpen: false
    });
  }

  /**
   * Toggle chat sidebar
   */
  toggleChat(): void {
    this.stateSignal.update(state => ({
      ...state,
      chatOpen: !state.chatOpen
    }));
  }

  /**
   * Update photo metadata (e.g., after changes from chat)
   */
  updatePhotoMetadata(metadata: Partial<PhotoMetadata>): void {
    this.stateSignal.update(state => {
      if (!state.photoMetadata) return state;
      
      return {
        ...state,
        photoMetadata: {
          ...state.photoMetadata,
          ...metadata
        }
      };
    });
  }
}
