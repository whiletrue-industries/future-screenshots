import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { StateService } from '../../state.service';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { from, Observable, of, forkJoin } from 'rxjs';
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
  
  private state = inject(StateService);

  hasShareGroupLink = computed(() => {
    const workspace = this.api.workspace();
    return workspace?.metadata?.share_group_link && this.api.isWorkshop();
  });

  groupLink = computed(() => {
    const workspace = this.api.workspace();
    return workspace?.metadata?.share_group_link || '';
  });

  screenshotCount = computed(() => {
    return this.state.sessionScreenshots().length;
  });

  constructor(public api: ApiService, private http: HttpClient) {
    // Track this screenshot when component initializes
    effect(() => {
      const item = this.api.item();
      if (item && item.screenshot_url && item.id) {
        // Check if already tracked
        const screenshots = this.state.sessionScreenshots();
        const alreadyTracked = screenshots.some(s => s.itemId === item.id);
        if (!alreadyTracked) {
          this.state.addSessionScreenshot(item.screenshot_url, item.id);
        }
      }
    });
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

  joinGroup() {
    const groupLink = this.groupLink();
    if (groupLink) {
      window.open(groupLink, '_blank');
    }
  }

  private createCompositeImage(imageBlobs: Blob[]): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Load all images
      const imagePromises = imageBlobs.map(blob => {
        return new Promise<HTMLImageElement>((res, rej) => {
          const img = new Image();
          img.onload = () => res(img);
          img.onerror = rej;
          img.src = URL.createObjectURL(blob);
        });
      });

      Promise.all(imagePromises).then(images => {
        // Calculate layout - arrange images in a row with some padding
        const padding = 20;
        const maxHeight = Math.max(...images.map(img => img.height));
        const totalWidth = images.reduce((sum, img) => sum + img.width, 0) + (padding * (images.length + 1));
        
        // Set canvas size
        canvas.width = totalWidth;
        canvas.height = maxHeight + (padding * 2);
        
        // Fill white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw images side by side
        let xOffset = padding;
        images.forEach((img, index) => {
          const yOffset = padding + (maxHeight - img.height) / 2;
          ctx.drawImage(img, xOffset, yOffset, img.width, img.height);
          xOffset += img.width + padding;
          
          // Clean up object URL
          URL.revokeObjectURL(img.src);
        });
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Could not create blob from canvas'));
          }
        }, 'image/png');
      }).catch(reject);
    });
  }

  shareToGroup() {
    const groupLink = this.groupLink();
    
    if (!groupLink) {
      console.error('No group link configured');
      return;
    }

    const screenshots = this.state.sessionScreenshots();
    const workspaceId = this.api.workspaceId();
    
    if (!workspaceId || screenshots.length === 0) {
      console.error('Missing required data for sharing');
      return;
    }

    // Create message with links to all screenshots
    const itemLinks = screenshots.map((s, i) => 
      `${i + 1}. https://mapfutur.es/props?workspace=${workspaceId}&item-id=${s.itemId}`
    ).join('\n');
    
    const message = screenshots.length === 1
      ? `Check out my future scenario:\n\n${itemLinks}`
      : `Check out my ${screenshots.length} future scenarios:\n\n${itemLinks}`;

    // Download all screenshot images
    const imageRequests = screenshots.map(s => 
      this.http.get(s.imageUrl, { responseType: 'blob' })
    );

    // Use forkJoin to execute all requests in parallel
    (imageRequests.length === 0 ? of([]) : forkJoin(imageRequests)).pipe(
      // Create composite image
      switchMap((blobs: Blob[]) => {
        if (blobs.length === 0) {
          throw new Error('No images to share');
        }
        return from(this.createCompositeImage(blobs));
      }),
      // Share the composite
      switchMap((compositeBlob: Blob) => {
        const fileName = `screenshots-${screenshots.length}.png`;
        const file = new File([compositeBlob], fileName, { type: 'image/png' });
        
        // Check if Web Share API is available and supports files
        if (navigator && navigator.canShare && navigator.canShare({ files: [file] })) {
          // Use native share with both image and text
          const shareData: ShareData = {
            title: $localize`Our Future Scenarios`,
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
            reader.readAsDataURL(compositeBlob);
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
