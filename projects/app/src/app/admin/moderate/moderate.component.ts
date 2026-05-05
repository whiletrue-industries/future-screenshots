import { ChangeDetectionStrategy, Component, effect, signal, computed, inject, OnDestroy, OnInit, DestroyRef, untracked } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminApiService } from '../../../admin-api.service';
import { FormsModule } from '@angular/forms';
import { FilterHelpers, FiltersBarComponent, FiltersBarState, FilterCounts } from '../../shared/filters-bar/filters-bar.component';
import { ItemFilterService } from '../../shared/filters-bar/item-filter.service';
import {
  STATUS_OPTIONS,
  coerceValue, getAIConfidence, getConfidenceLevel,
  getIndicatorSlot, getIndicatorLabel, isPreferDirection, isPreventDirection,
  isMostlyPrefer, isMostlyPrevent, isNeutralDirection,
  getDesirabilityClass, getPlausibilityClass, getEmail,
  getWorkspaceNameWithEmojis, formatDate
} from '../moderation-helpers';
import { firstValueFrom, catchError, of, forkJoin, take, filter, timeout } from 'rxjs';
import { ImageReplacementModalComponent } from '../image-replacement-modal/image-replacement-modal.component';
import { QrCodeModalComponent } from '../qr-code-modal/qr-code-modal.component';
import { CommonModule } from '@angular/common';
import { AdminLightboxComponent } from '../admin-lightbox/admin-lightbox.component';
import { AuthService } from '../../auth.service';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
import { LazyLoadImageDirective } from '../lazy-load-image.directive';

import { EnrichedItem } from '../workspace-metadata.interface';
import { TaxonomyService } from '../../shared/taxonomy.service';

export type Filter = {
  name: string;
  filter: string;
};

