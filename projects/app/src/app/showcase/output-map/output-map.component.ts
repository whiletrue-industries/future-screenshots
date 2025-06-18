import { AfterViewInit, Component, computed, effect, ElementRef, Input, OnInit, signal, ViewChild } from '@angular/core';

import { animationFrameScheduler, catchError, debounceTime, delay, distinct, distinctUntilChanged, filter, forkJoin, from, interval, last, map, max, ReplaySubject, Subject, switchMap, take, tap, timer } from 'rxjs';
// import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlatformService } from '../../../platform.service';
import { ShowcaseApiService } from '../../../showcase-api.service';
import { LeafletService } from '../../../leaflet.service';

import * as Sentry from "@sentry/angular";
// import * as L from '@types/leaflet';

// import { type Map } from 'leaflet';
// import * as _L from 'leaflet';
// import { Observable } from 'rxjs';
// import { ApiService } from '../api.service';
// import { GridItem } from '../datatypes';
// import { LayoutService } from '../layout.service';
// import { NormalityLayer } from '../map/normality-layer';

type MaskItem = {x: number, y: number};

@Component({
  selector: 'app-output-map',
  templateUrl: './output-map.component.html',
  styleUrls: ['./output-map.component.less']
})
export class OutputMapComponent implements OnInit, AfterViewInit {

  @Input() tag = 'main';
  @Input() language = '';
  @Input() doLoop = false;

  // @Input() grid: Observable<GridItem[]>;
  @ViewChild('mapEl') mapElement: ElementRef;
  @ViewChild('clusterLabelsEl') clusterLabelsElement: ElementRef;
  @ViewChild('maskEl') maskElement: ElementRef;

  // Map
  L: any;
  map = signal<L.Map>(null as any);
  tileLayer: any = null;
  clusterLabelsLayer: L.SVGOverlay | null = null;
  maskLayer: L.SVGOverlay | null = null;

  // Global State
  config = signal<any>(null);
  viewInit = signal(false);
  currentZoom = signal(0);
  lang = signal('dutch');
  sortCorrectly = true;
  currentIndex = 0;

  // Loop state
  clusterLabelsVisible = signal(false);
  showClusters = true;
  itemImg = signal('');
  itemImgVisible = signal(false);
  mapTransform = signal('rotate(0deg)');
  overlayTransform = signal('rotate(0deg)');
  clothespinTextVisible = signal('none');
  clothespinVisible = signal('none');
  clothespinSelected = signal(false);
  coneVisible = signal(false);
  coneExpand = signal('')
  selectedLabel = signal(-1);

  // Mask
  maskAmount = signal(20);
  maskBase = signal<MaskItem>({x: 10, y: 10});
  maskLayerVisible = signal(false);

  maskItems = computed<MaskItem[]>(() => {
    const maskAmount = this.maskAmount();
    const maskBase = this.maskBase();
    return this.calculateMask(maskAmount, maskBase);
  });

  queue = new ReplaySubject<any>(1);
  moveEnded = new Subject<void>();
  mapChangingOpportunity = new Subject<void>();
  looped = new Subject<void>();

  wdim = computed(() => {
    if (this.config()) {
      return this.config().dim[0] + this.config().padding_ratio;
    }
    return 0;
  });
  hdim = computed(() => {
    if (this.config()) {
      return this.config().dim[1];
    }
    return 0;
  });
  w = computed(() => {
    if (this.config()) {
      return this.wdim() * this.config().conversion_ratio[0];
    }
    return 0;
  });
  h = computed(() => {
    if (this.config()) {
      return this.hdim() * this.config().conversion_ratio[1];
    }
    return 0;
  });
  bounds = computed<L.LatLngBoundsLiteral>(() => {
    return [[-this.h(), 0], [0, this.w()]];
  });
  
