import { Component, effect, signal, computed, inject, afterNextRender, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from '../../../admin-api.service';
import { StateService } from '../../../state.service';
import { FormsModule } from '@angular/forms';
import { FilterHelpers, FiltersBarComponent, FiltersBarState, FilterCounts } from '../../shared/filters-bar/filters-bar.component';
import { ItemFilterService } from '../../shared/filters-bar/item-filter.service';
import { firstValueFrom } from 'rxjs';
import { ImageReplacementModalComponent } from '../image-replacement-modal/image-replacement-modal.component';
import { QrCodeModalComponent } from '../qr-code-modal/qr-code-modal.component';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../platform.service';

export type Filter = {
  name: string;
  filter: string;
};

@Component({
  selector: 'app-moderate',
  imports: [
    FormsModule,
    FiltersBarComponent,
    ImageReplacementModalComponent,
    QrCodeModalComponent,
    CommonModule
  ],
  templateUrl: './moderate.component.html',
  styleUrl: './moderate.component.less'
})
export class ModerateComponent {

  Array = Array; // Make Array available in template

  FILTERS = [
    {name: 'highlighted', filter:'metadata._private_moderation == 5'},
    {name: 'approved', filter:'metadata._private_moderation == 4'},
    {name: 'not-flagged', filter:'metadata._private_moderation == 3'},
    {name: 'pending', filter:'metadata._private_moderation == 2'},
    {name: 'flagged', filter:'metadata._private_moderation == 1'},
    {name: 'rejected', filter:'metadata._private_moderation == 0'},
    {name: 'all', filter:''},
  ];
  
  workspaceId = signal<string | null>(null);
  workspace = signal<any>({});
  apiKey = signal<string | null>(null);
  page = signal<number>(0);
  
  // Individual filters
  filterStatus = signal<string[]>(FilterHelpers.DEFAULT_STATUSES);
  filterAuthor = signal<string>('all');
  preferenceOptions = ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent', 'none'];
  potentialOptions = ['100', '75', '50', '25', '0', 'none'];

  filterPreference = signal<string[]>([...this.preferenceOptions]);
  filterPotential = signal<string[]>([...this.potentialOptions]);
  filterType = signal<string>('all');
  searchText = signal<string>('');
  orderBy = signal<string>('date');
  
  // Computed filter counts from raw data (automatic reactivity)
  private filterCountsData = computed(() => {
    return this.filterService.calculateFilterCounts(this.allFetchedItems());
  });
  
  statusCounts = computed(() => this.filterCountsData().status);
  authorCounts = computed(() => this.filterCountsData().author);
  preferenceCounts = computed(() => this.filterCountsData().preference);
  potentialCounts = computed(() => this.filterCountsData().potential);
  typeCounts = computed(() => this.filterCountsData().type);
  
  editTagline = signal<string | null>(null);
  editDescription = signal<string | null>(null);
  editTags = signal<string | null>(null);
  newTag = signal<string>('');
  showDescription = signal<Set<string>>(new Set());
  userItemCounts = computed(() => {
    const allItems = this.allFetchedItems();
    const userCounts = new Map<string, number>();
    allItems.forEach((item: any) => {
      const authorId = item.author_id || 'unknown';
      userCounts.set(authorId, (userCounts.get(authorId) || 0) + 1);
    });
    return userCounts;
  });
  allItemsForCounting = signal<any[]>([]); // Store all items for accurate counting
  allFetchedItems = signal<any[]>([]); // Store all fetched items for client-side filtering
  viewMode = signal<'list' | 'grid'>('grid');
  selectedItem = signal<any | null>(null);
  lightboxSidebarOpen = signal<boolean>(true);
  selectedItemIndex = signal<number>(-1);

  // Multi-edit state
  multiSelectMode = signal<boolean>(false);
  selectedIds = signal<Set<string>>(new Set());
  bulkStatus = signal<number | null>(null);
  bulkAuthor = signal<string>('');
  bulkPlausibility = signal<number | null>(null);
  bulkFavorable = signal<string | null>(null);
  bulkType = signal<string | null>(null);
  bulkSaving = signal<boolean>(false);
  bulkError = signal<string | null>(null);

  // Computed filtered items (intermediate step)
  private filteredItems = computed(() => {
    return this.filterService.applyFilters(
      this.allFetchedItems(),
      this.filterState()
    );
  });

  // Computed final sorted items (automatic reactivity - no manual updates needed!)
  items = computed(() => {
    return this.filterService.sortItems(
      this.filteredItems(),
      this.orderBy(),
      this.userItemCounts()
    );
  });
  
  indexLink = signal<string | null>(null);

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

  // Image replacement state
  replacingImageItemId = signal<string | null>(null);
  currentReplacingImageUrl = computed(() => {
    const id = this.replacingImageItemId();
    if (!id) return null;
    const fromSelected = this.selectedItem() && this.selectedItem()._id === id ? this.selectedItem() : null;
    const fromList = this.items().find(it => it._id === id) || null;
    const item = fromSelected || fromList;
    return item?.screenshot_url || null;
  });
  showQRModal = signal<boolean>(false);
  qrItemId = signal<string | null>(null);

  LEVELS = [
    'banned',
    'flagged',
    'pending',
    'not-flagged',
    'approved',
    'highlighted',
  ];

  STATUS_OPTIONS: { label: string; value: number }[] = [
    { label: 'Highlighted', value: 5 },
    { label: 'Approved', value: 4 },
    { label: 'Not flagged', value: 3 },
    { label: 'Pending', value: 2 },
    { label: 'Flagged', value: 1 },
    { label: 'Rejected', value: 0 },
  ];

  editableMetadata = computed<[string, any][]>(() => {
    const item = this.selectedItem();
    if (!item) return [];
    const excluded = new Set(['_id']);
    return Object.entries(item).filter(([key, value]) => !excluded.has(key) && ['string', 'number', 'boolean'].includes(typeof value));
  });

  private filterService = inject(ItemFilterService);
  private stateService = inject(StateService);

  constructor(private route: ActivatedRoute, private api: AdminApiService) {
    // Read filters from hash synchronously first (before effects run)
    if (typeof window !== 'undefined' && window.location.hash) {
      const fragment = window.location.hash.substring(1);
      if (fragment) {
        const params = new URLSearchParams(fragment);
        const statusParam = params.get('status');
          if (statusParam) {
            // Parse new hash syntax: supports ~rejected for exclusion
            const parsed = FilterHelpers.parseHashParam(statusParam);
            let statusArray: string[];
            if (parsed.included.length > 0) {
              statusArray = parsed.included;
            } else {
              statusArray = FilterHelpers.ALL_STATUSES.filter(s => !parsed.excluded.includes(s));
            }
            this.filterStatus.set(statusArray);
          }
        const authorParam = params.get('author');
        if (authorParam) {
          this.filterAuthor.set(authorParam);
        }
        const preferenceParam = params.get('preference');
        if (preferenceParam) {
          const prefArray = preferenceParam.split(',');
          this.filterPreference.set(prefArray);
        }
        const potentialParam = params.get('potential');
        if (potentialParam) {
          const potArray = potentialParam.split(',');
          this.filterPotential.set(potArray);
        }
        const typeParam = params.get('type');
        if (typeParam) {
          this.filterType.set(typeParam);
        }
        const searchParam = params.get('search');
          if (searchParam) {
            const searchText = searchParam.replace(/\+/g, ' ');
            this.searchText.set(searchText);
          }
        const orderParam = params.get('order');
        if (orderParam) {
          this.orderBy.set(orderParam);
        }
        const viewParam = params.get('view');
        if (viewParam === 'grid' || viewParam === 'list') {
          this.viewMode.set(viewParam);
        }
      }
    }
    
    this.route.queryParams.subscribe(params => {
      this.apiKey.set(params['api_key'] || null);
      this.workspaceId.set(params['workspace'] || this.workspaceId());
    });
    
    // Read filters from hash parameters (for updates after initial load)
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const params = new URLSearchParams(fragment);
        const statusParam = params.get('status');
        if (statusParam) {
          const parsed = FilterHelpers.parseHashParam(statusParam);
          let statusArray: string[];
          if (parsed.included.length > 0) {
            statusArray = parsed.included;
          } else {
            statusArray = FilterHelpers.ALL_STATUSES.filter(s => !parsed.excluded.includes(s));
          }
          this.filterStatus.set(statusArray);
        } else {
          this.filterStatus.set(FilterHelpers.DEFAULT_STATUSES);
        }
        this.filterAuthor.set(params.get('author') || 'all');
        const preferenceParam = params.get('preference');
        this.filterPreference.set(preferenceParam ? preferenceParam.split(',') : [...this.preferenceOptions]);
        const potentialParam = params.get('potential');
        this.filterPotential.set(potentialParam ? potentialParam.split(',') : [...this.potentialOptions]);
        this.filterType.set(params.get('type') || 'all');
        const searchParam = params.get('search');
        this.searchText.set(searchParam ? searchParam.replace(/\+/g, ' ') : '');
        this.orderBy.set(params.get('order') || 'date');
        const view = params.get('view');
        if (view === 'grid' || view === 'list') {
          this.viewMode.set(view);
        }
      }
    });
    effect(() => {
      const workspaceId = this.workspaceId();
      const apiKey = this.apiKey();
      const page = this.page();
      if (workspaceId && apiKey) {
        // Only fetch from API - no filtering on server
        this.api.getItems(workspaceId, apiKey, page, '').subscribe((data: any) => {
          if (data['index-required']) {
            this.indexLink.set(data['index-required'] || null);
            this.allFetchedItems.set([]);
          } else {
            this.indexLink.set(null);
            data = data.filter((item: any) => !!item?.screenshot_url);
            data.forEach((item: any) => {
              item.screenshot_url = this.fix_url(item.screenshot_url);
              item.favorable_future = this.fix_favorable_future(item.favorable_future);
              // Parse tags from future_scenario_topics object
              item.tags = [];
              if (item.future_scenario_topics) {
                // future_scenario_topics is an object, extract values
                if (typeof item.future_scenario_topics === 'object' && !Array.isArray(item.future_scenario_topics)) {
                  item.tags = Object.values(item.future_scenario_topics).filter((t: any) => t);
                } else if (Array.isArray(item.future_scenario_topics)) {
                  item.tags = item.future_scenario_topics;
                }
              }
            });
            
            // Store all fetched items
            const existing = this.allFetchedItems();
            const newItems = data.filter((item: any) => !existing.find((i: any) => i._id === item._id));
            this.allFetchedItems.set([...existing, ...newItems]);
            
            // Note: items will be automatically recomputed via computed signals
            // when allFetchedItems changes
          }
        });
      }
    });
    effect(() => {
      const workspaceId = this.workspaceId();
      const apiKey = this.apiKey();
      if (workspaceId && apiKey) {
        this.api.getWorkspace(workspaceId, apiKey).subscribe((data: any) => {
          this.workspace.set(data);
        });
      }
    });
    effect(() => {
      // Watch filter changes and update URL hash
      // Note: items are now automatically computed via computed signals!
      this.filterState(); // Track all filter dependencies
      this.updateHashParams();
    });
  }

  updateModeration(itemId: string, level: number) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      this.api.updateItemModeration(workspaceId, apiKey, itemId, level).subscribe(data => {
        // Update source data - items will be recomputed automatically
        this.allFetchedItems.set(this.allFetchedItems().filter(item => item._id !== itemId));
      });
    } else {
      console.error('workspaceId or apiKey is null');
    }
  }

  reject(itemId: string) {
    this.updateModeration(itemId, 0);
  }

  approve(itemId: string) {
    this.updateModeration(itemId, 4);
  }

  highlight(itemId: string) {
    this.updateModeration(itemId, 5);
  }

  unarchive(itemId: string) {
    this.updateModeration(itemId, 2);
  }

  setStatusFromSidebar(level: number) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    const current = this.selectedItem();
    if (!workspaceId || !apiKey || !current) return;
    this.api.updateItemModeration(workspaceId, apiKey, current._id, level).subscribe({
      next: () => {
        // Update source data - items will be recomputed automatically
        this.allFetchedItems.update(items => items.map(item => item._id === current._id ? { ...item, _private_moderation: level } : item));
        this.selectedItem.update(item => item ? { ...item, _private_moderation: level } : item);
      },
      error: (err) => console.error('Error updating status', err)
    });
  }


  updateHashParams(): void {
    const params = new URLSearchParams();
    
    // Encode status with ~ for excluded items (default: exclude rejected)
    const selectedStatuses = this.filterStatus();
    const excludedStatuses = FilterHelpers.ALL_STATUSES.filter(s => !selectedStatuses.includes(s));
    
    // Only include status param if it's not the default (all except rejected)
    if (!FilterHelpers.isDefaultStatusFilter(selectedStatuses)) {
      const statusParam = FilterHelpers.encodeHashParam(selectedStatuses, excludedStatuses);
      if (statusParam) {
        params.set('status', statusParam);
      }
    }
    
    if (this.filterAuthor() !== 'all') params.set('author', this.filterAuthor());
    if (this.filterPreference().length > 0 && this.filterPreference().length < this.preferenceOptions.length) params.set('preference', this.filterPreference().join(','));
    if (this.filterPotential().length > 0 && this.filterPotential().length < this.potentialOptions.length) params.set('potential', this.filterPotential().join(','));
    if (this.filterType() !== 'all') params.set('type', this.filterType());
    // Encode search with + for spaces
    if (this.searchText()) params.set('search', this.searchText().replace(/ /g, '+'));
    if (this.orderBy() !== 'date') params.set('order', this.orderBy());
    params.set('view', this.viewMode());
    
    const fragment = params.toString();
    if (typeof window !== 'undefined') {
      window.location.hash = fragment;
    }
  }
  


  clearAllFilters(): void {
    this.filterStatus.set(FilterHelpers.DEFAULT_STATUSES);
    this.filterAuthor.set('all');
    this.filterPreference.set([...this.preferenceOptions]);
    this.filterPotential.set([...this.potentialOptions]);
    this.filterType.set('all');
    this.searchText.set('');
    this.page.set(0);
    this.allFetchedItems.set([]);
  }
  
  
  
  getAuthorsSortedByCount(): string[] {
    const counts = this.authorCounts();
    const authors = Array.from(counts.keys());
    return authors.sort((a, b) => {
      if (a === 'unknown') return 1;
      if (b === 'unknown') return -1;
      return (counts.get(b) || 0) - (counts.get(a) || 0);
    });
  }
  
  getCount(map: Map<string, number>, key: string): number {
    return map.get(key) || 0;
  }

  getTruncatedAuthorId(authorId: string): string {
    if (!authorId || authorId === 'unknown') return 'unknown';
    return authorId.substring(0, 8);
  }

  updateMetadataField(key: string, rawValue: any): void {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    const current = this.selectedItem();
    if (!workspaceId || !apiKey || !current) return;

    const original = (current as any)[key];
    const value = this.coerceValue(original, rawValue);

    console.log('[MODERATE] updateMetadataField called for:', current._id, 'key:', key, 'value:', value);
    this.api.updateItem(workspaceId, apiKey, current._id, { [key]: value }).subscribe({
      next: (data) => {
        console.log('[MODERATE] updateMetadataField API response:', data);
        // Update source data - items will be recomputed automatically
        this.allFetchedItems.update(items => items.map(item => item._id === current._id ? { ...item, [key]: value } : item));
        this.selectedItem.update(item => item ? { ...item, [key]: value } : item);
        
        // Notify showcase-ws if this is a metadata field we care about
        if (key === 'plausibility' || key === 'favorable_future' || key === 'transition_bar_position') {
          const updatedItem = this.selectedItem();
          const metadataUpdate = {
            plausibility: updatedItem.plausibility,
            favorable_future: updatedItem.favorable_future,
            transition_bar_position: updatedItem.transition_bar_position
          };
          console.log('[MODERATE] Notifying metadata update for item:', current._id, 'with data:', metadataUpdate);
          this.stateService.notifyMetadataUpdated(current._id, metadataUpdate);
        }
      },
      error: (err) => console.error('[MODERATE] Error updating field', key, err)
    });
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

  getEmail(item: any): string {
    return item._private_email || item.email || item.user_email || 'unknown@user.com';
  }

  getScreenshotTypeEmoji(type: string): string {
    const emojiMap: { [key: string]: string } = {
      'sign_in_a_demonstration': '🪧',
      'social_media_post': '📣',
      'chat_conversation': '💬',
      'notification_alert': '🔔',
      'ai_agent_query': '🤖',
      'review': '⭐',
      'map_visualization': '🗺️',
      'photograph': '📸'
    };
    return emojiMap[type] || '❓';
  }

  filterByUser(authorId: string) {
    if (!authorId || authorId === 'unknown') {
      this.filterAuthor.set('unattributed');
    } else {
      this.filterAuthor.set(authorId);
    }
  }

  getUserItemCount(authorId: string): number {
    return this.userItemCounts().get(authorId) || 0;
  }

  getAIConfidence(item: any): number {
    // Calculate confidence based on content_certainty and transition_bar_certainty
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

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  fix_url(url: string) {
    url = url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
    return url;
  }

  fix_favorable_future(future: any) {
    if (future) {
      future = future.replace('preferred', 'prefer');
      if (future === 'yes') {
        return 'prefer';
      }
      if (future === 'no') {
        return 'prevent';
      }
      return future;
    }
    return 'uncertain';
  }

  setPlausibility(item: any) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      item.plausibility = parseInt(item.plausibility, 10);
      console.log('[MODERATE] setPlausibility called for item:', item._id, 'new plausibility:', item.plausibility);
      this.api.updateItem(workspaceId, apiKey, item._id, {plausibility: item.plausibility}).subscribe({
        next: (data) => {
          console.log('[MODERATE] API response for setPlausibility:', data);
          // Notify showcase-ws and other components about the metadata update
          const metadataUpdate = {
            plausibility: data.plausibility !== undefined ? data.plausibility : item.plausibility,
            favorable_future: data.favorable_future !== undefined ? data.favorable_future : item.favorable_future,
            transition_bar_position: data.transition_bar_position !== undefined ? data.transition_bar_position : item.transition_bar_position
          };
          console.log('[MODERATE] Notifying metadata update for item:', item._id, 'with data:', metadataUpdate);
          this.stateService.notifyMetadataUpdated(item._id, metadataUpdate);
        },
        error: (error) => {
          console.error('[MODERATE] Error updating plausibility:', error);
        }
      });
    } else {
      console.error('workspaceId or apiKey is null');
    }
  }  

  setFavorable(item: any) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      console.log('[MODERATE] setFavorable called for item:', item._id, 'new favorable_future:', item.favorable_future);
      this.api.updateItem(workspaceId, apiKey, item._id, {favorable_future: item.favorable_future}).subscribe({
        next: (data) => {
          console.log('[MODERATE] API response for setFavorable:', data);
          // Notify showcase-ws and other components about the metadata update
          const metadataUpdate = {
            plausibility: data.plausibility !== undefined ? data.plausibility : item.plausibility,
            favorable_future: data.favorable_future !== undefined ? data.favorable_future : item.favorable_future,
            transition_bar_position: data.transition_bar_position !== undefined ? data.transition_bar_position : item.transition_bar_position
          };
          console.log('[MODERATE] Notifying metadata update for item:', item._id, 'with data:', metadataUpdate);
          this.stateService.notifyMetadataUpdated(item._id, metadataUpdate);
        },
        error: (error) => {
          console.error('[MODERATE] Error updating favorable_future:', error);
        }
      });
    } else {
      console.error('workspaceId or apiKey is null');
    }
  }

  setTagline(item: any) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      // Trigger re-analysis by clearing automated metadata
      const updateData: any = {
        future_scenario_tagline: item.future_scenario_tagline,
        future_scenario_description: item.future_scenario_tagline,
        // Clear automated fields to trigger re-analysis
        embedding: null,
        future_scenario_topics: null,
      };
      this.api.updateItem(workspaceId, apiKey, item._id, updateData).subscribe(data => {
        console.log('item updated, re-analysis triggered', data);
        this.editTagline.set(null);
      });
    }
  }

  setDescription(item: any) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      // Trigger re-analysis by clearing automated metadata
      const updateData: any = {
        content: item.content,
        future_scenario_description: item.future_scenario_description,
        // Clear automated fields to trigger re-analysis
        embedding: null,
        future_scenario_topics: null,
      };
      this.api.updateItem(workspaceId, apiKey, item._id, updateData).subscribe(data => {
        console.log('item content and description updated, re-analysis triggered', data);
        this.editDescription.set(null);
      });
    }
  }

  toggleDescriptionView(itemId: string) {
    const current = this.showDescription();
    const newSet = new Set(current);
    if (newSet.has(itemId)) {
      newSet.delete(itemId);
    } else {
      newSet.add(itemId);
    }
    this.showDescription.set(newSet);
  }

  isShowingDescription(itemId: string): boolean {
    return this.showDescription().has(itemId);
  }

  removeTag(item: any, tagIndex: number) {
    item.tags = item.tags.filter((_: any, i: number) => i !== tagIndex);
    this.setTags(item);
  }

  addTag(item: any, tagInput: HTMLInputElement) {
    const newTag = tagInput.value.trim();
    if (newTag && !item.tags.includes(newTag)) {
      item.tags = [...(item.tags || []), newTag];
      this.setTags(item);
      tagInput.value = '';
    }
  }

  setTags(item: any) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      // Create topics object from tags array
      const topics: any = {};
      item.tags.forEach((tag: string, index: number) => {
        topics[`topic_${index + 1}`] = tag;
      });
      
      const updateData: any = {
        future_scenario_topics: topics,
        // Clear embedding to trigger re-analysis
        embedding: null,
      };
      this.api.updateItem(workspaceId, apiKey, item._id, updateData).subscribe(data => {
        console.log('tags updated, re-analysis triggered', data);
      });
    }
  }

  toggleViewMode(): void {
    const newMode = this.viewMode() === 'list' ? 'grid' : 'list';
    this.viewMode.set(newMode);
    if (newMode === 'list') {
      this.selectedItem.set(null);
    }
  }

  selectItem(item: any): void {
    if (this.multiSelectMode()) {
      this.toggleItemSelection(item._id);
      return;
    }
    this.selectedItem.set(item);
    // Find and set the index of the selected item
    const index = this.items().findIndex(i => i._id === item._id);
    this.selectedItemIndex.set(index);
    this.lightboxSidebarOpen.set(true);
    // Scroll to top when opening lightbox
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  closeSidebar(): void {
    const currentItem = this.selectedItem();
    if (currentItem) {
      // Trigger re-analysis when closing
      this.triggerReanalysis(currentItem);
    }
    this.selectedItem.set(null);
    this.lightboxSidebarOpen.set(false);
  }

  nextItem(): void {
    const currentItem = this.selectedItem();
    if (currentItem) {
      // Trigger re-analysis before moving to next item
      this.triggerReanalysis(currentItem);
    }
    const index = this.selectedItemIndex();
    if (index < this.items().length - 1) {
      this.selectItem(this.items()[index + 1]);
    }
  }

  prevItem(): void {
    const currentItem = this.selectedItem();
    if (currentItem) {
      // Trigger re-analysis before moving to previous item
      this.triggerReanalysis(currentItem);
    }
    const index = this.selectedItemIndex();
    if (index > 0) {
      this.selectItem(this.items()[index - 1]);
    }
  }

  triggerReanalysis(item: any): void {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey && item) {
      // Clear embedding and automated analysis fields to trigger backend re-analysis
      const updateData: any = {
        embedding: null,
        future_scenario_topics: null,
        content_certainty: null,
        transition_bar_certainty: null,
        transition_bar_event_prediction: null,
      };
      this.api.updateItem(workspaceId, apiKey, item._id, updateData).subscribe(
        data => {
          console.log('item re-analysis triggered', data);
        },
        error => {
          console.error('Error triggering re-analysis', error);
        }
      );
    }
  }

  regenerateAiFieldsFromUserInput(): void {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    const current = this.selectedItem();
    if (!workspaceId || !apiKey || !current) {
      return;
    }

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

    this.api.updateItem(workspaceId, apiKey, current._id, updateData).subscribe({
      next: () => {
        // Update source data - items will be recomputed automatically
        this.allFetchedItems.update(items => items.map(item => item._id === current._id ? { ...item, ...updateData } : item));
        this.selectedItem.update(item => item ? { ...item, ...updateData } : item);
      },
      error: (err) => console.error('Error regenerating AI fields', err)
    });
  }

  toggleLightboxSidebar(): void {
    this.lightboxSidebarOpen.update(v => !v);
  }

  autoSaveScreenshotType(item: any): void {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      this.api.updateItem(workspaceId, apiKey, item._id, { screenshot_type: item.screenshot_type }).subscribe(
        data => console.log('screenshot_type updated', data),
        error => console.error('Error updating screenshot_type', error)
      );
    }
  }

  autoSaveContent(item: any): void {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      this.api.updateItem(workspaceId, apiKey, item._id, { content: item.content }).subscribe(
        data => console.log('content updated', data),
        error => console.error('Error updating content', error)
      );
    }
  }

  autoSaveTransitionBarEvent(item: any): void {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      this.api.updateItem(workspaceId, apiKey, item._id, { transition_bar_event: item.transition_bar_event || null }).subscribe(
        data => console.log('transition_bar_event updated', data),
        error => console.error('Error updating transition_bar_event', error)
      );
    }
  }

  autoSaveTransitionBarPosition(item: any): void {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      this.api.updateItem(workspaceId, apiKey, item._id, { transition_bar_position: item.transition_bar_position || null }).subscribe(
        data => console.log('transition_bar_position updated', data),
        error => console.error('Error updating transition_bar_position', error)
      );
    }
  }

  // Multi-edit helpers
  toggleMultiSelectMode(): void {
    const next = !this.multiSelectMode();
    this.multiSelectMode.set(next);
    if (!next) {
      this.clearBulkSelection();
    } else {
      this.selectedItem.set(null);
      this.selectedItemIndex.set(-1);
    }
  }

  isItemSelected(itemId: string): boolean {
    return this.selectedIds().has(itemId);
  }

  toggleItemSelection(itemId: string): void {
    const current = new Set(this.selectedIds());
    if (current.has(itemId)) {
      current.delete(itemId);
    } else {
      current.add(itemId);
    }
    this.selectedIds.set(current);
  }

  selectedCount(): number {
    return this.selectedIds()?.size || 0;
  }

  getSingleSelectedId(): string | null {
    if (this.selectedIds()?.size !== 1) return null;
    return Array.from(this.selectedIds())[0] ?? null;
  }

  selectAll(): void {
    const allIds = new Set(this.items().map(item => item._id));
    this.selectedIds.set(allIds);
  }

  clearBulkSelection(): void {
    this.selectedIds.set(new Set());
    this.resetBulkFields();
    this.bulkSaving.set(false);
    this.bulkError.set(null);
  }

  private resetBulkFields(): void {
    this.bulkStatus.set(null);
    this.bulkAuthor.set('');
    this.bulkPlausibility.set(null);
    this.bulkFavorable.set(null);
    this.bulkType.set(null);
  }

  async applyBulkChanges(): Promise<void> {
    const ids = Array.from(this.selectedIds());
    if (!ids.length) {
      this.bulkError.set('Select at least one item.');
      return;
    }

    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (!workspaceId || !apiKey) {
      this.bulkError.set('Workspace ID and API key are required.');
      return;
    }

    const updates: any = {};
    const statusValue = this.bulkStatus();
    const moderationValue = statusValue ? this.statusToModeration(statusValue) : null;
    if (moderationValue !== null) {
      updates._private_moderation = moderationValue;
    }
    if (this.bulkAuthor()) {
      updates.author_id = this.bulkAuthor();
    }
    if (this.bulkPlausibility() !== null) {
      updates.plausibility = this.bulkPlausibility();
    }
    if (this.bulkFavorable()) {
      updates.favorable_future = this.bulkFavorable();
    }
    if (this.bulkType()) {
      updates.screenshot_type = this.bulkType();
    }

    if (Object.keys(updates).length === 0) {
      this.bulkError.set('Choose at least one field to update.');
      return;
    }

    this.bulkSaving.set(true);
    this.bulkError.set(null);

    const results = await Promise.all(ids.map(async id => {
      try {
        const response = await firstValueFrom(this.api.updateItem(workspaceId, apiKey, id, updates));
        // Notify showcase-ws about metadata updates
        if (updates.plausibility !== undefined || updates.favorable_future !== undefined || updates.transition_bar_position !== undefined) {
          const metadataUpdate: any = {};
          if (updates.plausibility !== undefined) metadataUpdate.plausibility = updates.plausibility;
          if (updates.favorable_future !== undefined) metadataUpdate.favorable_future = updates.favorable_future;
          if (updates.transition_bar_position !== undefined) metadataUpdate.transition_bar_position = updates.transition_bar_position;
          console.log('[MODERATE] Bulk update notifying metadata for:', id, metadataUpdate);
          this.stateService.notifyMetadataUpdated(id, metadataUpdate);
        }
        return { id, ok: true };
      } catch (error: any) {
        return { id, ok: false, error };
      }
    }));

    const failed = results.filter(r => !r.ok);
    if (failed.length) {
      this.bulkError.set(`Failed to update ${failed.length} item(s).`);
    }

    const applyUpdates = (arr: any[]) => arr.map(item => ids.includes(item._id) ? { ...item, ...updates } : item);
    this.allFetchedItems.set(applyUpdates(this.allFetchedItems()));
    // No need to call applyFiltersAndSort - items are now computed automatically!

    this.bulkSaving.set(false);
    this.clearBulkSelection();
  }

  private statusToModeration(status: number): number | null {
    return status ?? null;
  }

  parseNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  // Methods for filters-bar component integration
  // Use computed to memoize the filter state and avoid creating new objects on every change detection
  filterState = computed<FiltersBarState>(() => ({
    status: this.filterStatus(),
    author: this.filterAuthor(),
    preference: this.filterPreference(),
    potential: this.filterPotential(),
    type: this.filterType(),
    search: this.searchText(),
    orderBy: this.orderBy(),
    view: this.viewMode()
  }));
  
  filterCounts = computed<FilterCounts>(() => ({
    status: this.statusCounts(),
    author: this.authorCounts(),
    preference: this.preferenceCounts(),
    potential: this.potentialCounts(),
    type: this.typeCounts()
  }));

  onFiltersChange(newState: FiltersBarState): void {
    this.filterStatus.set(newState.status);
    this.filterAuthor.set(newState.author);
    this.filterPreference.set(newState.preference);
    this.filterPotential.set(newState.potential);
    this.filterType.set(newState.type);
    this.searchText.set(newState.search);
    this.orderBy.set(newState.orderBy);
    if (newState.view) {
      this.viewMode.set(newState.view as 'grid' | 'list');
    }
    
    // No need to manually update items - they are computed automatically from filter signals
  }

  onFiltersCommit(newState: FiltersBarState): void {
    // This is called when dropdown closes or focus changes
    // Update filters and immediately update hash
    this.onFiltersChange(newState);
    // The effect will trigger updateHashParams() automatically
  }

  openImageReplacementModal(itemId: string): void {
    this.replacingImageItemId.set(itemId);
  }

  closeImageReplacementModal(): void {
    this.replacingImageItemId.set(null);
  }

  onImageReplaced(itemId: string, data: { screenshot_url: string }): void {
    const url = data.screenshot_url;
    // Update source data - items will be recomputed automatically
    this.allFetchedItems.update(items => items.map(item => item._id === itemId ? { ...item, screenshot_url: url } : item));
    if (this.selectedItem() && this.selectedItem()._id === itemId) {
      this.selectedItem.update(item => item ? { ...item, screenshot_url: url } : item);
    }
    this.replacingImageItemId.set(null);
  }

  onRefreshGrid(): void {
    // Reload all items to update grid with latest data and metadata
    this.allFetchedItems.set([]);
    this.page.set(0);
    // Reset page to 0, which will trigger the effect to re-fetch items
    // The effect watching workspaceId, apiKey, and page will automatically fetch new items
  }

  openQrModal(itemId: string): void {
    this.qrItemId.set(itemId);
    this.showQRModal.set(true);
  }

  closeQrModal(): void {
    this.showQRModal.set(false);
    this.qrItemId.set(null);
  }
}
