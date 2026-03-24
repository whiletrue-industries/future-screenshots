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

  // Raw captured image for manual crop flow
  rawCapturedImage = signal<Blob | null>(null);
  rawCapturedImageUrl = signal<string | null>(null);
  pendingCropCorners = signal<CropCornerPoints | null>(null);

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

  setRawImage(image: Blob, corners?: CropCornerPoints) {
    this.rawCapturedImage.set(image);
    const existing = this.rawCapturedImageUrl();
    if (existing) {
      URL.revokeObjectURL(existing);
    }
    this.rawCapturedImageUrl.set(URL.createObjectURL(image));
    this.pendingCropCorners.set(corners ?? null);
  }

  clearRawImage() {
    const url = this.rawCapturedImageUrl();
    if (url) {
      URL.revokeObjectURL(url);
    }
    this.rawCapturedImageUrl.set(null);
    this.rawCapturedImage.set(null);
    this.pendingCropCorners.set(null);
  }
}
