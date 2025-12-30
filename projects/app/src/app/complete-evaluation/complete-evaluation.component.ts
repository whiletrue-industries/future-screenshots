import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  hasShareGroupLink = computed(() => {
    const workspace = this.api.workspace();
    return workspace?.metadata?.share_group_link && this.api.isWorkshop();
  });

  constructor(public api: ApiService, private http: HttpClient) {}

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

  shareToGroup() {
    const workspace = this.api.workspace();
    const groupLink = workspace?.metadata?.share_group_link;
    
    if (!groupLink) {
      console.error('No group link configured');
      return;
    }

    const item = this.api.item();
    const workspaceId = this.api.workspaceId();
    const itemId = this.api.itemId();
    const screenshotUrl = item.screenshot_url;
    
    if (!workspaceId || !itemId || !screenshotUrl) {
      console.error('Missing required data for sharing');
      return;
    }

    // Create a message with the screenshot link and group info
    const itemUrl = `https://mapfutur.es/props?workspace=${workspaceId}&item-id=${itemId}`;
    const message = item.future_scenario_tagline 
      ? `${item.future_scenario_tagline}\n\n${itemUrl}\n\nGroup: ${groupLink}`
      : `Check out this future scenario: ${itemUrl}\n\nGroup: ${groupLink}`;

    // Download the image and share it using native share API
    this.http.get(screenshotUrl, { responseType: 'blob' }).pipe(
      switchMap((blob: Blob) => {
        const fileName = `screenshot-${itemId}.png`;
        const file = new File([blob], fileName, { type: blob.type });
        
        // Check if Web Share API is available and supports files
        if (navigator && navigator.canShare && navigator.canShare({ files: [file] })) {
          // Use native share with both image and text
          const shareData: ShareData = {
            title: $localize`Our Future?`,
            text: message,
            files: [file]
          };
          return from(navigator.share(shareData)).pipe(
            map(() => ({ success: true, method: 'native' }))
          );
        } else {
          // Fallback: open group link in new tab and download image
          window.open(groupLink, '_blank');
          
          // Also trigger download as fallback
          return from(new Promise<string>(resolve => {
            let reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })).pipe(
            map((dataUrl: string) => {
              const link = document.createElement('a');
              link.download = fileName;
              link.href = dataUrl;
              link.click();
              return { success: true, method: 'fallback' };
            })
          );
        }
      })
    ).subscribe({
      next: (result) => {
        console.log('Share to group completed:', result);
      },
      error: (error) => {
        console.error('Error sharing to group:', error);
        // Final fallback: just open the group link
        window.open(groupLink, '_blank');
      }
    });
  }
}
