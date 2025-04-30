import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-complete',
  imports: [
    RouterLink
  ],
  templateUrl: './complete.component.html',
  styleUrl: './complete.component.less'
})
export class CompleteComponent {

  constructor(private route: ActivatedRoute, private api: ApiService) {    
    this.api.updateFromRoute(this.route.snapshot);
  }
}
