import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

/** The Tally form that collects a viewer's assumptions about a screenshot. */
const ASSUMPTIONS_FORM_URL = 'https://tally.so/r/0V8BRZ';

/**
 * A small notification, shown after the showcase zooms into a clicked
 * screenshot, that invites the viewer to record their assumptions about it
 * in an external form. The form is told which workspace and item (and which
 * screenshot) the assumptions are about.
 */
@Component({
  selector: 'app-assumptions-prompt',
  template: `
    <div class='prompt' role='status' aria-live='polite'>
      <p class='question'>What do you see? What makes this possible?</p>
      <a class='form-link' [href]='formUrl()' target='_blank' rel='noopener'>
        Record your assumptions<span class='visually-hidden'> (opens in a new tab)</span>
      </a>
      <button type='button' class='close' (click)='dismiss.emit()' aria-label='Dismiss'>
        <svg viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M6 6l12 12M18 6L6 18' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>
        </svg>
      </button>
    </div>
  `,
  styleUrl: './assumptions-prompt.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssumptionsPromptComponent {
  workspaceId = input.required<string>();
  itemId = input.required<string>();
  /** The item's screenshot; left out of the link when the item has none. */
  screenshotUrl = input<string | null>(null);

  dismiss = output<void>();

  formUrl = computed(() => {
    const url = new URL(ASSUMPTIONS_FORM_URL);
    url.searchParams.set('workspace_id', this.workspaceId());
    url.searchParams.set('item_id', this.itemId());
    const screenshotUrl = this.screenshotUrl();
    if (screenshotUrl) {
      url.searchParams.set('screenshot_url', screenshotUrl);
    }
    return url.toString();
  });
}