  constructor(private api: ShowcaseApiService, private platform: PlatformService, private activatedRoute: ActivatedRoute, private leafletService: LeafletService) {
    this.L = this.leafletService.L;
    activatedRoute.queryParams.subscribe((params: { [x: string]: string; }) => {
      this.setLanguage();
      this.tag = params['tag'] || this.tag;
    });
    this.api.config.pipe(
      takeUntilDestroyed(),
      filter(config => !!config),
    ).subscribe((config) => {
      config.clusters.forEach((cluster: any) => {
        cluster.x = (cluster.bounds[0][0] + cluster.bounds[1][0]) / 2 * config.conversion_ratio[0];
        cluster.y = (cluster.bounds[0][1] + cluster.bounds[1][1]) / 2 * config.conversion_ratio[1];
        cluster.w = (cluster.bounds[1][0] - cluster.bounds[0][0]) * config.conversion_ratio[0];
        cluster.h = (cluster.bounds[1][1] - cluster.bounds[0][1]) * config.conversion_ratio[1];
        cluster.fontSize = {};
        Object.keys(cluster.title).forEach((key) => {
          const title = cluster.title[key];
          cluster.fontSize[key] = cluster.w / (title.length * 0.75);
        });
      });
      config.grid = config.grid.sort((a: any, b: any) => {
        return -((a.metadata.timestamp as string)?.localeCompare(b.metadata.timestamp) || 0);
      });
      this.sortCorrectly = true;
      this.currentIndex = 0;
      this.config.set(config);
    });
    this.platform.browser(() => {
      this.looped.pipe(
        takeUntilDestroyed(),
        tap(() => {
          console.log('WATCHDOG RESETTING');
        }),
        debounceTime(60000),
        tap(() => {
          Sentry.captureMessage("WATCHDOG RELOADING", {
            extra: {
              tag: this.tag,
              config: this.config(),
              sortCorrectly: this.sortCorrectly,
              currentIndex: this.currentIndex,
            },
            level: "warning"
          });
        }),
        delay(1000),
      ).subscribe(() => {
        console.log('WATCHDOG RELOADING');
        window.location.reload();
      });
      this.api.config.pipe(
        filter(config => !!config),
        take(1),
        delay(2000),
        tap(() => {
          this.mapChangingOpportunity.next();
          this.addToQueue();
        }),
        delay(2000),
      ).subscribe(() => {
        if (this.doLoop) {
          this.loop();
        }
      });
      effect(() => {
        if (this.viewInit() && this.config() && this.L) {
          console.log('LANG GETTING MAP?');
          this.mapChangingOpportunity.pipe(
            take(1)
          ).subscribe(() => {
            console.log('LANG GETTING MAP!');
            this.map.update((m) => {
              if (m) {
                this.tileLayer.remove();
                this.addTileLayer(m);
                return m;
              } else {
                const map = this.getMap(this.config());
                return map;  
              }
            });
          });
        }
      });
      effect(() => {
        const currentZoom = this.currentZoom();
        if (!this.doLoop && this.clusterLabelsLayer) {
          if (currentZoom < 4) {
            this.clusterLabelsLayer.setOpacity(1.0);
            this.clusterLabelsVisible.set(true);
          } else if (currentZoom > 4.5) {
            this.clusterLabelsLayer.setOpacity(0.0);
            this.clusterLabelsVisible.set(false);
          } else {
            this.clusterLabelsLayer.setOpacity(1 - (currentZoom - 4) / 0.5);
            this.clusterLabelsVisible.set(true);
          }
        }
      });
      interval(60000).pipe(
        takeUntilDestroyed(),
      ).subscribe(() => {
        this.api.loadConfig(this.tag);
      });
    });
  }

  ngOnInit() {
    this.tag = this.tag || this.activatedRoute.snapshot.queryParams['tag'];
    this.api.loadConfig(this.tag);
  }

  setLanguage(lang?: string) {
    const options = [this.activatedRoute.snapshot.queryParams['lang'], lang, this.language, 'english'];
    const cluster = this.config()?.clusters?.[0]?.title;
    console.log('LANG OPTIONS', options);
    console.log('LANG CLUSTER', cluster);
    if (cluster) {
      for (let option of options) {
        if (option) {
          option = option.toLowerCase();
          if (cluster[option]) {
            this.lang.set(option);
            return;
          }
        }
      }
    }
    this.lang.set(options[options.length - 1]);
  }

  ngAfterViewInit() {
    this.viewInit.set(true);
    this.setLanguage();
  }

