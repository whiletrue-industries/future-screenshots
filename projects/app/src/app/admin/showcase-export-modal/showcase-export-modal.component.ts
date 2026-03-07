import { Component, computed, output, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExportCacheService } from '../../shared/export-cache.service';

export interface ShowcaseExportSettings {
  clusterBy: 'user' | 'workspace';
  layout: 'grid' | 'tsne' | 'circle-packing';
}

@Component({
  selector: 'app-showcase-export-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './showcase-export-modal.component.html',
  styleUrl: './showcase-export-modal.component.less'
})
export class ShowcaseExportModalComponent {
  // Inputs
  workspaceId = input<string>('');
  adminKey = input<string>('');
  filteredItems = input<any[]>([]);
  
  // Outputs
  close = output<void>();
  
  // Settings
  clusterBy = signal<'user' | 'workspace'>('user');
  layout = signal<'grid' | 'tsne' | 'circle-packing'>('circle-packing');
  
  // Computed
  itemCount = computed(() => this.filteredItems().length);
  workspaceCount = computed(() => {
    const items = this.filteredItems();
    const workspaces = new Set(items.map(item => item._workspaceId));
    return workspaces.size;
  });
  
  constructor(
    private router: Router,
    private exportCache: ExportCacheService
  ) {}
  
  /**
   * Generate the showcase URL and navigate to it
   */
  generateShowcase(): void {
    const items = this.filteredItems();
    if (items.length === 0) {
      return;
    }
    
    // Store items in export cache for showcase-ws to retrieve
    this.exportCache.setExportItems(items);
    
    // Get unique item IDs (for URL parameter as fallback)
    const itemIds = items.map(item => item._id).join(',');
    
    // Build query parameters
    const queryParams: any = {
      workspace: 'multi',
      admin_key: this.adminKey(),
      item_ids: itemIds,
      layout: this.layout(),
      cluster_by: this.clusterBy()
    };
    
    // Navigate to showcase-ws
    this.router.navigate(['/showcase-ws'], { 
      queryParams,
      queryParamsHandling: 'merge'
    });
    
    // Close the modal
    this.close.emit();
  }
  
  /**
   * Close the modal
   */
  closeModal(): void {
    this.close.emit();
  }
  
  /**
   * Handle background click
   */
  onBackgroundClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
