import { Component, signal } from '@angular/core';
import { AdminApiService } from '../../../admin-api.service';
import { WorkspaceItemComponent } from "../workspace-item/workspace-item.component";
import { delay, filter, take } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin',
  imports: [
    WorkspaceItemComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less'
})
export class AdminComponent {

  workspaces = signal<any[]>([]);

  constructor(private adminApi: AdminApiService, private auth: AuthService) {
    this.auth.user.pipe(filter(user => !!user), take(1), delay(0)).subscribe(() => {
      console.log('AUTH TOKEN:', this.auth.token());
      this.adminApi.listWorkspaces().subscribe(workspaces => {
        console.log('Workspaces:', workspaces);
        this.workspaces.set(workspaces);
      });
    });
  }
}
