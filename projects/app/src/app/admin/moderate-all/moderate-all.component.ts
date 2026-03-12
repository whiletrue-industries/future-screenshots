import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of, firstValueFrom } from 'rxjs';
import { catchError, take, map } from 'rxjs/operators';
import { AdminApiService } from '../../../admin-api.service';
import { AuthService } from '../../auth.service';
import { FilterHelpers } from '../../shared/filters-bar/filters-bar.component';
import { AdminLightboxComponent } from '../admin-lightbox/admin-lightbox.component';
import { ImageReplacementModalComponent } from '../image-replacement-modal/image-replacement-modal.component';
import {
  PREFER_SLOT_MAP, PREVENT_SLOT_MAP, PLAUSIBILITY_LABEL_MAP,
  LEVELS, ALL_STATUSES, STATUS_OPTIONS, STATUS_LABELS, TYPE_LABELS,
  normalizeDirection, coerceValue, getAIConfidence, getConfidenceLevel,
  getIndicatorSlot, getIndicatorLabel, isPreferDirection, isPreventDirection,
  isMostlyPrefer, isMostlyPrevent, isNeutralDirection,
  getDesirabilityClass, getPlausibilityClass, getEmail,
  getWorkspaceNameWithEmojis, formatDate
} from '../moderation-helpers';
import { QrCodeModalComponent } from '../qr-code-modal/qr-code-modal.component';

import { EnrichedItem } from '../workspace-metadata.interface';

