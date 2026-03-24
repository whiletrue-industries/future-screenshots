import { computed, effect, Injectable, signal } from '@angular/core';
import { PlatformService } from './platform.service';

export type CropCornerPoints = {
  topLeftCorner: { x: number; y: number };
  topRightCorner: { x: number; y: number };
  bottomLeftCorner: { x: number; y: number };
  bottomRightCorner: { x: number; y: number };
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

  currentImage = signal<Blob | null>(null);
  currentImageUrl = signal<string | null>(null);
  currentTextboxData = signal<string | null>(null);
  currentCanvasState = signal<string | null>(null); // Fabric.js canvas JSON
  mainMenuHeight = signal<number>(348);
  aboutVisible = signal<boolean>(false);
  authenticated = signal<boolean>(false);
  batchPreference = signal<string>('');
  batchPotential = signal<number | null>(null);
  batchTags = signal<string[]>([]);
  batchTagsInput = signal<string>('');

  /** Full-resolution uncropped image captured from the camera */
  rawCapturedImage = signal<Blob | null>(null);
  /** Raw image URL for display in crop editor */
  rawCapturedImageUrl = signal<string | null>(null);
  /** Whether the confirm screen should show interactive crop handles */
  pendingManualCrop = signal<boolean>(false);
  /** Auto-detected corner points (in raw image coordinates) to pre-populate crop handles */
  pendingCropCorners = signal<CropCornerPoints | null>(null);

  setRawImage(image: Blob, corners: CropCornerPoints | null = null, needsManualCrop = false) {
    this.rawCapturedImage.set(image);
    const prev = this.rawCapturedImageUrl();
    if (prev) {
      URL.revokeObjectURL(prev);
    }
    this.rawCapturedImageUrl.set(URL.createObjectURL(image));
    this.pendingCropCorners.set(corners);
    this.pendingManualCrop.set(needsManualCrop);
  }

  clearRawImage() {
    const prev = this.rawCapturedImageUrl();
    if (prev) {
      URL.revokeObjectURL(prev);
    }
    this.rawCapturedImageUrl.set(null);
    this.rawCapturedImage.set(null);
    this.pendingCropCorners.set(null);
    this.pendingManualCrop.set(false);
  }

  constructor(private platform: PlatformService) {
    // Restore tags from localStorage on init
    platform.browser(() => {
      const savedTags = localStorage.getItem('batchTags');
      if (savedTags) {
        try {
          this.batchTags.set(JSON.parse(savedTags));
        } catch (e) {
          // Ignore parse errors
        }
      }
    });
    // Watch for changes to batchTags and persist to localStorage
    effect(() => {
      const tags = this.batchTags();
      platform.browser(() => {
        localStorage.setItem('batchTags', JSON.stringify(tags));
      });
    });
  }

  setImage(image: Blob) {
    this.currentImage.set(image);
    const currentImageUrl = this.currentImageUrl();
    if (currentImageUrl) {
      URL.revokeObjectURL(currentImageUrl);
    }
    this.currentImageUrl.set(URL.createObjectURL(image));
  }
}
