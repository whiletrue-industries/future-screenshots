import { Component, effect, signal, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from '../../../admin-api.service';
import { FormsModule } from '@angular/forms';
import { FilterHelpers, FiltersBarComponent, FiltersBarState, FilterCounts } from '../../shared/filters-bar/filters-bar.component';

export type Filter = {
  name: string;
  filter: string;
};

@Component({
  selector: 'app-moderate',
  imports: [
    FormsModule,
    FiltersBarComponent
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
  filterStatus = signal<string[]>(['new', 'flagged', 'approved', 'highlighted']);
  filterAuthor = signal<string>('all');
  preferenceOptions = ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent'];
  potentialOptions = ['100', '75', '50', '25', '0'];

  filterPreference = signal<string[]>([...this.preferenceOptions]);
  filterPotential = signal<string[]>([...this.potentialOptions]);
  filterType = signal<string>('all');
  searchText = signal<string>('');
  orderBy = signal<string>('date');
  
  // Item counts for dropdown options
  statusCounts = signal<Map<string, number>>(new Map());
  authorCounts = signal<Map<string, number>>(new Map());
  preferenceCounts = signal<Map<string, number>>(new Map());
  potentialCounts = signal<Map<string, number>>(new Map());
  typeCounts = signal<Map<string, number>>(new Map());
  
  editTagline = signal<string | null>(null);
  editDescription = signal<string | null>(null);
  editTags = signal<string | null>(null);
  newTag = signal<string>('');
  showDescription = signal<Set<string>>(new Set());
  userItemCounts = signal<Map<string, number>>(new Map());
  allItemsForCounting = signal<any[]>([]); // Store all items for accurate counting
  allFetchedItems = signal<any[]>([]); // Store all fetched items for client-side filtering
  viewMode = signal<'list' | 'grid'>('grid');
  selectedItem = signal<any | null>(null);
  lightboxSidebarOpen = signal<boolean>(false);
  selectedItemIndex = signal<number>(-1);
   statusDropdownOpen = signal<boolean>(false);
  preferenceDropdownOpen = signal<boolean>(false);
  potentialDropdownOpen = signal<boolean>(false);

  items = signal<any[]>([]);
  indexLink = signal<string | null>(null);

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      if (!target.closest('.custom-multiselect')) {
        this.statusDropdownOpen.set(false);
      }
    }

  LEVELS = [
    'banned',
    'flagged',
    'pending',
    'not-flagged',
    'approved',
    'highlighted',
  ];

  constructor(private route: ActivatedRoute, private api: AdminApiService) {
    // Read filters from hash synchronously first (before effects run)
    if (typeof window !== 'undefined' && window.location.hash) {
      const fragment = window.location.hash.substring(1);
      if (fragment) {
        const params = new URLSearchParams(fragment);
        const statusParam = params.get('status');
        if (statusParam) {
          this.filterStatus.set(statusParam.split(','));
        }
        const authorParam = params.get('author');
        if (authorParam) {
          this.filterAuthor.set(authorParam);
        }
        const preferenceParam = params.get('preference');
        if (preferenceParam) {
          this.filterPreference.set(preferenceParam.split(','));
        }
        const potentialParam = params.get('potential');
        if (potentialParam) {
          this.filterPotential.set(potentialParam.split(','));
        }
        const typeParam = params.get('type');
        if (typeParam) {
          this.filterType.set(typeParam);
        }
        const searchParam = params.get('search');
        if (searchParam) {
          this.searchText.set(searchParam);
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
        this.filterStatus.set(statusParam ? statusParam.split(',') : ['new', 'flagged', 'approved', 'highlighted']);
        this.filterAuthor.set(params.get('author') || 'all');
        const preferenceParam = params.get('preference');
        this.filterPreference.set(preferenceParam ? preferenceParam.split(',') : [...this.preferenceOptions]);
        const potentialParam = params.get('potential');
        this.filterPotential.set(potentialParam ? potentialParam.split(',') : [...this.potentialOptions]);
        this.filterType.set(params.get('type') || 'all');
        this.searchText.set(params.get('search') || '');
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
      console.log('page', page, 'workspaceId', workspaceId, 'apiKey', apiKey);
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
            
            // Apply client-side filtering and sorting
            this.applyFiltersAndSort();
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
      // Watch all filter changes and apply client-side
      this.filterStatus();
      this.filterAuthor();
      this.filterPreference();
      this.filterPotential();
      this.filterType();
      this.searchText();
      this.orderBy();
      this.viewMode();
      
      this.updateHashParams();
      this.applyFiltersAndSort();
    });
  }

  updateModeration(itemId: string, level: number) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      this.api.updateItemModeration(workspaceId, apiKey, itemId, level).subscribe(data => {
        console.log('item rejected', data);
        this.items.set(this.items().filter(item => item._id !== itemId));
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

  applyFiltersAndSort(): void {
    let filtered = [...this.allFetchedItems()];
    
    // Status filter using FilterHelpers
    if (this.filterStatus().length > 0) {
      filtered = filtered.filter(item => FilterHelpers.matchesStatusFilter(item, this.filterStatus()));
    }
    
    // Author filter
    if (this.filterAuthor() !== 'all') {
      if (this.filterAuthor() === 'unattributed') {
        filtered = filtered.filter(item => !item.author_id || item.author_id === 'unknown');
      } else {
        filtered = filtered.filter(item => item.author_id === this.filterAuthor());
      }
    }
    
    // Preference filter
    if (this.filterPreference().length > 0 && this.filterPreference().length < this.preferenceOptions.length) {
      filtered = filtered.filter(item => this.filterPreference().includes(item.favorable_future));
    }
    
    // Potential filter
    if (this.filterPotential().length > 0 && this.filterPotential().length < this.potentialOptions.length) {
      filtered = filtered.filter(item => this.filterPotential().includes(String(item.plausibility)));
    }
    
    // Type filter
    if (this.filterType() !== 'all') {
      filtered = filtered.filter(item => item.screenshot_type === this.filterType());
    }
    
    // Language filter
    // Search filter
    if (this.searchText()) {
      const searchLower = this.searchText().toLowerCase();
      filtered = filtered.filter(item => {
        const tagline = (item.future_scenario_tagline || '').toLowerCase();
        const description = (item.future_scenario_description || '').toLowerCase();
        const content = (item.content || '').toLowerCase();
        return tagline.includes(searchLower) || description.includes(searchLower) || content.includes(searchLower);
      });
    }
    
    // Calculate counts from ALL fetched items (not filtered)
    this.calculateFilterCounts(this.allFetchedItems());
    
    // Update user item counts from all fetched items
    const allItems = this.allFetchedItems();
    const userCounts = new Map<string, number>();
    allItems.forEach((item: any) => {
      const authorId = item.author_id || 'unknown';
      userCounts.set(authorId, (userCounts.get(authorId) || 0) + 1);
    });
    this.userItemCounts.set(userCounts);
    
    // Sort and set items
    const sorted = this.sortItems(filtered);
    this.items.set(sorted);
  }
  
  buildFilterQuery(): string {
    const filters: string[] = [];
    
    // Status filter
    if (this.filterStatus().length > 0) {
      const statusMap: any = {
        'new': '2',
        'flagged': '1',
        'approved': '4',
        'rejected': '0',
        'highlighted': '5'
      };
      const values = this.filterStatus().map(status => statusMap[status]).filter(v => v !== undefined);
      if (values.length > 0) {
        if (values.length === 1) {
          filters.push(`metadata._private_moderation == ${values[0]}`);
        } else {
          const conditions = values.map(v => `metadata._private_moderation == ${v}`).join(' OR ');
          filters.push(`(${conditions})`);
        }
      }
    }
    
    // Author filter
    if (this.filterAuthor() !== 'all') {
      if (this.filterAuthor() === 'unattributed') {
        filters.push('NOT metadata.author_id');
      } else {
        filters.push(`metadata.author_id == "${this.filterAuthor()}"`);
      }
    }
    
    // Preference filter
    if (this.filterPreference().length > 0 && this.filterPreference().length < this.preferenceOptions.length) {
      filters.push(`metadata.favorable_future IN [${this.filterPreference().map(p => `"${p}"`).join(', ')}]`);
    }
    
    // Potential filter
    if (this.filterPotential().length > 0 && this.filterPotential().length < this.potentialOptions.length) {
      filters.push(`metadata.plausibility IN [${this.filterPotential().map(p => parseInt(p)).join(', ')}]`);
    }
    
    // Type filter
    if (this.filterType() !== 'all') {
      filters.push(`metadata.screenshot_type == "${this.filterType()}"`);
    }
    
    // Search filter (searches all text fields)
    if (this.searchText()) {
      const searchTerm = this.searchText();
      filters.push(`(metadata.future_scenario_tagline CONTAINS "${searchTerm}" OR metadata.future_scenario_description CONTAINS "${searchTerm}" OR metadata.content CONTAINS "${searchTerm}")`);
    }
    
    return filters.length > 0 ? filters.join(' AND ') : '';
  }
  
  updateHashParams(): void {
    const params = new URLSearchParams();
    if (this.filterStatus().length > 0) params.set('status', this.filterStatus().join(','));
    if (this.filterAuthor() !== 'all') params.set('author', this.filterAuthor());
    if (this.filterPreference().length > 0 && this.filterPreference().length < this.preferenceOptions.length) params.set('preference', this.filterPreference().join(','));
    if (this.filterPotential().length > 0 && this.filterPotential().length < this.potentialOptions.length) params.set('potential', this.filterPotential().join(','));
    if (this.filterType() !== 'all') params.set('type', this.filterType());
    if (this.searchText()) params.set('search', this.searchText());
    if (this.orderBy() !== 'date') params.set('order', this.orderBy());
    params.set('view', this.viewMode());
    
    const fragment = params.toString();
    if (typeof window !== 'undefined') {
      window.location.hash = fragment;
    }
  }
  
  toggleStatusDropdown(): void {
    const next = !this.statusDropdownOpen();
    this.statusDropdownOpen.set(next);
    if (next) {
      this.preferenceDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
    }
  }

    toggleStatusFilter(status: string): void {
      const current = this.filterStatus();
      if (current.includes(status)) {
        this.filterStatus.set(current.filter(s => s !== status));
      } else {
        this.filterStatus.set([...current, status]);
      }
      this.updateHashParams();
      this.applyFiltersAndSort();
    }

    isStatusSelected(status: string): boolean {
      return this.filterStatus().includes(status);
    }

    getSelectedStatusCount(): number {
      return this.filterStatus().length;
    }

    togglePreferenceDropdown(): void {
      const next = !this.preferenceDropdownOpen();
      this.preferenceDropdownOpen.set(next);
      if (next) {
        this.statusDropdownOpen.set(false);
        this.potentialDropdownOpen.set(false);
      }
    }

    togglePreferenceFilter(value: string): void {
      const current = this.filterPreference();
      if (current.includes(value)) {
        this.filterPreference.set(current.filter(v => v !== value));
      } else {
        this.filterPreference.set([...current, value]);
      }
      this.updateHashParams();
      this.applyFiltersAndSort();
    }

    isPreferenceSelected(value: string): boolean {
      return this.filterPreference().includes(value);
    }

    getSelectedPreferenceCount(): number {
      return this.filterPreference().length;
    }

    togglePotentialDropdown(): void {
      const next = !this.potentialDropdownOpen();
      this.potentialDropdownOpen.set(next);
      if (next) {
        this.statusDropdownOpen.set(false);
        this.preferenceDropdownOpen.set(false);
      }
    }

    togglePotentialFilter(value: string): void {
      const current = this.filterPotential();
      if (current.includes(value)) {
        this.filterPotential.set(current.filter(v => v !== value));
      } else {
        this.filterPotential.set([...current, value]);
      }
      this.updateHashParams();
      this.applyFiltersAndSort();
    }

    isPotentialSelected(value: string): boolean {
      return this.filterPotential().includes(value);
    }

    getSelectedPotentialCount(): number {
      return this.filterPotential().length;
    }

  clearAllFilters(): void {
    this.filterStatus.set(['new', 'flagged', 'approved', 'highlighted']);
    this.filterAuthor.set('all');
    this.filterPreference.set([...this.preferenceOptions]);
    this.filterPotential.set([...this.potentialOptions]);
    this.filterType.set('all');
    this.searchText.set('');
    this.page.set(0);
    this.allFetchedItems.set([]);
  }
  
  calculateFilterCounts(data: any[]): void {
    const status = new Map<string, number>();
    const author = new Map<string, number>();
    const preference = new Map<string, number>();
    const potential = new Map<string, number>();
    const type = new Map<string, number>();
    
    data.forEach((item: any) => {
      // Status counts using FilterHelpers
      const statusKey = FilterHelpers.getStatusKey(item);
      status.set(statusKey, (status.get(statusKey) || 0) + 1);
      
      // Author counts
      const authorId = item.author_id || 'unknown';
      author.set(authorId, (author.get(authorId) || 0) + 1);
      
      // Preference counts
      if (item.favorable_future) {
        preference.set(item.favorable_future, (preference.get(item.favorable_future) || 0) + 1);
      }
      
      // Potential counts
      if (item.plausibility !== null && item.plausibility !== undefined) {
        const key = String(item.plausibility);
        potential.set(key, (potential.get(key) || 0) + 1);
      }
      
      // Type counts
      if (item.screenshot_type) {
        type.set(item.screenshot_type, (type.get(item.screenshot_type) || 0) + 1);
      }
      
      // Language counts
    });
    
    this.statusCounts.set(status);
    this.authorCounts.set(author);
    this.preferenceCounts.set(preference);
    this.potentialCounts.set(potential);
    this.typeCounts.set(type);
  }
  
  sortItems(items: any[]): any[] {
    const orderBy = this.orderBy();
    const sorted = [...items];
    
    switch (orderBy) {
      case 'date':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA; // Newest first
        });
      
      case 'status':
        return sorted.sort((a, b) => {
          return (b._private_moderation || 0) - (a._private_moderation || 0);
        });
      
      case 'author':
        return sorted.sort((a, b) => {
          const authorA = a.author_id || 'unknown';
          const authorB = b.author_id || 'unknown';
          
          // Keep unknown at the end
          if (authorA === 'unknown' && authorB !== 'unknown') return 1;
          if (authorA !== 'unknown' && authorB === 'unknown') return -1;
          
          // Sort by item count (descending)
          const countA = this.getUserItemCount(authorA);
          const countB = this.getUserItemCount(authorB);
          return countB - countA;
        });
      
      case 'confidence':
        return sorted.sort((a, b) => {
          return this.getAIConfidence(b) - this.getAIConfidence(a);
        });
      
      case 'type':
        return sorted.sort((a, b) => {
          const typeA = a.screenshot_type || '';
          const typeB = b.screenshot_type || '';
          return typeA.localeCompare(typeB);
        });
      
      case 'preference':
        return sorted.sort((a, b) => {
          const prefOrder = ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent'];
          const prefA = a.favorable_future || 'uncertain';
          const prefB = b.favorable_future || 'uncertain';
          return prefOrder.indexOf(prefA) - prefOrder.indexOf(prefB);
        });
      
      default:
        return sorted;
    }
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
      this.api.updateItem(workspaceId, apiKey, item._id, {plausibility: item.plausibility}).subscribe(data => {
        console.log('item updated', data);
      });
    } else {
      console.error('workspaceId or apiKey is null');
    }
  }  

  setFavorable(item: any) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      this.api.updateItem(workspaceId, apiKey, item._id, {favorable_future: item.favorable_future}).subscribe(data => {
        console.log('item updated', data);
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
    this.selectedItem.set(item);
    // Find and set the index of the selected item
    const index = this.items().findIndex(i => i._id === item._id);
    this.selectedItemIndex.set(index);
    this.lightboxSidebarOpen.set(false);
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

  // Methods for filters-bar component integration
  getFilterState(): FiltersBarState {
    return {
      status: this.filterStatus(),
      author: this.filterAuthor(),
      preference: this.filterPreference(),
      potential: this.filterPotential(),
      type: this.filterType(),
      search: this.searchText(),
      orderBy: this.orderBy(),
      view: this.viewMode()
    };
  }

  getFilterCounts(): FilterCounts {
    return {
      status: this.statusCounts(),
      author: this.authorCounts(),
      preference: this.preferenceCounts(),
      potential: this.potentialCounts(),
      type: this.typeCounts()
    };
  }

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
    
    // No need to call applyFiltersAndSort() here - the effect at lines 210-223 will handle it
    // when the filter signals change
  }
}
