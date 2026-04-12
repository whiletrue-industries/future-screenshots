import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  input,
  inject,
  effect,
} from '@angular/core';
import { TaxonomyClusterLabel } from './taxonomy-label.interface';
import { ThreeRendererService } from '../three-renderer.service';

/**
 * Renders taxonomy cluster labels as an HTML overlay on top of the Three.js canvas.
 *
 * Two layers of labels are shown depending on the current zoom level:
 *   - Zoom out  (zoom < ZOOM_THRESHOLD): first-level taxonomy labels (themes)
 *   - Zoom in  (zoom > ZOOM_THRESHOLD): second-level taxonomy labels (sub-themes)
 *
 * Label positions are updated every render frame via ThreeRendererService.addFrameCallback()
 * so they stay perfectly aligned with the 3D content while panning / zooming.
 */
@Component({
  selector: 'app-taxonomy-clusters-overlay',
  templateUrl: './taxonomy-clusters-overlay.component.html',
  styleUrl: './taxonomy-clusters-overlay.component.less',
  host: {
    '[class.fisheye-underlay]': 'fisheyeActive()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonomyClustersOverlayComponent implements OnInit, OnDestroy {
  /** First taxonomy layer – shown when zoomed out. */
  themeLabels = input<TaxonomyClusterLabel[]>([]);
  /** Second taxonomy layer – shown when zoomed in. */
  subThemeLabels = input<TaxonomyClusterLabel[]>([]);
  /** Current zoom level (1 = fully zoomed out). */
  zoomLevel = input<number>(1);
  /** True while fisheye is actively affecting meshes; labels are moved under canvas. */
  fisheyeActive = input<boolean>(false);

  /** Zoom level above which sub-theme labels are shown; theme labels shown at or below. */
  static readonly ZOOM_THRESHOLD = 1.35;

  private rendererService = inject(ThreeRendererService);
  private ngZone = inject(NgZone);
  private el = inject(ElementRef<HTMLElement>);

  private unregisterFrameCb: (() => void) | null = null;
  /** Cached DOM elements for the active label set; refreshed when activeLabels changes. */
  private cachedLabelEls: HTMLElement[] = [];

  constructor() {
    // Invalidate the DOM element cache whenever the active label set changes.
    // This runs inside Angular's zone after CD has updated the DOM.
    effect(() => {
      // Access signals to establish dependency tracking
      const _labels = this.showSubTheme ? this.subThemeLabels() : this.themeLabels();
      // Schedule cache refresh after Angular has rendered the new labels
      Promise.resolve().then(() => this.refreshLabelCache());
    });
  }

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
    this.cachedLabelEls = [];
  }

  /** True if sub-theme labels should be shown (zoomed in). */
  get showSubTheme(): boolean {
    return this.zoomLevel() > TaxonomyClustersOverlayComponent.ZOOM_THRESHOLD;
  }

  /** Active labels for the current zoom level. */
  get activeLabels(): TaxonomyClusterLabel[] {
    return this.showSubTheme ? this.subThemeLabels() : this.themeLabels();
  }

  /** Refresh the cached DOM element references after a label-set change. */
  private refreshLabelCache(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.cachedLabelEls = Array.from(host.querySelectorAll<HTMLElement>('.cluster-label'));
  }

  /**
   * Moves each `.cluster-label` element to its projected screen position.
   * Runs outside Angular change-detection to avoid triggering unnecessary checks.
   * Uses cached DOM element references for performance.
   */
  private updateLabelPositions(): void {
    const active = this.activeLabels;
    const els = this.cachedLabelEls;

    for (let i = 0; i < els.length; i++) {
      const label = active[i];
      if (!label) continue;
      const screen = this.rendererService.worldToScreen(label.worldX, label.worldY);
      if (screen) {
        els[i].style.transform = `translate(-50%, -50%) translate(${screen.x}px, ${screen.y}px)`;
        els[i].style.display = '';
      } else {
        els[i].style.display = 'none';
      }
    }
  }
}
