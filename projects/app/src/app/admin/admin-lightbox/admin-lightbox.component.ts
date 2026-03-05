import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxNavControlsComponent } from '../lightbox-nav-controls/lightbox-nav-controls.component';

@Component({
  selector: 'app-admin-lightbox',
  standalone: true,
  imports: [CommonModule, LightboxNavControlsComponent],
  templateUrl: './admin-lightbox.component.html',
  styleUrl: './admin-lightbox.component.less'
})
export class AdminLightboxComponent {
  // Inputs: state from parent
  selectedItemIndex = input<number>(-1);
  totalItems = input<number>(0);
  lightboxSidebarOpen = input<boolean>(true);

  // Outputs: events for parent to handle
  close = output<void>();
  prevItem = output<void>();
  nextItem = output<void>();
  toggleSidebar = output<void>();

  isPrevDisabled(): boolean {
    return this.selectedItemIndex() <= 0;
  }

  isNextDisabled(): boolean {
    return this.selectedItemIndex() >= this.totalItems() - 1;
  }

  onClose(): void {
    this.close.emit();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onPrevItem(): void {
    this.prevItem.emit();
  }

  onNextItem(): void {
    this.nextItem.emit();
  }
}
