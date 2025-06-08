import { Component, signal } from '@angular/core';
import { OutputMapComponent } from "../../../../showcase/src/app/output-map/output-map.component";
import { MainMenuComponent } from "../main-menu/main-menu.component";
import { PlatformService } from '../../../platform.service';

@Component({
  selector: 'app-home',
  imports: [OutputMapComponent, MainMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  tag = signal('main');
  mainMenuOpen = signal(false);
  browser = false;

  constructor(private platform: PlatformService) {
    this.platform.browser(() => {
      this.browser = true;
    });
  }
}
