import { Component, input, output, signal, effect, inject, afterNextRender, OnDestroy } from '@angular/core';
import { PlatformService } from '../../../platform.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-evaluation-sidebar',
  templateUrl: './evaluation-sidebar.component.html',
  styleUrl: './evaluation-sidebar.component.less'
})
export class EvaluationSidebarComponent implements OnDestroy {
  // Inputs
  isOpen = input<boolean>(false);
  itemId = input<string | null>(null);
  itemKey = input<string | null>(null);  // Item-specific key
  workspaceId = input<string>('');
  apiKey = input<string>('');
  adminKey = input<string>('');
  lang = input<string>('');

  // Outputs
  close = output<void>();
  metadataUpdated = output<{ itemId: string; metadata: any }>();

  // Internal state
  iframeUrl = signal<SafeResourceUrl | null>(null);
  private platform = inject(PlatformService);
  private sanitizer = inject(DomSanitizer);
  private pollInterval: any;
  private lastMetadata = new Map<string, any>();

  constructor() {
    // Update iframe URL when inputs change
    effect(() => {
      const itemIdValue = this.itemId();
      const itemKeyValue = this.itemKey();
      const workspaceIdValue = this.workspaceId();
      const apiKeyValue = this.apiKey();
      const adminKeyValue = this.adminKey();
      const langValue = this.lang();

      if (itemIdValue && workspaceIdValue && (apiKeyValue || adminKeyValue)) {
        // Build URL with proper query parameter encoding
        // The props route expects:
        // - workspace: workspace ID
        // - api_key: workspace API key (for authentication)
        // - item-id: the item ID
        // - key: the item-specific key (optional, for item-level authentication)
        const params = new URLSearchParams({
          workspace: workspaceIdValue,
          api_key: apiKeyValue || adminKeyValue,  // Use api_key param name
          'item-id': itemIdValue,
          sidebar: 'true'
        });
        
        // Add item key if available
        if (itemKeyValue) {
          params.set('key', itemKeyValue);
        }
        
        // Ensure proper path separator for lang prefix
        const langPath = langValue ? `${langValue}/` : '';
        const urlString = window.location.host.startsWith('localhost')
          ? `http://${window.location.host}/props?${params.toString()}`
          : `https://mapfutur.es/${langPath}props?${params.toString()}`;
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlString);
        this.iframeUrl.set(safeUrl);
        
        console.log('[SIDEBAR] Loading iframe with URL:', urlString);
        
        // Start polling for metadata changes
        this.startPolling();
      } else {
        this.iframeUrl.set(null);
        this.stopPolling();
      }
    });

    // Stop polling when sidebar closes
    effect(() => {
      if (!this.isOpen()) {
        this.stopPolling();
      }
    });
  }

  /**
   * Start polling for metadata changes
   */
  private startPolling(): void {
    // Metadata polling is disabled due to CORS restrictions with the backend API from localhost
    // The metadata updates will be handled through iframe postMessage communication instead
    // once the backend supports it
  }

  /**
   * Stop polling for metadata changes
   */
  private stopPolling(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  /**
   * Check if item metadata has been updated
   * This would typically make an API call to fetch the latest metadata
   */
  private async checkMetadataUpdates(): Promise<void> {
    const itemIdValue = this.itemId();
    const workspaceIdValue = this.workspaceId();
    const adminKeyValue = this.adminKey();

    if (!itemIdValue || !workspaceIdValue || !adminKeyValue) {
      return;
    }

    try {
      // Fetch the latest item data from the API with proper query parameter encoding
      const params = new URLSearchParams({
        workspace: workspaceIdValue,
        api_key: adminKeyValue
      });
      const response = await fetch(
        `https://api-qjzuw7ypfq-ez.a.run.app/items?${params.toString()}`
      );
      
      if (!response.ok) {
        console.error('Failed to fetch items:', response.statusText);
        return;
      }

      const items = await response.json();
      const item = items.find((i: any) => i._id === itemIdValue);

      if (item) {
        const currentMetadata = {
          favorable_future: item.favorable_future,
          plausibility: item.plausibility
        };

        // Check if metadata has changed
        const lastMeta = this.lastMetadata.get(itemIdValue);
        if (lastMeta) {
          if (
            lastMeta.favorable_future !== currentMetadata.favorable_future ||
            lastMeta.plausibility !== currentMetadata.plausibility
          ) {
            console.log('[SIDEBAR] Metadata changed for item', itemIdValue, currentMetadata);
            this.metadataUpdated.emit({ itemId: itemIdValue, metadata: currentMetadata });
          }
        }

        // Update last metadata
        this.lastMetadata.set(itemIdValue, currentMetadata);
      }
    } catch (error) {
      console.error('Error checking metadata updates:', error);
    }
  }

  /**
   * Close the sidebar
   */
  onClose(): void {
    this.close.emit();
  }

  /**
   * Handle overlay click (close sidebar)
   */
  onOverlayClick(event: MouseEvent): void {
    if ((event.target as EventTarget) === (event.currentTarget as EventTarget)) {
      this.onClose();
    }
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }
}
