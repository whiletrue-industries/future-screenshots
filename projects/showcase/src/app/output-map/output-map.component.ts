import { AfterViewInit, Component, computed, effect, ElementRef, Input, OnInit, signal, ViewChild } from '@angular/core';

import { PlatformService } from '../../platform.service';
import { delay, filter, interval, map, max, switchMap, take, tap, timer } from 'rxjs';
import { ApiService } from '../api.service';

// import { type Map } from 'leaflet';
// import * as _L from 'leaflet';
// import { Observable } from 'rxjs';
// import { ApiService } from '../api.service';
// import { GridItem } from '../datatypes';
// import { LayoutService } from '../layout.service';
// import { NormalityLayer } from '../map/normality-layer';

declare const L: any;
declare const window: any;

@Component({
  selector: 'app-output-map',
  templateUrl: './output-map.component.html',
  styleUrls: ['./output-map.component.less']
})
export class OutputMapComponent implements OnInit {

  @Input() clean = true;
  // @Input() grid: Observable<GridItem[]>;
  @ViewChild('mapEl') mapElement: ElementRef;
  @ViewChild('clusterLabelsEl') clusterLabelsElement: ElementRef;
  map = signal<any>(null);
  tileLayer: any = null;
  svgLayer: any = null;
  showClusters = true;
  config = signal<any>(null);
  L = signal<any>(null);
  viewInit = signal(false);
  currentZoom = signal(0);
  clusterLabelsVisible = computed(() => {
    return this.currentZoom() < 4;
  });

  w = computed(() => {
    if (this.config()) {
      return this.config().dim[0] * this.config().conversion_ratio[0];
    }
    return 0;
  });
  h = computed(() => {
    if (this.config()) {
      return (this.config().dim[1] + 0.285) * this.config().conversion_ratio[1];
    }
    return 0;
  });
  
  constructor(private api: ApiService, private platform: PlatformService) {
    if (platform.browser()) {
      interval(100).pipe(
        filter(() => !!window['L']),
        take(1),
        map(() => window['L'])
      ).subscribe((L) => {
        this.L.set(L);
        console.log('L', L);
      });
    }
    this.api.config.pipe(
      filter(config => !!config),
      take(1)
    ).subscribe((config) => {
      this.config.set(config);
    });
    effect(() => {
      if (this.viewInit() && this.config() && this.L()) {
        console.log('GETTING MAP');
        const map = this.getMap(this.config());
        this.map.update((m) => {
          if (m) {
            m.remove();
          }
          return map;
        });
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewInit.set(true);
  }

  getMap(config: any) {
    const w = this.w();
    const h = this.h();
    const bounds = [[-h, 0], [0, w]];
    const expandRatio = 0.333;
    const maxBounds = [[-h * (1 + expandRatio), -w * expandRatio], [h * expandRatio, w * (1 + expandRatio)]];
    const maxMaxBounds = [[-h * 2, -w], [h, w * 2]];
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
    timer(1000).subscribe(() => {
      map.fitBounds(bounds);
    });
    // Print bounds whenever the map is moved:
    map.on('moveend', () => {
      this.currentZoom.set(map.getZoom());
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
    this.tileLayer = L.tileLayer(`https://storage.googleapis.com/chronomaps3.firebasestorage.app/tiles/4d2c04b0-51b7-4aa2-a234-0e4be53447de/0/{z}/{x}/{y}.png`, {
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
