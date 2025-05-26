import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
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

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.route.queryParams.subscribe(params => {
      this.workspaceId.set(params['workspace'] || null);
      this.apiKey.set(params['api_key'] || null);
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
            data.forEach((item: any) => {
              item.screenshot_url = this.fix_url(item.screenshot_url);
              item.favorable_future = this.fix_favorable_future(item.favorable_future);
            });
            this.items.set(data);
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
    });
  }

  updateModeration(itemId: string, level: number) {
    const workspaceId = this.workspaceId();
    const apiKey = this.apiKey();
    if (workspaceId && apiKey) {
      this.api.updateItem(workspaceId, apiKey, itemId, level).subscribe(data => {
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

  set _filter(idx: number) {
    this.filter.set(this.FILTERS[idx]);
  }
  
  get _filter(): number {
    return this.FILTERS.indexOf(this.filter());
  }

  fix_url(url: string) {
    url = url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
    return url;
  }

  fix_favorable_future(future: any) {
    if (future) {
      if (future === 'yes') {
        return 'preferred';
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
}
