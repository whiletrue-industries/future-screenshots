import { computed, effect, Injectable, signal } from '@angular/core';
import { PlatformService } from './platform.service';

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
