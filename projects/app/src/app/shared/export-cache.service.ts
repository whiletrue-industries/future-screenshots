import { Injectable, signal } from '@angular/core';

/**
 * Service to temporarily store export data for showcase views
 * This avoids having to pass large datasets via URL parameters
 */
@Injectable({
  providedIn: 'root'
})
export class ExportCacheService {
  private exportedItems = signal<any[]>([]);
  private exportTimestamp = signal<number>(0);
  private readonly CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

  /**
   * Store items for export
   */
  setExportItems(items: any[]): void {
    this.exportedItems.set(items);
    this.exportTimestamp.set(Date.now());
  }

  /**
   * Retrieve exported items if still valid
   * Returns null if cache expired or empty
   */
  getExportItems(): any[] | null {
    const items = this.exportedItems();
    const timestamp = this.exportTimestamp();
    
    if (items.length === 0) {
      return null;
    }
    
    // Check if cache expired
    if (Date.now() - timestamp > this.CACHE_DURATION_MS) {
      this.clearExport();
      return null;
    }
    
    return items;
  }

  /**
   * Clear the export cache
   */
  clearExport(): void {
    this.exportedItems.set([]);
    this.exportTimestamp.set(0);
  }

  /**
   * Check if export cache has valid data
   */
  hasValidExport(): boolean {
    return this.getExportItems() !== null;
  }
}
