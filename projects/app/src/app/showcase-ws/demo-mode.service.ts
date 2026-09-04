import { inject, Injectable, signal } from '@angular/core';

import { ANIMATION_CONSTANTS } from './animation-constants';
import { PhotoData, PhotoAnimationState } from './photo-data';
import { PhotoDataRepository } from './photo-data-repository';
import { ThreeRendererService } from './three-renderer.service';

/**
 * Demo mode: an unattended loop that tours the canvas.
 *
 * The items never move — the camera does. One cycle flies to an item where it
 * already sits, swapping in its high-res texture on the way, rolls the view to
 * match the item's own tilt while closing the last of the distance, dwells, then
 * unrolls and fits the whole canvas back into view.
 *
 * While the camera holds an item it is highlighted: drawn in front of its
 * neighbours and decorated (see DemoFocusOverlayComponent), with everything
 * else blurred and faded behind it. The highlight lifts as the camera pulls
 * back.
 *
 * Newly arrived items are toured first. An item that is not on the canvas right
 * now (filtered out, hidden, not yet positioned) is skipped and retried later.
 */
@Injectable({
  providedIn: 'root'
})
export class DemoModeService {
  private renderer = inject(ThreeRendererService);

  /**
   * The repository to tour. Handed over by the showcase component, which builds
   * its own repository rather than taking the injected one.
   */
  private photoRepository: PhotoDataRepository | null = null;

  /** Whether the tour is running. */
  readonly active = signal(false);

  /** The item the camera is currently focused on, if any. Held for the whole cycle. */
  readonly focusedPhotoId = signal<string | null>(null);

  /**
   * The item drawn in front and decorated. Set once the flight begins and
   * cleared as the camera starts to pull back, so the effect fades out with
   * the zoom rather than after it.
   */
  readonly highlightedPhotoId = signal<string | null>(null);

  /** Newly arrived items, toured ahead of the random picks. */
  private queue: string[] = [];

  /** Bumped by stop(), so an in-flight cycle knows to unwind. */
  private runId = 0;

  /** Timestamp after which a pointer gesture may exit demo mode. */
  private exitAllowedAt = 0;

  /**
   * Bind the repository whose photos this tour visits.
   */
  attach(photoRepository: PhotoDataRepository): void {
    this.photoRepository = photoRepository;
  }

  /**
   * Let go of the repository when the showcase is torn down.
   */
  detach(): void {
    this.photoRepository = null;
  }

  /**
   * Start the tour. Safe to call when already running, or before a repository
   * has been attached — the loop simply waits for photos to appear.
   */
  start(): void {
    if (this.active()) {
      return;
    }

    this.runId++;
    this.exitAllowedAt = Date.now() + ANIMATION_CONSTANTS.DEMO_EXIT_GRACE_PERIOD;
    this.active.set(true);
    this.runLoop(this.runId);
  }

  /**
   * Stop the tour and return the camera to an unrolled full view.
   */
  stop(): void {
    if (!this.active()) {
      return;
    }

    this.runId++;
    this.active.set(false);
    this.focusedPhotoId.set(null);
    this.queue = [];
    this.renderer.setHighResPriorityId(null);
    this.highlight(null);
    this.renderer.animateCameraRoll(0, ANIMATION_CONSTANTS.DEMO_EXIT_ROLL_DURATION);
    this.renderer.resetCameraView(true);
  }

  toggle(): void {
    this.active() ? this.stop() : this.start();
  }

  /**
   * Whether a pointer gesture is allowed to exit demo mode yet. Guards against
   * the very gesture that started the tour immediately ending it.
   */
  canExitByPointer(): boolean {
    return this.active() && Date.now() >= this.exitAllowedAt;
  }

  /**
   * Queue a newly arrived item to be toured next. The item is already on the
   * canvas by the time this is called — queueing only sets the tour order.
   * Items that are not visible yet are queued too, and retried later.
   */
  enqueueNewPhoto(id: string): void {
    if (!this.active() || this.queue.includes(id)) {
      return;
    }
    this.queue.push(id);
  }

  /**
   * The tour itself: pick an item, focus it, rest, repeat.
   */
  private async runLoop(runId: number): Promise<void> {
    while (this.isCurrentRun(runId)) {
      const photo = this.pickNext();

      if (photo) {
        await this.focusOn(photo, runId);
      }

      if (!this.isCurrentRun(runId)) {
        break;
      }

      await this.sleep(ANIMATION_CONSTANTS.DEMO_PAUSE_DURATION * 1000);
    }
  }

