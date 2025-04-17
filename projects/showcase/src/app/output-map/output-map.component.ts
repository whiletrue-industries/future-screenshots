import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { PlatformService } from '../../platform.service';
import { filter, interval, map, max, switchMap, take, timer } from 'rxjs';
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
  @ViewChild('map') mapElement: ElementRef;
  map: any = null;
  // map: L.Map | null = null;
  // L: any;
  tileLayers: any = null;
  showClusters = true;
  config: any = null;
  
  constructor(private api: ApiService, private platform: PlatformService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.platform.browser()) {
      this.api.config.pipe(
        filter((config) => !!config),
        take(1),
        switchMap((config) => {
          return interval(100).pipe(
            filter(() => !!window['L']),
            take(1),
            map(() => config)
          );
        })
      ).subscribe((config) => {
        this.config = config;
        this.map = this.getMap(config);
      });
    }
  }

  getMap(config: any) {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    const w = config.dim[0] * config.conversion_ratio[0];
    const h = config.dim[1] * config.conversion_ratio[1];
    const bounds = [[-h, 0], [0, w]];
    const expandRatio = 0.333;
    const maxBounds = [[-h * (1 + expandRatio), -w * expandRatio], [h * expandRatio, w * (1 + expandRatio)]];
    console.log('BOUNDS', config.dim, config.conversion_ratio, bounds, maxBounds);
    config.clusters.forEach((cluster: any) => {
      cluster.x = (cluster.bounds[0][0] + cluster.bounds[1][0]) / config.dim[0] * 50;
      cluster.y = (cluster.bounds[0][1] + cluster.bounds[1][1]) / config.dim[1] * 50;
      console.log(cluster);
    });
    if (!this.map) {
      this.map = L.map(this.mapElement.nativeElement, {
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
        this.map.fitBounds(bounds);
      });
      timer(2000).subscribe(() => {
        this.map.on('moveend', () => {
          this.showClusters = false;
        });
      });
      // Print bounds whenever the map is moved:
      // this.map.on('moveend', () => {
      //   const bounds = this.map.getBounds();
      //   const center = this.map.getCenter();
      //   const zoom = this.map.getZoom();
      //   console.log('Bounds:', bounds);
      //   console.log('Center:', center);
      //   console.log('Zoom:', zoom);
      // });
      // this.map.on('moveend', () => {     
      // if (this.layout.desktop && !this.clean) {
        new L.Control.Zoom({ position: 'bottomleft' }).addTo(this.map);
      // }
      // Tile layers
      this.tileLayers = L.tileLayer(`https://storage.googleapis.com/chronomaps3.firebasestorage.app/tiles/4d2c04b0-51b7-4aa2-a234-0e4be53447de/0/{z}/{x}/{y}.png`, {
          maxZoom: 8,
          // minZoom: configuration.min_zoom,
          // bounds: [[-configuration.dim - 1, 0], [-1, configuration.dim]],
          errorTileUrl: 'empty.png'
      });
      this.tileLayers.addTo(this.map);
      // this.normalityLayer = new NormalityLayer(this.map, this.grid);
    }
    return this.map;
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
