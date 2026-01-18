import { Injectable } from '@angular/core';
import * as THREE from 'three';

export interface FisheyeConfig {
  radius: number;          // Radius of the fisheye lens in world units
  magnification: number;   // Maximum magnification strength (1.0 = no magnification)
  distortion: number;      // Position distortion strength (0 = no distortion)
  zoomRelative?: number;   // 0 = no change, 1 = full reduction with zoom
  maxHeight?: number;      // Maximum height of magnified items in vh (viewport height units)
  viewportHeight?: number; // Current viewport height in pixels
}

/**
 * Service to manage fisheye lens effect calculations
 * Provides methods to calculate magnification, position distortion, and z-index adjustments
 */
@Injectable({
  providedIn: 'root'
})
export class FisheyeEffectService {
  private config: FisheyeConfig = {
    radius: 800,
    magnification: 2.0,
    distortion: 0.3
  };

  constructor() {}

  /**
   * Update fisheye configuration
   */
  setConfig(config: Partial<FisheyeConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current fisheye configuration
   */
  getConfig(): FisheyeConfig {
    return { ...this.config };
  }

  /**
   * Calculate fisheye effect for a mesh based on distance from focus point
   * Returns null if mesh is outside the effect radius
   */
  calculateEffect(
    meshPosition: THREE.Vector3,
    focusPoint: THREE.Vector3,
    cameraZoom: number = 1,
    meshHeight: number = 1000  // Default to standard photo height
  ): { scale: number; positionOffset: THREE.Vector2; renderOrder: number } | null {
    // Calculate distance from focus point (in XY plane)
    const dx = meshPosition.x - focusPoint.x;
    const dy = meshPosition.y - focusPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If outside the effect radius, no effect
    if (distance > this.config.radius) {
      return null;
    }

    // Calculate normalized distance [0, 1] where 0 is at focus point
    const normalizedDistance = distance / this.config.radius;

    // Use a smooth falloff function (ease-out cubic)
    const falloff = 1 - Math.pow(normalizedDistance, 3);

    // Calculate scale magnification
    // At focus point (distance=0): scale = magnification
    // At edge (distance=radius): scale = 1.0
    // Optionally reduce magnification as zoom increases
    let magnification = this.config.magnification;
    if (this.config.zoomRelative !== undefined && this.config.zoomRelative > 0) {
      // As zoom increases, reduce magnification
      magnification = 1.0 + (this.config.magnification - 1.0) * (1 - this.config.zoomRelative * (cameraZoom - 1));
      if (magnification < 1.0) magnification = 1.0;
    }
    let scale = 1.0 + (magnification - 1.0) * falloff;

    // Apply maxHeight constraint
    if (this.config.maxHeight !== undefined && this.config.viewportHeight !== undefined) {
      const maxHeightPx = (this.config.maxHeight / 100) * this.config.viewportHeight;
      const unmagnitifedHeight = meshHeight;
      const magnifiedHeight = meshHeight * scale;

      // Only constrain if the item wasn't already taller than maxHeight
      if (unmagnitifedHeight <= maxHeightPx && magnifiedHeight > maxHeightPx) {
        scale = maxHeightPx / meshHeight;
      }
    }

    // Calculate position distortion (push items away from center)
    // This creates the "lens" effect by moving items radially
    const distortionStrength = this.config.distortion * falloff;
    const angle = Math.atan2(dy, dx);
    const pushDistance = distance * distortionStrength;
    
    const positionOffset = new THREE.Vector2(
      Math.cos(angle) * pushDistance,
      Math.sin(angle) * pushDistance
    );

    // Calculate render order (z-index)
    // Items closer to focus point should render on top
    const renderOrder = Math.floor(falloff * 1000);

    return { scale, positionOffset, renderOrder };
  }
}
