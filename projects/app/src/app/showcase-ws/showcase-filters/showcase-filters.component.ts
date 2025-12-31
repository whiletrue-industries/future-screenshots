import { Component, input, output } from '@angular/core';

export type LayoutType = 'grid' | 'tsne' | 'svg' | 'circle-packing';

@Component({
  selector: 'app-showcase-filters',
  templateUrl: './showcase-filters.component.html',
  styleUrl: './showcase-filters.component.less'
})
export class ShowcaseFiltersComponent {
  // Inputs
  currentLayout = input<LayoutType>('circle-packing');
  enableRandomShowcase = input<boolean>(false);
  resetLayoutOnFilter = input<boolean>(false);

  // Outputs
  layoutChange = output<LayoutType>();
  randomShowcaseToggle = output<void>();
  resetLayoutToggle = output<void>();

  /**
   * Handle layout button click
   */
  onLayoutChange(layout: LayoutType): void {
    this.layoutChange.emit(layout);
  }

  /**
   * Handle random showcase toggle
   */
  onRandomShowcaseToggle(): void {
    this.randomShowcaseToggle.emit();
  }

  /**
   * Handle reset layout toggle
   */
  onResetLayoutToggle(): void {
    this.resetLayoutToggle.emit();
  }

  /**
   * Calculate transform for layout selection indicator
   */
  getLayoutIndicatorTransform(): string {
    const layoutIndex = this.currentLayout() === 'grid' ? 0 : 
                       this.currentLayout() === 'tsne' ? 1 :
                       this.currentLayout() === 'svg' ? 2 : 3;
    const translateX = layoutIndex * 48; // 44px width + 4px gap
    return `translateX(${translateX}px)`;
  }
}
