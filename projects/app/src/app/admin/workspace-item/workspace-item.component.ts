import { Component, computed, input } from '@angular/core';
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
  ingestSuffix = computed(() => {
    const w = this.workspace();
    if (w && w.id && w.keys) {
      return `?workspace=${w.id}&api_key=${w.keys.contribute}`;
    }
    return '';
  });
  ingestSuffixWorkshop = computed(() => {
    return this.ingestSuffix() + '&ws=true';
  });
}
