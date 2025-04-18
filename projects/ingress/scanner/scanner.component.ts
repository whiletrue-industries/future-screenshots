import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Inject, OnDestroy, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { animationFrameScheduler, filter, interval, map, max, Subject, take, takeUntil, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { time } from 'console';
import { StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformService } from '../platform.service';
import { ApiService } from '../api.service';

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
  msg = signal<string>('');
  displayMsg = signal<string>('');
  videoHeightM = signal<number>(0);
  videoWidthM = signal<number>(0);

  constructor(
    private el: ElementRef, 
    private platform: PlatformService,
    private destroyRef: DestroyRef, 
    private state: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    this.api.updateFromRoute(this.route.snapshot);
  }
  
  ngAfterViewInit(): void {
    if (!this.platform.browser()) {
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

  getVideoConstraints() {
    if (this.platform.ios) {
      return {
        facingMode: 'environment',
        width: { min: 640, ideal: 1920 },
        height: { min: 480, ideal: 1080 }
      }
    } else {
      return {
        facingMode: {
          ideal: 'environment',
        },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      };
    }
  }

  startScanner() {
    const constraints: any = {
      audio: false,
      video: true
    };
    constraints.video = this.getVideoConstraints();
    if (this.platform.browser()) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.stream = stream;
        this.videoEl.nativeElement.srcObject = stream;
      });
    }
  }

  checkCornerPoints(cornerPoints: any): CornerPoints | null {
    // Check if all the coordinates and x y values are valid
    if (!cornerPoints || !cornerPoints.topLeftCorner || !cornerPoints.topRightCorner || !cornerPoints.bottomLeftCorner || !cornerPoints.bottomRightCorner) {
      // console.log('Invalid corner points');
      return null;
    }
    // Ensure all x, y values are numbers >= 0
    const cornerPointKeys = ['topLeftCorner', 'topRightCorner', 'bottomLeftCorner', 'bottomRightCorner'];
    for (const key of cornerPointKeys) {
      const cornerPoint = cornerPoints[key];
      if (typeof cornerPoint.x !== 'number' || typeof cornerPoint.y !== 'number' || cornerPoint.x < 0 || cornerPoint.y < 0) {
        // console.log(`Invalid coordinates for ${key}`);
        return null;
      }
    }
    return cornerPoints;    
  }

  checkDimensions(cornerPoints: any, videoWidth: number, videoHeight: number): boolean {
    if (!cornerPoints) {
      this.displayMsg.set('Point the camera at the paper, use a flat surface, good light and clear background');
      return false;
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
      this.msg.set('topBottomRatio is not in range: ' + topBottomRatio);
      this.displayMsg.set('Make sure to hold the camera straight above the paper');
      // console.log('topBottomRatio is not in range');
      return false;
    }
    if (leftRightRatio > 1.1 || leftRightRatio < 0.9) {
      this.msg.set('leftRightRatio is not in range: ' + leftRightRatio);
      this.displayMsg.set('Make sure to hold the camera straight above the paper');
      // console.log('leftRightRatio is not in range');
      return false;
    }
    // calculate the average of the top-width and bottom-width, left-height and right-height
    const topBottomAverage = (topWidth + bottomWidth) / 2;
    const leftRightAverage = (leftHeight + rightHeight) / 2;
    // ensure the ratio between averageWidth and averageHeight is 0.53 to 5% margin
    const averageRatio = (topBottomAverage / leftRightAverage) / 0.53;
    if (averageRatio < 0.95 || averageRatio > 1.05) {
      this.msg.set('averageRatio is not in range: ' + averageRatio);
      this.displayMsg.set("Can't detect a proper screenshot.");
      // console.log('averageRatio is not in range');
      return false;
    }
    // ensure that at least one of averageWidth and averageHeight is more than 66% of the video width and height    
    const averageWidth = (topBottomAverage > 0.66 * videoWidth);
    const averageHeight = (leftRightAverage > 0.66 * videoHeight);
    if (!averageWidth && !averageHeight) {
      // console.log('Neither averageWidth nor averageHeight is above 66% of video dimensions');
      this.msg.set('Neither averageWidth nor averageHeight is above 66% of video dimensions: ' + 
        topBottomAverage + '<0.66*' + videoWidth + ' ' + 
        leftRightAverage + '<0.66*' + videoHeight);
      this.displayMsg.set('Move the camera closer to the paper');
      return false;
    }
    this.msg.set('Dimensions are valid: ' + averageWidth + ' ' + averageHeight);
    return true;
  }
  
  checkBlurry(src: any): boolean {
    let dst = new cv.Mat();
    let men = new cv.Mat();
    let menO = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // You can try more different parameters
    cv.Laplacian(src, dst, cv.CV_64F, 1, 1, 0, cv.BORDER_DEFAULT);
    cv.meanStdDev(dst, menO, men);
    const blurry = men.data64F[0] < 10;
    this.msg.set('Blurriness is ' + blurry + ' ' + men.data64F[0]);
    if (blurry) {
      this.displayMsg.set('Make sure the paper is in focus and hold still');
    }
    // console.log('menO', blurry, menO.data64F);
    // Release memory
    dst.delete();
    men.delete();
    menO.delete();
    return blurry;
  }

  playing() {
    console.log('PLAYING');
    this.videoEl.nativeElement.play();
    const scanner = new jscanify();
    const videoWidth = this.videoEl.nativeElement.videoWidth;
    const videoHeight = this.videoEl.nativeElement.videoHeight;
    this.videoHeightM.set(videoHeight);
    this.videoWidthM.set(videoWidth);
    this.canvasEl.nativeElement.width = videoWidth;
    this.canvasEl.nativeElement.height = videoHeight;
    const ratio = Math.min(this.el.nativeElement.clientWidth / videoWidth, this.el.nativeElement.clientHeight / videoHeight);
    const sampleRatio = Math.floor(Math.min(videoHeight / 640, videoWidth / 480));
    console.log('SAMPLE RATIO', sampleRatio);
    const displayWidth = videoWidth * ratio;
    const displayHeight = videoHeight * ratio;
    this.resultEl.nativeElement.width = displayWidth;
    this.resultEl.nativeElement.height = displayHeight;

    let count = 0;
    interval(33).pipe(
      takeUntilDestroyed(this.destroyRef),
      takeUntil(this.stopScannerSubject),
      filter(() => this.countDown > 0),
      map(() => {
        let frame: any = null;
        let resampledFrame: any = null;
        let ret: any = null;
        let blurry: any = null;
        count += 1;
        if (count % 100 === 0) {
          console.log('Scanning...', count);
        }
        try {
          this.canvasCtx?.drawImage(this.videoEl.nativeElement, 0, 0);
          frame = cv.imread(this.canvasEl.nativeElement);
          resampledFrame = new cv.Mat();
          // resize the frame by sampleRatio
          const width = Math.floor(frame.cols / sampleRatio);
          const height = Math.floor(frame.rows / sampleRatio);
          const dsize = new cv.Size(width, height);
          cv.resize(frame, resampledFrame, dsize, 0, 0, cv.INTER_NEAREST);      
          const maxContour = scanner.findPaperContour(resampledFrame);
          if (maxContour) {
            const cornerPoints = this.checkCornerPoints(scanner.getCornerPoints(maxContour, resampledFrame) as CornerPoints);          
            const valid = this.checkDimensions(cornerPoints, width, height);
            if (valid) {
              blurry = this.checkBlurry(resampledFrame);
            }
            ret = {valid, blurry, cornerPoints};
          }
        } catch (e) {
          console.error('Error processing video frame', count, e);
          this.restartScanner();
        } finally {
          frame?.delete();
          resampledFrame?.delete();
        }
        return ret;
      })
    ).subscribe((shape: {valid: boolean, blurry: boolean, cornerPoints: CornerPoints} | null) => {
      // console.log('GOT', shape?.valid, shape?.cornerPoints);
      let frame = null;

      if (shape?.cornerPoints) {
        shape.cornerPoints.topLeftCorner.x *= sampleRatio;
        shape.cornerPoints.topLeftCorner.y *= sampleRatio;
        shape.cornerPoints.topRightCorner.x *= sampleRatio;
        shape.cornerPoints.topRightCorner.y *= sampleRatio;
        shape.cornerPoints.bottomLeftCorner.x *= sampleRatio;
        shape.cornerPoints.bottomLeftCorner.y *= sampleRatio;
        shape.cornerPoints.bottomRightCorner.x *= sampleRatio;
        shape.cornerPoints.bottomRightCorner.y *= sampleRatio;
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
          ctx.moveTo(shape.cornerPoints.topLeftCorner.x*ratio, shape.cornerPoints.topLeftCorner.y*ratio);
          ctx.lineTo(shape.cornerPoints.topRightCorner.x*ratio, shape.cornerPoints.topRightCorner.y*ratio);
          ctx.lineTo(shape.cornerPoints.bottomRightCorner.x*ratio, shape.cornerPoints.bottomRightCorner.y*ratio);
          ctx.lineTo(shape.cornerPoints.bottomLeftCorner.x*ratio, shape.cornerPoints.bottomLeftCorner.y*ratio);
          ctx.lineTo(shape.cornerPoints.topLeftCorner.x*ratio, shape.cornerPoints.topLeftCorner.y*ratio);
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
              this.router.navigate(['/confirm'], { queryParamsHandling: 'merge' });
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
    if (this.platform.browser()) {
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
