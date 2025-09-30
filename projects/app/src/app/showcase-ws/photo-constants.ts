/**
 * Photo display constants used across the showcase components
 */
export const PHOTO_CONSTANTS = {
  /** Default photo width in pixels */
  PHOTO_WIDTH: 530,
  
  /** Default photo height in pixels */
  PHOTO_HEIGHT: 1000,
  
  /** Default horizontal spacing between photos */
  SPACING_X: 250,
  
  /** Default vertical spacing between photos */
  SPACING_Y: 30,
  
  /** Maximum texture dimension in pixels for performance optimization */
  MAX_TEXTURE_DIMENSION: 200
} as const;

/**
 * Photo dimensions interface for consistency
 */
export interface PhotoDimensions {
  photoWidth: number;
  photoHeight: number;
  spacingX?: number;
  spacingY?: number;
}