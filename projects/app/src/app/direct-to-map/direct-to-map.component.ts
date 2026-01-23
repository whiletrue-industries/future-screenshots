import { Component, computed } from '@angular/core';
import { CompletionImageComponent } from "../completion-image/completion-image.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-direct-to-map',
  imports: [
    CompletionImageComponent
],
  templateUrl: './direct-to-map.component.html',
  styleUrl: './direct-to-map.component.less'
})
export class DirectToMapComponent {
  // Compute the show on map link with proper parameters
  showOnMapLink = computed(() => {
    const workspaceId = this.api.workspaceId();
    const itemId = this.api.itemId();
    const apiKey = this.api.api_key();
    const locale = this.api.locale;
    
    if (!workspaceId || !itemId || !apiKey) {
      return '/';
    }
    
    // Add locale prefix if not English (English has no prefix, Dutch '/nl/', Hebrew '/he/', Arabic '/ar/' etc.)
    const localePrefix = locale === 'en' ? '' : `/${locale}`;
    
    // Link to showcase-ws with workspace, api_key, item-id, and default layout
    return `${localePrefix}/showcase-ws?workspace=${workspaceId}&api_key=${apiKey}&item-id=${itemId}&layout=map`;
  });

  constructor(public api: ApiService) {}

      onShowOnMap(event: MouseEvent): void {
        const url = this.showOnMapLink();
        const isFramed = typeof window !== 'undefined' && window.self !== window.top;

        if (isFramed && window.parent) {
          event.preventDefault();
          window.parent.postMessage({
            type: 'show-on-map',
            itemId: this.api.itemId(),
            workspaceId: this.api.workspaceId(),
            apiKey: this.api.api_key(),
            source: 'sidebar-iframe'
          }, '*');
          return;
        }

        // Ensure navigation happens in the top-level browsing context
        if (typeof window !== 'undefined' && window.top) {
          window.top.location.href = url;
        } else {
          window.location.href = url;
        }
      }
}
