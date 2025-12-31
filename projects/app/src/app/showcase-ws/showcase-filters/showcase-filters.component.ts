import { Component, input, output } from '@angular/core';

export type LayoutType = 'grid' | 'tsne' | 'svg' | 'circle-packing';

// Layout configuration for indicator positioning
const LAYOUT_CONFIG: Record<LayoutType, { index: number }> = {
  'grid': { index: 0 },
  'tsne': { index: 1 },
  'svg': { index: 2 },
  'circle-packing': { index: 3 }
};

const BUTTON_WIDTH = 44; // px
const BUTTON_GAP = 4; // px

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
    const config = LAYOUT_CONFIG[this.currentLayout()];
    const translateX = config.index * (BUTTON_WIDTH + BUTTON_GAP);
    return `translateX(${translateX}px)`;
  }
}
