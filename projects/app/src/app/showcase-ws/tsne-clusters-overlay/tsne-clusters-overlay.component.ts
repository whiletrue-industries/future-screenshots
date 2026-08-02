import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  effect,
  inject,
  input,
} from '@angular/core';
import { TsneClusterLabel } from './tsne-cluster-label.interface';
import { ThreeRendererService } from '../three-renderer.service';

/**
 * Renders t-SNE cluster labels as an HTML overlay on top of the Three.js canvas.
 *
 * Mirrors the look of the Leaflet `/show` output map: each label sits at its
 * cluster's centre, tilts with the cluster's average item rotation, and is sized
 * so it spans roughly the width of the cluster – meaning it scales with zoom
 * rather than staying a fixed pixel size.
 *
 * The labels are decorative (`pointer-events: none`, `aria-hidden`); the items
 * underneath remain the interactive layer.
 */
@Component({
  selector: 'app-tsne-clusters-overlay',
  templateUrl: './tsne-clusters-overlay.component.html',
  styleUrl: './tsne-clusters-overlay.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsneClustersOverlayComponent implements OnInit, OnDestroy {
  /** Cluster labels to display, in world-space coordinates. */
  labels = input<TsneClusterLabel[]>([]);

  /** Font size bounds (px) so labels stay legible at extreme zoom levels. */
  private static readonly MIN_FONT = 8;
  private static readonly MAX_FONT = 120;

  /**
   * Width of the world-space segment used to measure the world→pixel scale.
   * Roughly one grid cell, which keeps the measurement well away from
   * floating-point noise.
   */
  private static readonly SCALE_PROBE_WORLD_UNITS = 1000;

  /**
   * Empirical constant from the output map: a title occupies about
   * `length * 0.75` em of width, so this divisor makes the label span its cluster.
   */
  private static readonly EM_PER_CHARACTER = 0.75;

  private rendererService = inject(ThreeRendererService);
  private ngZone = inject(NgZone);
  private el = inject(ElementRef<HTMLElement>);

  private unregisterFrameCb: (() => void) | null = null;
  /** Cached DOM elements for the current label set, in template order. */
  private cachedLabelEls: HTMLElement[] = [];

  constructor() {
    // Invalidate the DOM element cache whenever the label set changes.
    effect(() => {
      this.labels();
      Promise.resolve().then(() => this.refreshLabelCache());
    });
  }

  ngOnInit(): void {
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

  /** Clusters whose items lean towards "prevent" are rendered in the prevent colour. */
  isPrevent(label: TsneClusterLabel): boolean {
    return label.rotationDeg <= 0;
  }

  private refreshLabelCache(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.cachedLabelEls = Array.from(host.querySelectorAll<HTMLElement>('.tsne-cluster-label'));
    this.updateLabelPositions();
  }

  /**
   * Projects each label to its screen position, scales its font with the current
   * zoom and hides labels whose anchor has left the viewport.
   */
  private updateLabelPositions(): void {
    const labels = this.labels();
    const els = this.cachedLabelEls;
    if (els.length === 0) return;

    const scale = this.getWorldToScreenScale();
    if (scale === null) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { MIN_FONT, MAX_FONT, EM_PER_CHARACTER } = TsneClustersOverlayComponent;

    for (let i = 0; i < els.length; i++) {
      const label = labels[i];
      const el = els[i];
      if (!label) continue;

      const screen = this.rendererService.worldToScreen(label.worldX, label.worldY);
      if (!screen || screen.x < 0 || screen.x > vw || screen.y < 0 || screen.y > vh) {
        el.style.opacity = '0';
        continue;
      }

      const charCount = Math.max(1, label.name.length);
      const fontPx = Math.min(
        MAX_FONT,
        Math.max(MIN_FONT, (label.worldWidth / (charCount * EM_PER_CHARACTER)) * scale)
      );

      el.style.setProperty('--label-font-size', `${fontPx}px`);
      el.style.transform =
        `translate(-50%, -50%) translate(${screen.x}px, ${screen.y}px) rotate(${-label.rotationDeg * 2}deg)`;
      el.style.opacity = '1';
    }
  }

  /** Pixels per world unit at the current camera position, or null if unavailable. */
  private getWorldToScreenScale(): number | null {
    const probe = TsneClustersOverlayComponent.SCALE_PROBE_WORLD_UNITS;
    const origin = this.rendererService.worldToScreen(0, 0);
    const offset = this.rendererService.worldToScreen(probe, 0);
    if (!origin || !offset) return null;
    return Math.abs(offset.x - origin.x) / probe;
  }
}
