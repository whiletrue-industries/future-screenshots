import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformService } from '../../../platform.service';

@Component({
  selector: 'app-redirector',
  imports: [],
  templateUrl: './redirector.component.html',
  styleUrl: './redirector.component.less'
})
export class RedirectorComponent {

  constructor(private route: ActivatedRoute, private router: Router, private platform: PlatformService) {
    this.platform.browser(() => {
      console.log('Redirecting to:', this.route.snapshot.data);
      const redirectTo = this.route.snapshot.data['redirectTo'];
      console.log('Redirecting to:', redirectTo);
      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
