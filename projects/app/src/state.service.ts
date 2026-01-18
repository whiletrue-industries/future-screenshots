import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  currentImage = signal<Blob | null>(null);
  currentImageUrl = signal<string | null>(null);
  currentTextboxData = signal<string | null>(null);
  mainMenuHeight = signal<number>(348);
  aboutVisible = signal<boolean>(false);
  authenticated = signal<boolean>(false);

  constructor() { }

  setImage(image: Blob) {
    this.currentImage.set(image);
    const currentImageUrl = this.currentImageUrl();
    if (currentImageUrl) {
      URL.revokeObjectURL(currentImageUrl);
    }
    this.currentImageUrl.set(URL.createObjectURL(image));
  }
}