@Component({
  selector: 'app-moderate',
  host: {
    ngSkipHydration: 'true'
  },
  imports: [
    RouterLink,
    FormsModule,
    FiltersBarComponent,
    ImageReplacementModalComponent,
    QrCodeModalComponent,
    AdminLightboxComponent,
    CommonModule,
    SkeletonLoaderComponent,
    LazyLoadImageDirective,
  ],
  templateUrl: './moderate.component.html',
  styleUrl: './moderate.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModerateComponent implements OnInit, OnDestroy {

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
  
  // Multi-workspace mode
  multiWorkspaceMode = signal<boolean>(false);
  workspaces = signal<any[]>([]);
  filterWorkspaceIds = signal<string[]>([]);
  workspaceDropdownOpen = signal<boolean>(false);
  workspaceSearchText = signal<string>('');
  workspacesLoading = signal<boolean>(false);
  workspacesLoadingProgress = signal<string>('');

  private auth = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private authToken$ = toObservable(this.auth.token);
  
  // Single workspace mode
  workspaceId = signal<string | null>(null);
  workspace = signal<any>({});
  apiKey = signal<string | null>(null);
  page = signal<number>(0);
  
  // Lazy loading state
  itemsLoading = signal<boolean>(false);
  hasMoreItems = signal<boolean>(true);
  private isLoadingMore = false;
  
  // Image lazy loading - track which images have loaded
  imageLoadedMap = signal<Map<string, boolean>>(new Map());
  imageObserver: IntersectionObserver | null = null;
  
  // Individual filters
  filterStatus = signal<string[]>(FilterHelpers.DEFAULT_STATUSES);
  filterAuthor = signal<string>('all');
  preferenceOptions = ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent', 'none'];
  potentialOptions = ['100', '75', '50', '25', '0', 'none'];

  filterPreference = signal<string[]>([...this.preferenceOptions]);
  filterPotential = signal<string[]>([...this.potentialOptions]);
  filterType = signal<string>('all');
  filterTopic = signal<string[]>([]);
  searchText = signal<string>('');
  orderBy = signal<string>('date');
  
  private filterService = inject(ItemFilterService);
  taxonomyService = inject(TaxonomyService);

  // Computed filter counts from raw data (automatic reactivity)
  private filterCountsData = computed(() => {
    return this.filterService.calculateFilterCounts(this.workspaceFilteredItems());
  });
  
  statusCounts = computed(() => this.filterCountsData().status);
  authorCounts = computed(() => this.filterCountsData().author);
  preferenceCounts = computed(() => this.filterCountsData().preference);
  potentialCounts = computed(() => this.filterCountsData().potential);
  typeCounts = computed(() => this.filterCountsData().type);
  topicCounts = computed(() => this.filterCountsData().topic);

  // Initialize topic filter when taxonomy loads - select all available sub-themes
  private topicInitEffect = effect(() => {
    const allIds = this.taxonomyService.allSubThemeIds();
    if (allIds.length > 0 && this.filterTopic().length === 0) {
      this.filterTopic.set(allIds);
    }
  });

  editTagline = signal<string | null>(null);
  editDescription = signal<string | null>(null);
  editTags = signal<string | null>(null);
  newTag = signal<string>('');
  showDescription = signal<Set<string>>(new Set());
  allItemsForCounting = signal<any[]>([]); // Store all items for accurate counting
  allFetchedItems = signal<any[]>([]); // Store all fetched items for client-side filtering
  viewMode = signal<'list' | 'grid'>('grid');
  selectedItem = signal<any | null>(null);
  lightboxSidebarOpen = signal<boolean>(false);
  selectedItemIndex = signal<number>(-1);
  hoveredWorkspaceId = signal<string | null>(null);
  hoveredItemId = signal<string | null>(null);

  userItemCounts = computed(() => {
    const allItems = this.workspaceFilteredItems();
    const userCounts = new Map<string, number>();
    allItems.forEach((item: any) => {
      const authorId = item.author_id || 'unknown';
      userCounts.set(authorId, (userCounts.get(authorId) || 0) + 1);
    });
    return userCounts;
  });

  // Multi-edit state
  multiSelectMode = signal<boolean>(false);
  selectedIds = signal<Set<string>>(new Set());
  bulkStatus = signal<number | null>(null);
  bulkAuthor = signal<string>('');
  bulkPlausibility = signal<number | null>(null);
  bulkFavorable = signal<string | null>(null);
  bulkType = signal<string | null>(null);
  bulkAddTags = signal<string>('');
  bulkSaving = signal<boolean>(false);
  bulkError = signal<string | null>(null);

  // Computed common tags across selected items
  commonTags = computed(() => {
    const selectedItems = this.allFetchedItems()
      .filter(item => this.selectedIds().has(item._id));

    if (selectedItems.length < 2) return [];

    // Find tags that exist in ALL selected items
    const allTags = selectedItems
      .map(item => Array.isArray(item.tags) ? item.tags : []);

    const firstItemTags = allTags[0] || [];
    return firstItemTags.filter((tag: string) => 
      allTags.every(itemTags => itemTags.includes(tag))
    );
  });

  // Computed filtered items (intermediate step)
  private filteredItems = computed(() => {
    return this.filterService.applyFilters(
      this.workspaceFilteredItems(),
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

  STATUS_OPTIONS = STATUS_OPTIONS;

  editableMetadata = computed<[string, any][]>(() => {
    const item = this.selectedItem();
    if (!item) return [];
    const excluded = new Set(['_id', '_workspaceId', '_workspaceName', '_workspaceAdminKey']);
    return Object.entries(item).filter(([key, value]) => !excluded.has(key) && ['string', 'number', 'boolean'].includes(typeof value));
  });

  // Multi-workspace computed properties
  filteredWorkspaces = computed(() => {
    let workspaces = [...this.workspaces()];
    // Sort in reverse chronological order
    workspaces.sort((a, b) => {
      const ad = a?.metadata?.date ?? '';
      const bd = b?.metadata?.date ?? '';
      return bd.localeCompare(ad);
    });
    const searchText = this.workspaceSearchText().toLowerCase();
    if (searchText) {
      workspaces = workspaces.filter(ws => {
        const name = ws.metadata?.source || ws.metadata?.event_name || ws.id || '';
        return name.toLowerCase().includes(searchText);
      });
    }
    return workspaces;
  });
  
  // Apply workspace filter in multi-workspace mode
  private workspaceFilteredItems = computed(() => {
    const items = this.allFetchedItems();
    if (!this.multiWorkspaceMode()) {
      return items;
    }
    const selectedWorkspaces = this.filterWorkspaceIds();
    if (selectedWorkspaces.length === 0 || selectedWorkspaces.length === this.workspaces().length) {
      return items;
    }
    return items.filter((item: EnrichedItem) => {
      return item._workspaceId && selectedWorkspaces.includes(item._workspaceId);
    });
  });

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
        const topicParam = params.get('topic');
        if (topicParam) {
          this.filterTopic.set(topicParam.split(','));
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
    
    // Read initial query parameters from snapshot (synchronously available)
    const snapshotParams = this.route.snapshot.queryParams;
    const workspace = snapshotParams['workspace'] || snapshotParams['workspaceId'];
    const apiKey = snapshotParams['api_key'] || snapshotParams['apiKey'];
    if (workspace) {
      this.workspaceId.set(workspace);
    }
    if (apiKey) {
      this.apiKey.set(apiKey);
    }
    
    // Also subscribe to future parameter changes in case they update
    this.route.queryParams.subscribe(params => {
      const workspace = params['workspace'] || params['workspaceId'];
      const apiKey = params['api_key'] || params['apiKey'];
      if (workspace) {
        this.workspaceId.set(workspace);
      }
      if (apiKey) {
        this.apiKey.set(apiKey);
      }
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
        const topicFragParam = params.get('topic');
        if (topicFragParam) {
          this.filterTopic.set(topicFragParam.split(','));
        }
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
      if (workspaceId && apiKey && page === 0) {
        // Initial load: reset items and load first page
        this.allFetchedItems.set([]);
        this.hasMoreItems.set(true);
        untracked(() => this.loadMoreItems());
      }
    });
    effect(() => {
      const workspaceId = this.workspaceId();
      const apiKey = this.apiKey();
      if (workspaceId && apiKey) {
        this.api.getWorkspace(workspaceId, apiKey).pipe(
          catchError(error => {
            console.error('Failed to load workspace:', error);
            return of({});
          })
        ).subscribe((data: any) => {
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
    // Get workspace info from item in multi-workspace mode
    const item = this.allFetchedItems().find(i => i._id === itemId);
    let workspaceId: string | null | undefined;
    let apiKey: string | null | undefined;
    
    if (this.multiWorkspaceMode() && item) {
      workspaceId = item._workspaceId;
      apiKey = item._workspaceAdminKey;
    } else {
      workspaceId = this.workspaceId();
      apiKey = this.apiKey();
    }
    
    if (workspaceId && apiKey) {
      this.api.updateItemModeration(workspaceId, apiKey, itemId, level).subscribe(data => {
        // Update the item's moderation status in the source data
        this.allFetchedItems.update(items => 
          items.map(item => 
            item._id === itemId 
              ? { ...item, _private_moderation: level }
              : item
          )
        );
        
        // Also update the selected item if it's the same one
        const currentSelected = this.selectedItem();
        if (currentSelected && currentSelected._id === itemId) {
          this.selectedItem.set({ ...currentSelected, _private_moderation: level });
        }
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

  // Helper to get workspace credentials for an item
  private getItemCredentials(item: any): { workspaceId: string; apiKey: string } | null {
    if (this.multiWorkspaceMode()) {
      if (item._workspaceId && item._workspaceAdminKey) {
        return { workspaceId: item._workspaceId, apiKey: item._workspaceAdminKey };
      }

      if (item._workspaceId) {
        const workspace = this.workspaces().find((ws: any) => ws?.id === item._workspaceId);
        const adminKey = workspace?.keys?.admin;
        if (adminKey) {
          return { workspaceId: item._workspaceId, apiKey: adminKey };
        }
      }
    } else {
      const wsId = this.workspaceId();
      const key = this.apiKey();
      if (wsId && key) {
        return { workspaceId: wsId, apiKey: key };
      }
    }
    return null;
  }

  setStatusFromSidebar(level: number) {
    const current = this.selectedItem();
    if (!current) return;
    
    const creds = this.getItemCredentials(current);
    if (!creds) {
      console.error('No workspace credentials available');
      return;
    }
    
    this.api.updateItemModeration(creds.workspaceId, creds.apiKey, current._id, level).subscribe({
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
    const allTopicIds = this.taxonomyService.allSubThemeIds();
    if (this.filterTopic().length > 0 && this.filterTopic().length < allTopicIds.length) {
      params.set('topic', this.filterTopic().join(','));
    }
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
    this.filterTopic.set(this.taxonomyService.allSubThemeIds());
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
    const current = this.selectedItem();
    if (!current) return;

    const creds = this.getItemCredentials(current);
    if (!creds) return;

    const original = (current as any)[key];
    const value = this.coerceValue(original, rawValue);

    this.api.updateItem(creds.workspaceId, creds.apiKey, current._id, { [key]: value }).subscribe({
      next: () => {
        // Update source data - items will be recomputed automatically
        this.allFetchedItems.update(items => items.map(item => item._id === current._id ? { ...item, [key]: value } : item));
        this.selectedItem.update(item => item ? { ...item, [key]: value } : item);
      },
      error: (err) => console.error('Error updating field', key, err)
    });
  }

  private coerceValue = coerceValue;

  getEmail = getEmail;

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

  getWorkspaceNameWithEmojis = getWorkspaceNameWithEmojis;

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

  getAIConfidence = getAIConfidence;
  getConfidenceLevel = getConfidenceLevel;
  getDesirabilityClass = getDesirabilityClass;
  getPlausibilityClass = getPlausibilityClass;
  getIndicatorSlot = getIndicatorSlot;
  getIndicatorLabel = getIndicatorLabel;
  isPreferDirection = isPreferDirection;
  isPreventDirection = isPreventDirection;
  isMostlyPrefer = isMostlyPrefer;
  isMostlyPrevent = isMostlyPrevent;
  isNeutralDirection = isNeutralDirection;
  formatDate = formatDate;

  fix_url(url: string | null | undefined): string {
    if (!url || typeof url !== 'string') {
      return '';
    }
    return url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
  }

  thumbnailUrl(url: string | null | undefined): string {
    if (!url || typeof url !== 'string') {
      return '';
    }
    return url.replace(/screenshot\.jpeg$/, 'screenshot.thumbnail.jpeg');
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
    const creds = this.getItemCredentials(item);
    if (!creds) {
      console.error('No workspace credentials available');
      return;
    }
    item.plausibility = parseInt(item.plausibility, 10);
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, {plausibility: item.plausibility}).subscribe(data => {
      console.log('item updated', data);
    });
  }  

  setFavorable(item: any) {
    const creds = this.getItemCredentials(item);
    if (!creds) {
      console.error('No workspace credentials available');
      return;
    }
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, {favorable_future: item.favorable_future}).subscribe(data => {
      console.log('item updated', data);
    });
  }

  setTagline(item: any) {
    const creds = this.getItemCredentials(item);
    if (!creds) return;

    const updateData: any = {
      future_scenario_tagline: item.future_scenario_tagline,
      future_scenario_description: item.future_scenario_tagline,
    };
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, updateData).subscribe({
      next: () => {
        this.editTagline.set(null);
        this.api.reanalyzeItem(creds.workspaceId, creds.apiKey, item._id, item.item_key || '').subscribe({
          next: () => console.log('Reanalysis triggered after tagline update'),
          error: (err) => console.error('Error triggering reanalysis after tagline update', err)
        });
      },
      error: (err) => console.error('Error updating tagline', err)
    });
  }

  setDescription(item: any) {
    const creds = this.getItemCredentials(item);
    if (!creds) return;

    const updateData: any = {
      content: item.content,
      future_scenario_description: item.future_scenario_description,
    };
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, updateData).subscribe({
      next: () => {
        this.editDescription.set(null);
        this.api.reanalyzeItem(creds.workspaceId, creds.apiKey, item._id, item.item_key || '').subscribe({
          next: () => console.log('Reanalysis triggered after description update'),
          error: (err) => console.error('Error triggering reanalysis after description update', err)
        });
      },
      error: (err) => console.error('Error updating description', err)
    });
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
    const creds = this.getItemCredentials(item);
    if (!creds) return;
    
    const updateData: any = {
      tags: item.tags, // Save tags array directly to database
      future_scenario_topics: item.future_scenario_topics, // Preserve existing topics
    };
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, updateData).subscribe(data => {
      console.log('tags updated, re-analysis triggered', data);
    });
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
    // Don't reset sidebar state - preserve it across navigation
    // Scroll to top when opening lightbox
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onThumbnailHover(item: any): void {
    if (!item?._workspaceId) {
      this.hoveredWorkspaceId.set(null);
      this.hoveredItemId.set(null);
      return;
    }
    this.hoveredWorkspaceId.set(item._workspaceId);
    this.hoveredItemId.set(item._id ?? null);
  }

  onThumbnailLeave(): void {
    this.hoveredWorkspaceId.set(null);
    this.hoveredItemId.set(null);
  }

  isSameWorkspaceHovered(item: any): boolean {
    const workspaceId = this.hoveredWorkspaceId();
    const hoveredItemId = this.hoveredItemId();
    return !!workspaceId && item?._workspaceId === workspaceId && item?._id !== hoveredItemId;
  }

  closeSidebar(): void {
    const currentItem = this.selectedItem();
    this.selectedItem.set(null);
  }

  closeWorkspaceDropdown(): void {
    this.workspaceDropdownOpen.set(false);
  }

  nextItem(): void {
    const currentItem = this.selectedItem();
    const index = this.selectedItemIndex();
    if (index < this.items().length - 1) {
      this.selectItem(this.items()[index + 1]);
    }
  }

  prevItem(): void {
    const currentItem = this.selectedItem();
    const index = this.selectedItemIndex();
    if (index > 0) {
      this.selectItem(this.items()[index - 1]);
    }
  }

  regenerateFromScratch(): void {
    const current = this.selectedItem();
    if (!current) return;

    const creds = this.getItemCredentials(current);
    if (!creds) return;

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

    this.allFetchedItems.update(items => items.map(item => item._id === current._id ? { ...item, ...clearedFields } : item));
    this.selectedItem.update(item => item ? { ...item, ...clearedFields } : item);

    this.api.reanalyzeItem(creds.workspaceId, creds.apiKey, current._id, current.item_key || '').subscribe({
      next: () => console.log('Reanalyze request sent successfully'),
      error: (err) => console.error('Error triggering reanalysis', err)
    });
  }

  regenerateMetaFields(): void {
    const current = this.selectedItem();
    if (!current) return;

    const creds = this.getItemCredentials(current);
    if (!creds) return;

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

    this.api.updateItem(creds.workspaceId, creds.apiKey, current._id, updateData).subscribe({
      next: () => {
        this.allFetchedItems.update(items => items.map(item => item._id === current._id ? { ...item, ...updateData } : item));
        this.selectedItem.update(item => item ? { ...item, ...updateData } : item);
      },
      error: (err) => console.error('Error regenerating meta fields', err)
    });
  }

  estimateEvaluation(): void {
    const current = this.selectedItem();
    if (!current) return;

    const creds = this.getItemCredentials(current);
    if (!creds) return;

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

    this.api.updateItem(creds.workspaceId, creds.apiKey, current._id, updateData).subscribe({
      next: () => {
        this.allFetchedItems.update(items => items.map(item => item._id === current._id ? { ...item, ...updateData } : item));
        this.selectedItem.update(item => item ? { ...item, ...updateData } : item);
      },
      error: (err) => console.error('Error estimating evaluation', err)
    });
  }

  toggleLightboxSidebar(): void {
    this.lightboxSidebarOpen.update(v => !v);
  }

  autoSaveScreenshotType(item: any): void {
    const creds = this.getItemCredentials(item);
    if (!creds) return;
    
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, { screenshot_type: item.screenshot_type }).subscribe(
        data => console.log('screenshot_type updated', data),
        error => console.error('Error updating screenshot_type', error)
      );
  }

  autoSaveContent(item: any): void {
    const creds = this.getItemCredentials(item);
    if (!creds) return;
    
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, { content: item.content }).subscribe(
        data => console.log('content updated', data),
        error => console.error('Error updating content', error)
      );
  }

  autoSaveTransitionBarEvent(item: any): void {
    const creds = this.getItemCredentials(item);
    if (!creds) return;
    
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, { transition_bar_event: item.transition_bar_event || null }).subscribe(
        data => console.log('transition_bar_event updated', data),
        error => console.error('Error updating transition_bar_event', error)
      );
  }

  autoSaveTransitionBarPosition(item: any): void {
    const creds = this.getItemCredentials(item);
    if (!creds) return;
    
    this.api.updateItem(creds.workspaceId, creds.apiKey, item._id, { transition_bar_position: item.transition_bar_position || null }).subscribe(
        data => console.log('transition_bar_position updated', data),
        error => console.error('Error updating transition_bar_position', error)
      );
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

  toggleItemSelectionAndEnableMode(itemId: string): void {
    const current = new Set(this.selectedIds());
    const isAdding = !current.has(itemId);
    
    if (isAdding) {
      current.add(itemId);
      // Enable multiSelectMode when first item is selected
      if (!this.multiSelectMode()) {
        this.multiSelectMode.set(true);
      }
    } else {
      current.delete(itemId);
      // Disable multiSelectMode if no items are selected
      if (current.size === 0) {
        this.multiSelectMode.set(false);
      }
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

  async removeCommonTag(tag: string): Promise<void> {
    const ids = Array.from(this.selectedIds());
    if (!ids.length) return;

    this.bulkSaving.set(true);
    this.bulkError.set(null);

    const allItems = this.allFetchedItems();
    const results = await Promise.all(ids.map(async id => {
      try {
        const item = allItems.find((entry: any) => entry._id === id);
        if (!item) {
          return { id, ok: false, error: 'Item not found' };
        }

        const creds = this.getItemCredentials(item);
        if (!creds) {
          return { id, ok: false, error: 'Missing credentials' };
        }

        // Remove the tag from the item's tags
        const currentTags = Array.isArray(item.tags) ? item.tags : [];
        const updatedTags = currentTags.filter((t: string) => t !== tag);
        
        await firstValueFrom(this.api.updateItem(creds.workspaceId, creds.apiKey, id, { tags: updatedTags }));
        return { id, ok: true, updatedTags };
      } catch (error: any) {
        return { id, ok: false, error };
      }
    }));

    const failed = results.filter(r => !r.ok);
    if (failed.length) {
      this.bulkError.set(`Failed to remove tag from ${failed.length} item(s).`);
    }

    // Update local state
    const applyUpdates = (arr: any[]) => arr.map(item => {
      if (ids.includes(item._id)) {
        const result = results.find(r => r.id === item._id);
        if (result && result.ok && 'updatedTags' in result) {
          return { ...item, tags: result.updatedTags };
        }
      }
      return item;
    });
    this.allFetchedItems.set(applyUpdates(this.allFetchedItems()));

    this.bulkSaving.set(false);
  }

  private resetBulkFields(): void {
    this.bulkStatus.set(null);
    this.bulkAuthor.set('');
    this.bulkPlausibility.set(null);
    this.bulkFavorable.set(null);
    this.bulkType.set(null);
    this.bulkAddTags.set('');
  }

  async applyBulkChanges(): Promise<void> {
    const ids = Array.from(this.selectedIds());
    if (!ids.length) {
      this.bulkError.set('Select at least one item.');
      return;
    }

    const commonUpdates: any = {};
    const statusValue = this.bulkStatus();
    const moderationValue = statusValue !== null ? this.statusToModeration(statusValue) : null;
    if (moderationValue !== null) {
      commonUpdates._private_moderation = moderationValue;
    }
    if (this.bulkAuthor()) {
      commonUpdates.author_id = this.bulkAuthor();
    }
    if (this.bulkPlausibility() !== null) {
      commonUpdates.plausibility = this.bulkPlausibility();
    }
    if (this.bulkFavorable()) {
      commonUpdates.favorable_future = this.bulkFavorable();
    }
    if (this.bulkType()) {
      commonUpdates.screenshot_type = this.bulkType();
    }

    // Parse tags to add (comma or space separated)
    const tagsToAdd = this.bulkAddTags() 
      ? this.bulkAddTags().split(/[,\s]+/).map(t => t.trim()).filter(t => t.length > 0)
      : [];

    if (Object.keys(commonUpdates).length === 0 && tagsToAdd.length === 0) {
      this.bulkError.set('Choose at least one field to update.');
      return;
    }

    this.bulkSaving.set(true);
    this.bulkError.set(null);

    const allItems = this.allFetchedItems();
    const results = await Promise.all(ids.map(async id => {
      try {
        const item = allItems.find((entry: any) => entry._id === id);
        if (!item) {
          return { id, ok: false, error: 'Item not found in current dataset' };
        }

        const creds = this.getItemCredentials(item);
        if (!creds) {
          return { id, ok: false, error: 'Missing credentials for item workspace' };
        }

        // Build updates for this specific item
        const itemUpdates = { ...commonUpdates };
        
        // Handle tags: add to existing tags
        if (tagsToAdd.length > 0) {
          const currentTags = Array.isArray(item.tags) ? item.tags : [];
          const newTags = [...currentTags];
          tagsToAdd.forEach(tag => {
            if (!newTags.includes(tag)) {
              newTags.push(tag);
            }
          });
          itemUpdates.tags = newTags;
        }

        await firstValueFrom(this.api.updateItem(creds.workspaceId, creds.apiKey, id, itemUpdates));
        return { id, ok: true, updates: itemUpdates };
      } catch (error: any) {
        return { id, ok: false, error };
      }
    }));

    const failed = results.filter(r => !r.ok);
    if (failed.length) {
      this.bulkError.set(`Failed to update ${failed.length} item(s).`);
    }

    // Apply updates to local state
    const applyUpdates = (arr: any[]) => arr.map(item => {
      if (ids.includes(item._id)) {
        const result = results.find(r => r.id === item._id);
        if (result && result.ok && 'updates' in result) {
          return { ...item, ...result.updates };
        }
      }
      return item;
    });
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
    topic: this.filterTopic(),
    search: this.searchText(),
    orderBy: this.orderBy(),
    view: this.viewMode()
  }));

  filterCounts = computed<FilterCounts>(() => ({
    status: this.statusCounts(),
    author: this.authorCounts(),
    preference: this.preferenceCounts(),
    potential: this.potentialCounts(),
    type: this.typeCounts(),
    topic: this.topicCounts()
  }));

  onFiltersChange(newState: FiltersBarState): void {
    this.filterStatus.set(newState.status);
    this.filterAuthor.set(newState.author);
    this.filterPreference.set(newState.preference);
    this.filterPotential.set(newState.potential);
    this.filterType.set(newState.type);
    this.filterTopic.set(newState.topic);
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
    const thumbUrl = this.thumbnailUrl(url);
    // Update source data - items will be recomputed automatically
    this.allFetchedItems.update(items => items.map(item => item._id === itemId ? { ...item, screenshot_url: url, screenshot_thumbnail_url: thumbUrl } : item));
    if (this.selectedItem() && this.selectedItem()._id === itemId) {
      this.selectedItem.update(item => item ? { ...item, screenshot_url: url, screenshot_thumbnail_url: thumbUrl } : item);
    }
    this.replacingImageItemId.set(null);
  }

  onItemDuplicated(data: { item_id: string }): void {
    console.log('🔄 Item duplicated, refreshing grid to show new item:', data.item_id);
    console.log('📊 Current items count before refresh:', this.allFetchedItems().length);
    
    // A new item was created, so refresh the entire grid
    this.replacingImageItemId.set(null);
    
    // Wait a moment for the backend to index the new item
    setTimeout(() => {
      console.log('⏰ Refreshing after 1 second delay...');
      // Force reload by temporarily changing page then back to 0
      const currentPage = this.page();
      if (currentPage === 0) {
        // If already on page 0, force reload by clearing items and calling loadMoreItems directly
        this.allFetchedItems.set([]);
        this.hasMoreItems.set(true);
        this.loadMoreItems();
      } else {
        // If on another page, just reset to page 0 which will trigger the effect
        this.allFetchedItems.set([]);
        this.hasMoreItems.set(true);
        this.page.set(0);
      }
    }, 1000);
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

  // Multi-workspace helper methods
  toggleWorkspaceDropdown(): void {
    this.workspaceDropdownOpen.update(v => !v);
  }

  getSelectedWorkspaceCount(): number {
    return this.filterWorkspaceIds().length;
  }

  isWorkspaceSelected(wsId: string): boolean {
    return this.filterWorkspaceIds().includes(wsId);
  }

  toggleWorkspaceFilter(wsId: string): void {
    const current = this.filterWorkspaceIds();
    if (current.includes(wsId)) {
      this.filterWorkspaceIds.set(current.filter(id => id !== wsId));
    } else {
      this.filterWorkspaceIds.set([...current, wsId]);
    }
  }

  selectAllWorkspaces(): void {
    this.filterWorkspaceIds.set(this.workspaces().map(ws => ws.id));
  }

  deselectAllWorkspaces(): void {
    this.filterWorkspaceIds.set([]);
  }

  breadcrumbLeaf(): string {
    return this.multiWorkspaceMode() ? 'all' : 'workspace';
  }

  loadMoreItems(): void {
    if (this.isLoadingMore || !this.hasMoreItems() || this.multiWorkspaceMode()) {
      return;
    }
    
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (!workspaceId || !apiKey) {
      return;
    }

    this.isLoadingMore = true;
    this.itemsLoading.set(true);
    
    const currentPage = this.page();
    this.api.getItems(workspaceId, apiKey, currentPage, '').pipe(
      catchError(error => {
        console.error('Failed to load more items:', error);
        return of({ 'index-required': null });
      })
    ).subscribe((data: any) => {
      this.isLoadingMore = false;
      this.itemsLoading.set(false);
      
      if (data['index-required']) {
        this.indexLink.set(data['index-required'] || null);
        this.hasMoreItems.set(false);
      } else {
        this.indexLink.set(null);
        const items = Array.isArray(data) ? data : [];
        const filtered = items.filter((item: any) => !!item?.screenshot_url);
        
        // Process items
        filtered.forEach((item: any) => {
          item.screenshot_url = this.fix_url(item.screenshot_url);
          item.screenshot_thumbnail_url = this.thumbnailUrl(item.screenshot_url);
          item.favorable_future = this.fix_favorable_future(item.favorable_future);
          const apiTags = item.tags || [];
          let futureScenarioTopics = [];
          if (item.future_scenario_topics) {
            if (typeof item.future_scenario_topics === 'object' && !Array.isArray(item.future_scenario_topics)) {
              futureScenarioTopics.push(...Object.values(item.future_scenario_topics).filter((t: any) => t));
            } else if (Array.isArray(item.future_scenario_topics)) {
              futureScenarioTopics = item.future_scenario_topics;
            }
          }
          const mergedTags = [...new Set([...apiTags, ...futureScenarioTopics])];
          item.tags = mergedTags;
          item.future_scenario_topics = futureScenarioTopics;
        });
        
        // Check if we got fewer items than expected (indicating end of data)
        if (filtered.length < this.api.ADMIN_PAGE_SIZE) {
          this.hasMoreItems.set(false);
        }
        
        // Store all fetched items
        const existing = this.allFetchedItems();
        console.log('📥 Fetched', filtered.length, 'items from API (page', currentPage, ')');
        console.log('📊 Existing items count:', existing.length);
        const newItems = filtered.filter((item: any) => !existing.find((i: any) => i._id === item._id));
        console.log('🆕 New items to add:', newItems.length);
        if (newItems.length > 0) {
          console.log('🆕 First few new item IDs:', newItems.slice(0, 5).map((i: any) => i._id));
          this.allFetchedItems.set([...existing, ...newItems]);
          console.log('📊 Total items after loading:', this.allFetchedItems().length);
          // Increment page for next load
          this.page.set(currentPage + 1);
        } else {
          // No new items, we've reached the end
          console.log('⚠️ No new items found, reached end of data');
          this.hasMoreItems.set(false);
        }
      }
    });
  }

  onGridScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    
    // Load more when scrolled to 80% of the way down
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      this.loadMoreItems();
    }
  }

  initImageLazyLoading(): void {
    if (!this.imageObserver && typeof IntersectionObserver !== 'undefined') {
      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          const itemId = img.getAttribute('data-item-id');
          const dataSrc = img.getAttribute('data-src');

          if (!itemId) return;

          if (entry.isIntersecting) {
            if (dataSrc && !img.src) {
              img.src = dataSrc;
            }
          } else if (img.src) {
            // Out of the buffered viewport — release the decoded image.
            img.removeAttribute('src');
            this.onImageUnloaded(itemId);
          }
        });
      }, {
        // Buffer beyond the viewport so quick scroll-back doesn't thrash load/unload.
        rootMargin: '400px'
      });
    }
  }

  onImageLoaded(itemId: string): void {
    this.imageLoadedMap.update(map => new Map(map).set(itemId, true));
  }

  onImageUnloaded(itemId: string): void {
    this.imageLoadedMap.update(map => {
      if (!map.has(itemId)) return map;
      const next = new Map(map);
      next.delete(itemId);
      return next;
    });
  }

  isImageLoaded(itemId: string): boolean {
    return this.imageLoadedMap().get(itemId) ?? false;
  }

  resolveTopic(topicId: string): string {
    return this.taxonomyService.resolveTopic(topicId);
  }

  ngOnInit(): void {
    this.taxonomyService.fetch();
    this.initImageLazyLoading();

    // Detect if we're in multi-workspace mode
    const snapshotData = this.route.snapshot.data;
    const isMultiWorkspace = snapshotData['multiWorkspace'] === true;
    
    if (isMultiWorkspace) {
      // Multi-workspace mode - wait for auth token, then load all workspaces
      this.multiWorkspaceMode.set(true);
      this.workspacesLoadingProgress.set('Authenticating…');
      this.authToken$.pipe(
        filter((token): token is string => !!token),
        take(1),
        timeout(5000),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
        next: () => this.loadAllWorkspaces(),
        error: () => {
          this.workspacesLoading.set(false);
          this.workspacesLoadingProgress.set('Authentication timed out. Please refresh.');
        }
      });
    }
    // else: single workspace mode - parameters are already read in constructor
  }

  ngOnDestroy(): void {
    this.imageObserver?.disconnect();
  }

  private loadAllWorkspaces(): void {
    this.workspacesLoading.set(true);
    this.adminApi.listWorkspaces().subscribe(workspaces => {
      const fetchableWorkspaces = workspaces.filter((ws: any) => !!ws?.id && !!ws?.keys?.admin);
      this.workspaces.set(fetchableWorkspaces);
      this.filterWorkspaceIds.set(fetchableWorkspaces.map((ws: any) => ws.id));

      // Build workspace lookup maps
      this.workspaceNameMap = new Map<string, string>();
      this.workspaceAdminKeyMap = new Map<string, string>();
      fetchableWorkspaces.forEach((ws: any) => {
        this.workspaceNameMap.set(ws.id, this.getWorkspaceNameWithEmojis(ws));
        this.workspaceAdminKeyMap.set(ws.id, ws.keys?.admin || '');
      });

      if (!fetchableWorkspaces.length) {
        this.workspacesLoading.set(false);
        this.workspacesLoadingProgress.set('No accessible workspaces with admin keys found.');
        return;
      }

      this.loadAllItemsPage(0);
    });
  }

  private workspaceNameMap = new Map<string, string>();
  private workspaceAdminKeyMap = new Map<string, string>();
  private readonly ALL_ITEMS_PAGE_SIZE = 1000;

  private loadAllItemsPage(page: number): void {
    this.workspacesLoadingProgress.set(`Loading items (page ${page + 1})…`);

    this.adminApi.getAllItems(page, this.ALL_ITEMS_PAGE_SIZE).subscribe(items => {
      if (!Array.isArray(items)) {
        this.workspacesLoading.set(false);
        this.workspacesLoadingProgress.set('');
        return;
      }

      const enriched = items
        .filter((item: any) => !!item?.screenshot_url)
        .map((item: any) => this.enrichAllItem(item));

      if (page === 0) {
        this.allFetchedItems.set(enriched);
        this.workspacesLoading.set(false);
      } else {
        this.allFetchedItems.update(existing => [...existing, ...enriched]);
      }

      if (items.length >= this.ALL_ITEMS_PAGE_SIZE) {
        this.loadAllItemsPage(page + 1);
      } else {
        this.workspacesLoading.set(false);
        this.workspacesLoadingProgress.set('');
      }
    });
  }

  private enrichAllItem(item: any): EnrichedItem {
    const workspaceId = item._workspace || '';
    item.screenshot_url = this.fix_url(item.screenshot_url);
    item.screenshot_thumbnail_url = this.thumbnailUrl(item.screenshot_url);
    item.favorable_future = this.fix_favorable_future(item.favorable_future);
    const apiTags = item.tags || [];
    let futureScenarioTopics: string[] = [];
    if (item.future_scenario_topics) {
      if (typeof item.future_scenario_topics === 'object' && !Array.isArray(item.future_scenario_topics)) {
        futureScenarioTopics.push(...Object.values(item.future_scenario_topics).filter((t: any) => t) as string[]);
      } else if (Array.isArray(item.future_scenario_topics)) {
        futureScenarioTopics = item.future_scenario_topics;
      }
    }
    const mergedTags = [...new Set([...apiTags, ...futureScenarioTopics])];
    item.tags = mergedTags;
    item.future_scenario_topics = futureScenarioTopics;

    return {
      ...item,
      _workspaceId: workspaceId,
      _workspaceName: this.workspaceNameMap.get(workspaceId) || workspaceId,
      _workspaceAdminKey: this.workspaceAdminKeyMap.get(workspaceId) || '',
    };
  }

  private get adminApi(): AdminApiService {
    return this.api;
  }

}
