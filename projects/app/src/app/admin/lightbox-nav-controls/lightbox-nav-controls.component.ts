import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lightbox-nav-controls',
  imports: [CommonModule],
  templateUrl: './lightbox-nav-controls.component.html',
  styleUrl: './lightbox-nav-controls.component.less'
})
export class LightboxNavControlsComponent {
  // Inputs: state from parent
  selectedItemIndex = input<number>(-1);
  totalItems = input<number>(0);
  prevDisabled = input<boolean>(false);
  nextDisabled = input<boolean>(false);

  // Outputs: events for parent to handle
  prevItem = output<void>();
  nextItem = output<void>();

  onPrevItem(): void {
    this.prevItem.emit();
  }

  onNextItem(): void {
    this.nextItem.emit();
  }
}
