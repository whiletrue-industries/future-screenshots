/**
 * Animation timing constants used across the showcase components
 */
export const ANIMATION_CONSTANTS = {
  /** Duration for layout strategy transitions (seconds) */
  LAYOUT_TRANSITION_DURATION: 0.54,
  
  /** Stagger delay between items during layout transitions (seconds) */
  LAYOUT_STAGGER_DELAY: 0.014,
  
  /** Duration for new photo animations from spawn to position (seconds) */
  NEW_PHOTO_ANIMATION_DURATION: 3,
  
  /** Maximum delay for new photo animations (milliseconds) */
  MAX_NEW_PHOTO_DELAY: 1500,
  
  /** Debounce delay for camera bounds updates (milliseconds) */
  CAMERA_BOUNDS_UPDATE_DEBOUNCE: 100,
  
  /** Default spiral animation duration in grid layout (milliseconds) */
  GRID_SPIRAL_ANIMATION_DURATION: 1100,
  
  /** Stagger delay between new photos in component (milliseconds) */
  NEW_PHOTO_STAGGER_DELAY: 6500,
  
  /** Polling interval for API updates (milliseconds) */
  API_POLLING_INTERVAL: 30000,
  
  /** Delay before QR code shrinks (milliseconds) */
  QR_SHRINK_DELAY: 10000,
  
  /** Initial delay before starting API polling (milliseconds) */
  INITIAL_POLLING_DELAY: 1000,

  /**
   * Polling winds down once no item has been created or updated for this long (milliseconds) — 30 minutes.
   * The /#now workspace is exempt: it keeps polling for as long as it stays the target.
   */
  ITEM_STALE_TIMEOUT: 1800000,

  /** How often a quiet workspace re-checks whether it is still the /#now target (milliseconds) — 5 minutes */
  NOW_RECHECK_INTERVAL: 300000,
  
  /** Duration for opacity fade in/out animations (seconds) */
  OPACITY_FADE_DURATION: 0.4,
  
  /** Duration for photos moving to (0,0) when becoming invisible (seconds) */
  INVISIBLE_POSITION_TRANSITION_DURATION: 0.4,
  
  /** Duration for camera bounds animation transitions (seconds) */
  CAMERA_BOUNDS_ANIMATION_DURATION: 3.0,

  // Demo mode – the camera focuses each item where it already sits on the canvas.
  // One cycle is: one flight to the item, dwell, fly back out.

  /** Demo mode: the single, eased flight to the focused item (seconds) */
  DEMO_ZOOM_IN_DURATION: 2.6,

  /**
   * Demo mode: roll the camera to the item's own tilt during the flight, so the
   * item reads upright. Off, the item keeps its tilt on screen and its string
   * and labels read along the cone's own angles.
   */
  DEMO_ROLL_TO_ITEM: false,

  /** Demo mode: dwell on the aligned item (seconds) */
  DEMO_HOLD_DURATION: 4.0,

  /** Demo mode: unroll and fit the whole canvas back into view (seconds) */
  DEMO_ZOOM_OUT_DURATION: 1.6,

  /** Demo mode: rest at full view between items (seconds) */
  DEMO_PAUSE_DURATION: 1.2,

  /**
   * Demo mode: viewport fraction the framed composition – the item plus the
   * headroom for its decoration – fills on arrival, in whichever dimension is
   * tighter (0-1).
   */
  DEMO_FOCUS_FILL_RATIO: 0.62,

  /**
   * Demo mode: room kept above the item's top edge for its string, clips and
   * labels, as a fraction of the item's width (DemoFocusOverlayComponent sizes
   * everything from that width). Framed together with the item so the labels
   * never leave the viewport, portrait screens and steep tilts included.
   */
  DEMO_DECORATION_HEADROOM: 0.45,

  /** Demo mode: unroll when the tour is cut short, quicker than a full cycle (seconds) */
  DEMO_EXIT_ROLL_DURATION: 0.4,

  /** Demo mode: pointer input ignored for this long after entering, so the starting gesture cannot exit (milliseconds) */
  DEMO_EXIT_GRACE_PERIOD: 500,

  /** Demo mode: blur and fade of everything but the focused item, eased in during the flight and out during the pull-back (seconds) */
  DEMO_DIM_TRANSITION_DURATION: 0.8
} as const;

/**
 * Animation timing interface for configuration
 */
export interface AnimationTimingConfig {
  layoutTransitionDuration?: number;
  newPhotoAnimationDuration?: number;
}