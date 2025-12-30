import { computed, Injectable, signal } from '@angular/core';

export interface SessionScreenshot {
  imageUrl: string;
  itemId: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  currentImage = signal<Blob | null>(null);
  currentImageUrl = signal<string | null>(null);
  mainMenuHeight = signal<number>(348);
  aboutVisible = signal<boolean>(false);
  authenticated = signal<boolean>(false);
  
  // Track screenshots in current session
  sessionScreenshots = signal<SessionScreenshot[]>([]);

  constructor() { }

  setImage(image: Blob) {
    this.currentImage.set(image);
    const currentImageUrl = this.currentImageUrl();
    if (currentImageUrl) {
      URL.revokeObjectURL(currentImageUrl);
    }
    this.currentImageUrl.set(URL.createObjectURL(image));
  }

  addSessionScreenshot(imageUrl: string, itemId: string) {
    const screenshots = this.sessionScreenshots();
    this.sessionScreenshots.set([...screenshots, {
      imageUrl,
      itemId,
      timestamp: Date.now()
    }]);
  }

  clearSessionScreenshots() {
    this.sessionScreenshots.set([]);
  }
}
