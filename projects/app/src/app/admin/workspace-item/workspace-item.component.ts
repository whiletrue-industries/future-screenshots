import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workspace-item',
  imports: [
    RouterLink
  ],
  templateUrl: './workspace-item.component.html',
  styleUrl: './workspace-item.component.less'
})
export class WorkspaceItemComponent {
  workspace = input<any>();
}
