import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';

@Component({
  selector: 'app-confirm',
  imports: [
    RouterLink,
    LtrDirective
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less'
})
export class ConfirmComponent {

  constructor(public state: StateService, private router: Router, private api: ApiService, private route: ActivatedRoute) { 
    this.api.updateFromRoute(this.route.snapshot);
    if (!this.state.currentImageUrl()) {
      // this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }
}
