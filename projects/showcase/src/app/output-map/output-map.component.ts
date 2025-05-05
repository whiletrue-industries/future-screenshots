import { AfterViewInit, Component, computed, effect, ElementRef, Input, OnInit, signal, ViewChild } from '@angular/core';

import { PlatformService } from '../../platform.service';
import { animationFrameScheduler, catchError, delay, distinct, distinctUntilChanged, filter, forkJoin, from, interval, last, map, max, ReplaySubject, Subject, switchMap, take, tap, timer } from 'rxjs';
import { ApiService } from '../api.service';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';

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

  @Input() clean = true;
  @Input() tag = '';
  @Input() language = '';
  // @Input() grid: Observable<GridItem[]>;
  @ViewChild('mapEl') mapElement: ElementRef;
  @ViewChild('clusterLabelsEl') clusterLabelsElement: ElementRef;
  @ViewChild('maskEl') maskElement: ElementRef;

  // Map
  map = signal<L.Map>(null as any);
  tileLayer: any = null;
  clusterLabelsLayer: L.SVGOverlay | null = null;
  maskLayer: L.SVGOverlay | null = null;

  // Global State
  config = signal<any>(null);
  viewInit = signal(false);
  currentZoom = signal(0);
  lang = signal('dutch');

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

  wdim = computed(() => {
    if (this.config()) {
      return this.config().dim[0];
    }
    return 0;
  });
  hdim = computed(() => {
    if (this.config()) {
      return this.config().dim[1] + this.config().padding_ratio;
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
  
  constructor(private api: ApiService, private platform: PlatformService, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe((params: { [x: string]: string; }) => {
      if (params['lang']) {
        this.lang.set(params['lang']);
      }
    });
    this.api.config.pipe(
      filter(config => !!config),
      take(1)
    ).subscribe((config) => {
      this.config.set(config);
      this.addToQueue();
    });
    effect(() => {
      if (this.viewInit() && this.config() && L) {
        console.log('GETTING MAP');
        const map = this.getMap(this.config());
        this.map.update((m) => {
          if (m) {
            m.remove();
          }
          return map;
        });
        this.loop(); 
      }
    });
  }

  ngOnInit() {
    this.tag = this.tag || this.activatedRoute.snapshot.queryParams['tag'];
    interval(60000).subscribe(() => {
      this.api.loadConfig(this.tag);
    });
    this.api.loadConfig(this.tag);
    if (this.language) {
      this.lang.set(this.language);
    }
  }

  ngAfterViewInit() {
    this.viewInit.set(true);
  }

  loop(): void {
    console.log('LOOPING');
    this.queue.pipe(
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
        this.map().flyToBounds(bounds, {animate: true, duration: 3});
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
      delay(1000),
      tap((item) => {
        this.clothespinSelected.set(true);
      }),
      delay(1000),
      // Show cone and wait for animation to finish
      tap((item) => {
        this.clothespinTextVisible.set('none');
        this.coneVisible.set(true);
      }),
      delay(8000),
      // Zoom cone in based on potential, rotate the overlay
      tap((item) => {
        let className = '-' + Math.abs(Math.round(item.metadata.rotate / 8));
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
        this.coneExpand.set(className);
        this.overlayTransform.set(`rotate(${-item.metadata.rotate}deg)`);
        this.mapTransform.set(`rotate(0deg)`);
      }),
      delay(8000),
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
    const maxMaxBounds: L.LatLngBoundsLiteral = [[-h * 2, -w], [h, w * 2]];
    console.log('BOUNDS', config.dim, config.conversion_ratio, bounds, maxBounds);
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
    const map = L.map(this.mapElement.nativeElement, {
      crs: L.CRS.Simple,
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
      console.log('Map move ended');
      this.currentZoom.set(map.getZoom());
      this.moveEnded.next();
    });
    this.tileLayer = new L.TileLayer(`https://storage.googleapis.com/chronomaps3-eu/tiles/${this.tag}/${config.set_id}/{z}/{x}/{y}.png`, {
        maxZoom: 8,
        minZoom: 2,
        bounds: maxMaxBounds,
        errorTileUrl: 'empty.png'
    });
    this.tileLayer.addTo(map);
    timer(0).subscribe(() => {
      const maskElement = this.maskElement.nativeElement.querySelector('svg');
      this.maskLayer = L.svgOverlay(maskElement, bounds);
      this.maskLayer.addTo(map);
      const clusterLabelsElement = this.clusterLabelsElement.nativeElement.querySelector('svg');
      this.clusterLabelsLayer = L.svgOverlay(clusterLabelsElement, bounds);
      this.clusterLabelsLayer.addTo(map);
    });
    return map;
  }

  addToQueue() {
    if (this.config()) {
      const grid = this.config().grid;
      const index = Math.floor(Math.random() * grid.length);
      const item = grid[index];
      this.queue.next(item);
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
      let current = {x: maskBase.x, y: maskBase.y + r};
      ret.push(current);
      for (const d of directions) {
        for (let i = 0; i < r; i++) {
          current = {x: current.x + d.x, y: current.y + d.y};
          ret.push(current);
        }
      }
      r++;
    }
    return ret.slice(0, maskAmount);
  }
}
