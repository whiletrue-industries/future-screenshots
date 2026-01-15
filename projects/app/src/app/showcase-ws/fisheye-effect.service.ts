import { Injectable } from '@angular/core';
import * as THREE from 'three';

export interface FisheyeConfig {
  enabled: boolean;
  radius: number;          // Radius of the fisheye lens in world units
  magnification: number;   // Maximum magnification strength (1.0 = no magnification)
  distortion: number;      // Position distortion strength (0 = no distortion)
}

export interface FisheyeState {
  originalScale: THREE.Vector3;
  originalPosition: THREE.Vector3;
  targetScale: THREE.Vector3;
  targetPosition: THREE.Vector3;
  targetRenderOrder: number;
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
    enabled: true,
    radius: 800,
    magnification: 2.0,
    distortion: 0.3
  };

  private meshStates = new Map<THREE.Mesh, FisheyeState>();

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
    focusPoint: THREE.Vector3
  ): { scale: number; positionOffset: THREE.Vector2; renderOrder: number } | null {
    if (!this.config.enabled) {
      return null;
    }

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
    const scale = 1.0 + (this.config.magnification - 1.0) * falloff;

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

  /**
   * Store original state of a mesh before applying fisheye effect
   */
  storeOriginalState(mesh: THREE.Mesh): void {
    if (!this.meshStates.has(mesh)) {
      this.meshStates.set(mesh, {
        originalScale: mesh.scale.clone(),
        originalPosition: new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z),
        targetScale: new THREE.Vector3(1, 1, 1),
        targetPosition: new THREE.Vector3(0, 0, 0),
        targetRenderOrder: 0
      });
    }
  }

  /**
   * Get stored state for a mesh
   */
  getState(mesh: THREE.Mesh): FisheyeState | undefined {
    return this.meshStates.get(mesh);
  }

  /**
   * Update target state for a mesh
   */
  updateTargetState(
    mesh: THREE.Mesh,
    targetScale: THREE.Vector3,
    targetPosition: THREE.Vector3,
    targetRenderOrder: number
  ): void {
    const state = this.meshStates.get(mesh);
    if (state) {
      state.targetScale.copy(targetScale);
      state.targetPosition.copy(targetPosition);
      state.targetRenderOrder = targetRenderOrder;
    }
  }

  /**
   * Clear stored state for a mesh
   */
  clearState(mesh: THREE.Mesh): void {
    this.meshStates.delete(mesh);
  }

  /**
   * Clear all stored states
   */
  clearAllStates(): void {
    this.meshStates.clear();
  }

  /**
   * Reset a mesh to its original state
   */
  resetMesh(mesh: THREE.Mesh): void {
    const state = this.meshStates.get(mesh);
    if (state) {
      state.targetScale.copy(state.originalScale);
      state.targetPosition.set(0, 0, 0); // Reset position offset to zero
      state.targetRenderOrder = 0;
    }
  }
}
