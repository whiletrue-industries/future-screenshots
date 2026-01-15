import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { AdminApiService } from '../../../admin-api.service';
import { WorkspaceItemComponent } from "../workspace-item/workspace-item.component";
import { FiltersBarComponent, FiltersBarState, FilterCounts } from "../../shared/filters-bar/filters-bar.component";
import { delay, filter, take } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [
    WorkspaceItemComponent,
    FiltersBarComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  workspaces = signal<any[]>([]);
  successMessage = signal<string | null>(null);

  // Filter state - now delegated to filters-bar, but we maintain local state for filtering logic
  filterState = signal<FiltersBarState>({
    status: ['all'],
    language: 'all',
    facilitator: 'all',
    search: '',
    orderBy: 'date'
  });

  // Filter counts for the filters-bar component
  filterCounts = computed<FilterCounts>(() => ({
    status: new Map(),
    author: new Map(),
    language: new Map(),
    facilitator: new Map(),
    preference: new Map(),
    potential: new Map(),
    type: new Map()
  }));

  // Helper to get workspace status
  getWorkspaceStatus(w: any): string {
    const date = w?.metadata?.date;
    if (!date) return 'upcoming';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const workspaceDate = new Date(date);
    workspaceDate.setHours(0, 0, 0, 0);
    
    const itemCount = w?.item_count ?? 0;
    const reviewedCount = w?.reviewed_count ?? 0;
    
    if (workspaceDate > today) {
      return 'upcoming';
    } else if (workspaceDate.getTime() === today.getTime() && itemCount > 1) {
      return 'active';
    } else if (itemCount > 0 && reviewedCount < itemCount) {
      return 'in-review';
    } else if (itemCount > 0 && reviewedCount === itemCount) {
      return 'done';
    }
    return 'upcoming';
  }

  // Derived state with filtering + sorting
  filteredWorkspaces = computed(() => {
    const state = this.filterState();
    const q = state.search?.trim().toLowerCase() ?? '';
    const lang = state.language ?? 'all';
    const status = state.status?.[0] ?? 'all';
    const facilitator = state.facilitator ?? 'all';
    const order = state.orderBy ?? 'date';

    const list = [...this.workspaces()]
      .filter(w => {
        // Status filter
        if (status !== 'all') {
          const wStatus = this.getWorkspaceStatus(w);
          if (wStatus !== status) return false;
        }

        // Language filter
        if (lang !== 'all') {
          const languages: string[] = w?.metadata?.languages ?? [];
          if (!languages.map(l => l.toLowerCase()).includes(lang.toLowerCase())) {
            return false;
          }
        }

        // Facilitator filter
        if (facilitator !== 'all') {
          const wFacilitators: string[] = w?.metadata?.facilitator_names ?? [];
          if (!wFacilitators.includes(facilitator)) {
            return false;
          }
        }

        // Search across all relevant fields
        if (q.length > 0) {
          const hay = [
            w?.metadata?.event_name,
            w?.metadata?.venue,
            w?.metadata?.city,
            w?.metadata?.country,
            (w?.metadata?.facilitator_names || []).join(' '),
            (w?.metadata?.keywords || []).join(' '),
            w?.metadata?.source,
            w?.id
          ].filter(Boolean).join(' ').toLowerCase();
          return hay.includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (order === 'screenshots') {
          return (b?.item_count ?? 0) - (a?.item_count ?? 0);
        } else if (order === 'completion') {
          const aCompletion = (a?.item_count ?? 0) > 0 ? (a?.reviewed_count ?? 0) / a.item_count : 0;
          const bCompletion = (b?.item_count ?? 0) > 0 ? (b?.reviewed_count ?? 0) / b.item_count : 0;
          return bCompletion - aCompletion;
        }
        // Default: date
        const ad = a?.metadata?.date ?? '';
        const bd = b?.metadata?.date ?? '';
        return bd.localeCompare(ad); // latest first
      });
    return list;
  });

  constructor(private adminApi: AdminApiService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Check for success message from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['message']) {
      this.successMessage.set(navigation.extras.state['message']);
      // Clear message after 5 seconds
      setTimeout(() => this.successMessage.set(null), 5000);
    }

    this.auth.user.pipe(filter(user => !!user), take(1), delay(0)).subscribe(() => {
      console.log('AUTH TOKEN:', this.auth.token());
      this.adminApi.listWorkspaces().subscribe(workspaces => {
        console.log('Workspaces:', workspaces);
        const sorted = [...workspaces].sort((a, b) => {
          const ad = a?.metadata?.date ?? '';
          const bd = b?.metadata?.date ?? '';
          // Reverse chronological: latest first
          return bd.localeCompare(ad);
        });
        this.workspaces.set(sorted);
      });
    });
  }

  onFiltersChange(state: FiltersBarState): void {
    this.filterState.set(state);
  }

  onFiltersCommit(state: FiltersBarState): void {
    this.filterState.set(state);
  }
}
