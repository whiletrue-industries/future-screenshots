import { ChangeDetectionStrategy, Component, computed, inject, signal, effect } from '@angular/core';
import { ApiService } from '../../api.service';
import { PlatformService } from '../../platform.service';

@Component({
  selector: 'app-upload-progress-bar',
  imports: [],
  templateUrl: './upload-progress-bar.component.html',
  styleUrl: './upload-progress-bar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadProgressBarComponent {
  private api = inject(ApiService);
  private platform = inject(PlatformService);

  /** True while at least one upload is in progress. */
  uploading = computed(() => this.api.currentlyUploadingImage());

  /** Number of concurrent uploads (> 1 shows a count badge). */
  uploadCount = computed(() => this.api.uploadCount());

  /** True briefly after a new error occurred (auto-clears after 3 s). */
  hasError = signal(false);

  /** True while the bar should be visible (uploading OR in short fade-out phase). */
  visible = signal(false);

  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private errorTimer: ReturnType<typeof setTimeout> | null = null;
  /** Last error count that was already handled, so we only react to new errors. */
  private lastSeenErrorCount = 0;

  constructor() {
    effect(() => {
      const uploading = this.uploading();
      const errorCount = this.api.uploadErrorCount();

      // Only trigger the error state for newly added errors
      if (errorCount > this.lastSeenErrorCount) {
        this.lastSeenErrorCount = errorCount;
        this.hasError.set(true);
        // Cancel any pending error-clear timer before scheduling a new one
        if (this.errorTimer !== null) {
          clearTimeout(this.errorTimer);
          this.errorTimer = null;
        }
        this.platform.browser(() => {
          this.errorTimer = setTimeout(() => {
            this.hasError.set(false);
            this.errorTimer = null;
          }, 3000);
        });
      }

      if (uploading) {
        if (this.hideTimer !== null) {
          clearTimeout(this.hideTimer);
          this.hideTimer = null;
        }
        this.visible.set(true);
      } else {
        // Keep visible briefly for the fade-out animation
        this.platform.browser(() => {
          this.hideTimer = setTimeout(() => {
            this.visible.set(false);
            this.hideTimer = null;
          }, 600);
        });
      }
    });
  }
}

