import { Component, computed, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-comparison',
  imports: [CommonModule],
  templateUrl: './image-comparison.component.html',
  styleUrl: './image-comparison.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComparisonComponent {
  currentImage = input.required<string>();
  newImage = input.required<string>();
  approved = output<void>();
  cancelled = output<void>();
  
  viewMode = signal<'slider' | 'split'>('slider');
  sliderPosition = signal<number>(50);
  
  onApprove() {
    this.approved.emit();
  }
  
  onCancel() {
    this.cancelled.emit();
  }
  
  toggleViewMode() {
    this.viewMode.set(this.viewMode() === 'slider' ? 'split' : 'slider');
  }
  
  onSliderChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.sliderPosition.set(parseFloat(input.value));
  }
}
