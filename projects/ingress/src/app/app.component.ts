import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformService } from '../../platform.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  
  constructor(private platform: PlatformService) {
    this.platform.browser(() => {
      try {
        const orientation: any = window.screen.orientation;
        if (screen && orientation?.lock) {
          orientation?.lock('portrait').then(() => {
            console.log('Screen orientation locked to portrait');
          });
        }          
      } catch (e) {
        console.error('Error locking screen orientation', e);
      }
    });
  }
}
