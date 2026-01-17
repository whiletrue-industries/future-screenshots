import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { AdminApiService } from '../../../admin-api.service';
import { WorkspaceItemComponent } from "../workspace-item/workspace-item.component";
import { delay, filter, take } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

type WorkspaceStatus = 'all' | 'upcoming' | 'active' | 'in-review' | 'done';
type OrderBy = 'date' | 'screenshots' | 'completion';

@Component({
  selector: 'app-admin',
  imports: [
    WorkspaceItemComponent,
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

  // UI state
  statusFilter = signal<WorkspaceStatus>('all');
  languageFilter = signal<string>('all');
  facilitatorFilter = signal<string>('all');
  searchQuery = signal<string>('');
  orderBy = signal<OrderBy>('date');

  // All available facilitators and keywords from workspaces
  allFacilitators = computed(() => {
    const facilitators = new Set<string>();
    this.workspaces().forEach(w => {
      (w?.metadata?.facilitator_names || []).forEach((f: string) => facilitators.add(f));
    });
    return Array.from(facilitators).sort();
  });

  allKeywords = computed(() => {
    const keywords = new Set<string>();
    this.workspaces().forEach(w => {
      (w?.metadata?.keywords || []).forEach((k: string) => keywords.add(k));
    });
    return Array.from(keywords).sort();
  });

  // Helper to get workspace status
  getWorkspaceStatus(w: any): WorkspaceStatus {
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
    const q = this.searchQuery().trim().toLowerCase();
    const lang = this.languageFilter();
    const status = this.statusFilter();
    const facilitator = this.facilitatorFilter();
    const order = this.orderBy();

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
}
