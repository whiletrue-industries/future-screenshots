import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  input,
  inject,
} from '@angular/core';
import { TaxonomyClusterLabel } from './taxonomy-label.interface';
import { ThreeRendererService } from '../three-renderer.service';

/**
 * Renders taxonomy cluster labels as an HTML overlay on top of the Three.js canvas.
 *
 * Two layers of labels are shown depending on the current zoom level:
 *   - Zoom out  (zoom < ZOOM_THRESHOLD): first-level taxonomy labels (themes)
 *   - Zoom in  (zoom ≥ ZOOM_THRESHOLD): second-level taxonomy labels (sub-themes)
 *
 * Label positions are updated every render frame via ThreeRendererService.addFrameCallback()
 * so they stay perfectly aligned with the 3D content while panning / zooming.
 */
@Component({
  selector: 'app-taxonomy-clusters-overlay',
  templateUrl: './taxonomy-clusters-overlay.component.html',
  styleUrl: './taxonomy-clusters-overlay.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonomyClustersOverlayComponent implements OnInit, OnDestroy {
  /** First taxonomy layer – shown when zoomed out. */
  themeLabels = input<TaxonomyClusterLabel[]>([]);
  /** Second taxonomy layer – shown when zoomed in. */
  subThemeLabels = input<TaxonomyClusterLabel[]>([]);
  /** Current zoom level (1 = fully zoomed out). */
  zoomLevel = input<number>(1);

  /** Zoom level at or above which sub-theme labels are shown; theme labels shown below. */
  static readonly ZOOM_THRESHOLD = 2.5;

  private rendererService = inject(ThreeRendererService);
  private ngZone = inject(NgZone);
  private el = inject(ElementRef<HTMLElement>);

  private unregisterFrameCb: (() => void) | null = null;

  ngOnInit(): void {
    // Register a frame callback so we can update label positions outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      this.unregisterFrameCb = this.rendererService.addFrameCallback(() => {
        this.updateLabelPositions();
      });
    });
  }

  ngOnDestroy(): void {
    this.unregisterFrameCb?.();
  }

  /** True if sub-theme labels should be shown (zoomed in). */
  get showSubTheme(): boolean {
    return this.zoomLevel() >= TaxonomyClustersOverlayComponent.ZOOM_THRESHOLD;
  }

  /** Active labels for the current zoom level. */
  get activeLabels(): TaxonomyClusterLabel[] {
    return this.showSubTheme ? this.subThemeLabels() : this.themeLabels();
  }

  /**
   * Moves each `.cluster-label` element to its projected screen position.
   * Runs outside Angular change-detection to avoid triggering unnecessary checks.
   */
  private updateLabelPositions(): void {
    const host = this.el.nativeElement as HTMLElement;
    const labels = host.querySelectorAll<HTMLElement>('.cluster-label');
    const active = this.activeLabels;

    labels.forEach((el, i) => {
      const label = active[i];
      if (!label) return;
      const screen = this.rendererService.worldToScreen(label.worldX, label.worldY);
      if (screen) {
        el.style.transform = `translate(-50%, -50%) translate(${screen.x}px, ${screen.y}px)`;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }
}
