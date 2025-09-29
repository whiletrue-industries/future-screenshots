import * as THREE from 'three';

export enum PhotoAnimationState {
  SPAWNING = 'spawning',
  FLOATING_BACK = 'floating_back',
  POSITIONED = 'positioned',
  FLOATING_FORWARD = 'floating_forward',
  HIDDEN = 'hidden'
}

export interface PhotoMetadata {
  id: string;
  url: string;
  created_at: string;
  screenshot_url?: string;
  [key: string]: any; // Allow for additional metadata from web service
}

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export class PhotoData {
  private _metadata: PhotoMetadata;
  private _currentPosition: Position3D;
  private _targetPosition: Position3D;
  private _mesh: THREE.Mesh | null = null;
  private _animationState: PhotoAnimationState;
  private _animationStartTime: number = 0;
  private _properties: Map<string, any> = new Map();

  constructor(metadata: PhotoMetadata, initialPosition: Position3D = { x: 0, y: 0, z: 0 }) {
    this._metadata = { ...metadata };
    this._currentPosition = { ...initialPosition };
    this._targetPosition = { ...initialPosition };
    this._animationState = PhotoAnimationState.SPAWNING;
  }

  // Getters
  get id(): string {
    return this._metadata.id;
  }

  get url(): string {
    return this._metadata.url;
  }

  get metadata(): Readonly<PhotoMetadata> {
    return { ...this._metadata };
  }

  get currentPosition(): Readonly<Position3D> {
    return { ...this._currentPosition };
  }

  get targetPosition(): Readonly<Position3D> {
    return { ...this._targetPosition };
  }

  get mesh(): THREE.Mesh | null {
    return this._mesh;
  }

  get animationState(): PhotoAnimationState {
    return this._animationState;
  }

  get animationStartTime(): number {
    return this._animationStartTime;
  }

  // Setters
  setCurrentPosition(position: Position3D): void {
    this._currentPosition = { ...position };
  }

  setTargetPosition(position: Position3D): void {
    this._targetPosition = { ...position };
  }

  setMesh(mesh: THREE.Mesh | null): void {
    this._mesh = mesh;
  }

  setAnimationState(state: PhotoAnimationState): void {
    this._animationState = state;
    this._animationStartTime = performance.now();
  }

  // Animation helpers
  isAtTarget(tolerance: number = 0.1): boolean {
    const dx = this._currentPosition.x - this._targetPosition.x;
    const dy = this._currentPosition.y - this._targetPosition.y;
    const dz = this._currentPosition.z - this._targetPosition.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz) <= tolerance;
  }

  getAnimationProgress(durationMs: number): number {
    const elapsed = performance.now() - this._animationStartTime;
    return Math.min(1, Math.max(0, elapsed / durationMs));
  }

  // Position interpolation
  lerpToTarget(factor: number): Position3D {
    const current = this._currentPosition;
    const target = this._targetPosition;
    return {
      x: current.x + (target.x - current.x) * factor,
      y: current.y + (target.y - current.y) * factor,
      z: current.z + (target.z - current.z) * factor
    };
  }

  // Property management (for storing additional data like hotspot associations)
  setProperty(key: string, value: any): void {
    this._properties.set(key, value);
  }

  getProperty<T>(key: string): T | undefined {
    return this._properties.get(key) as T;
  }

  hasProperty(key: string): boolean {
    return this._properties.has(key);
  }

  removeProperty(key: string): boolean {
    return this._properties.delete(key);
  }

  // Update metadata (for cases where server updates photo properties)
  updateMetadata(updates: Partial<PhotoMetadata>): void {
    this._metadata = { ...this._metadata, ...updates };
  }

  // Utility methods
  distanceTo(other: PhotoData): number {
    const dx = this._currentPosition.x - other._currentPosition.x;
    const dy = this._currentPosition.y - other._currentPosition.y;
    const dz = this._currentPosition.z - other._currentPosition.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  clone(): PhotoData {
    const cloned = new PhotoData(this._metadata, this._currentPosition);
    cloned._targetPosition = { ...this._targetPosition };
    cloned._animationState = this._animationState;
    cloned._animationStartTime = this._animationStartTime;
    cloned._mesh = this._mesh; // Reference copy - mesh is managed externally
    
    // Clone properties
    this._properties.forEach((value, key) => {
      cloned._properties.set(key, value);
    });
    
    return cloned;
  }

  // Cleanup
  dispose(): void {
    this._mesh = null;
    this._properties.clear();
  }

  // Debug/logging helper
  toString(): string {
    return `PhotoData(id: ${this.id}, pos: (${this._currentPosition.x.toFixed(1)}, ${this._currentPosition.y.toFixed(1)}, ${this._currentPosition.z.toFixed(1)}), state: ${this._animationState})`;
  }
}