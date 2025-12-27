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
  filter = signal<Filter>(this.FILTERS[this.FILTERS.length - 1]);
  editTagline = signal<string | null>(null);
  userItemCounts = signal<Map<string, number>>(new Map());
  allItemsForCounting = signal<any[]>([]); // Store all items for accurate counting

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
    effect(() => {
      const workspaceId = this.workspaceId();
      const apiKey = this.apiKey();
      const currentFilter = this.filter();
      const page = this.page();
      console.log('page', page, 'filter', currentFilter.filter, 'workspaceId', workspaceId, 'apiKey', apiKey);
      if (workspaceId && apiKey) {
        this.api.getItems(workspaceId, apiKey, page, currentFilter.filter).subscribe((data: any) => {
          if (data['index-required']) {
            this.indexLink.set(data['index-required'] || null);
            this.items.set([]);
          } else {
            this.indexLink.set(null);
            data = data.filter((item: any) => !!item?.screenshot_url);
            data.forEach((item: any) => {
              item.screenshot_url = this.fix_url(item.screenshot_url);
              item.favorable_future = this.fix_favorable_future(item.favorable_future);
              // Parse tags if they're a string
              if (typeof item.tags === 'string') {
                item.tags = item.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t);
              } else if (!Array.isArray(item.tags)) {
                item.tags = [];
              }
              // Also check for keywords field as alternative
              if ((!item.tags || item.tags.length === 0) && item.keywords) {
                if (typeof item.keywords === 'string') {
                  item.tags = item.keywords.split(',').map((t: string) => t.trim()).filter((t: string) => t);
                } else if (Array.isArray(item.keywords)) {
                  item.tags = item.keywords;
                }
              }
            });
            this.items.set(data);
            
            // Add current page items to the all items collection for counting
            const allItems = [...this.allItemsForCounting()];
            data.forEach((item: any) => {
              const email = item.email || item.user_email || 'unknown@user.com';
              // Only add if not already in the collection (based on _id)
              if (!allItems.find(i => i._id === item._id)) {
                allItems.push({ _id: item._id, email });
              }
            });
            this.allItemsForCounting.set(allItems);
            
            // Calculate user item counts from all collected items
            const counts = new Map<string, number>();
            allItems.forEach((item: any) => {
              const email = item.email || 'unknown@user.com';
              counts.set(email, (counts.get(email) || 0) + 1);
            });
            this.userItemCounts.set(counts);
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
      const currentFilter = this.filter();
      this.page.set(0);
      // Reset counting when filter changes
      this.allItemsForCounting.set([]);
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

  set _filter(idx: number) {
    this.filter.set(this.FILTERS[idx]);
  }
  
  get _filter(): number {
    return this.FILTERS.indexOf(this.filter());
  }

  getFilterIcon(index: number): string {
    const icons = ['🚫', '⚠️', '⏳', '📋', '✓', '★', '📊'];
    return icons[index] || '•';
  }

  filterByUser(email: string) {
    // TODO: Implement user filtering
    console.log('Filter by user:', email);
  }

  getUserItemCount(email: string): number {
    return this.userItemCounts().get(email) || 0;
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
      this.api.updateItem(workspaceId, apiKey, item._id, {
        future_scenario_tagline: item.future_scenario_tagline,
        future_scenario_description: item.future_scenario_tagline, 
        embedding: null
      }).subscribe(data => {
        console.log('item updated', data);
        this.editTagline.set(null);
      });
    }
  }
}
