import { computed, Injectable, signal } from '@angular/core';

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

  // Metadata update notifications (itemId -> metadata)
  // Used to broadcast metadata updates across different screens (moderate, showcase, etc.)
  itemMetadataUpdated = signal<{ itemId: string; metadata: any } | null>(null);

  // Cross-tab/channel for metadata updates (BroadcastChannel with localStorage fallback)
  private metadataChannel?: BroadcastChannel;

  constructor() {
    // Set up cross-tab broadcast listener (browser only)
    if (typeof window !== 'undefined') {
      try {
        this.metadataChannel = new BroadcastChannel('fs-metadata-updates');
        this.metadataChannel.onmessage = (event) => {
          const { itemId, metadata } = event.data || {};
          if (itemId && metadata) {
            this.itemMetadataUpdated.set({ itemId, metadata });
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel not available, relying on localStorage fallback', err);
      }

      // LocalStorage fallback for older browsers
      window.addEventListener('storage', (evt: StorageEvent) => {
        if (evt.key === 'fs-metadata-updates' && evt.newValue) {
          try {
            const payload = JSON.parse(evt.newValue);
            if (payload?.itemId && payload?.metadata) {
              this.itemMetadataUpdated.set({ itemId: payload.itemId, metadata: payload.metadata });
            }
          } catch (e) {
            console.error('Failed to parse metadata update from storage event', e);
          }
        }
      });
    }
  }

  setImage(image: Blob) {
    this.currentImage.set(image);
    const currentImageUrl = this.currentImageUrl();
    if (currentImageUrl) {
      URL.revokeObjectURL(currentImageUrl);
    }
    this.currentImageUrl.set(URL.createObjectURL(image));
  }

  /**
   * Notify that an item's metadata has been updated
   * This signal triggers handlers in all listening components (e.g., showcase-ws, moderate)
   */
  notifyMetadataUpdated(itemId: string, metadata: any): void {
    const payload = { itemId, metadata };
    this.itemMetadataUpdated.set(payload);

    // Cross-tab broadcast
    try {
      this.metadataChannel?.postMessage(payload);
    } catch (err) {
      console.warn('BroadcastChannel postMessage failed', err);
    }

    // LocalStorage fallback (also acts as a change trigger)
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('fs-metadata-updates', JSON.stringify({ ...payload, ts: Date.now() }));
      }
    } catch (err) {
      console.warn('localStorage broadcast failed', err);
    }
  }
}
