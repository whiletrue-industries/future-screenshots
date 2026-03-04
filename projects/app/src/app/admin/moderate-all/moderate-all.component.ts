import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, effect, HostListener } from '@angular/core';
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

  // Filters - now using arrays for multi-select
  filterWorkspaceIds = signal<string[]>([]);
  filterStatus = signal<string[]>(['pending', 'flagged', 'not-flagged', 'approved', 'highlighted']);
  filterType = signal<string>('all');
  searchText = signal<string>('');
  orderBy = signal<string>('date');
  
  // UI state for multi-select dropdowns
  workspaceDropdownOpen = signal<boolean>(false);
  statusDropdownOpen = signal<boolean>(false);

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

  // Status options in order
  readonly ALL_STATUSES = ['highlighted', 'approved', 'not-flagged', 'pending', 'flagged', 'rejected'];

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
    const names = new Map<string, string>();
    this.workspaces().forEach(ws => {
      names.set(ws.id, ws.metadata?.source || ws.metadata?.event_name || ws.id);
    });
    return names;
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

  ngOnInit(): void {
    this.auth.user.pipe(take(1)).subscribe(user => {
      if (!user) {
        this.router.navigate(['/admin/login']);
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
