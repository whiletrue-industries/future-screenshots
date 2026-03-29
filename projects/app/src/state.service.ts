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
  rawCapturedImageVideo = signal<Blob | null>(null);
  rawCapturedImageVideoUrl = signal<string | null>(null);
  rawCapturedImageStill = signal<Blob | null>(null);
  rawCapturedImageStillUrl = signal<string | null>(null);
  pendingCropCorners = signal<CropCornerPoints | null>(null);
  pendingCropCornersVideo = signal<CropCornerPoints | null>(null);
  pendingCropCornersStill = signal<CropCornerPoints | null>(null);
  rawCaptureSource = signal<'video' | 'still' | null>(null);

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

  setRawImage(image: Blob, corners?: CropCornerPoints, source?: 'video' | 'still') {
    this.setRawImageCandidates(
      source === 'still' ? null : image,
      source === 'still' ? image : null,
      source ?? 'video',
      source === 'still'
        ? { still: corners ?? null }
        : { video: corners ?? null },
    );
  }

  setRawImageCandidates(
    videoImage: Blob | null,
    stillImage: Blob | null,
    preferredSource: 'video' | 'still',
    corners?: {
      video?: CropCornerPoints | null;
      still?: CropCornerPoints | null;
    },
  ) {
    const existingVideoUrl = this.rawCapturedImageVideoUrl();
    if (existingVideoUrl) {
      URL.revokeObjectURL(existingVideoUrl);
    }
    const existingStillUrl = this.rawCapturedImageStillUrl();
    if (existingStillUrl) {
      URL.revokeObjectURL(existingStillUrl);
    }

    this.rawCapturedImageVideo.set(videoImage);
    this.rawCapturedImageVideoUrl.set(videoImage ? URL.createObjectURL(videoImage) : null);

    this.rawCapturedImageStill.set(stillImage);
    this.rawCapturedImageStillUrl.set(stillImage ? URL.createObjectURL(stillImage) : null);

    this.pendingCropCornersVideo.set(corners?.video ?? null);
    this.pendingCropCornersStill.set(corners?.still ?? null);
    this.pendingCropCorners.set(null);

    const normalizedPreferred =
      preferredSource === 'still' && stillImage ? 'still' :
      preferredSource === 'video' && videoImage ? 'video' :
      stillImage ? 'still' :
      videoImage ? 'video' :
      null;

    this.setRawCaptureSource(normalizedPreferred);
  }

  setRawCaptureSource(source: 'video' | 'still' | null) {
    this.rawCaptureSource.set(source);

    if (source === 'still' && this.rawCapturedImageStill() && this.rawCapturedImageStillUrl()) {
      this.rawCapturedImage.set(this.rawCapturedImageStill());
      this.rawCapturedImageUrl.set(this.rawCapturedImageStillUrl());
      this.pendingCropCorners.set(this.pendingCropCornersStill());
      return;
    }

    if (source === 'video' && this.rawCapturedImageVideo() && this.rawCapturedImageVideoUrl()) {
      this.rawCapturedImage.set(this.rawCapturedImageVideo());
      this.rawCapturedImageUrl.set(this.rawCapturedImageVideoUrl());
      this.pendingCropCorners.set(this.pendingCropCornersVideo());
      return;
    }

    this.rawCapturedImage.set(null);
    this.rawCapturedImageUrl.set(null);
    this.pendingCropCorners.set(null);
  }

  clearRawImage() {
    const currentUrl = this.rawCapturedImageUrl();
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
    const videoUrl = this.rawCapturedImageVideoUrl();
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    const stillUrl = this.rawCapturedImageStillUrl();
    if (stillUrl) {
      URL.revokeObjectURL(stillUrl);
    }

    this.rawCapturedImageUrl.set(null);
    this.rawCapturedImage.set(null);
    this.rawCapturedImageVideoUrl.set(null);
    this.rawCapturedImageVideo.set(null);
    this.rawCapturedImageStillUrl.set(null);
    this.rawCapturedImageStill.set(null);
    this.pendingCropCorners.set(null);
    this.pendingCropCornersVideo.set(null);
    this.pendingCropCornersStill.set(null);
    this.rawCaptureSource.set(null);
  }
}
