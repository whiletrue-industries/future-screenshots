import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirector',
  imports: [],
  templateUrl: './redirector.component.html',
  styleUrl: './redirector.component.less'
})
export class RedirectorComponent {

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('Redirecting to:', this.route.snapshot.data);
    const redirectTo = this.route.snapshot.data['redirectTo'];
    console.log('Redirecting to:', redirectTo);
    if (redirectTo) {
      this.router.navigateByUrl(redirectTo, { replaceUrl: true });
    } else {
      this.router.navigate(['/']);
    }
  }
}
