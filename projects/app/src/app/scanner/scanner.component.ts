import { AfterViewInit, Component, computed, DestroyRef, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime, delay, distinctUntilChanged, filter, interval, map, Subject, take, takeUntil, tap, timer } from 'rxjs';
import { ApiService } from '../../api.service';
import { PlatformService } from '../../platform.service';
import { StateService } from '../../state.service';
import { LtrDirective } from '../ltr.directive';

declare const jscanify: any;
declare const cv: any;
declare const window: any;

type Point = { x: number, y: number };

type CornerPoints = {
  topLeftCorner: Point;
  topRightCorner: Point;
  bottomLeftCorner: Point;
  bottomRightCorner: Point;
};


@Component({
  selector: 'app-scanner',
  imports: [
    LtrDirective,
    RouterLink
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.less'
})
export class ScannerComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('video', { static: true }) videoEl!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasEl!: ElementRef<HTMLCanvasElement>;
  canvasCtx: CanvasRenderingContext2D | null;

  COUNTDOWN_INITIAL = 30;
  FRAME_COUNT_DARKER = 100;
  TIMEOUT_DURATION = 5000; // 5 seconds in milliseconds
  DEFAULT_CORNER_MARGIN = 0.15; // 15% margin for default corner points
  countDown = this.COUNTDOWN_INITIAL;
  scanState = null;
  stream: MediaStream | null = null;
  stopScannerSubject = new Subject<void>();
  displayMsgSubject = new Subject<string>();
  msg = signal<string>('');
  displayMsg = signal<string>('');
  videoHeightM = signal<number>(0);
  videoWidthM = signal<number>(0);
  displayWidth = signal<number>(0);
  displayHeight = signal<number>(0);
  viewBox = computed(() => {
    if (this.displayWidth() === 0 || this.displayHeight() === 0) {
      return '0 0 480 640';
    }
    return `0 0 ${this.displayWidth()} ${this.displayHeight()}`;
  });
  maskPath = computed(() => {
    let points = this.points();
    if (points.length < 4) {
      return '';
    }
    return `M${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y} Z`;
  });
  points = signal<{x: number, y: number}[]>([]);
  cameraClicked = signal<boolean>(false);
  displayCameraButton = signal<boolean>(false);
  scanStartTime: number = 0;
  timeoutReached = signal<boolean>(false);

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
    this.displayMsgSubject.pipe(
      takeUntilDestroyed(),
      distinctUntilChanged(),
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.displayMsg.set('');
      }),
      delay(1),
    ).subscribe((msg) => {
      this.displayMsg.set(msg);
    });
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
      take(1)
    ).subscribe(() => {
      console.log('Starting scanner...', jscanify);
      this.canvasCtx = this.canvasEl.nativeElement.getContext("2d");
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
        const track = stream.getVideoTracks()[0];
        const capabilities: any = track.getCapabilities();
        if (capabilities.torch) {
          // Turn on the flash by applying the constraint
          track.applyConstraints({
              advanced: [{ torch: true } as MediaTrackConstraintSet]
          }).catch(e => console.error('Torch ON failed:', e));
        }
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

  checkDimensions(cornerPoints: any, videoWidth: number, videoHeight: number, frameCount: number): {valid: boolean, snap: boolean} {
    if (!cornerPoints) {
      if (frameCount < this.FRAME_COUNT_DARKER) {
        this.displayMsgSubject.next($localize`fit the page to the frame`);
      } else {
        this.displayMsgSubject.next($localize`try on a darker background`);
      }
      return {valid: false, snap: false};
    }
    // calculate the top-width and bottom-width, left-height and right-height
    const topWidth = Math.sqrt(Math.pow(cornerPoints.topLeftCorner.x - cornerPoints.topRightCorner.x, 2) + Math.pow(cornerPoints.topLeftCorner.y - cornerPoints.topRightCorner.y, 2));
    const bottomWidth = Math.sqrt(Math.pow(cornerPoints.bottomLeftCorner.x - cornerPoints.bottomRightCorner.x, 2) + Math.pow(cornerPoints.bottomLeftCorner.y - cornerPoints.bottomRightCorner.y, 2));
    const leftHeight = Math.sqrt(Math.pow(cornerPoints.topLeftCorner.x - cornerPoints.bottomLeftCorner.x, 2) + Math.pow(cornerPoints.topLeftCorner.y - cornerPoints.bottomLeftCorner.y, 2));
    const rightHeight = Math.sqrt(Math.pow(cornerPoints.topRightCorner.x - cornerPoints.bottomRightCorner.x, 2) + Math.pow(cornerPoints.topRightCorner.y - cornerPoints.bottomRightCorner.y, 2));

    // calculate the average of the top-width and bottom-width, left-height and right-height
    const topBottomAverage = (topWidth + bottomWidth) / 2;
    const leftRightAverage = (leftHeight + rightHeight) / 2;
    // ensure the ratio between averageWidth and averageHeight is 0.53 to 5% margin
    const averageRatio = (topBottomAverage / leftRightAverage) / 0.53;
    const ratioMargin = frameCount < this.FRAME_COUNT_DARKER ? 0.05 : 0.1;
    if (averageRatio < 1 - ratioMargin || averageRatio > 1 + ratioMargin) {
      this.msg.set('averageRatio is not in range: ' + averageRatio);
      if (frameCount < this.FRAME_COUNT_DARKER) {
        this.displayMsgSubject.next($localize`fit the page to the frame`);
      } else {
        this.displayMsgSubject.next($localize`try on a darker background`);
      }
      // console.log('averageRatio is not in range');
      return {valid: false, snap: false};
    }

    // Calculate the ratio of the top-width and bottom-width, left-height and right-height, ensure both are between 0.9 and 1.1
    const topBottomRatio = Math.max(topWidth, bottomWidth) / Math.min(topWidth, bottomWidth);
    const leftRightRatio = Math.max(leftHeight, rightHeight) / Math.min(leftHeight, rightHeight);
    if (topBottomRatio > 1.2 || topBottomRatio < 0.8) {
      this.msg.set('topBottomRatio is not in range: ' + topBottomRatio);
      this.displayMsgSubject.next($localize`change your angle`);
      // console.log('topBottomRatio is not in range');
      return {valid: false, snap: true};
    }
    if (leftRightRatio > 1.1 || leftRightRatio < 0.9) {
      this.msg.set('leftRightRatio is not in range: ' + leftRightRatio);
      this.displayMsgSubject.next($localize`change your angle`);
      // console.log('leftRightRatio is not in range');
      return {valid: false, snap: true};
    }
    // ensure that at least one of averageWidth and averageHeight is more than 66% of the video width and height    
    const averageWidth = (topBottomAverage > 0.5 * videoWidth);
    const averageHeight = (leftRightAverage > 0.5 * videoHeight);
    if (!averageWidth && !averageHeight) {
      // console.log('Neither averageWidth nor averageHeight is above 66% of video dimensions');
      this.msg.set('Neither averageWidth nor averageHeight is above 66% of video dimensions: ' + 
        topBottomAverage + '<0.66*' + videoWidth + ' ' + 
        leftRightAverage + '<0.66*' + videoHeight);
      this.displayMsgSubject.next($localize`move closer to page`);
      return {valid: false, snap: true};
    }
    this.msg.set('Dimensions are valid: ' + averageWidth + ' ' + averageHeight);
    return {valid: true, snap: true};
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

    let count = 0;
    this.scanStartTime = Date.now();
    interval(33).pipe(
      takeUntilDestroyed(this.destroyRef),
      takeUntil(this.stopScannerSubject),
      filter(() => this.countDown >= 0),
      map(() => {
        let frame: any = null;
        let resampledFrame: any = null;
        let ret: any = {valid: false, snap: false};
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
          this.displayWidth.set(width);
          this.displayHeight.set(height);      
          const dsize = new cv.Size(width, height);
          cv.resize(frame, resampledFrame, dsize, 0, 0, cv.INTER_NEAREST);      
          const maxContour = scanner.findPaperContour(resampledFrame);
          if (maxContour) {
            const cornerPoints = this.checkCornerPoints(scanner.getCornerPoints(maxContour, resampledFrame) as CornerPoints);          
            const {valid, snap} = this.checkDimensions(cornerPoints, width, height, count);
            if (valid) {
              blurry = this.checkBlurry(resampledFrame);
            }
            ret = {valid, snap, blurry, cornerPoints};
          }
          if (this.api.demo()) {
            ret = {valid: true, snap: true, blurry: false, cornerPoints: {
              topLeftCorner: { x: 50, y: 50 },
              topRightCorner: { x: width - 50, y: 50 },
              bottomLeftCorner: { x: 50, y: height - 50 },
              bottomRightCorner: { x: width - 50, y: height - 50 }
            } };
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
    ).subscribe((shape: {valid: boolean, snap: boolean, blurry: boolean, cornerPoints: CornerPoints} | null) => {
      this.setPoints(shape?.snap ? shape?.cornerPoints || null : null);

      // Check if timeout has elapsed and no valid edges found yet
      if (this.shouldShowTimeoutButton(shape)) {
        this.timeoutReached.set(true);
        this.displayCameraButton.set(true);
        this.displayMsgSubject.next($localize`Edges not detected. You can submit anyway.`);
      }
      
      // Hide camera button and reset timeout if valid edges are found after timeout
      if (shape?.valid && this.timeoutReached()) {
        this.timeoutReached.set(false);
        this.displayCameraButton.set(false);
      }

      if (shape?.cornerPoints) {
        shape.cornerPoints.topLeftCorner.x *= sampleRatio;
        shape.cornerPoints.topLeftCorner.y *= sampleRatio;
        shape.cornerPoints.topRightCorner.x *= sampleRatio;
        shape.cornerPoints.topRightCorner.y *= sampleRatio;
        shape.cornerPoints.bottomLeftCorner.x *= sampleRatio;
        shape.cornerPoints.bottomLeftCorner.y *= sampleRatio;
        shape.cornerPoints.bottomRightCorner.x *= sampleRatio;
        shape.cornerPoints.bottomRightCorner.y *= sampleRatio;
      }
      if (shape?.valid) {
        this.displayMsgSubject.next($localize`hold still...`);
        if (this.countDown > 0) {
          this.countDown -= 1;
        }
        if (!shape.blurry && this.countDown > 5) {
          this.countDown = 0;
        }
        if (this.countDown === 0) {
          this.displayCameraButton.set(true);
        }
        if (this.cameraClicked()) {
          this.extractAndNavigate(scanner, shape.cornerPoints);
        }
      } else {
        this.countDown = this.COUNTDOWN_INITIAL;
      }

      // Handle camera click when timeout was reached (use default corners)
      if (this.cameraClicked() && this.timeoutReached()) {
        const defaultCornerPoints = {
          topLeftCorner: { x: videoWidth * this.DEFAULT_CORNER_MARGIN, y: videoHeight * this.DEFAULT_CORNER_MARGIN },
          topRightCorner: { x: videoWidth * (1 - this.DEFAULT_CORNER_MARGIN), y: videoHeight * this.DEFAULT_CORNER_MARGIN },
          bottomLeftCorner: { x: videoWidth * this.DEFAULT_CORNER_MARGIN, y: videoHeight * (1 - this.DEFAULT_CORNER_MARGIN) },
          bottomRightCorner: { x: videoWidth * (1 - this.DEFAULT_CORNER_MARGIN), y: videoHeight * (1 - this.DEFAULT_CORNER_MARGIN) }
        };
        this.extractAndNavigate(scanner, defaultCornerPoints);
      }
    });
  }

  setPoints(cornerPoints: CornerPoints | null) {
    let points: CornerPoints;
    if (!cornerPoints) {
      points = {
        topLeftCorner: { x: this.displayWidth()*this.DEFAULT_CORNER_MARGIN, y: this.displayHeight()*this.DEFAULT_CORNER_MARGIN },
        topRightCorner: { x: this.displayWidth()*(1-this.DEFAULT_CORNER_MARGIN), y: this.displayHeight()*this.DEFAULT_CORNER_MARGIN },
        bottomLeftCorner: { x: this.displayWidth()*this.DEFAULT_CORNER_MARGIN, y: this.displayHeight()*(1-this.DEFAULT_CORNER_MARGIN) },
        bottomRightCorner: { x: this.displayWidth()*(1-this.DEFAULT_CORNER_MARGIN), y: this.displayHeight()*(1-this.DEFAULT_CORNER_MARGIN) }
      };
    } else {
      points = cornerPoints;
    }
    this.points.set([
      { x: points.topLeftCorner.x, y: points.topLeftCorner.y },
      { x: points.topRightCorner.x, y: points.topRightCorner.y },
      { x: points.bottomRightCorner.x, y: points.bottomRightCorner.y },
      { x: points.bottomLeftCorner.x, y: points.bottomLeftCorner.y }
    ]);
  }

  extractAndNavigate(scanner: any, cornerPoints: CornerPoints) {
    this.countDown = -1;
    const frame = scanner.extractPaper(this.canvasEl.nativeElement, 1060, 2000, cornerPoints);
    console.log('Extraction result:', frame);
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

  shouldShowTimeoutButton(shape: {valid: boolean} | null): boolean {
    const elapsedTime = Date.now() - this.scanStartTime;
    return elapsedTime >= this.TIMEOUT_DURATION && 
           !shape?.valid && 
           !this.timeoutReached();
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
    this.timeoutReached.set(false);
    this.scanStartTime = 0;
    console.log('RESTARTING SCANNER');
    timer(500).subscribe(() => {
      this.startScanner();
    });
  }
}
