import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from '../../../admin-api.service';
import { FormsModule } from '@angular/forms';

export type Filter = {
  name: string;
  filter: string;
};

@Component({
  selector: 'app-moderate',
  imports: [
    FormsModule
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
  filterStatus = signal<string>('all');
  filterAuthor = signal<string>('all');
  filterPreference = signal<string>('all');
  filterPotential = signal<string>('all');
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
  viewMode = signal<'list' | 'grid'>('list');
  selectedItem = signal<any | null>(null);

  items = signal<any[]>([]);
  indexLink = signal<string | null>(null);

  LEVELS = [
    'banned',
    'flagged',
    'pending',
    'not-flagged',
    'approved',
    'highlighted',
  ];

  constructor(private route: ActivatedRoute, private api: AdminApiService) {
    this.route.queryParams.subscribe(params => {
      this.apiKey.set(params['api_key'] || null);
      this.workspaceId.set(params['workspace'] || this.workspaceId());
    });
    
    // Read filters from hash parameters
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const params = new URLSearchParams(fragment);
        this.filterStatus.set(params.get('status') || 'all');
        this.filterAuthor.set(params.get('author') || 'all');
        this.filterPreference.set(params.get('preference') || 'all');
        this.filterPotential.set(params.get('potential') || 'all');
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
    
    // Status filter
    if (this.filterStatus() !== 'all') {
      const statusMap: any = {
        'new': 2,
        'flagged': 1,
        'approved': 4,
        'rejected': 0,
        'highlighted': 5
      };
      const value = statusMap[this.filterStatus()];
      if (value !== undefined) {
        filtered = filtered.filter(item => item._private_moderation === value);
      }
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
    if (this.filterPreference() !== 'all') {
      filtered = filtered.filter(item => item.favorable_future === this.filterPreference());
    }
    
    // Potential filter
    if (this.filterPotential() !== 'all') {
      const potentialValue = parseInt(this.filterPotential(), 10);
      filtered = filtered.filter(item => item.plausibility === potentialValue);
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
    if (this.filterStatus() !== 'all') {
      const statusMap: any = {
        'new': '2',
        'flagged': '1',
        'approved': '4',
        'rejected': '0',
        'highlighted': '5'
      };
      const value = statusMap[this.filterStatus()];
      if (value) filters.push(`metadata._private_moderation == ${value}`);
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
    if (this.filterPreference() !== 'all') {
      filters.push(`metadata.favorable_future == "${this.filterPreference()}"`);
    }
    
    // Potential filter
    if (this.filterPotential() !== 'all') {
      filters.push(`metadata.plausibility == ${this.filterPotential()}`);
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
    if (this.filterStatus() !== 'all') params.set('status', this.filterStatus());
    if (this.filterAuthor() !== 'all') params.set('author', this.filterAuthor());
    if (this.filterPreference() !== 'all') params.set('preference', this.filterPreference());
    if (this.filterPotential() !== 'all') params.set('potential', this.filterPotential());
    if (this.filterType() !== 'all') params.set('type', this.filterType());
    if (this.searchText()) params.set('search', this.searchText());
    if (this.orderBy() !== 'date') params.set('order', this.orderBy());
    params.set('view', this.viewMode());
    
    const fragment = params.toString();
    window.location.hash = fragment;
  }
  
  clearAllFilters(): void {
    this.filterStatus.set('all');
    this.filterAuthor.set('all');
    this.filterPreference.set('all');
    this.filterPotential.set('all');
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
      // Status counts
      const statusKey = this.LEVELS[item._private_moderation] || 'pending';
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
  }

  closeSidebar(): void {
    this.selectedItem.set(null);
  }
}
