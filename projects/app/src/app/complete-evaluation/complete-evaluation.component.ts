import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-complete-evaluation',
  imports: [
    RouterLink
  ],
  templateUrl: './complete-evaluation.component.html',
  styleUrl: './complete-evaluation.component.less'
})
export class CompleteEvaluationComponent {

  constructor(private api: ApiService, private http: HttpClient) {}

  downloadImage() {
    const url = this.api.item().screenshot_url;
    if (!url) {
      return;
    }
    this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap((blob: Blob) => {
        return from(new Promise<string>(resolve => {
          let reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        }));
      })
    ).subscribe((dataUrl: string) => {
      var link = document.createElement('a');
      link.download = `my-screenshot.png`;
      link.href = dataUrl;
      link.click();
    });
  }

  shareImage() {
    const url = this.api.item().screenshot_url;
    if (!url) {
      return;
    }
    this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const files = [new File([blob], 'my-screenshot.png', { type: blob.type })];
      const share: ShareData = {
        title: $localize`Our Future?`,
        text: this.api.item().future_scenario_tagline || $localize`Check out this image!`,
      }
      console.log('share', share);
      if (navigator.canShare({ files })) {
        share.files = files;
      } else {
        share.url = this.api.item().screenshot_url;
      }
      navigator.share(share);
    });
  }
}