  /**
   * Next item to tour: queued arrivals first, then a random visible item.
   *
   * A queued item that has since disappeared is dropped; one that exists but is
   * not focusable right now goes to the back of the queue, so it is toured if
   * and when it appears on the canvas.
   */
  private pickNext(): PhotoData | null {
    const repository = this.photoRepository;
    if (!repository) {
      return null;
    }

    for (let attempts = this.queue.length; attempts > 0; attempts--) {
      const id = this.queue.shift();
      if (!id) {
        break;
      }

      const photo = repository.getPhoto(id);
      if (!photo) {
        continue; // Gone for good
      }

      if (this.isFocusable(photo)) {
        return photo;
      }

      this.queue.push(id); // Not on the canvas right now – come back to it later
    }

    const candidates = repository.getVisiblePhotos().filter(photo => this.isFocusable(photo));
    if (candidates.length === 0) {
      return null;
    }

    // Avoid touring the same item twice in a row when there is a choice
    const lastId = this.focusedPhotoId();
    const pool = candidates.length > 1
      ? candidates.filter(photo => photo.id !== lastId)
      : candidates;

    return pool[Math.floor(Math.random() * pool.length)];
  }

  /**
   * One focus cycle. Every phase re-reads the item and re-checks the run id, so
   * a layout switch, a deletion or an exit mid-flight unwinds cleanly.
   */
  private async focusOn(photo: PhotoData, runId: number): Promise<void> {
    const id = photo.id;
    this.focusedPhotoId.set(id);

    // Claim high-res and start loading it now – the texture swaps in during the flight
    this.renderer.setHighResPriorityId(id);
    const mesh = photo.mesh;
    if (mesh) {
      this.renderer.upgradeToHighResTexture(mesh, photo.enhancedUrl).catch(() => {/* keep low-res */});
    }

    try {
      // 1. Fly to the item, framing its tilted footprint
      let target = this.focusTarget(id);
      if (!target) {
        return;
      }

      this.highlight(id);

      const arrivalZ = this.renderer.computeFocusZForItem(
        target.photo,
        ANIMATION_CONSTANTS.DEMO_FOCUS_FILL_RATIO,
        true
      );
      await this.renderer.focusCameraOn(
        target.x,
        target.y,
        arrivalZ,
        ANIMATION_CONSTANTS.DEMO_ZOOM_IN_DURATION
      );
      if (!this.isCurrentRun(runId)) {
        return;
      }

      // 2. Roll the view to the item's own rotation, closing the last of the
      //    distance at the same time. Never zooms back out.
      target = this.focusTarget(id);
      if (!target) {
        return;
      }

      const alignedZ = Math.min(
        arrivalZ,
        this.renderer.computeFocusZForItem(target.photo, ANIMATION_CONSTANTS.DEMO_ALIGNED_FILL_RATIO, false)
      );
      await Promise.all([
        this.renderer.animateCameraRoll(target.roll, ANIMATION_CONSTANTS.DEMO_ALIGN_DURATION),
        this.renderer.focusCameraOn(target.x, target.y, alignedZ, ANIMATION_CONSTANTS.DEMO_ALIGN_DURATION)
      ]);
      if (!this.isCurrentRun(runId)) {
        return;
      }

      // 3. Dwell
      await this.sleep(ANIMATION_CONSTANTS.DEMO_HOLD_DURATION * 1000);
      if (!this.isCurrentRun(runId)) {
        return;
      }

      // 4. Let go of the highlight, unroll and fit the whole canvas back into view
      this.highlight(null);
      await Promise.all([
        this.renderer.animateCameraRoll(0, ANIMATION_CONSTANTS.DEMO_ZOOM_OUT_DURATION),
        this.renderer.resetCameraView(true, ANIMATION_CONSTANTS.DEMO_ZOOM_OUT_DURATION)
      ]);
    } finally {
      // The LOD pass downgrades the texture once the item is small again
      if (this.isCurrentRun(runId)) {
        this.renderer.setHighResPriorityId(null);
        this.highlight(null);
        this.focusedPhotoId.set(null);
      }
    }
  }

  /**
   * Current world position and tilt of the item, or null if it has left the canvas.
   */
  private focusTarget(id: string): { photo: PhotoData; x: number; y: number; roll: number } | null {
    const photo = this.photoRepository?.getPhoto(id);
    if (!photo || !photo.mesh || !this.isFocusable(photo)) {
      return null;
    }

    // Hover and fisheye stash the untouched tilt, which is the one to align with
    const roll = photo.mesh.userData['originalRotation'] ?? photo.mesh.rotation.z;

    return { photo, x: photo.mesh.position.x, y: photo.mesh.position.y, roll };
  }

  /**
   * Whether an item is on the canvas right now: rendered, visible and settled
   * in its layout position.
   */
  private isFocusable(photo: PhotoData): boolean {
    const opacity = photo.getProperty<number>('opacity') ?? 1;
    return !!photo.mesh
      && opacity > 0
      && photo.animationState === PhotoAnimationState.POSITIONED;
  }

  /**
   * Bring an item to the front, sharp against a blurred canvas, or let it go.
   */
  private highlight(id: string | null): void {
    this.highlightedPhotoId.set(id);
    this.renderer.setDemoFocusPhotoId(id);
  }

  private isCurrentRun(runId: number): boolean {
    return this.active() && this.runId === runId;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
