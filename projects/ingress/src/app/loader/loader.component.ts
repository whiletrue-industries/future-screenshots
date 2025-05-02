import { AfterViewInit, Component, effect, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { PlatformService } from '../../../platform.service';
import { StateService } from '../../../state.service';
import { default as lottie, AnimationItem } from 'lottie-web';
import { from, Observable, switchMap, tap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { get } from 'http';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.less'
})
export class LoaderComponent implements AfterViewInit {

  loaded = signal<any>(null);
  animationComplete = signal(false);
  currentMessage = signal(-1);

  @ViewChild('animationContainer') animationContainer!: any;

  constructor(public state: StateService, private router: Router, private api: ApiService, 
      private route: ActivatedRoute, private platform: PlatformService,
      private http: HttpClient) { 
    this.api.updateFromRoute(this.route.snapshot);
    this.route.params.subscribe(params => {
      const currentImage = this.state.currentImage();
      if (!currentImage) {
        this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
      } else {
        this.api.startDiscussion(currentImage).pipe(
          switchMap((ret: any) => {
            const automatic = ret.automatic;
            if (automatic) {
              this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
              return from([]);
            } else {
              const item_key = ret?.item_key;
              const item_id = ret?.item_id;        
              return this.api.sendInitMessageNoStream(item_id, item_key).pipe(
                tap((status: any) => {
                  console.log('status', status);
                  this.loaded.set(ret);
                })
              );
            }
          }),
        ).subscribe((x: any) => {
        });
      }
    });
    effect(() => {
      const ret = this.loaded();
      const item_key = ret?.item_key;
      const item_id = ret?.item_id;
      if (item_key && item_id && this.animationComplete()) {
        this.router.navigate(['/discuss'], { queryParams: {'item-id': item_id, 'key': item_key}, queryParamsHandling: 'merge' });
      }
    });
  }

  ngAfterViewInit() {
    console.log('ZZZ');
    this.platform.browser(() => {
      console.log('ZZZ1');
      this.animationLoop();
    });
  }

  getAnimation(path: string, anim: AnimationItem | null, assetIdxs: any=null): Observable<AnimationItem> {
    const animationContainer = this.animationContainer.nativeElement;
    const itemUrl = this.state.currentImageUrl();
    console.log('ZZZ2', itemUrl);
    return this.http.get(path, { responseType: 'json' }).pipe(
      switchMap((data: any) => {
        console.log('ZZZ3', data);
        anim?.destroy();
        if (data.assets) {
          (data.assets as any[]).forEach((asset, idx) => {
            if (asset.p) {
              if (assetIdxs === null || assetIdxs.includes(idx)) {
                asset.p = itemUrl;
              }
            }
          });
        }
        const newAnim: AnimationItem = lottie.loadAnimation({
          container: animationContainer, // the dom element that will contain the animation
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: data,
        });
        newAnim.setSpeed(0.5);
        console.log('ZZZ5', this.currentMessage());
        this.currentMessage.update((msg) => msg + 1);
        return from(new Promise<AnimationItem>((resolve) => {
          newAnim.addEventListener('loopComplete', () => {
            resolve(newAnim);
          });
        }));
      }),
    );
  }

  animationLoop() {
    timer(1000).pipe(
      switchMap(() => this.getAnimation('loader1.json', null, [1])),
      switchMap((anim) => this.getAnimation('loader2.json', anim)),
      switchMap((anim) => this.getAnimation('loader3.json', anim)),
      switchMap((anim) => this.getAnimation('loader4.json', anim)),
    ).subscribe((anim) => {
      // anim.destroy();
      this.animationComplete.set(true);
    });
  }
}
