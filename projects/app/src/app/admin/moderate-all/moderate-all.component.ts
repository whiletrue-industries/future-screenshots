import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, effect, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminApiService } from '../../../admin-api.service';
import { AuthService } from '../../auth.service';
import { FilterHelpers } from '../../shared/filters-bar/filters-bar.component';
import { WorkspaceNameUtility } from '../../shared/workspace-name.utility';
import { AdminLightboxComponent } from '../admin-lightbox/admin-lightbox.component';
import { ImageReplacementModalComponent } from '../image-replacement-modal/image-replacement-modal.component';
import { QrCodeModalComponent } from '../qr-code-modal/qr-code-modal.component';
import { ShowcaseExportModalComponent } from '../showcase-export-modal/showcase-export-modal.component';

interface EnrichedItem {
  _workspaceId: string;
  _workspaceName: string;
  _workspaceAdminKey: string;
  [key: string]: any;
}

@Component({
  selector: 'app-moderate-all',
  imports: [CommonModule, FormsModule, RouterLink, AdminLightboxComponent, ImageReplacementModalComponent, QrCodeModalComponent, ShowcaseExportModalComponent],
  templateUrl: './moderate-all.component.html',
  styleUrl: './moderate-all.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  bulkSaving = signal<boolean>(false);
  bulkError = signal<string | null>(null);

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
  
  // Showcase export modal state
  showShowcaseExportModal = signal<boolean>(false);
  
  // Auth token for templates
  authToken = computed(() => this.auth.token() || '');

  // Editable metadata computed
  editableMetadata = computed<[string, any][]>(() => {
    const item = this.selectedItem();
    if (!item) return [];
    const excluded = new Set(['_id', '_workspaceId', '_workspaceName', '_workspaceAdminKey']);
    return Object.entries(item).filter(([key, value]) => !excluded.has(key) && ['string', 'number', 'boolean'].includes(typeof value));
  });

  // Make Array available in template
  Array = Array;

  // Constants for plausibility indicator
  private readonly preferSlotMap = new Map<number, number>([
    [0, 1],
    [25, 2],
    [50, 3],
    [75, 4],
    [100, 5],
  ]);

  private readonly preventSlotMap = new Map<number, number>([
    [100, 5],
    [75, 6],
    [50, 7],
    [25, 8],
    [0, 9],
  ]);

  private readonly plausibilityLabelMap: Record<number, string> = {
    100: 'projected',
    75: 'probable',
    50: 'plausible',
    25: 'possible',
    0: 'preposterous'
  };

  readonly LEVELS = ['rejected', 'flagged', 'pending', 'not-flagged', 'approved', 'highlighted'];

  readonly STATUS_OPTIONS: { label: string; value: number }[] = [
    { label: 'Highlighted', value: 5 },
    { label: 'Approved', value: 4 },
    { label: 'Not flagged', value: 3 },
    { label: 'Pending', value: 2 },
    { label: 'Flagged', value: 1 },
    { label: 'Rejected', value: 0 },
  ];

  readonly STATUS_LABELS: Record<string, string> = {
    highlighted: 'Highlighted',
    approved: 'Approved',
    'not-flagged': 'Not flagged',
    pending: 'Pending',
    flagged: 'Flagged',
    rejected: 'Rejected',
  };

  readonly TYPE_LABELS: Record<string, string> = {
    sign_in_a_demonstration: '🪧 Sign',
    social_media_post: '📣 Social',
    chat_conversation: '💬 Chat',
    notification_alert: '🔔 Alert',
    ai_agent_query: '🤖 AI',
    review: '⭐ Review',
    map_visualization: '🗺️ Map',
    photograph: '📸 Photo',
  };

  // Status options in order
  readonly ALL_STATUSES = ['highlighted', 'approved', 'not-flagged', 'pending', 'flagged', 'rejected'];

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

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
  }

  // Multi-select filter methods
  toggleWorkspaceDropdown(): void {
    this.workspaceDropdownOpen.update(v => !v);
  }

  toggleStatusDropdown(): void {
    this.statusDropdownOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
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
    if (ids.length === 0 || this.bulkStatus() === null) return;

    this.bulkSaving.set(true);
    this.bulkError.set(null);

    const updateRequests = ids.map(itemId => {
      const item = this.allItems().find(i => i['_id'] === itemId);
      if (!item) return of(null);
      return this.adminApi.updateItemModeration(
        item._workspaceId,
        item._workspaceAdminKey,
        itemId,
        this.bulkStatus()!
      );
    });

    forkJoin(updateRequests).subscribe(
      () => {
        // Update all items locally
        this.allItems.update(items =>
          items.map(item =>
            ids.includes(item['_id']) ? { ...item, _private_moderation: this.bulkStatus() } : item
          )
        );
        this.selectedIds.set(new Set());
        this.bulkStatus.set(null);
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
      future_scenario_description: item.future_scenario_tagline,
      embedding: null,
      future_scenario_topics: null,
    };
    this.updateItemData(item['_id'], updateData);
    this.editTagline.set(null);
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

  private coerceValue(original: any, rawValue: any): any {
    if (typeof original === 'number') {
      const num = Number(rawValue);
      return Number.isNaN(num) ? original : num;
    }
    if (typeof original === 'boolean') {
      return rawValue === true || rawValue === 'true';
    }
    return rawValue;
  }

  // AI regeneration
  regenerateAiFieldsFromUserInput(): void {
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

  // User info methods
  getEmail(item: any): string {
    return item._private_email || item.email || item.user_email || 'unknown@user.com';
  }

  getUserItemCount(authorId: string): number {
    return this.userItemCounts().get(authorId) || 0;
  }

  getWorkspaceNameWithEmojis(workspace: any): string {
    return WorkspaceNameUtility.formatWorkspaceNameWithEmojis(workspace);
  }

  filterByUser(authorId: string): void {
    // For multi-workspace view, we can add this to search text
    const email = authorId === 'unknown' ? 'unknown' : authorId;
    this.searchText.set(email);
  }

  // AI confidence methods
  getAIConfidence(item: any): number {
    const content = item.content_certainty || 0;
    const transition = item.transition_bar_certainty || 0;
    return Math.round((content + transition) / 2);
  }

  getConfidenceLevel(item: any): string {
    const confidence = this.getAIConfidence(item);
    if (confidence >= 80) return 'high';
    if (confidence >= 50) return 'medium';
    return 'low';
  }

  // Plausibility indicator methods
  getIndicatorSlot(item: any | null): number | null {
    if (!item) return null;
    const plausibility = Number(item.plausibility);
    if (!Number.isFinite(plausibility)) return null;

    const direction = this.normalizeDirection(item.favorable_future);
    if (direction === 'prefer' || direction === 'mostly-prefer') {
      return this.preferSlotMap.get(plausibility) ?? null;
    }
    if (direction === 'prevent' || direction === 'mostly-prevent') {
      return this.preventSlotMap.get(plausibility) ?? null;
    }
    return null;
  }

  getIndicatorLabel(item: any | null): string {
    if (!item) return 'No score';
    const plausibility = Number(item.plausibility);
    const plausibilityLabel = this.plausibilityLabelMap[plausibility];
    const direction = this.normalizeDirection(item.favorable_future);

    if (!plausibilityLabel) return 'No plausibility score';

    switch (direction) {
      case 'prefer':
        return `prefer ${plausibilityLabel}`;
      case 'mostly-prefer':
        return `mostly prefer ${plausibilityLabel}`;
      case 'prevent':
        return `prevent ${plausibilityLabel}`;
      case 'mostly-prevent':
        return `mostly prevent ${plausibilityLabel}`;
      default:
        return `uncertain ${plausibilityLabel}`;
    }
  }

  isPreferDirection(item: any | null): boolean {
    const direction = this.normalizeDirection(item?.favorable_future);
    return direction === 'prefer' || direction === 'mostly-prefer';
  }

  isPreventDirection(item: any | null): boolean {
    const direction = this.normalizeDirection(item?.favorable_future);
    return direction === 'prevent' || direction === 'mostly-prevent';
  }

  isMostlyPrefer(item: any | null): boolean {
    return this.normalizeDirection(item?.favorable_future) === 'mostly-prefer';
  }

  isMostlyPrevent(item: any | null): boolean {
    return this.normalizeDirection(item?.favorable_future) === 'mostly-prevent';
  }

  isNeutralDirection(item: any | null): boolean {
    return this.normalizeDirection(item?.favorable_future) === 'uncertain';
  }

  private normalizeDirection(value: string | null | undefined): 'prefer' | 'mostly-prefer' | 'prevent' | 'mostly-prevent' | 'uncertain' {
    const normalized = (value || '').toLowerCase();
    if (normalized === 'prefer') return 'prefer';
    if (normalized === 'mostly prefer') return 'mostly-prefer';
    if (normalized === 'mostly prevent') return 'mostly-prevent';
    if (normalized === 'prevent') return 'prevent';
    return 'uncertain';
  }

  // Style classes
  getDesirabilityClass(value: string): string {
    if (!value) return '';
    if (value.includes('prefer')) return 'prefer';
    if (value.includes('prevent')) return 'prevent';
    return 'uncertain';
  }

  getPlausibilityClass(value: number): string {
    if (!value) return '';
    if (value >= 75) return 'high';
    if (value >= 25) return 'medium';
    return 'low';
  }

  // Image replacement modal methods
  openImageReplacementModal(itemId: string): void {
    this.replacingImageItemId.set(itemId);
  }

  closeImageReplacementModal(): void {
    this.replacingImageItemId.set(null);
  }

  onImageReplaced(itemId: string, data: { screenshot_url: string }): void {
    const url = data.screenshot_url;
    this.allItems.update(items => items.map(item => item['_id'] === itemId ? { ...item, screenshot_url: url } : item));
    if (this.selectedItem() && this.selectedItem()!['_id'] === itemId) {
      this.selectedItem.update(item => item ? { ...item, screenshot_url: url } : item);
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
  
  // Showcase export modal methods
  openShowcaseExportModal(): void {
    this.showShowcaseExportModal.set(true);
  }
  
  closeShowcaseExportModal(): void {
    this.showShowcaseExportModal.set(false);
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
        results.forEach((items: any[], idx: number) => {
          const ws = workspaces[idx];
          const name = this.getWorkspaceNameWithEmojis(ws);
          if (Array.isArray(items)) {
            items.forEach((item: any) => {
              enriched.push({ ...item, _workspaceId: ws.id, _workspaceName: name, _workspaceAdminKey: ws.keys?.admin || '' });
            });
          }
        });
        this.allItems.set(enriched);
        this.loading.set(false);
        this.loadingProgress.set('');
      });
    });
  }
}
