import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkspaceNameUtility } from '../../shared/workspace-name.utility';
import { DropboxConfigModalComponent } from '../dropbox-config-modal/dropbox-config-modal.component';

@Component({
  selector: 'app-workspace-item',
  imports: [
    RouterLink,
    DropboxConfigModalComponent
  ],
  templateUrl: './workspace-item.component.html',
  styleUrl: './workspace-item.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'closeIngestMenu()'
  }
})
export class WorkspaceItemComponent {
  workspace = input<any>();
  nowBadgeEnabled = input(false);
  nowBadgeActive = input(false);
  nowBadgeBusy = input(false);
  nowEndTime = input<string | null>(null);
  nowToggle = output<string>();
  nowEndTimeChange = output<{ workspaceId: string; endTime: string | null }>();
  ingestMenuOpen = signal(false);
  dropboxConfigOpen = signal(false);
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
  
  ingestSuffixAutomatic = computed(() => {
    return this.ingestSuffix() + '&automatic=true';
  });
  
  mapLink = computed(() => {
    const w = this.workspace();
    if (w && w.id) {
      // Using workspace id as tag, with default language (can be changed by user)
      return `/?tag=${w.id}&lang=he`;
    }
    return '';
  });

  formattedDate = computed(() => {
    const d: string = this.workspace()?.metadata?.date || '';
    // Expect YYYY-MM-DD -> DD.MM.YYYY
    const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(d);
    if (!m) return d;
    return `${m[3]}.${m[2]}.${m[1]}`;
  });

  facilitatorsText = computed(() => {
    const names: string[] = this.workspace()?.metadata?.facilitator_names || [];
    return names.join(', ');
  });

  languagesText = computed(() => {
    const langs: string[] = this.workspace()?.metadata?.languages || [];
    return langs.join(', ');
  });

  locationText = computed(() => {
    const meta = this.workspace()?.metadata;
    if (!meta) return '';
    const city = meta.city || '';
    const country = meta.country || '';
    if (city && country) return `${city}, ${country}`;
    return city || country;
  });

  workspaceNameWithEmojis = computed(() => {
    return WorkspaceNameUtility.formatWorkspaceNameWithEmojis(this.workspace());
  });
  
  openDropboxConfig(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dropboxConfigOpen.set(true);
  }

  closeDropboxConfig() {
    this.dropboxConfigOpen.set(false);
  }

  toggleIngestMenu(event: Event) {
    event.stopPropagation();
    this.ingestMenuOpen.update(open => !open);
  }
  
  closeIngestMenu() {
    this.ingestMenuOpen.set(false);
  }

  toggleNowBadge(event: Event) {
    event.stopPropagation();
    const workspace = this.workspace();
    if (workspace?.id && !this.nowBadgeBusy()) {
      this.nowToggle.emit(workspace.id);
    }
  }

  updateNowEndTime(event: Event): void {
    event.stopPropagation();
    const workspace = this.workspace();
    const value = String((event.target as HTMLInputElement)?.value || '').trim();
    if (workspace?.id && !this.nowBadgeBusy()) {
      this.nowEndTimeChange.emit({ workspaceId: workspace.id, endTime: value ? this.localInputToIso(value) : null });
    }
  }

  clearNowEndTime(event: Event): void {
    event.stopPropagation();
    const workspace = this.workspace();
    if (workspace?.id && !this.nowBadgeBusy()) {
      this.nowEndTimeChange.emit({ workspaceId: workspace.id, endTime: null });
    }
  }

  nowEndTimeLocalInputValue(): string {
    const iso = this.nowEndTime();
    if (!iso) {
      return '';
    }

    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minute = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  private localInputToIso(localValue: string): string {
    const date = new Date(localValue);
    return Number.isNaN(date.getTime()) ? '' : date.toISOString();
  }
}
