import { Injectable } from '@angular/core';
import * as THREE from 'three';

export interface FisheyeConfig {
  radius: number;          // Radius of the fisheye lens in world units
  magnification: number;   // Maximum magnification strength (1.0 = no magnification, used as fallback if maxHeight not set)
  distortion: number;      // Position distortion strength (0 = no distortion)
  maxHeight?: number;      // Maximum height of magnified items in vh (viewport height units) - zoom-independent
  viewportHeight?: number; // Current viewport height in pixels
  cameraZ?: number;        // Camera z-position for world-to-screen conversion
  fov?: number;            // Camera field of view in degrees
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
   * Scale is always calculated to reach maxHeight at focus point, independent of zoom level
   */
  calculateEffect(
    meshPosition: THREE.Vector3,
    focusPoint: THREE.Vector3,
    meshHeight: number = 1000,  // Height in world units
    screenHeightPx: number = 1080  // Viewport height in pixels
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

    // Calculate scale to always reach maxHeight at focus point (zoom-independent)
    let scale = 1.0;
    
    if (this.config.maxHeight !== undefined && this.config.cameraZ !== undefined && this.config.fov !== undefined) {
      // Calculate target screen height from maxHeight setting
      const maxHeightVh = this.config.maxHeight / 100;
      const maxHeightPx = maxHeightVh * screenHeightPx;
      
      // Calculate world units to screen pixels conversion at current camera Z
      const vFOV = (this.config.fov * Math.PI) / 180;
      const visibleHeightWorldUnits = 2 * Math.tan(vFOV / 2) * this.config.cameraZ;
      const pixelsPerWorldUnit = screenHeightPx / visibleHeightWorldUnits;
      
      // Calculate what scale is needed to reach maxHeight
      const originalHeightPx = meshHeight * pixelsPerWorldUnit;
      const targetScale = maxHeightPx / originalHeightPx;
      
      // Apply scale with falloff: at focus point = targetScale, at edge = 1.0
      scale = 1.0 + (targetScale - 1.0) * falloff;
    } else {
      // Fallback to simple magnification if maxHeight not configured
      const magnification = this.config.magnification;
      scale = 1.0 + (magnification - 1.0) * falloff;
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
