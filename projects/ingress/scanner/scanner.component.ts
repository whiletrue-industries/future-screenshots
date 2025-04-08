import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { animationFrameScheduler, filter, interval, map, max, Subject, take, takeUntil, timer } from 'rxjs';
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
export class ScannerComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('video', { static: true }) videoEl!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasEl!: ElementRef<HTMLCanvasElement>;
  @ViewChild('result', { static: true }) resultEl!: ElementRef<HTMLCanvasElement>;
  canvasCtx: CanvasRenderingContext2D | null;
  resultCtx: CanvasRenderingContext2D | null;

  COUNTDOWN_INITIAL = 30;
  countDown = this.COUNTDOWN_INITIAL;
  scanState = null;
  stream: MediaStream | null = null;
  stopScannerSubject = new Subject<void>();

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
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment',
        height: { ideal: 2000, min: 1000 },
        width: { ideal: 1060, min: 530 },
      }
    }).then((stream) => {
      this.stream = stream;
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
  
  checkBlurry(src: any): boolean {
    let dst = new cv.Mat();
    let men = new cv.Mat();
    let menO = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // You can try more different parameters
    cv.Laplacian(src, dst, cv.CV_64F, 1, 1, 0, cv.BORDER_DEFAULT);
    cv.meanStdDev(dst, menO, men);
    const blurry = menO.data64F[0] < 10;
    console.log('menO', blurry, menO.data64F);
    // Release memory
    // cv.imshow(frame, dst);
    dst.delete();
    men.delete();
    menO.delete();
    return blurry;
  }

  playing() {
    this.videoEl.nativeElement.play();
    const scanner = new jscanify();
    const videoWidth = this.videoEl.nativeElement.videoWidth;
    const videoHeight = this.videoEl.nativeElement.videoHeight;
    this.canvasEl.nativeElement.width = videoWidth;
    this.canvasEl.nativeElement.height = videoHeight;
    const ratio = Math.min(this.el.nativeElement.clientWidth / videoWidth, this.el.nativeElement.clientHeight / videoHeight);
    const sampleRatio = Math.floor(Math.min(videoHeight / 640, videoWidth / 480));
    console.log('SAMPLE RATIO', sampleRatio);
    const displayWidth = videoWidth * ratio;
    const displayHeight = videoHeight * ratio;
    this.resultEl.nativeElement.width = displayWidth;
    this.resultEl.nativeElement.height = displayHeight;

    interval(33).pipe(
      takeUntilDestroyed(this.destroyRef),
      takeUntil(this.stopScannerSubject),
      filter(() => this.countDown > 0),
      map(() => {
        let frame: any = null;
        let resampledFrame: any = null;
        let ret: any = null;
        let blurry: any = null;
        try {
          this.canvasCtx?.drawImage(this.videoEl.nativeElement, 0, 0);
          frame = cv.imread(this.canvasEl.nativeElement);
          resampledFrame = new cv.Mat();
          // resize the frame by sampleRatio
          const width = Math.floor(frame.cols / sampleRatio);
          const height = Math.floor(frame.rows / sampleRatio);
          const dsize = new cv.Size(width, height);
          cv.resize(frame, resampledFrame, dsize, 0, 0, cv.INTER_NEAREST);      
          blurry = this.checkBlurry(resampledFrame);    
          const maxContour = scanner.findPaperContour(resampledFrame);
          if (maxContour) {
            const cornerPoints = scanner.getCornerPoints(maxContour, resampledFrame) as CornerPoints;
            const valid = !!this.checkDimensions(cornerPoints, videoWidth, videoHeight);
            ret = {valid, blurry, cornerPoints};
          }
        } catch (e) {
          console.error('Error processing video frame', e);
          this.restartScanner();
        }
        frame?.delete();
        return ret;
      })
    ).subscribe((shape: {valid: boolean, blurry: boolean, cornerPoints: CornerPoints} | null) => {
      // console.log('GOT', shape?.valid, shape?.cornerPoints);
      let frame = null;

      if (shape?.cornerPoints) {
        const options = {
          "color": shape?.valid ? (shape.blurry ? "#FFA500" : "#00FF00") : "#FF0000",
          "thickness": 5
        };
        // console.log('Drawing video frame to canvas', displayWidth, displayHeight);
        if (this.resultCtx) {
          this.resultCtx.clearRect(0, 0, displayWidth, displayHeight);
          const ctx = this.resultCtx;
          ctx.strokeStyle = options.color;
          ctx.lineWidth = options.thickness;
          ctx.beginPath();
          ctx.moveTo(shape.cornerPoints.topLeftCorner.x*ratio*sampleRatio, shape.cornerPoints.topLeftCorner.y*ratio*sampleRatio);
          ctx.lineTo(shape.cornerPoints.topRightCorner.x*ratio*sampleRatio, shape.cornerPoints.topRightCorner.y*ratio*sampleRatio);
          ctx.lineTo(shape.cornerPoints.bottomRightCorner.x*ratio*sampleRatio, shape.cornerPoints.bottomRightCorner.y*ratio*sampleRatio);
          ctx.lineTo(shape.cornerPoints.bottomLeftCorner.x*ratio*sampleRatio, shape.cornerPoints.bottomLeftCorner.y*ratio*sampleRatio);
          ctx.lineTo(shape.cornerPoints.topLeftCorner.x*ratio*sampleRatio, shape.cornerPoints.topLeftCorner.y*ratio*sampleRatio);
          ctx.stroke();
        }
        // this.resultCtx?.drawImage(resultCanvas, 0, 0, displayWidth, displayHeight);  
      }
      if (shape?.valid) {
        this.countDown -= 1;
        if (this.countDown === 0 || !shape.blurry) {         
          frame = scanner.extractPaper(this.canvasEl.nativeElement, 1060, 2000, shape.cornerPoints);        
          console.log('Extraction result:', frame);
          this.resultEl.nativeElement.width = frame.width;
          this.resultEl.nativeElement.height = frame.height;
          this.resultCtx?.drawImage(frame, 0, 0, frame.width, frame.height);
          this.stream?.getTracks().forEach((track) => {
            if (track.readyState == 'live') {
                track.stop();
            }
          });
          this.videoEl.nativeElement.pause();
          this.stream = null;
          // Convert the result to a JPEG image
          frame.toBlob((blob: Blob) => {
            if (blob) {
              this.state.setImage(blob);
              this.router.navigateByUrl('/confirm');
            }
          }, 'image/jpeg', 0.95);
        }
      } else {
        this.countDown = this.COUNTDOWN_INITIAL;
        // this.resultCtx?.clearRect(0, 0, displayWidth, displayHeight);
      }
    });
  }

  ngOnDestroy() {
    this.stopScanner();
  }

  stopScanner() {
    this.stopScannerSubject.next();
    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
      this.stream = null;
    }
    if (isPlatformBrowser(this.platformId)) {
      this.videoEl?.nativeElement?.pause();
    }
  }

  restartScanner() {
    this.stopScanner();
    this.countDown = this.COUNTDOWN_INITIAL;
    console.log('RESTARTING SCANNER');
    timer(500).subscribe(() => {
      this.startScanner();
    });
  }
}
