import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminApiService } from '../../../admin-api.service';
import { AuthService } from '../../auth.service';
import { FilterHelpers } from '../../shared/filters-bar/filters-bar.component';

interface EnrichedItem {
  _workspaceId: string;
  _workspaceName: string;
  _workspaceAdminKey: string;
  [key: string]: any;
}

@Component({
  selector: 'app-moderate-all',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './moderate-all.component.html',
  styleUrl: './moderate-all.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModerateAllComponent implements OnInit {

  private adminApi = inject(AdminApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  workspaces = signal<any[]>([]);
  allItems = signal<EnrichedItem[]>([]);
  loading = signal<boolean>(true);
  loadingProgress = signal<string>('');

  // Filters
  filterWorkspace = signal<string>('all');
  filterStatus = signal<string>('all');
  filterType = signal<string>('all');
  searchText = signal<string>('');
  orderBy = signal<string>('date');

  readonly LEVELS = ['rejected', 'flagged', 'pending', 'not-flagged', 'approved', 'highlighted'];

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

  availableTypes = computed(() => {
    const types = new Set<string>();
    this.allItems().forEach(item => {
      if (item['screenshot_type']) types.add(item['screenshot_type']);
    });
    return Array.from(types).sort();
  });

  filteredItems = computed(() => {
    let items = this.allItems();

    const ws = this.filterWorkspace();
    if (ws !== 'all') {
      items = items.filter(item => item._workspaceId === ws);
    }

    const status = this.filterStatus();
    if (status !== 'all') {
      items = items.filter(item => FilterHelpers.getStatusKey(item) === status);
    }

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

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
  }

  ngOnInit(): void {
    this.auth.user.pipe(take(1)).subscribe(user => {
      if (!user) {
        this.router.navigate(['/admin/login']);
        return;
      }
      this.adminApi.listWorkspaces().subscribe(workspaces => {
        this.workspaces.set(workspaces);
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
            const name = ws?.metadata?.source || ws?.metadata?.event_name || ws?.id || 'Unknown';
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
    });
  }
}
