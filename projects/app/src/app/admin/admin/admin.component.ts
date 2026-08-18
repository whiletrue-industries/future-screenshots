import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { AdminApiService } from '../../../admin-api.service';
import { WorkspaceItemComponent } from "../workspace-item/workspace-item.component";
import { delay, filter, from, map, concatMap, take, toArray } from 'rxjs';
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
  private readonly nowWorkspaceStorageKey = 'fs_now_workspace_target';

  workspaces = signal<any[]>([]);
  successMessage = signal<string | null>(null);

  // UI state
  statusFilter = signal<WorkspaceStatus>('all');
  languageFilter = signal<string>('all');
  facilitatorFilter = signal<string>('all');
  searchQuery = signal<string>('');
  orderBy = signal<OrderBy>('date');
  nowBadgeBusy = signal(false);

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

  nowWorkspaceId = computed(() => {
    const metadataWorkspace = this.workspaces().find(w => w?.metadata?.open_now === true || w?.open_now === true);
    if (metadataWorkspace?.id) {
      return metadataWorkspace.id;
    }

    const storedWorkspaceId = this.getStoredNowWorkspaceId();
    if (!storedWorkspaceId) {
      return null;
    }

    const storedWorkspace = this.workspaces().find(w => w?.id === storedWorkspaceId);
    return storedWorkspace?.id || null;
  });

  nowWorkspaceEndTime = computed(() => {
    const activeWorkspaceId = this.nowWorkspaceId();
    if (!activeWorkspaceId) {
      return null;
    }

    const activeWorkspace = this.workspaces().find(w => w?.id === activeWorkspaceId);
    return typeof activeWorkspace?.metadata?.now_end_time === 'string' && activeWorkspace.metadata.now_end_time.length > 0
      ? activeWorkspace.metadata.now_end_time
      : null;
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
      this.loadWorkspaces();
    });
  }

  setNowWorkspace = (targetWorkspaceId: string): void => {
    if (this.nowBadgeBusy()) {
      return;
    }

    const currentNowWorkspaceId = this.nowWorkspaceId();
    if (currentNowWorkspaceId === targetWorkspaceId) {
      this.disableNowWorkspace();
      return;
    }

    if (!this.auth.token()) {
      return;
    }

    this.nowBadgeBusy.set(true);

    const selectedWorkspace = this.workspaces().find(workspace => workspace.id === targetWorkspaceId);
    const selectedApiKey = selectedWorkspace?.keys?.collaborate;
    if (!selectedWorkspace || !selectedApiKey) {
      this.nowBadgeBusy.set(false);
      return;
    }

    const nextWorkspaces = this.workspaces().map(workspace => ({
      ...workspace,
      collaborate: workspace.id === targetWorkspaceId ? true : workspace.collaborate,
      metadata: {
        ...workspace.metadata,
        open_now: workspace.id === targetWorkspaceId,
        now_end_time: workspace.id === targetWorkspaceId ? workspace.metadata?.now_end_time : undefined,
      },
      open_now: workspace.id === targetWorkspaceId,
    }));

    from(nextWorkspaces).pipe(
      concatMap((workspace) => {
        const request = {
          metadata: workspace.metadata,
          public: workspace.public,
          collaborate: workspace.id === targetWorkspaceId ? true : workspace.collaborate,
          open_now: workspace.id === targetWorkspaceId,
          now_default_mode: workspace.metadata?.now_default_mode,
        };
        return this.adminApi.updateWorkspace(workspace.id, workspace.keys.admin, request).pipe(
          map(() => workspace)
        );
      }),
      toArray()
    ).subscribe({
      next: () => {
        this.loadWorkspaces(() => {
          const refreshedWorkspace = this.workspaces().find(workspace => workspace.id === targetWorkspaceId);
          const refreshedApiKey = refreshedWorkspace?.keys?.collaborate;
          if (refreshedWorkspace?.id && refreshedApiKey) {
            this.persistNowWorkspaceTarget(
              refreshedWorkspace.id,
              refreshedApiKey,
              refreshedWorkspace.metadata?.now_default_mode || 'evaluate',
              refreshedWorkspace.metadata?.now_end_time || null
            );
          }
        });
      },
      error: (error) => {
        console.error('Failed to update /#now workspace:', error);
        this.syncStoredNowWorkspaceTargetFromList();
        this.nowBadgeBusy.set(false);
      },
      complete: () => {
        // Busy state is cleared in loadWorkspaces callback after fresh state arrives.
      }
    });
  }

  setNowEndTime = (workspaceId: string, nowEndTime: string | null): void => {
    if (this.nowBadgeBusy()) {
      return;
    }

    const workspace = this.workspaces().find(item => item.id === workspaceId);
    if (!workspace || !workspace.keys?.admin || !this.auth.token()) {
      return;
    }

    if (!(workspace?.metadata?.open_now === true || workspace?.open_now === true)) {
      return;
    }

    this.nowBadgeBusy.set(true);

    const metadata = {
      ...workspace.metadata,
      open_now: true,
      now_end_time: nowEndTime || undefined,
    };

    this.adminApi.updateWorkspace(workspace.id, workspace.keys.admin, {
      metadata,
      public: workspace.public,
      collaborate: workspace.collaborate,
      open_now: true,
      now_default_mode: workspace.metadata?.now_default_mode,
    }).subscribe({
      next: () => {
        this.loadWorkspaces(() => {
          const refreshedWorkspace = this.workspaces().find(item => item.id === workspaceId);
          const refreshedApiKey = refreshedWorkspace?.keys?.collaborate;
          if (refreshedWorkspace?.id && refreshedApiKey) {
            this.persistNowWorkspaceTarget(
              refreshedWorkspace.id,
              refreshedApiKey,
              refreshedWorkspace.metadata?.now_default_mode || 'evaluate',
              refreshedWorkspace.metadata?.now_end_time || null
            );
          }
        });
      },
      error: (error) => {
        console.error('Failed to update NOW end time:', error);
        this.nowBadgeBusy.set(false);
      },
      complete: () => {
        // Busy state is cleared in loadWorkspaces callback after fresh state arrives.
      }
    });
  }

  private disableNowWorkspace(): void {
    if (!this.auth.token()) {
      return;
    }

    this.nowBadgeBusy.set(true);

    const nextWorkspaces = this.workspaces().map(workspace => ({
      ...workspace,
      metadata: {
        ...workspace.metadata,
        open_now: false,
      },
      open_now: false,
    }));

    from(nextWorkspaces).pipe(
      concatMap((workspace) => {
        const request = {
          metadata: workspace.metadata,
          public: workspace.public,
          collaborate: workspace.collaborate,
          open_now: false,
          now_default_mode: workspace.metadata?.now_default_mode,
        };
        return this.adminApi.updateWorkspace(workspace.id, workspace.keys.admin, request).pipe(
          map(() => workspace)
        );
      }),
      toArray()
    ).subscribe({
      next: () => {
        this.loadWorkspaces(() => {
          this.clearStoredNowWorkspaceTarget();
        });
      },
      error: (error) => {
        console.error('Failed to disable /#now workspace:', error);
        this.nowBadgeBusy.set(false);
      },
      complete: () => {
        // Busy state is cleared in loadWorkspaces callback after fresh state arrives.
      }
    });
  }

  private loadWorkspaces(afterLoad?: () => void): void {
    this.adminApi.listWorkspaces().subscribe(workspaces => {
      console.log('Workspaces:', workspaces);
      const sorted = [...workspaces].sort((a, b) => {
        const ad = a?.metadata?.date ?? '';
        const bd = b?.metadata?.date ?? '';
        // Reverse chronological: latest first
        return bd.localeCompare(ad);
      });
      this.workspaces.set(sorted);
      this.syncStoredNowWorkspaceTargetFromList();
      this.nowBadgeBusy.set(false);
      if (afterLoad) {
        afterLoad();
      }
    });
  }

  private persistNowWorkspaceTarget(workspaceId: string, collaborateApiKey: string, defaultMode: string, nowEndTime: string | null): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(this.nowWorkspaceStorageKey, JSON.stringify({
        workspaceId,
        collaborateApiKey,
        defaultMode: defaultMode === 'workshop' || defaultMode === 'batch' ? defaultMode : 'evaluate',
        nowEndTime,
      }));
    } catch {
      // Ignore storage failures.
    }
  }

  private getStoredNowWorkspaceId(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(this.nowWorkspaceStorageKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      return typeof parsed?.workspaceId === 'string' ? parsed.workspaceId : null;
    } catch {
      return null;
    }
  }

  private syncStoredNowWorkspaceTargetFromList(): void {
    const selectedWorkspace = this.workspaces().find(workspace => workspace?.metadata?.open_now === true || workspace?.open_now === true);
    if (!selectedWorkspace) {
      this.clearStoredNowWorkspaceTarget();
      return;
    }

    const selectedApiKey = selectedWorkspace?.keys?.collaborate;
    if (!selectedWorkspace?.id || !selectedApiKey) {
      return;
    }

    this.persistNowWorkspaceTarget(
      selectedWorkspace.id,
      selectedApiKey,
      selectedWorkspace.metadata?.now_default_mode || 'evaluate',
      selectedWorkspace.metadata?.now_end_time || null
    );
  }

  private clearStoredNowWorkspaceTarget(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.removeItem(this.nowWorkspaceStorageKey);
    } catch {
      // Ignore storage failures.
    }
  }
}
