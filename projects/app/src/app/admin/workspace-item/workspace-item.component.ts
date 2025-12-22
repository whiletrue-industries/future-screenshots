import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workspace-item',
  imports: [
    RouterLink
  ],
  templateUrl: './workspace-item.component.html',
  styleUrl: './workspace-item.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceItemComponent {
  workspace = input<any>();
  ingestSuffix = computed(() => {
    const w = this.workspace();
    if (w && w.id && w.keys) {
      return `?workspace=${w.id}&api_key=${w.keys.collaborate}`;
    }
    return '';
  });
  ingestSuffixWorkshop = computed(() => {
    return this.ingestSuffix() + '&ws=true';
  });

  formattedDate = computed(() => {
    const d: string = this.workspace()?.metadata?.date || '';
    // Expect YYYY-MM-DD -> DD.MM.YYYY
    const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(d);
    if (!m) return d;
    return `${m[3]}.${m[2]}.${m[1]}`;
  });
}
