import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  input,
  output,
  inject,
  effect,
} from '@angular/core';
import { TaxonomyClusterLabel } from './taxonomy-label.interface';
import { ThreeRendererService } from '../three-renderer.service';

/**
 * Renders taxonomy cluster labels as an HTML overlay on top of the Three.js canvas.
 *
 * Only second-level taxonomy labels (sub-themes) are shown, as these provide the
 * most informative context. Labels are always shown regardless of zoom level, but
 * overlap culling ensures only labels with sufficient room are visible.
 *
 * Labels with more items are rendered more prominently (larger font). Labels that
 * would overlap a more prominent label are hidden until there is enough room.
 */
@Component({
  selector: 'app-taxonomy-clusters-overlay',
  templateUrl: './taxonomy-clusters-overlay.component.html',
  styleUrl: './taxonomy-clusters-overlay.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonomyClustersOverlayComponent implements OnInit, OnDestroy {
  private static readonly MIN_ITEMS_FOR_LABEL = 2;

  /** First taxonomy layer – kept for host compatibility but never displayed. */
  themeLabels = input<TaxonomyClusterLabel[]>([]);
  /** Second taxonomy layer – always shown. */
  subThemeLabels = input<TaxonomyClusterLabel[]>([]);
  /** Zoom level input – accepted for host compatibility, not used for switching. */
  zoomLevel = input<number>(1);
  /** Emits currently hovered/focused label. Null means no active label hover. */
  labelHover = output<TaxonomyLabelHoverEvent | null>();

  static readonly ZOOM_THRESHOLD = 1.35;

  /**
   * Font-size range (px) for label prominence scaling. Labels at the max item-count
   * will use MAX_FONT, labels at the min item-count will use MIN_FONT.
   */
  private static readonly MIN_FONT = 11;
  private static readonly MAX_FONT = 18;

  private rendererService = inject(ThreeRendererService);
  private ngZone = inject(NgZone);
  private el = inject(ElementRef<HTMLElement>);

  private unregisterFrameCb: (() => void) | null = null;
  /** Cached DOM elements for the active label set; refreshed when activeLabels changes. */
  private cachedLabelEls: HTMLElement[] = [];
  /** Per-label computed font sizes, recalculated when the active set changes. */
  private cachedFontSizes: number[] = [];

  constructor() {
    // Invalidate the DOM element cache whenever the active label set changes.
    effect(() => {
      const labels = this.getVisibleLabels();
      this.cachedFontSizes = this.computeFontSizes(labels);
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

  /** Active labels — always the sub-theme (second-level) set. */
  get activeLabels(): TaxonomyClusterLabel[] {
    return this.getVisibleLabels();
  }

  private getVisibleLabels(): TaxonomyClusterLabel[] {
    return this.subThemeLabels()
      .filter(label => label.itemCount >= TaxonomyClustersOverlayComponent.MIN_ITEMS_FOR_LABEL);
  }

  onLabelEnter(label: TaxonomyClusterLabel): void {
    this.labelHover.emit({
      id: label.id,
      level: 'sub-theme',
    });
  }

  onLabelLeave(): void {
    this.labelHover.emit(null);
  }

  /** Refresh the cached DOM element references after a label-set change. */
  private refreshLabelCache(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.cachedLabelEls = Array.from(host.querySelectorAll<HTMLElement>('.cluster-label'));
    // Re-apply font sizes after the DOM is refreshed.
    for (let i = 0; i < this.cachedLabelEls.length; i++) {
      const fontSize = this.cachedFontSizes[i];
      if (fontSize != null) {
        this.cachedLabelEls[i].style.setProperty('--label-font-size', `${fontSize}px`);
      }
    }
  }

  /**
   * Compute per-label font sizes scaled by item count (square-root scaling to
   * avoid extreme size differences between very large and very small clusters).
   */
  private computeFontSizes(labels: TaxonomyClusterLabel[]): number[] {
    if (labels.length === 0) return [];
    const counts = labels.map(l => l.itemCount);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);
    const range = maxCount - minCount;
    const { MIN_FONT, MAX_FONT } = TaxonomyClustersOverlayComponent;

    return labels.map(l => {
      const t = range > 0
        ? Math.sqrt((l.itemCount - minCount) / range)
        : 1;
      return Math.round(MIN_FONT + t * (MAX_FONT - MIN_FONT));
    });
  }

  /**
   * Moves each `.cluster-label` element to its projected screen position and
   * applies overlap culling: labels are processed in descending item-count order
   * so more prominent labels always win; a label is hidden if its bounding rect
   * would overlap any already-visible label.
   */
  private updateLabelPositions(): void {
    const active = this.activeLabels;
    const els = this.cachedLabelEls;
    if (els.length === 0) return;

    // --- 1. Project all world positions to screen coords ---
    interface LabelState { el: HTMLElement; x: number; y: number; visible: boolean; itemCount: number; }
    const states: LabelState[] = [];

    for (let i = 0; i < els.length; i++) {
      const label = active[i];
      if (!label) continue;
      const screen = this.rendererService.worldToScreen(label.worldX, label.worldY);
      if (screen) {
        states.push({ el: els[i], x: screen.x, y: screen.y, visible: true, itemCount: label.itemCount });
      } else {
        els[i].style.display = 'none';
      }
    }

    // --- 2. Sort descending by item count so larger clusters get priority ---
    states.sort((a, b) => b.itemCount - a.itemCount);

    // --- 3. Apply transforms before reading dimensions (avoids layout thrash) ---
    for (const s of states) {
      s.el.style.transform = `translate(-50%, -50%) translate(${s.x}px, ${s.y}px)`;
      s.el.style.display = '';
    }

    // --- 4. Overlap culling using bounding rects (all visible so rects are valid) ---
    //        Add a small padding so labels don't sit flush against each other.
    //        Labels whose anchor is outside the viewport are also hidden.
    const PADDING = 8;
    const placed: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    for (const s of states) {
      const rect = s.el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue; // not yet laid out

      const x1 = rect.left - PADDING;
      const y1 = rect.top - PADDING;
      const x2 = rect.right + PADDING;
      const y2 = rect.bottom + PADDING;

      const outOfViewport = x2 < 0 || x1 > vw || y2 < 0 || y1 > vh;
      const overlaps = placed.some(p => !(x2 < p.x1 || x1 > p.x2 || y2 < p.y1 || y1 > p.y2));

      if (outOfViewport || overlaps) {
        s.el.style.opacity = '0';
        s.el.style.pointerEvents = 'none';
      } else {
        s.el.style.opacity = '1';
        s.el.style.pointerEvents = 'auto';
        placed.push({ x1, y1, x2, y2 });
      }
    }
  }
}

export interface TaxonomyLabelHoverEvent {
  id: string;
  level: 'theme' | 'sub-theme';
}
