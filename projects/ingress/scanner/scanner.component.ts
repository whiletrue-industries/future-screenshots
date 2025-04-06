import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { animationFrameScheduler, filter, interval, map, max, take, takeUntil, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { time } from 'console';
import { StateService } from '../state.service';
import { Router } from '@angular/router';

declare const jscanify: any;
declare const cv: any;
declare const window: any;

type CornerPoints = {
  topLeftCorner: { x: number; y: number };
  topRightCorner: { x: number; y: number };
  bottomLeftCorner: { x: number; y: number };
  bottomRightCorner: { x: number; y: number };
};

@Component({
  selector: 'app-scanner',
  imports: [],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.less'
})
export class ScannerComponent implements AfterViewInit {
  
  @ViewChild('video', { static: true }) videoEl!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasEl!: ElementRef<HTMLCanvasElement>;
  @ViewChild('result', { static: true }) resultEl!: ElementRef<HTMLCanvasElement>;
  canvasCtx: CanvasRenderingContext2D | null;
  resultCtx: CanvasRenderingContext2D | null;

  COUNTDOWN_INITIAL = 30;
  countDown = this.COUNTDOWN_INITIAL;
  scanState = null;

  constructor(
    private el: ElementRef, 
    @Inject(PLATFORM_ID) private platformId: Object, 
    private destroyRef: DestroyRef, 
    private state: StateService,
    private router: Router
  ) {
  }
  
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Not in browser, skipping scanner initialization');
      return;
    }

    interval(100).pipe(
      takeUntilDestroyed(this.destroyRef),      
      filter(() => !!(window as any).jscanify !== undefined),
      filter(() => !!(window as any).cv !== undefined),
      filter(() => !!this.canvasEl?.nativeElement),
      filter(() => !!this.resultEl?.nativeElement),
      take(1)
    ).subscribe(() => {
      console.log('Starting scanner...', jscanify);
      this.canvasCtx = this.canvasEl.nativeElement.getContext("2d");
      this.resultCtx = this.resultEl.nativeElement.getContext("2d");
      this.startScanner();
    });
  }

  startScanner() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.videoEl.nativeElement.srcObject = stream;
    });
  }

  checkDimensions(cornerPoints: any, videoWidth: number, videoHeight: number): CornerPoints | null {
    // Check if all the coordinates and x y values are valid
    if (!cornerPoints || !cornerPoints.topLeftCorner || !cornerPoints.topRightCorner || !cornerPoints.bottomLeftCorner || !cornerPoints.bottomRightCorner) {
      console.log('Invalid corner points');
      return null;
    }
    // Ensure all x, y values are numbers >= 0
    const cornerPointKeys = ['topLeftCorner', 'topRightCorner', 'bottomLeftCorner', 'bottomRightCorner'];
    for (const key of cornerPointKeys) {
      const cornerPoint = cornerPoints[key];
      if (typeof cornerPoint.x !== 'number' || typeof cornerPoint.y !== 'number' || cornerPoint.x < 0 || cornerPoint.y < 0) {
        console.log(`Invalid coordinates for ${key}`);
        return null;
      }
    }
    // calculate the top-width and bottom-width, left-height and right-height
    const topWidth = Math.sqrt(Math.pow(cornerPoints.topLeftCorner.x - cornerPoints.topRightCorner.x, 2) + Math.pow(cornerPoints.topLeftCorner.y - cornerPoints.topRightCorner.y, 2));
    const bottomWidth = Math.sqrt(Math.pow(cornerPoints.bottomLeftCorner.x - cornerPoints.bottomRightCorner.x, 2) + Math.pow(cornerPoints.bottomLeftCorner.y - cornerPoints.bottomRightCorner.y, 2));
    const leftHeight = Math.sqrt(Math.pow(cornerPoints.topLeftCorner.x - cornerPoints.bottomLeftCorner.x, 2) + Math.pow(cornerPoints.topLeftCorner.y - cornerPoints.bottomLeftCorner.y, 2));
    const rightHeight = Math.sqrt(Math.pow(cornerPoints.topRightCorner.x - cornerPoints.bottomRightCorner.x, 2) + Math.pow(cornerPoints.topRightCorner.y - cornerPoints.bottomRightCorner.y, 2));
    // Calculate the ratio of the top-width and bottom-width, left-height and right-height, ensure both are between 0.9 and 1.1
    const topBottomRatio = Math.max(topWidth, bottomWidth) / Math.min(topWidth, bottomWidth);
    const leftRightRatio = Math.max(leftHeight, rightHeight) / Math.min(leftHeight, rightHeight);
    if (topBottomRatio > 1.1 || topBottomRatio < 0.9) {
      console.log('topBottomRatio is not in range');
      return null;
    }
    if (leftRightRatio > 1.1 || leftRightRatio < 0.9) {
      console.log('leftRightRatio is not in range');
      return null;
    }
    // calculate the average of the top-width and bottom-width, left-height and right-height
    const topBottomAverage = (topWidth + bottomWidth) / 2;
    const leftRightAverage = (leftHeight + rightHeight) / 2;
    // ensure the ratio between averageWidth and averageHeight is 0.53 to 5% margin
    const averageRatio = (topBottomAverage / leftRightAverage) / 0.53;
    if (averageRatio > 1.05 || averageRatio < 0.95) {
      console.log('averageRatio is not in range');
      return null;
    }
    // ensure that at least one of averageWidth and averageHeight is more than 66% of the video width and height    
    const averageWidth = (topBottomAverage > 0.66 * videoWidth);
    const averageHeight = (leftRightAverage > 0.66 * videoHeight);
    if (!averageWidth && !averageHeight) {
      console.log('Neither averageWidth nor averageHeight is above 66% of video dimensions');
      return null;
    }    
    return cornerPoints;
  }
  
  playing() {
    this.videoEl.nativeElement.play();
    const scanner = new jscanify();
    const videoWidth = this.videoEl.nativeElement.videoWidth;
    const videoHeight = this.videoEl.nativeElement.videoHeight;
    this.canvasEl.nativeElement.width = videoWidth;
    this.canvasEl.nativeElement.height = videoHeight;
    const ratio = Math.min(this.el.nativeElement.clientWidth / videoWidth, this.el.nativeElement.clientHeight / videoHeight);
    const displayWidth = videoWidth * ratio;
    const displayHeight = videoHeight * ratio;
    this.resultEl.nativeElement.width = displayWidth;
    this.resultEl.nativeElement.height = displayHeight;  

    interval(30, animationFrameScheduler).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(() => this.countDown > 0),
      map(() => {
        try {
          this.canvasCtx?.drawImage(this.videoEl.nativeElement, 0, 0);
          const frame = cv.imread(this.canvasEl.nativeElement);
          const maxContour = scanner.findPaperContour(frame);
          if (maxContour) {
            const cornerPoints = scanner.getCornerPoints(maxContour, frame);
            return this.checkDimensions(cornerPoints, videoWidth, videoHeight);
            // console.log('cornerPoints', cornerPoints);  
          }
        } catch (e) {
          console.error('Error processing video frame', e);
          this.videoEl.nativeElement.pause();
          timer(1000).subscribe(() => {
            console.log('Retrying video playback');
            this.videoEl.nativeElement.play();
          });
        }
        return null;
      })
    ).subscribe((cornerPoints: CornerPoints | null) => {
      if (cornerPoints) {
        this.countDown -= 1;
        const resultCanvas = scanner.highlightPaper(this.canvasEl.nativeElement, {
          "color": "#FF0000",
          "thickness": 5
        });
        // console.log('Drawing video frame to canvas', displayWidth, displayHeight);
        this.resultCtx?.drawImage(resultCanvas, 0, 0, displayWidth, displayHeight);  

        if (this.countDown === 0) {
          const result = scanner.extractPaper(this.canvasEl.nativeElement, 1060, 2000, cornerPoints);
          console.log('Extraction result:', result);
          this.resultEl.nativeElement.width = result.width;
          this.resultEl.nativeElement.height = result.height;
          this.resultCtx?.drawImage(result, 0, 0, result.width, result.height);
          this.videoEl.nativeElement.pause();

          // Convert the result to a JPEG image
          result.toBlob((blob: Blob) => {
            if (blob) {
              this.state.setImage(blob);
              this.router.navigateByUrl('/confirm');
            }
          }, 'image/jpeg', 0.95); 
        }
      } else {
        this.countDown = this.COUNTDOWN_INITIAL;
        this.resultCtx?.clearRect(0, 0, displayWidth, displayHeight);
      }
    });
  }
}
