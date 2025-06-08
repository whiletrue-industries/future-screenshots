import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  public L = null;

  constructor(private platform: PlatformService) {
    if (this.platform.browser()) {
      this.L = require('leaflet');
    }
  }

}