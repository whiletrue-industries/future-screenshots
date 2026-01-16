import { Component, input } from '@angular/core';
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

  constructor(public api: ApiService, private http: HttpClient, private route: ActivatedRoute) {
    const fromTemplateFlow = this.route.snapshot.queryParamMap.get('template') === 'true';
    this.addAnotherRoute = fromTemplateFlow ? ['/canvas-creator'] : ['/scan'];
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
