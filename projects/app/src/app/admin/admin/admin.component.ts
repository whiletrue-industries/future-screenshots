import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { AdminApiService } from '../../../admin-api.service';
import { WorkspaceItemComponent } from "../workspace-item/workspace-item.component";
import { delay, filter, take } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  languageFilter = signal<string>('all');
  searchQuery = signal<string>('');
  orderBy = signal<'date' | 'title'>('date');
  reviewedOnly = signal<boolean>(false);

  // Derived state with filtering + sorting
  filteredWorkspaces = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const lang = this.languageFilter();
    const order = this.orderBy();
    const reviewed = this.reviewedOnly();

    const list = [...this.workspaces()]
      .filter(w => {
        // Language filter
        if (lang !== 'all') {
          const languages: string[] = w?.metadata?.languages ?? [];
          if (!languages.map(l => l.toLowerCase()).includes(lang.toLowerCase())) {
            return false;
          }
        }
        // Reviewed filter (placeholder: assumes presence of w.reviewed boolean)
        if (reviewed && w?.reviewed !== true) {
          return false;
        }
        // Search across a few metadata fields
        if (q.length > 0) {
          const hay = [
            w?.metadata?.event_name,
            w?.metadata?.venue,
            w?.metadata?.city,
            (w?.metadata?.facilitator_names || []).join(' '),
            (w?.metadata?.keywords || []).join(' '),
            w?.metadata?.source
          ].filter(Boolean).join(' ').toLowerCase();
          return hay.includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (order === 'title') {
          const ta = (a?.metadata?.event_name || a?.metadata?.source || '').toString();
          const tb = (b?.metadata?.event_name || b?.metadata?.source || '').toString();
          return ta.localeCompare(tb);
        }
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
