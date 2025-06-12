import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompletionImageComponent } from "../completion-image/completion-image.component";

@Component({
  selector: 'app-direct-to-map',
  imports: [
    RouterLink,
    CompletionImageComponent
],
  templateUrl: './direct-to-map.component.html',
  styleUrl: './direct-to-map.component.less'
})
export class DirectToMapComponent {

}