  loop(): void {
    this.looped.next();
    this.queue.pipe(
      tap((item) => {
        this.looped.next();
        console.log('LANG QUEUE', item?.id);
      }),
      filter((item) => !!item),
      distinctUntilChanged(),
      // Load item & image
      tap((item) => {
        let url: string = item.metadata.url;
        url = url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
        this.itemImg.set(url);
      }),
      // Show the mask with single item
      tap((item) => {
        this.maskBase.set({x: item.pos[0], y: item.pos[1]});
        this.maskAmount.set(1);
      }),
      delay(1000),
      tap((item) => {
        this.maskLayerVisible.set(true);
      }),
      delay(3000),
      // Fit item to bounds
      switchMap((item) => {      
        console.log('New item in queue:', item);
        const bounds = item.geo_bounds as L.LatLngBoundsLiteral;
        // console.log('BOUNDS PRE', JSON.stringify(bounds), this.config().conversion_ratio);
        const conv_ratio = this.config().conversion_ratio;
        const cell_ratios = this.config().cell_ratios || [1, 1];
        const expand = [1,0].map((i) => {
          return conv_ratio[i] * (1.5 / cell_ratios[i] - 1);
        });
        // console.log('CONV_RATIO', conv_ratio);
        // console.log('CELL_RATIOS', cell_ratios);
        // console.log('EXPAND', expand);
        bounds[0][0] -= expand[0];
        bounds[0][1] -= expand[1];
        bounds[1][0] += expand[0];
        bounds[1][1] += expand[1];
        // console.log('BOUNDS POST', JSON.stringify(bounds));
        this.map().flyToBounds(bounds, {animate: true, duration: 5});
        this.clusterLabelsVisible.set(false);
        this.overlayTransform.set(`rotate(${-item.metadata.rotate}deg)`);
        return this.moveEnded.pipe(take(1), map(() => item));
      }),
      // Rotate the map and show the overlay
      tap((item) => {
        this.clusterLabelsVisible.set(false);
        this.mapTransform.set(`rotate(${item.metadata.rotate}deg)`);
        this.overlayTransform.set(`rotate(0deg)`);
        this.itemImgVisible.set(true);
      }),
      delay(1000),
      // When image is loaded, show the overlay <-- not checking atm
      // Show clothespins
      tap((item) => {
        this.clothespinTextVisible.set('both');
        this.clothespinVisible.set('both');
      }),
      delay(1000),
      // Move clothespins to the new position
      tap((item) => {
        if (item.metadata.sign > 0) {
          this.clothespinTextVisible.set('prefer');
          this.clothespinVisible.set('prefer');
        } else if (item.metadata.sign < 0) {
          this.clothespinTextVisible.set('prevent');
          this.clothespinVisible.set('prevent');
        }
      }),
      delay(500),
      tap((item) => {
        this.clothespinSelected.set(true);
      }),
      delay(500),
      // Show cone and wait for animation to finish
      tap((item) => {
        this.clothespinTextVisible.set('none');
        this.coneVisible.set(true);
      }),
      delay(4000),
      // Zoom cone in based on potential, rotate the overlay
      tap((item) => {
        this.selectedLabel.set(Math.round(item.metadata.rotate / 8));
        let className = '-' + Math.abs(this.selectedLabel());
        if (item.metadata.rotate > 0) {
          className = 'expand-p' + className;
        } else if (item.metadata.rotate < 0) {
          className = 'expand-n' + className;
        } else {
          className = 'expand-' + className;
        }
        if (this.mapElement.nativeElement.offsetWidth > this.mapElement.nativeElement.offsetHeight) {
          className = className + '  h';
        } else {
          className = className + '  v';
        }
        // console.log('CONE ROTATE', item.metadata.rotate, className);
        this.coneExpand.set(className);
        this.overlayTransform.set(`rotate(${-item.metadata.rotate}deg)`);
        this.mapTransform.set(`rotate(0deg)`);
        this.mapChangingOpportunity.next();
      }),
      delay(5000),
      // Hide the overlay
      tap((item) => {
        this.itemImgVisible.set(false);
      }),
      delay(1000),
      // fitToBounds map while updating the mask
      switchMap((item) => {
        this.clothespinSelected.set(false);
        this.coneVisible.set(false);
        this.coneExpand.set('');
        this.clusterLabelsVisible.set(true);
        console.log('LANGUAGE ITEM', item.metadata);
        this.setLanguage(item.metadata.lang);
        const duration = 5;
        const frameRate = 33;
        this.map().flyToBounds(this.bounds(), {animate: true, duration: duration, easeLinearity: 1.0 });
        const count = Math.ceil(duration * 1000 / frameRate);
        return forkJoin([
          interval(33, animationFrameScheduler).pipe(
            take(count),
            tap((i) => {
              const total = (this.wdim() ** 2) * 3;
              const amount = ((i+1) / count) ** 5;
              this.maskAmount.set(Math.ceil(amount*total));
            }),
          ),
          this.moveEnded.pipe(take(1), map(() => item))
        ]);
      }),
      // Show the cluster labels
      tap((item) => {
        this.clothespinVisible.set('none');
        this.maskLayerVisible.set(false);
      }),
      delay(3000),
      catchError((err) => {
        return from(['error: ' + err]);
      }),
    ).subscribe((item) => {
      console.log('Finished with item', item);
      this.addToQueue();
    });
  }

