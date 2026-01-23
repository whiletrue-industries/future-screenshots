import { Component, computed, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { CompletionImageComponent } from "../completion-image/completion-image.component";

@Component({
  selector: 'app-complete-evaluation',
  imports: [
    RouterLink,
    CompletionImageComponent
],
  templateUrl: './complete-evaluation.component.html',
  styleUrl: './complete-evaluation.component.less'
})
export class CompleteEvaluationComponent {

  thinking = input<boolean>(false);
  addAnotherRoute: string[] = ['/scan'];

  // Compute the show-on-map URL for the current item
  showOnMapLink = computed(() => {
    const workspaceId = this.api.workspaceId();
    const itemId = this.api.itemId();
    const apiKey = this.api.api_key();
    const locale = this.api.locale;

    if (!workspaceId || !itemId || !apiKey) {
      return '/';
    }

    // Add locale prefix if not English (English has no prefix, Dutch '/nl/', Hebrew '/he/', Arabic '/ar/' etc.)
    const localePrefix = locale === 'en' ? '' : `/${locale}`;

    return `${localePrefix}/showcase-ws?workspace=${workspaceId}&api_key=${apiKey}&item-id=${itemId}&layout=svg`;
  });

  constructor(public api: ApiService, private http: HttpClient, private route: ActivatedRoute) {
    const fromTemplateFlow = this.route.snapshot.queryParamMap.get('template') === 'true';
    this.addAnotherRoute = fromTemplateFlow ? ['/canvas-creator'] : ['/scan'];
  }

  onShowOnMap(event: MouseEvent): void {
    console.log('[COMPLETE_EVAL] onShowOnMap called');
    const url = this.showOnMapLink();
    const isFramed = typeof window !== 'undefined' && window.self !== window.top;
    console.log('[COMPLETE_EVAL] isFramed:', isFramed, 'url:', url);

    if (isFramed && window.parent) {
      console.log('[COMPLETE_EVAL] Posting show-on-map message to parent window');
      event.preventDefault();
      window.parent.postMessage({
        type: 'show-on-map',
        itemId: this.api.itemId(),
        workspaceId: this.api.workspaceId(),
        apiKey: this.api.api_key(),
        source: 'sidebar-iframe'
      }, '*');
      console.log('[COMPLETE_EVAL] Message posted');
      return;
    }

    console.log('[COMPLETE_EVAL] Not in frame, navigating to:', url);
    if (typeof window !== 'undefined' && window.top) {
      window.top.location.href = url;
    } else {
      window.location.href = url;
    }
  }

  downloadImage() {
    const item = this.api.item();
    const url = item.screenshot_url;
    if (!url) {
      console.log('No screenshot URL available', item);
      return;
    }
    this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap((blob: Blob) => {
        const files = [new File([blob], 'my-screenshot.png', { type: blob.type })];
        if (navigator && navigator.canShare && navigator.canShare({ files })) {
          return from(navigator.share({ files })).pipe(
            map(() => ({ native: true, url: '' }))
          );
        } else {
          return from(new Promise<string>(resolve => {
            let reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })).pipe(
            map((dataUrl: string) => {
              return { native: false, url: dataUrl };
            })
          );
        }
      })
    ).subscribe(({ native, url }) => {
      if (native) {
        // Native sharing was successful
      } else {
        var link = document.createElement('a');
        link.download = `my-screenshot.png`;
        link.href = url;
        link.click();
      }
    });
  }

  shareImage() {
    const workspaceId = this.api.workspaceId();
    const itemId = this.api.itemId();
    const item = this.api.item();

    if (!workspaceId || !itemId) {
      console.error('Workspace ID or Item ID is missing');
      return;
    }
    const url = `https://mapfutur.es/props?workspace=${workspaceId}&item-id=${itemId}`;
    const share: ShareData = {
        title: $localize`Our Future?`,
        text: item.future_scenario_tagline || $localize`Check out this image!`,
        url: url
    }
    navigator.share(share);
  }
}