@Component({
  selector: 'app-moderate-all',
  imports: [CommonModule, FormsModule, RouterLink, AdminLightboxComponent, ImageReplacementModalComponent, QrCodeModalComponent],
  templateUrl: './moderate-all.component.html',
  styleUrl: './moderate-all.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class ModerateAllComponent implements OnInit {

  private adminApi = inject(AdminApiService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private tokenWaitRetries = 0;
  private readonly maxTokenWaitRetries = 50;

  workspaces = signal<any[]>([]);
  allItems = signal<EnrichedItem[]>([]);
  loading = signal<boolean>(true);
  loadingMore = signal<boolean>(false);
  loadingProgress = signal<string>('');

  // Filters - now using arrays for multi-select
  filterWorkspaceIds = signal<string[]>([]);
  filterStatus = signal<string[]>(['pending', 'flagged', 'not-flagged', 'approved', 'highlighted']);
  filterType = signal<string>('all');
  searchText = signal<string>('');
  orderBy = signal<string>('date');
  workspaceSearchText = signal<string>('');
  
  // UI state for multi-select dropdowns
  workspaceDropdownOpen = signal<boolean>(false);
  statusDropdownOpen = signal<boolean>(false);

  // Sidebar moderation state (similar to moderate.component)
  selectedItem = signal<any | null>(null);
  lightboxSidebarOpen = signal<boolean>(true);
  selectedItemIndex = signal<number>(-1);

  // Multi-select/bulk edit state
  multiSelectMode = signal<boolean>(false);
  selectedIds = signal<Set<string>>(new Set());
  bulkStatus = signal<number | null>(null);
  bulkAddTags = signal<string>('');
  bulkSaving = signal<boolean>(false);
  bulkError = signal<string | null>(null);

  // Computed common tags across selected items
  commonTags = computed(() => {
    const selectedItems = this.allItems()
      .filter(item => this.selectedIds().has(item['_id']));

    if (selectedItems.length < 2) return [];

    // Find tags that exist in ALL selected items
    const allTags = selectedItems
      .map(item => Array.isArray(item.tags) ? item.tags : []);

    const firstItemTags = allTags[0] || [];
    return firstItemTags.filter((tag: string) => 
      allTags.every(itemTags => itemTags.includes(tag))
    );
  });

  // Editing state
  editTagline = signal<string | null>(null);
  
  // User counts
  userItemCounts = computed(() => {
    const allItems = this.allItems();
    const userCounts = new Map<string, number>();
    allItems.forEach((item: any) => {
      const authorId = item.author_id || 'unknown';
      userCounts.set(authorId, (userCounts.get(authorId) || 0) + 1);
    });
    return userCounts;
  });

  // Image replacement state
  replacingImageItemId = signal<string | null>(null);
  currentReplacingImageUrl = computed(() => {
    const id = this.replacingImageItemId();
    if (!id) return null;
    const item = this.allItems().find(i => i['_id'] === id);
    return item?.['screenshot_url'] || null;
  });
  currentReplacingItem = computed(() => {
    const id = this.replacingImageItemId();
    if (!id) return null;
    return this.allItems().find(i => i['_id'] === id) || null;
  });
  showQRModal = signal<boolean>(false);
  qrItemId = signal<string | null>(null);
  currentQrItem = computed(() => {
    const id = this.qrItemId();
    if (!id) return null;
    return this.allItems().find(i => i['_id'] === id) || null;
  });
  

  // Editable metadata computed
  editableMetadata = computed<[string, any][]>(() => {
    const item = this.selectedItem();
    if (!item) return [];
    const excluded = new Set(['_id', '_workspaceId', '_workspaceName', '_workspaceAdminKey']);
    return Object.entries(item).filter(([key, value]) => !excluded.has(key) && ['string', 'number', 'boolean'].includes(typeof value));
  });

  // Make Array available in template
  Array = Array;

  readonly LEVELS = LEVELS;
  readonly STATUS_OPTIONS = STATUS_OPTIONS;
  readonly STATUS_LABELS = STATUS_LABELS;
  readonly TYPE_LABELS = TYPE_LABELS;
  readonly ALL_STATUSES = ALL_STATUSES;

  constructor() {
    effect(() => {
      const current = this.selectedItem();
      const items = this.filteredItems();
      if (!current) return;

      const idx = items.findIndex(item => item['_id'] === current['_id']);
      if (idx < 0) {
        this.closeSidebar();
        return;
      }

      if (idx !== this.selectedItemIndex()) {
        this.selectedItemIndex.set(idx);
      }
    });
  }

  availableTypes = computed(() => {
    const types = new Set<string>();
    this.allItems().forEach(item => {
      if (item['screenshot_type']) types.add(item['screenshot_type']);
    });
    return Array.from(types).sort();
  });

  // Compute status filter counts
  statusCounts = computed(() => {
    const items = this.allItems();
    const counts = new Map<string, number>();
    
    this.ALL_STATUSES.forEach(status => {
      counts.set(status, items.filter(item => FilterHelpers.getStatusKey(item) === status).length);
    });
    
    return counts;
  });

  // Compute workspace names for display
  workspaceNames = computed(() => {
    const map = new Map<string, string>();
    this.workspaces().forEach(ws => {
      map.set(ws.id, this.getWorkspaceNameWithEmojis(ws));
    });
    return map;
  });

  // Compute filtered and sorted workspaces for the dropdown
  filteredWorkspaces = computed(() => {
    let workspaces = [...this.workspaces()];
    
    // Sort in reverse chronological order (newest first) - same as admin page
    workspaces.sort((a, b) => {
      const ad = a?.metadata?.date ?? '';
      const bd = b?.metadata?.date ?? '';
      return bd.localeCompare(ad);
    });

    // Filter by search text
    const searchText = this.workspaceSearchText().trim().toLowerCase();
    if (searchText) {
      workspaces = workspaces.filter(ws => {
        const name = this.getWorkspaceNameWithEmojis(ws);
        return name.toLowerCase().includes(searchText);
      });
    }

    return workspaces;
  });

  filteredItems = computed(() => {
    let items = this.allItems();

    // Filter by workspaces (multi-select)
    const wsIds = this.filterWorkspaceIds();
    if (wsIds.length > 0 && wsIds.length < this.workspaces().length) {
      items = items.filter(item => wsIds.includes(item._workspaceId));
    }

    // Filter by status (multi-select)
    const statuses = this.filterStatus();
    if (statuses.length > 0 && statuses.length < this.ALL_STATUSES.length) {
      items = items.filter(item => statuses.includes(FilterHelpers.getStatusKey(item)));
    }

    // Filter by type (single-select)
    const type = this.filterType();
    if (type !== 'all') {
      items = items.filter(item => item['screenshot_type'] === type);
    }

    const search = this.searchText().trim().toLowerCase();
    if (search) {
      items = items.filter(item => {
        const hay = [
          item['future_scenario_tagline'],
          item['future_scenario_description'],
          item['content'],
          item._workspaceName,
        ].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(search);
      });
    }

    const order = this.orderBy();
    const sorted = [...items];
    if (order === 'date') {
      sorted.sort((a, b) => new Date(b['created_at'] || 0).getTime() - new Date(a['created_at'] || 0).getTime());
    } else if (order === 'workspace') {
      sorted.sort((a, b) => a._workspaceName.localeCompare(b._workspaceName));
    } else if (order === 'status') {
      sorted.sort((a, b) => (b['_private_moderation'] || 0) - (a['_private_moderation'] || 0));
    }

    return sorted;
  });

  getStatusKey(item: any): string {
    return FilterHelpers.getStatusKey(item);
  }

  getTypeLabel(type: string): string {
    return this.TYPE_LABELS[type] || type;
  }

  getStatusLabel(status: string): string {
    return this.STATUS_LABELS[status] || status;
  }

  formatDate = formatDate;

  // Multi-select filter methods
  toggleWorkspaceDropdown(): void {
    this.workspaceDropdownOpen.update(v => !v);
  }

  toggleStatusDropdown(): void {
    this.statusDropdownOpen.update(v => !v);
  }

  onDocumentClick(event: MouseEvent): void {
    // Close dropdowns when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('.workspace-selector-in-title')) {
      this.workspaceDropdownOpen.set(false);
    }
    if (!target.closest('.custom-multiselect')) {
      this.statusDropdownOpen.set(false);
    }
  }

  toggleWorkspaceFilter(workspaceId: string): void {
    this.filterWorkspaceIds.update(ids => {
      if (ids.includes(workspaceId)) {
        return ids.filter(id => id !== workspaceId);
      } else {
        return [...ids, workspaceId];
      }
    });
  }

  toggleStatusFilter(status: string): void {
    this.filterStatus.update(statuses => {
      if (statuses.includes(status)) {
        return statuses.filter(s => s !== status);
      } else {
        return [...statuses, status];
      }
    });
  }

  selectAllWorkspaces(): void {
    this.filterWorkspaceIds.set(this.workspaces().map(ws => ws.id));
  }

  deselectAllWorkspaces(): void {
    this.filterWorkspaceIds.set([]);
  }

  selectAllStatuses(): void {
    this.filterStatus.set([...this.ALL_STATUSES]);
  }

  deselectAllStatuses(): void {
    this.filterStatus.set([]);
  }

  getSelectedWorkspaceCount(): number {
    return this.filterWorkspaceIds().length;
  }

  getSelectedStatusCount(): number {
    return this.filterStatus().length;
  }

  isWorkspaceSelected(workspaceId: string): boolean {
    return this.filterWorkspaceIds().includes(workspaceId);
  }

  isStatusSelected(status: string): boolean {
    return this.filterStatus().includes(status);
  }

  // Sidebar and bulk edit utility methods
  selectedCount = computed(() => this.selectedIds().size);

  toggleMultiSelectMode(): void {
    this.multiSelectMode.update(v => !v);
    if (!this.multiSelectMode()) {
      this.selectedIds.set(new Set());
      this.bulkStatus.set(null);
      this.bulkError.set(null);
    }
  }

  selectItem(item: EnrichedItem): void {
    if (this.multiSelectMode()) {
      const ids = new Set(this.selectedIds());
      if (ids.has(item['_id'])) {
        ids.delete(item['_id']);
      } else {
        ids.add(item['_id']);
      }
      this.selectedIds.set(ids);
    } else {
      const index = this.filteredItems().findIndex(i => i['_id'] === item['_id']);
      this.selectedItem.set(item);
      this.selectedItemIndex.set(index);
      this.lightboxSidebarOpen.set(true);
    }
  }

  isItemSelected(itemId: string): boolean {
    return this.selectedIds().has(itemId);
  }

  selectAll(): void {
    const ids = new Set(this.filteredItems().map(item => item['_id']));
    this.selectedIds.set(ids);
  }

  clearBulkSelection(): void {
    this.selectedIds.set(new Set());
    this.bulkStatus.set(null);
    this.bulkAddTags.set('');
    this.bulkError.set(null);
    this.bulkSaving.set(false);
  }

  async removeCommonTag(tag: string): Promise<void> {
    const ids = Array.from(this.selectedIds());
    if (!ids.length) return;

    this.bulkSaving.set(true);
    this.bulkError.set(null);

    const updatePromises = ids.map(async (itemId) => {
      try {
        const item = this.allItems().find(i => i['_id'] === itemId);
        if (!item) return { id: itemId, ok: false, error: 'Item not found' };

        const currentTags = Array.isArray(item.tags) ? item.tags : [];
        const updatedTags = currentTags.filter(t => t !== tag);
        
        await firstValueFrom(
          this.adminApi.updateItem(item._workspaceId, item._workspaceAdminKey, itemId, { tags: updatedTags })
        );
        return { id: itemId, ok: true, updatedTags };
      } catch (error: any) {
        return { id: itemId, ok: false, error };
      }
    });

    const results = await Promise.all(updatePromises);
    
    const failed = results.filter(r => !r.ok);
    if (failed.length) {
      this.bulkError.set(`Failed to remove tag from ${failed.length} item(s).`);
    }

    // Update local state
    this.allItems.update(items =>
      items.map(item => {
        if (ids.includes(item['_id'])) {
          const result = results.find(r => r.id === item['_id']);
          if (result && result.ok && 'updatedTags' in result) {
            return { ...item, tags: result.updatedTags };
          }
        }
        return item;
      })
    );

    this.bulkSaving.set(false);
  }

  closeSidebar(): void {
    this.selectedItem.set(null);
    this.lightboxSidebarOpen.set(false);
  }

  toggleLightboxSidebar(): void {
    this.lightboxSidebarOpen.update(v => !v);
  }

  setStatusFromSidebar(level: number): void {
    const current = this.selectedItem();
    if (!current) return;
    this.updateModeration(current['_id'], level);
  }

  prevItem(): void {
    const current = this.selectedItem();
    const items = this.filteredItems();
    if (!current) return;

    const currentIndex = items.findIndex(i => i['_id'] === current['_id']);
    if (currentIndex <= 0) return;

    const newIndex = currentIndex - 1;
    if (items[newIndex]) {
      this.selectedItem.set(items[newIndex]);
      this.selectedItemIndex.set(newIndex);
    }
  }

  nextItem(): void {
    const current = this.selectedItem();
    const items = this.filteredItems();
    if (!current) return;

    const currentIndex = items.findIndex(i => i['_id'] === current['_id']);
    if (currentIndex < 0 || currentIndex >= items.length - 1) return;

    const newIndex = currentIndex + 1;
    if (items[newIndex]) {
      this.selectedItem.set(items[newIndex]);
      this.selectedItemIndex.set(newIndex);
    }
  }

  updateModeration(itemId: string, level: number): void {
    const item = this.allItems().find(i => i['_id'] === itemId);
    if (!item) return;

    this.adminApi.updateItemModeration(item._workspaceId, item._workspaceAdminKey, itemId, level).subscribe(
      () => {
        // Update in local state
        this.allItems.update(items =>
          items.map(i => i['_id'] === itemId ? { ...i, _private_moderation: level } : i)
        );
        this.selectedItem.update(si => si && si['_id'] === itemId ? { ...si, _private_moderation: level } : si);
      },
      error => {
        console.error('Failed to update moderation:', error);
      }
    );
  }

  applyBulkChanges(): void {
    const ids = Array.from(this.selectedIds());
    if (ids.length === 0) return;

    // Parse tags to add (comma or space separated)
    const tagsToAdd = this.bulkAddTags() 
      ? this.bulkAddTags().split(/[,\s]+/).map(t => t.trim()).filter(t => t.length > 0)
      : [];

    const hasStatusUpdate = this.bulkStatus() !== null;

    if (!hasStatusUpdate && tagsToAdd.length === 0) {
      this.bulkError.set('Choose at least one field to update.');
      return;
    }

    this.bulkSaving.set(true);
    this.bulkError.set(null);

    const updateRequests = ids.map(itemId => {
      const item = this.allItems().find(i => i['_id'] === itemId);
      if (!item) return of(null);

      // Build update data for this item
      const updateData: any = {};

      // Add status update if specified
      if (hasStatusUpdate) {
        updateData._private_moderation = this.bulkStatus();
      }

      // Add tags if specified
      if (tagsToAdd.length > 0) {
        const currentTags = Array.isArray(item.tags) ? item.tags : [];
        const newTags = [...currentTags];
        tagsToAdd.forEach(tag => {
          if (!newTags.includes(tag)) {
            newTags.push(tag);
          }
        });
        updateData.tags = newTags;
      }

      return this.adminApi.updateItem(
        item._workspaceId,
        item._workspaceAdminKey,
        itemId,
        updateData
      ).pipe(
        map(() => ({ itemId, updateData }))
      );
    });

    forkJoin(updateRequests).subscribe(
      (results) => {
        // Update all items locally
        this.allItems.update(items =>
          items.map(item => {
            if (ids.includes(item['_id'])) {
              const result = results.find(r => r && r.itemId === item['_id']);
              if (result) {
                return { ...item, ...result.updateData };
              }
            }
            return item;
          })
        );
        this.selectedIds.set(new Set());
        this.bulkStatus.set(null);
        this.bulkAddTags.set('');
        this.bulkSaving.set(false);
      },
      error => {
        console.error('Bulk update failed:', error);
        this.bulkError.set('Failed to apply changes to some items.');
        this.bulkSaving.set(false);
      }
    );
  }

  // Moderation action methods
  approve(itemId: string): void {
    this.updateModeration(itemId, 4);
  }

  reject(itemId: string): void {
    this.updateModeration(itemId, 0);
  }

  highlight(itemId: string): void {
    this.updateModeration(itemId, 5);
  }

  unarchive(itemId: string): void {
    this.updateModeration(itemId, 2);
  }

  // Tagline editing
  setTagline(item: any): void {
    const updateData: any = {
      future_scenario_tagline: item.future_scenario_tagline,
      future_scenario_description: item.future_scenario_description,
    };
    this.updateItemData(item['_id'], updateData);
    this.editTagline.set(null);
    this.adminApi.reanalyzeItem(item._workspaceId, item._workspaceAdminKey, item['_id'], item['item_key'] || '').subscribe({
      next: () => console.log('Reanalysis triggered after tagline update'),
      error: (err) => console.error('Error triggering reanalysis after tagline update', err)
    });
  }

  // Tags management
  addTag(item: any, tagInput: HTMLInputElement): void {
    const newTag = tagInput.value.trim();
    if (newTag && !item.tags.includes(newTag)) {
      item.tags = [...(item.tags || []), newTag];
      this.setTags(item);
      tagInput.value = '';
    }
  }

  removeTag(item: any, tagIndex: number): void {
    item.tags = item.tags.filter((_: any, i: number) => i !== tagIndex);
    this.setTags(item);
  }

  setTags(item: any): void {
    const updateData: any = {
      tags: item.tags,
      future_scenario_topics: item.future_scenario_topics,
    };
    this.updateItemData(item['_id'], updateData);
  }

  // Property setters
  setFavorable(item: any): void {
    this.updateItemData(item['_id'], { favorable_future: item.favorable_future });
  }

  setPlausibility(item: any): void {
    item.plausibility = parseInt(item.plausibility, 10);
    this.updateItemData(item['_id'], { plausibility: item.plausibility });
  }

  // Metadata editing
  updateMetadataField(key: string, rawValue: any): void {
    const current = this.selectedItem();
    if (!current) return;

    const original = (current as any)[key];
    const value = this.coerceValue(original, rawValue);
    this.updateItemData(current['_id'], { [key]: value });
  }

  private coerceValue = coerceValue;

  // AI regeneration
  regenerateFromScratch(): void {
    const current = this.selectedItem();
    if (!current) return;

    // Clear AI-generated fields locally for immediate UI feedback
    const clearedFields: any = {
      embedding: null,
      content_certainty: null,
      transition_bar_certainty: null,
      transition_bar_event_prediction: null,
      content_title: null,
      future_scenario_description: null,
      future_scenario_tagline: null,
      future_scenario_topics: null,
    };

    this.allItems.update(items =>
      items.map(i => i['_id'] === current['_id'] ? { ...i, ...clearedFields } : i)
    );
    this.selectedItem.update(si => si && si['_id'] === current['_id'] ? { ...si, ...clearedFields } : si);

    this.adminApi.reanalyzeItem(current._workspaceId, current._workspaceAdminKey, current['_id'], current['item_key'] || '').subscribe({
      next: () => console.log('Reanalyze request sent successfully'),
      error: (err) => console.error('Error triggering reanalysis', err)
    });
  }

  regenerateMetaFields(): void {
    const current = this.selectedItem();
    if (!current) return;

    const topicsFromTags = Array.isArray(current.tags) && current.tags.length
      ? (() => {
          const acc: Record<string, string> = {};
          (current.tags as unknown[]).forEach((tag, index) => {
            if (typeof tag === 'string' && tag) {
              acc[`topic_${index + 1}`] = tag;
            }
          });
          return acc;
        })()
      : current.future_scenario_topics || null;

    const updateData: any = {
      content_title: current.content_title || null,
      future_scenario_description: current.future_scenario_description || null,
      future_scenario_tagline: current.future_scenario_tagline || null,
      future_scenario_topics: topicsFromTags,
      embedding: null,
      content_certainty: null,
      transition_bar_certainty: null,
      transition_bar_event_prediction: null,
    };

    this.updateItemData(current['_id'], updateData);
  }

  estimateEvaluation(): void {
    const current = this.selectedItem();
    if (!current) return;

    // Add AI tags to existing tags
    const currentTags = Array.isArray(current.tags) ? [...current.tags] : [];
    if (!currentTags.includes('ai_plausibility')) {
      currentTags.push('ai_plausibility');
    }
    if (!currentTags.includes('ai_favorable_future')) {
      currentTags.push('ai_favorable_future');
    }

    // Only reset plausibility and favorable_future if they haven't been set yet
    const updateData: any = {
      tags: currentTags
    };

    if (current.plausibility === null || current.plausibility === undefined) {
      updateData.plausibility = null;
    }
    if (current.favorable_future === null || current.favorable_future === undefined) {
      updateData.favorable_future = null;
    }

    this.updateItemData(current['_id'], updateData);
  }

  // Auto-save methods
  autoSaveScreenshotType(item: any): void {
    this.updateItemData(item['_id'], { screenshot_type: item.screenshot_type });
  }

  autoSaveContent(item: any): void {
    this.updateItemData(item['_id'], { content: item.content });
  }

  autoSaveTransitionBarEvent(item: any): void {
    this.updateItemData(item['_id'], { transition_bar_event: item.transition_bar_event || null });
  }

  autoSaveTransitionBarPosition(item: any): void {
    this.updateItemData(item['_id'], { transition_bar_position: item.transition_bar_position || null });
  }

  // Helper to update item data
  private updateItemData(itemId: string, updates: any): void {
    const item = this.allItems().find(i => i['_id'] === itemId);
    if (!item) return;

    this.adminApi.updateItem(item._workspaceId, item._workspaceAdminKey, itemId, updates).subscribe({
      next: () => {
        this.allItems.update(items =>
          items.map(i => i['_id'] === itemId ? { ...i, ...updates } : i)
        );
        this.selectedItem.update(si => si && si['_id'] === itemId ? { ...si, ...updates } : si);
      },
      error: (err) => console.error('Failed to update item:', err)
    });
  }

  getEmail = getEmail;

  getUserItemCount(authorId: string): number {
    return this.userItemCounts().get(authorId) || 0;
  }

  getWorkspaceNameWithEmojis = getWorkspaceNameWithEmojis;

  private fixUrl(url: string): string {
    return url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
  }

  thumbnailUrl(url: string | null | undefined): string {
    if (!url || typeof url !== 'string') {
      return '';
    }
    return this.fixUrl(url).replace(/screenshot\.jpeg$/, 'screenshot.thumbnail.jpeg');
  }

  filterByUser(authorId: string): void {
    // For multi-workspace view, we can add this to search text
    const email = authorId === 'unknown' ? 'unknown' : authorId;
    this.searchText.set(email);
  }

  getAIConfidence = getAIConfidence;
  getConfidenceLevel = getConfidenceLevel;
  getIndicatorSlot = getIndicatorSlot;
  getIndicatorLabel = getIndicatorLabel;
  isPreferDirection = isPreferDirection;
  isPreventDirection = isPreventDirection;
  isMostlyPrefer = isMostlyPrefer;
  isMostlyPrevent = isMostlyPrevent;
  isNeutralDirection = isNeutralDirection;
  getDesirabilityClass = getDesirabilityClass;
  getPlausibilityClass = getPlausibilityClass;

  // Image replacement modal methods
  openImageReplacementModal(itemId: string): void {
    this.replacingImageItemId.set(itemId);
  }

  closeImageReplacementModal(): void {
    this.replacingImageItemId.set(null);
  }

  onImageReplaced(itemId: string, data: { screenshot_url: string }): void {
    const url = data.screenshot_url;
    const thumbUrl = this.thumbnailUrl(url);
    this.allItems.update(items => items.map(item => item['_id'] === itemId ? { ...item, screenshot_url: url, screenshot_thumbnail_url: thumbUrl } : item));
    if (this.selectedItem() && this.selectedItem()!['_id'] === itemId) {
      this.selectedItem.update(item => item ? { ...item, screenshot_url: url, screenshot_thumbnail_url: thumbUrl } : item);
    }
    this.replacingImageItemId.set(null);
  }

  onRefreshGrid(): void {
    // Reload all workspaces
    this.allItems.set([]);
    this.loading.set(true);
    this.loadWorkspacesWhenTokenReady();
  }

  // QR modal methods
  openQrModal(itemId: string): void {
    this.qrItemId.set(itemId);
    this.showQRModal.set(true);
  }

  closeQrModal(): void {
    this.showQRModal.set(false);
    this.qrItemId.set(null);
  }
  
  ngOnInit(): void {
    this.auth.user.pipe(take(1)).subscribe(user => {
      if (!user) {
        this.router.navigate(['/admin/login']);
        return;
      }
      this.loadWorkspacesWhenTokenReady();
    });
  }

  private loadWorkspacesWhenTokenReady(): void {
    const token = this.auth.token();
    if (!token) {
      if (this.tokenWaitRetries >= this.maxTokenWaitRetries) {
        this.loading.set(false);
        this.loadingProgress.set('Authentication timed out. Please refresh.');
        return;
      }
      this.tokenWaitRetries += 1;
      this.loadingProgress.set('Authenticating…');
      setTimeout(() => this.loadWorkspacesWhenTokenReady(), 100);
      return;
    }

    this.adminApi.listWorkspaces().subscribe(workspaces => {
      this.workspaces.set(workspaces);
      // Initialize workspace filter to include all workspaces
      this.filterWorkspaceIds.set(workspaces.map(ws => ws.id));
      
      if (!workspaces.length) {
        this.loading.set(false);
        return;
      }
      this.loadingProgress.set(`Loading items from ${workspaces.length} workspace(s)…`);

      const requests = workspaces.map(ws =>
        this.adminApi.getItems(ws.id, ws.keys?.admin, 0, null).pipe(
          catchError(() => of([]))
        )
      );

      forkJoin(requests).subscribe((results: any[]) => {
        const enriched: EnrichedItem[] = [];
        const PAGE_SIZE = 500;
        const workspacesNeedingMore: { ws: any; name: string; page: number }[] = [];

        results.forEach((items: any[], idx: number) => {
          const ws = workspaces[idx];
          const name = this.getWorkspaceNameWithEmojis(ws);
          if (Array.isArray(items)) {
            items.forEach((item: any) => {
              const fixedUrl = this.fixUrl(item.screenshot_url || '');
              enriched.push({ ...item, screenshot_url: fixedUrl, _workspaceId: ws.id, _workspaceName: name, _workspaceAdminKey: ws.keys?.admin || '', screenshot_thumbnail_url: this.thumbnailUrl(fixedUrl) });
            });
            if (items.length >= PAGE_SIZE) {
              workspacesNeedingMore.push({ ws, name, page: 1 });
            }
          }
        });
        this.allItems.set(enriched);
        this.loading.set(false);
        this.loadingProgress.set('');

        if (workspacesNeedingMore.length > 0) {
          this.loadRemainingPages(workspacesNeedingMore, PAGE_SIZE);
        }
      });
    });
  }

  private loadRemainingPages(
    pending: { ws: any; name: string; page: number }[],
    pageSize: number
  ): void {
    this.loadingMore.set(true);

    const requests = pending.map(entry =>
      this.adminApi.getItems(entry.ws.id, entry.ws.keys?.admin, entry.page, null).pipe(
        catchError(() => of([])),
        map((items: any[]) => ({ entry, items: Array.isArray(items) ? items : [] }))
      )
    );

    forkJoin(requests).subscribe((results) => {
      const newItems: EnrichedItem[] = [];
      const nextPending: { ws: any; name: string; page: number }[] = [];

      results.forEach(({ entry, items }) => {
        items.forEach((item: any) => {
          const fixedUrl = this.fixUrl(item.screenshot_url || '');
          newItems.push({
            ...item,
            screenshot_url: fixedUrl,
            _workspaceId: entry.ws.id,
            _workspaceName: entry.name,
            _workspaceAdminKey: entry.ws.keys?.admin || '',
            screenshot_thumbnail_url: this.thumbnailUrl(fixedUrl)
          });
        });
        if (items.length >= pageSize) {
          nextPending.push({ ...entry, page: entry.page + 1 });
        }
      });

      if (newItems.length > 0) {
        this.allItems.update(existing => [...existing, ...newItems]);
      }

      if (nextPending.length > 0) {
        this.loadRemainingPages(nextPending, pageSize);
      } else {
        this.loadingMore.set(false);
      }
    });
  }
}