  getMap(config: any) {
    const w = this.w();
    const h = this.h();
    const bounds = this.bounds();
    const expandRatio = 0.333;
    const maxBounds: L.LatLngBoundsLiteral = [[-h * (1 + expandRatio), -w * expandRatio], [h * expandRatio, w * (1 + expandRatio)]];
    console.log('BOUNDS', config.dim, config.conversion_ratio, bounds, maxBounds);
    const map = this.L.map(this.mapElement.nativeElement, {
      crs: this.L.CRS.Simple,
      maxBounds: maxBounds,
      center: [bounds[0][0] / 2, bounds[1][1] / 2],
      zoom: 2,
      maxZoom: 8,
      minZoom: 2,
      zoomSnap: 0,
      zoomControl: false,
      attributionControl: false
    });
    map.fitBounds(bounds);
    map.on('moveend', () => {
      // console.log('Map move ended');
      this.currentZoom.set(map.getZoom());
      this.moveEnded.next();
    });
    this.addTileLayer(map);
    timer(0).subscribe(() => {
      if (this.doLoop) {
        const maskElement = this.maskElement.nativeElement.querySelector('svg');
        this.maskLayer = this.L.svgOverlay(maskElement, bounds);
        this.maskLayer?.addTo(map);
      }
      const clusterLabelsElement = this.clusterLabelsElement.nativeElement.querySelector('svg');
      this.clusterLabelsLayer = this.L.svgOverlay(clusterLabelsElement, bounds);
      this.clusterLabelsLayer?.addTo(map);
    });
    return map;
  }

  addTileLayer(map: L.Map) {
    const maxMaxBounds: L.LatLngBoundsLiteral = [[-this.h() * 2, -this.w()], [this.h(), this.w() * 2]];
    const config = this.config();
    this.tileLayer = new this.L.TileLayer(`https://storage.googleapis.com/chronomaps3-eu/tiles/${this.tag}/${config.set_id}/{z}/{x}/{y}.png`, {
      maxZoom: 8,
      minZoom: 2,
      bounds: maxMaxBounds,
      errorTileUrl: 'empty.png'
    });
    this.tileLayer.addTo(map);
  }

  addToQueue() {
    if (this.config()) {
      let item = null;
      const grid = this.config().grid;
      if (grid && grid.length > 0) {
        while (!item) {
          let index = this.currentIndex;
          if (!this.sortCorrectly) {
            index = Math.floor(Math.random() * grid.length);          
          } 
          item = grid[index];
          this.currentIndex++;
          if (this.currentIndex >= grid.length) {
            this.currentIndex = 0;
            this.sortCorrectly = false;
          }
        }
        // console.log('ITEM', item);
        this.queue.next(item);
      }
    }
  }

  calculateMask(maskAmount: number, maskBase: MaskItem): MaskItem[] {
    const directions: MaskItem[] = [
      {x: 1, y: -0.5},
      {x: 0, y: -1},
      {x: -1, y: -0.5},
      {x: -1, y: 0.5},
      {x: 0, y: 1},
      {x: 1, y: 0.5},
    ]
    const ret: MaskItem[] = [maskBase];
    let r = 1;
    while (ret.length < maskAmount) {
      let current = {x: maskBase.x + r, y: maskBase.y};
      ret.push(current);
      for (const d of directions) {
        for (let i = 0; i < r; i++) {
          current = {x: current.x + d.y, y: current.y + d.x};
          ret.push(current);
        }
      }
      r++;
    }
    return ret.slice(0, maskAmount);
  }
}
