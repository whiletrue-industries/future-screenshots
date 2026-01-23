import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  safari = false;
  ios = false;
  isDesktop = false;
  isMobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.browser(() => {
      const stringWithPlatform = window.navigator?.platform || window.navigator?.userAgent;
      const hasTouchEvents = 'ontouchend' in document;

      if (stringWithPlatform.indexOf('Safari') != -1 && 
          stringWithPlatform.indexOf('Chrome') == -1) {
        this.safari = true;
      }

      if (/iPad|iPhone|iPod/.test(stringWithPlatform)) {
        this.ios = true;
      } else {
        // The new iPad return MacIntel as platform and Macintosh as userAgent
        // so the way to differentiate iPad vs mac is by checking if
        // Touch Events exist on the document
        if (/Mac/.test(stringWithPlatform) && hasTouchEvents) {
          this.ios = true;
        }
      }

      // Detect desktop: device without touch events
      this.isDesktop = !hasTouchEvents;
      
      // Detect mobile: device with mobile user agent OR (touch events AND small screen)
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasSmallScreen = window.innerWidth <= 768;
      this.isMobile = isMobileDevice || (hasTouchEvents && hasSmallScreen);
    });
  }

  browser<T>(callable?: () => void): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (callable) {
        callable();
      }
      return true;
    }
    return false;
  }

  server<T>(callable?: () => void): boolean {
    if (isPlatformServer(this.platformId)) {
      if (callable) {
        callable();
      }
      return true;
    }
    return false;
  }
}
