import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-confirm',
  imports: [
    RouterLink
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less'
})
export class ConfirmComponent {

  constructor(public state: StateService, router: Router) { 
    if (!this.state.currentImageUrl()) {
      router.navigate(['/scan']);
    }
  }
}
