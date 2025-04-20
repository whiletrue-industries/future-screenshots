import { AfterViewInit, Component, computed, effect, ElementRef, Input, OnInit, signal, ViewChild } from '@angular/core';

import { PlatformService } from '../../platform.service';
import { delay, distinct, distinctUntilChanged, filter, interval, map, max, ReplaySubject, Subject, switchMap, take, tap, timer } from 'rxjs';
import { ApiService } from '../api.service';
import * as L from 'leaflet';

// import { type Map } from 'leaflet';
// import * as _L from 'leaflet';
// import { Observable } from 'rxjs';
// import { ApiService } from '../api.service';
// import { GridItem } from '../datatypes';
// import { LayoutService } from '../layout.service';
// import { NormalityLayer } from '../map/normality-layer';

@Component({
  selector: 'app-output-map',
  templateUrl: './output-map.component.html',
  styleUrls: ['./output-map.component.less']
})
export class OutputMapComponent {

  @Input() clean = true;
  // @Input() grid: Observable<GridItem[]>;
  @ViewChild('mapEl') mapElement: ElementRef;
  @ViewChild('clusterLabelsEl') clusterLabelsElement: ElementRef;
  map = signal<L.Map>(null as any);
  tileLayer: any = null;
  svgLayer: any = null;
  showClusters = true;
  config = signal<any>(null);
  viewInit = signal(false);
  currentZoom = signal(0);
  clusterLabelsVisible = computed(() => {
    return this.currentZoom() < 4;
  });

  queue = new ReplaySubject<any>(1);
  moveEnded = new Subject<void>();

  w = computed(() => {
    if (this.config()) {
      return this.config().dim[0] * this.config().conversion_ratio[0];
    }
    return 0;
  });
  h = computed(() => {
    if (this.config()) {
      return (this.config().dim[1] + this.config().padding_ratio) * this.config().conversion_ratio[1];
    }
    return 0;
  });
  bounds = computed<L.LatLngBoundsLiteral>(() => {
    return [[-this.h(), 0], [0, this.w()]];
  });
  
  constructor(private api: ApiService, private platform: PlatformService) {
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

  loop(): void {
    console.log('LOOPING');
    this.queue.pipe(
      filter((item) => !!item),
      distinctUntilChanged(),
      switchMap((item) => {      
        console.log('New item in queue:', item);
        this.map().flyToBounds(item.geo_bounds as L.LatLngBoundsLiteral, {animate: true, duration: 3});
        return this.moveEnded.pipe(take(1), map(() => item));
      }),
      delay(5000),
      switchMap((item) => {
        this.map().flyToBounds(this.bounds(), {animate: true, duration: 3});
        return this.moveEnded.pipe(take(1), map(() => item));
      }),
      delay(1000),
    ).subscribe((item) => {
      console.log('Finished with item', item);
      this.addToQueue();
    });
  }

  ngAfterViewInit() {
    this.viewInit.set(true);
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
      cluster.fontSize = cluster.w / (cluster.title.length * 0.75);
      console.log(cluster);
    });
    const map = L.map(this.mapElement.nativeElement, {
      crs: L.CRS.Simple,
      maxBounds: maxBounds,
      center: [bounds[0][0] / 2, bounds[1][1] / 2],
      zoom: 2,
      maxZoom: 8,
      minZoom: 2,
      zoomSnap: 0,
      // zoomDelta: 1,
      // wheelPxPerZoomLevel: 20,
      zoomControl: false,
      attributionControl: false
    });
    map.fitBounds(bounds);
    // Print bounds whenever the map is moved:
    map.on('moveend', () => {
      console.log('Map move ended');
      this.currentZoom.set(map.getZoom());
      this.moveEnded.next();
    //   const bounds = this.map.getBounds();
    //   const center = this.map.getCenter();
    //   const zoom = this.map.getZoom();
    //   console.log('Bounds:', bounds);
    //   console.log('Center:', center);
    //   console.log('Zoom:', zoom);
    });
    // this.map.on('moveend', () => {     
    // if (this.layout.desktop && !this.clean) {
      new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);
    // }
    // Tile layers
    this.tileLayer = new L.TileLayer(`https://storage.googleapis.com/chronomaps3.firebasestorage.app/tiles/4d2c04b0-51b7-4aa2-a234-0e4be53447de/0/{z}/{x}/{y}.png`, {
        maxZoom: 8,
        minZoom: 2,
        bounds: maxMaxBounds,
        errorTileUrl: 'empty.png'
    });
    this.tileLayer.addTo(map);
    timer(0).subscribe(() => {
      const svgElement = this.clusterLabelsElement.nativeElement.querySelector('svg');
      console.log('ADDING SVG', svgElement);
      this.svgLayer = L.svgOverlay(svgElement, bounds);
      this.svgLayer.addTo(map);
      // this.normalityLayer = new NormalityLayer(this.map, this.grid);
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
  // set feature(feature: string) {
  //   if (this._feature) {
  //     this.map.removeLayer(this.tileLayers[this._feature]);
  //   }
  //   this._feature = feature;
  //   this.tileLayers[this._feature].addTo(this.map);
  // }

  // get feature(): string {
  //   return this._feature;
  // }

}
