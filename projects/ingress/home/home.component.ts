import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  constructor(private route: ActivatedRoute, private api: ApiService) {    
    this.api.updateFromRoute(this.route.snapshot);
  }
}
