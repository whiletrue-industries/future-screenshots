/**
 * Animation timing constants used across the showcase components
 */
export const ANIMATION_CONSTANTS = {
  /** Duration for layout strategy transitions (seconds) */
  LAYOUT_TRANSITION_DURATION: 5,
  
  /** Duration for new photo animations from spawn to position (seconds) */
  NEW_PHOTO_ANIMATION_DURATION: 0.8,
  
  /** Duration for photo showcase forward animation (seconds) */
  SHOWCASE_FORWARD_DURATION: 0.6,
  
  /** Duration for photo showcase return animation (seconds) */
  SHOWCASE_RETURN_DURATION: 0.6,
  
  /** Delay before animating new photos (milliseconds) */
  NEW_PHOTO_ANIMATION_DELAY: 3000,
  
  /** Interval between random showcase animations (milliseconds) */
  SHOWCASE_INTERVAL: 5000,
  
  /** Maximum delay for new photo animations (milliseconds) */
  MAX_NEW_PHOTO_DELAY: 1500,
  
  /** Maximum showcase duration (milliseconds) */
  MAX_SHOWCASE_DURATION: 2000,
  
  /** Debounce delay for camera bounds updates (milliseconds) */
  CAMERA_BOUNDS_UPDATE_DEBOUNCE: 100,
  
  /** Default spiral animation duration in grid layout (milliseconds) */
  GRID_SPIRAL_ANIMATION_DURATION: 1100,
  
  /** Stagger delay between new photos in component (milliseconds) */
  NEW_PHOTO_STAGGER_DELAY: 2000,
  
  /** Polling interval for API updates (milliseconds) */
  API_POLLING_INTERVAL: 60000,
  
  /** Delay before QR code shrinks (milliseconds) */
  QR_SHRINK_DELAY: 10000,
  
  /** Initial delay before starting API polling (milliseconds) */
  INITIAL_POLLING_DELAY: 2000,
  
  /** Duration for opacity fade in/out animations (seconds) */
  OPACITY_FADE_DURATION: 0.4,
  
  /** Duration for photos moving to (0,0) when becoming invisible (seconds) */
  INVISIBLE_POSITION_TRANSITION_DURATION: 0.6,
  
  /** Duration for camera bounds animation transitions (seconds) */
  CAMERA_BOUNDS_ANIMATION_DURATION: 3.0
} as const;

/**
 * Animation timing interface for configuration
 */
export interface AnimationTimingConfig {
  layoutTransitionDuration?: number;
  newPhotoAnimationDuration?: number;
  showcaseForwardDuration?: number;
  showcaseReturnDuration?: number;
  newPhotoAnimationDelay?: number;
  showcaseInterval?: number;
}