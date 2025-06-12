import { AfterViewInit, Component, DestroyRef, ElementRef, signal, ViewChild } from '@angular/core';
import { OutputMapComponent } from "../showcase/output-map/output-map.component";
import { MAIN_MENU_HEIGHT, MainMenuComponent } from "../main-menu/main-menu.component";
import { PlatformService } from '../../platform.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  imports: [OutputMapComponent, MainMenuComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements AfterViewInit {
  tag = signal('main');
  mainMenuOpen = signal(false);
  browser = false;

  menuHeight = MAIN_MENU_HEIGHT;

  about = signal(false);

  @ViewChild('mapContainer') mapContainer: ElementRef<HTMLElement>;
  @ViewChild(OutputMapComponent) outputMap: OutputMapComponent;

  constructor(private platform: PlatformService, private destroyRef: DestroyRef, private route: ActivatedRoute) {
    this.platform.browser(() => {
      this.browser = true;
    });
    this.route.queryParams.subscribe(params => {
      const tag = params['tag'] || 'main';
      this.tag.set(tag);
    });
  }

  ngAfterViewInit() {
    this.platform.browser(() => {
      new Observable<ResizeObserverEntry[]>((observer) => {
        const resize = new ResizeObserver((entries) => {
          observer.next(entries);
        });
        resize.observe(this.mapContainer.nativeElement);
        const unsubscribe = () => {
          resize.disconnect();
        };
        return unsubscribe;
      }).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe((entries) => {
        const entry = entries[0];
        if (entry) {
          const map = this.outputMap.map();
          if (map) {
            const latlng = map.getCenter();
            map.invalidateSize();
            map.flyTo(latlng);
          }
        }
      });
    });
  }
}
