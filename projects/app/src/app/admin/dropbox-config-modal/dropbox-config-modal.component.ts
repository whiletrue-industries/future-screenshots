import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { PlatformService } from '../../../platform.service';

/**
 * Generates the `chronomaps.config` file that points a Dropbox folder at this
 * workspace, so it can be copied or downloaded rather than typed by hand.
 *
 * See docs/DROPBOX_SETUP.md in chronomaps-server for what the ingest does with
 * the file; `parse_credentials` there is what has to accept what we emit.
 */
@Component({
  selector: 'app-dropbox-config-modal',
  imports: [],
  templateUrl: './dropbox-config-modal.component.html',
  styleUrl: './dropbox-config-modal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropboxConfigModalComponent {
  workspace = input.required<any>();
  closed = output<void>();

  copied = signal(false);

  private platform = inject(PlatformService);

  /**
   * Collaboration has to be on for the collaborate key to be accepted - with it
   * off the ingest fails every image with a 403, which reads like a bad key.
   */
  collaborationEnabled = computed(() => !!this.workspace()?.config?.collaborate);

  workspaceName = computed(() => {
    const metadata = this.workspace()?.metadata || {};
    return metadata.name || metadata.title || this.workspace()?.id || '';
  });

  /**
   * The collaborate key, deliberately: the archive is usually a *shared* Dropbox
   * folder, so anyone with folder access can read this file. An admin key here
   * would hand them full control of the workspace, deletion included.
   */
  configText = computed(() => {
    const w = this.workspace();
    if (!w?.id || !w?.keys?.collaborate) {
      return '';
    }
    return [
      `# chronomaps.config - put this file in the Dropbox folder for ${this.workspaceName()}.`,
      '# Scans placed in that folder are ingested into this workspace.',
      '',
      `workspace: ${w.id}`,
      `api_key: ${w.keys.collaborate}`,
      '',
      '# Optional settings, shown with their defaults - uncomment one to change it.',
      '# enabled: true              # false stops ingest for this folder',
      '# ignore_cutoff: false       # true ingests scans older than the global cutoff',
      '# batch_gap_seconds: 120     # a longer gap between scans starts a new author batch',
      '# ratio: 0.53                # expected page width / height',
      '# ratio_tolerance: 0.10',
      '# max_uploads_per_run: 50',
      '# time_source: auto',
      '# rotate_landscape: off',
      ''
    ].join('\n');
  });

  copy() {
    this.platform.browser(() => {
      navigator.clipboard.writeText(this.configText()).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      }).catch(() => {
        this.copied.set(false);
      });
    });
  }

  download() {
    this.platform.browser(() => {
      const blob = new Blob([this.configText()], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'chronomaps.config';
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  close() {
    this.closed.emit();
  }
}
