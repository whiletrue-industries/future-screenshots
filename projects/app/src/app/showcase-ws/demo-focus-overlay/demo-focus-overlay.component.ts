import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';

import { PhotoData } from '../photo-data';
import { ThreeRendererService } from '../three-renderer.service';

/** How the viewer leans on the item, as the clips and the badge show it. */
export type DemoFocusFavorability = 'prefer' | 'prefer-ish' | 'prevent' | 'prevent-ish';

/** Plausibility bucket, keyed like the moderation and filter maps. */
export type DemoFocusPlausibility = 100 | 75 | 50 | 25 | 0;

/** Which colour the string and badge take. */
export type DemoFocusSide = 'prefer' | 'prevent';

/**
 * A handful of stable pseudo-random numbers in [-1, 1] for an item, seeded
 * from its id, so the same item always hangs the same slightly-off way.
 */
export function jitterFor(seed: string, count: number): number[] {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(hash ^ seed.charCodeAt(i), 16777619) >>> 0;
  }
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    hash = Math.imul(hash ^ (hash >>> 15), 2246822507) >>> 0;
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909) >>> 0;
    values.push(((hash >>> 8) / 0xffffff) * 2 - 1);
  }
  return values;
}

/**
 * The favorability vocabulary accepted by the API – "preferred", "prevent",
 * "mostly preferred", "yes", "unfavorable"… – folded to the four states the
 * decoration can show. A hedged verdict ("mostly …", "…-ish") gets both clips.
 * Anything else, "uncertain" included, shows no clip and no badge.
 */
export function resolveFavorability(value: unknown): DemoFocusFavorability | null {
  if (typeof value !== 'string') {
    return null;
  }

  const verdict = value.toLowerCase().trim();
  const hedged = verdict.startsWith('mostly') || verdict.endsWith('-ish');

  if (/prevent|unfavo/.test(verdict) || verdict === 'no') {
    return hedged ? 'prevent-ish' : 'prevent';
  }
  if (/prefer|favor/.test(verdict) || verdict === 'yes') {
    return hedged ? 'prefer-ish' : 'prefer';
  }
  return null;
}

/**
 * Bucket a raw plausibility (0–100, sometimes a numeric string) the same way
 * the potential filter does.
 */
export function resolvePlausibility(value: unknown): DemoFocusPlausibility | null {
  const plausibility = typeof value === 'string' ? Number(value) : value;
  if (typeof plausibility !== 'number' || !isFinite(plausibility)) {
    return null;
  }

  if (plausibility >= 90) return 100;
  if (plausibility >= 70) return 75;
  if (plausibility >= 40) return 50;
  if (plausibility >= 10) return 25;
  return 0;
}

/**
 * Decorates the item the demo tour is holding in front of the viewer: the
 * string it hangs from, the clip(s) pinning it there, and labels for its
 * favorability and plausibility – the vocabulary of the map view, drawn in
 * HTML over the canvas.
 *
 * Everything is sized from the item's on-screen width and follows the item
 * every frame, so once it appears – after the first flight has landed – it
 * rolls and grows with the item through the rest of the approach, and keeps
 * the same proportions on a laptop and on a 4K wall. The pieces come in one
 * after another (clip, badge, then the string wiping in with the plausibility
 * label), and the clips and string each hang a few degrees off true, seeded
 * from the item id, so it reads as pinned by hand rather than drawn. It is
 * purely decorative (`pointer-events: none`, `aria-hidden`).
 */
@Component({
  selector: 'app-demo-focus-overlay',
  templateUrl: './demo-focus-overlay.component.html',
  styleUrl: './demo-focus-overlay.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoFocusOverlayComponent implements OnInit, OnDestroy {
  /** The highlighted item, or null while the camera is pulling back. */
  photo = input<PhotoData | null>(null);

  /** True once the first flight has landed on the item; the decoration only appears then. */
  arrived = input(false);

  favorability = computed(() => resolveFavorability(this.photo()?.metadata['favorable_future']));
  plausibility = computed(() => resolvePlausibility(this.photo()?.metadata['plausibility']));

  /** Colour of the string and the badge; null when the item is unevaluated. */
  side = computed<DemoFocusSide | null>(() => {
    const favorability = this.favorability();
    if (!favorability) {
      return null;
    }
    return favorability.startsWith('prefer') ? 'prefer' : 'prevent';
  });

  /** An "-ish" verdict is pinned by both clips, the leaning side first. */
  clips = computed<DemoFocusSide[]>(() => {
    switch (this.favorability()) {
      case 'prefer':
        return ['prefer'];
      case 'prefer-ish':
        return ['prefer', 'prevent'];
      case 'prevent':
        return ['prevent'];
      case 'prevent-ish':
        return ['prevent', 'prefer'];
      default:
        return [];
    }
  });

  isIsh = computed(() => this.favorability()?.endsWith('-ish') ?? false);

  /** Largest tilt, in degrees, the string or a clip hangs off true. */
  private static readonly MAX_TILT_DEG = 3;

  /** Tilt of the string and of each clip for this item, in degrees. */
  tilt = computed(() => {
    const id = this.photo()?.id ?? '';
    const [string, ...clips] = jitterFor(id, 3).map(v => v * DemoFocusOverlayComponent.MAX_TILT_DEG);
    return { string, clips };
  });

  private anchor = viewChild.required<ElementRef<HTMLElement>>('anchor');

  private rendererService = inject(ThreeRendererService);
  private ngZone = inject(NgZone);

  private unregisterFrameCb: (() => void) | null = null;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.unregisterFrameCb = this.rendererService.addFrameCallback(() => this.follow());
    });
  }

  ngOnDestroy(): void {
    this.unregisterFrameCb?.();
  }

  /**
   * Pin the anchor to the item's top-left corner, at the item's on-screen tilt,
   * and hand its on-screen width to the stylesheet.
   */
  private follow(): void {
    const anchor = this.anchor().nativeElement;
    const photo = this.photo();
    const frame = photo ? this.rendererService.getPhotoScreenFrame(photo.id) : null;

    if (!frame) {
      anchor.style.visibility = 'hidden';
      return;
    }

    anchor.style.visibility = 'visible';
    anchor.style.transform = `translate(${frame.x}px, ${frame.y}px) rotate(${frame.rotation}rad)`;
    anchor.style.setProperty('--w', `${frame.width}px`);
  }
}
