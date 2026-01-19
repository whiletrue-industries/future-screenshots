import * as THREE from 'three';
import { Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { PhotoData, PhotoAnimationState } from './photo-data';
import { PHOTO_CONSTANTS } from './photo-constants';
import { FisheyeEffectService } from './fisheye-effect.service';

export interface ThreeRendererOptions {
  photoWidth?: number;   // default PHOTO_CONSTANTS.PHOTO_WIDTH
  photoHeight?: number;  // default PHOTO_CONSTANTS.PHOTO_HEIGHT
  fovDeg?: number;       // default 45
  cameraMargin?: number; // world units, default 300
  cameraDamp?: number;   // default 6
  anisotropy?: number;   // default 4
  background?: number;   // default 0x0b0e13
  svgBackground?: {
    enabled: boolean;
    svgElement?: SVGSVGElement;
    scale?: number;
    offsetX?: number;
    offsetY?: number;
    radius?: number;
  };
}

export interface SceneBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

type TweenFn = (dt: number) => boolean;

@Injectable({
  providedIn: 'root'
})
export class ThreeRendererService {
  // Configuration
  private readonly PHOTO_W: number;
  private readonly PHOTO_H: number;
  private readonly FOV_DEG: number;
  private readonly CAM_MARGIN: number;
  private readonly CAM_DAMP: number;
  private readonly ANISO: number;
  private readonly BG: number;
  private readonly FISHEYE_SCALE_DAMPING = 5; // Lower = slower/smoother animation

  // Three.js objects
  private container: HTMLElement | null = null;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private root!: THREE.Group;
  private clock!: THREE.Clock;
  private texLoader!: THREE.TextureLoader;

  // State management
  private rafRunning = false;
  private activeTweens: TweenFn[] = [];
  private bounds: SceneBounds = { minX: +Infinity, maxX: -Infinity, minY: +Infinity, maxY: -Infinity };
  private targetCamZ = 1200;
  private zSpawn = 700;
  private isInitialized = false;

  // Texture cache
  private textureCache = new Map<string, THREE.Texture>();
  private loadingTextures = new Map<string, Promise<THREE.Texture>>();
  private highResTextureCache = new Map<string, THREE.Texture>();
  private loadingHighResTextures = new Map<string, Promise<THREE.Texture>>();

  // SVG Background
  private svgBackgroundPlane?: THREE.Mesh;
  private svgBackgroundTexture?: THREE.Texture;
  private svgBackgroundOptions?: { enabled: boolean; svgElement?: SVGSVGElement; scale?: number; offsetX?: number; offsetY?: number; radius?: number; desiredOpacity?: number; };

  // Drag and Drop
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private isDragging = false;
  private draggedMesh: THREE.Mesh | null = null;
  private dragPlane = new THREE.Plane();
  private dragOffset = new THREE.Vector3();
  private dragCallbacks = new Map<THREE.Mesh, (position: { x: number; y: number; z: number }) => void>();
  private meshToPhotoId = new Map<THREE.Mesh, string>();
  private meshToPhotoData = new Map<THREE.Mesh, any>(); // Store PhotoData for drag callbacks
  private currentLayoutStrategy: any = null; // Store reference to current layout strategy
  private layoutStrategyRef: any = null; // Store reference for debug visualization
  
  // SVG Container for hotspot detection
  private svgContainer: HTMLElement | null = null;
  
  // Hotspot drop callback
  private onHotspotDropCallback?: (photoId: string, hotspotData: { [key: string]: string | number }, position: { x: number, y: number, z: number }) => Promise<void>;

  // Dragging Preview Widget
  private previewWidget: HTMLElement | null = null;
  private previewImage: HTMLImageElement | null = null;
  private previewHotspotInfo: HTMLElement | null = null;
  private hoveredMesh: THREE.Mesh | null = null;
  private currentMatchedHotspot: { [key: string]: string | number } | null = null;
  
  // Confirmation Toast Widget
  private confirmationToast: HTMLElement | null = null;
  private toastCountdownTimer: number | null = null;
  private dragOutToast: HTMLElement | null = null;
  private dragOutToastTimer: number | null = null;
  
  // Store fisheye state before dragging
  private wasFisheyeEnabled = false;

  // Camera Controls (Zoom & Pan)
  private userControlEnabled = true;
  private targetCamX = 0;
  private targetCamY = 0;
  private minCamZ = 300;
  private maxCamZ = 50000;
  private isPanning = false;
  private panStartMouse = new THREE.Vector2();
  private panStartCameraPos = new THREE.Vector3();
  private autoFitEnabled = true; // When true, camera auto-fits to bounds
  private lastMousePos = new THREE.Vector2();
  private lastClientX: number | null = null;
  private lastClientY: number | null = null;
  private meshToUrl = new Map<THREE.Mesh, string>();
  private highResActive = new Set<THREE.Mesh>();
  private lodAccumTime = 0;
  private maxExtentZoomLevel = 1.0; // Track the furthest extent (largest view) - used as baseline for fisheye zoom calculations

  // Fisheye Effect
  private fisheyeService: FisheyeEffectService;
  private fisheyeEnabled = false;
  private fisheyeEnabledSignal = false; // Track original request to re-enable on zoom change
  private fisheyeAffectedMeshes = new Set<THREE.Mesh>();
  private fisheyeFocusPoint = new THREE.Vector3();
  private meshOriginalStates = new Map<THREE.Mesh, { position: THREE.Vector3; scale: THREE.Vector3; renderOrder: number }>();
  
  // Hover state signal for cursor feedback
  private hoveredItemSignal = signal(false);

  // Settings Panel Controls
  private rotationSpeedMultiplier = 1.0;
  private panSensitivityMultiplier = 1.0;
  private dofStrength = 0;
  private dofPass: any = null; // Post-processing pass for depth of field (if implemented)

  constructor() {
    this.fisheyeService = new FisheyeEffectService();
    const opts: ThreeRendererOptions = {};
    this.PHOTO_W = opts.photoWidth ?? PHOTO_CONSTANTS.PHOTO_WIDTH;
    this.PHOTO_H = opts.photoHeight ?? PHOTO_CONSTANTS.PHOTO_HEIGHT;
    this.FOV_DEG = opts.fovDeg ?? 45;
    this.CAM_MARGIN = opts.cameraMargin ?? 300;
    this.CAM_DAMP = opts.cameraDamp ?? 0.1 * 10000;
    this.ANISO = opts.anisotropy ?? 4;
    this.BG = opts.background ?? 0xFFFDF6;
  }

  // Public API
  async initialize(container: HTMLElement, options?: Partial<ThreeRendererOptions>): Promise<void> {
    if (this.isInitialized) {
      throw new Error('ThreeRendererService is already initialized');
    }

    this.container = container;
    
    // Apply any runtime options
    if (options) {
      if (options.svgBackground) {
        this.svgBackgroundOptions = options.svgBackground;
      }
    }

    await this.initializeThreeJS();
    this.isInitialized = true;
  }

  async createPhotoMesh(photoData: PhotoData): Promise<THREE.Mesh> {
    if (!this.isInitialized) {
      throw new Error('ThreeRendererService not initialized');
    }

    const texture = await this.loadTexture(photoData.url);
    const material = new THREE.MeshBasicMaterial({ 
      map: texture, 
      transparent: true, 
      opacity: 1.0 
    });
    const geometry = new THREE.PlaneGeometry(this.PHOTO_W, this.PHOTO_H);
    const mesh = new THREE.Mesh(geometry, material);

    // Set initial position
    const pos = photoData.currentPosition;
    mesh.position.set(pos.x, pos.y, pos.z);
    
    // Set renderOrder from metadata (preferred photos on top of prevent photos)
    const metadataRenderOrder = photoData.metadata['renderOrder'] as number | undefined;
    mesh.renderOrder = metadataRenderOrder !== undefined ? metadataRenderOrder : 0;
    
    // Apply rotation based on metadata
    const rotation = this.calculatePhotoRotation(photoData);
    mesh.rotation.z = rotation;
    
    this.root.add(mesh);
    photoData.setMesh(mesh);
    // Track PhotoData for hover/fisheye so positions stay current after layout changes
    this.meshToPhotoData.set(mesh, photoData);
    // Track URL for LOD decisions
    this.meshToUrl.set(mesh, photoData.url);
    
    return mesh;
  }

  updatePhotoMesh(photoData: PhotoData): void {
    if (!photoData.mesh) return;

    const pos = photoData.currentPosition;
    photoData.mesh.position.set(pos.x, pos.y, pos.z);
    
    // Update renderOrder from metadata (preferred photos on top of prevent photos)
    const metadataRenderOrder = photoData.metadata['renderOrder'] as number | undefined;
    photoData.mesh.renderOrder = metadataRenderOrder !== undefined ? metadataRenderOrder : 0;
    
    // Update rotation based on current metadata
    const rotation = this.calculatePhotoRotation(photoData);
    photoData.mesh.rotation.z = rotation;
    console.log('[UPDATE_MESH] Photo:', photoData.id, 'mesh.rotation.z updated to', photoData.mesh.rotation.z, 'radians (', THREE.MathUtils.radToDeg(photoData.mesh.rotation.z).toFixed(1), '°)');
  }

  removePhotoMesh(photoData: PhotoData): void {
    if (!photoData.mesh) return;

    this.root.remove(photoData.mesh);
    
    // Dispose of geometry and material
    photoData.mesh.geometry.dispose();
    if (photoData.mesh.material instanceof THREE.Material) {
      photoData.mesh.material.dispose();
    }
    this.meshToPhotoData.delete(photoData.mesh);
    this.meshToUrl.delete(photoData.mesh);
    this.meshToPhotoId.delete(photoData.mesh);
    this.dragCallbacks.delete(photoData.mesh);
    this.highResActive.delete(photoData.mesh);
    this.fisheyeAffectedMeshes.delete(photoData.mesh);
    
    photoData.setMesh(null);
  }

  updateMeshPosition(mesh: THREE.Mesh, position: { x: number; y: number; z: number }): void {
    mesh.position.set(position.x, position.y, position.z);
  }

  /**
   * Upgrade mesh texture to high-resolution version for showcase
   */
  async upgradeToHighResTexture(mesh: THREE.Mesh, url: string): Promise<void> {
    try {
      const highResTexture = await this.loadHighResTexture(url);
      
      if (mesh.material instanceof THREE.MeshBasicMaterial) {
        // Dispose old texture if it was low-res (not high-res cached)
        const oldTexture = mesh.material.map;
        if (oldTexture && !this.highResTextureCache.has(url)) {
          oldTexture.dispose();
        }
        
        // Apply high-res texture
        mesh.material.map = highResTexture;
        mesh.material.needsUpdate = true;
        

      }
    } catch (error) {
      console.warn('Failed to upgrade to high-res texture, keeping low-res:', error);
      // Fallback: keep the existing low-res texture
    }
  }

  /**
   * Downgrade mesh texture back to low-resolution version
   */
  async downgradeToLowResTexture(mesh: THREE.Mesh, url: string): Promise<void> {
    try {
      // Ensure low-res texture is loaded
      const lowResTexture = await this.loadTexture(url);
      
      if (mesh.material instanceof THREE.MeshBasicMaterial) {
        // Apply low-res texture (high-res texture stays in cache)
        mesh.material.map = lowResTexture;
        mesh.material.needsUpdate = true;
        

      }
    } catch (error) {
      console.warn('Failed to downgrade to low-res texture:', error);
    }
  }

  removeMesh(mesh: THREE.Mesh): void {
    this.root.remove(mesh);
    this.meshToUrl.delete(mesh);
    this.highResActive.delete(mesh);
    
    // Clean up drag callback
    this.disableDragForMesh(mesh);
    
    // Dispose of geometry and material
    mesh.geometry.dispose();
    if (mesh.material instanceof THREE.Material) {
      mesh.material.dispose();
    }
  }

  animateToPosition(
    mesh: THREE.Mesh, 
    fromPosition: { x: number; y: number; z: number },
    toPosition: { x: number; y: number; z: number },
    durationSec: number
  ): Promise<void> {
    return new Promise((resolve) => {
      const tweenFn = this.makeTween(durationSec, (progress: number) => {
        const ex = this.easeOutCubic(progress);
        const ez = this.easeInOutCubic(progress);
        
        const x = this.lerp(fromPosition.x, toPosition.x, ex);
        const y = this.lerp(fromPosition.y, toPosition.y, ex);
        const z = this.lerp(fromPosition.z, toPosition.z, ez);
        
        mesh.position.set(x, y, z);
        
        if (progress >= 1.0) {
          mesh.position.set(toPosition.x, toPosition.y, toPosition.z);
          resolve();
        }
      });
      
      this.addTween(tweenFn);
    });
  }

  animateOpacity(
    mesh: THREE.Mesh,
    fromOpacity: number,
    toOpacity: number,
    durationSec: number
  ): Promise<void> {
    return new Promise((resolve) => {
      // Ensure material supports transparency
      if (mesh.material && 'transparent' in mesh.material) {
        (mesh.material as any).transparent = true;
      }
      
      const tweenFn = this.makeTween(durationSec, (progress: number) => {
        const eased = this.easeOutCubic(progress);
        const opacity = this.lerp(fromOpacity, toOpacity, eased);
        
        if (mesh.material && 'opacity' in mesh.material) {
          (mesh.material as any).opacity = opacity;
        }
        
        if (progress >= 1.0) {
          if (mesh.material && 'opacity' in mesh.material) {
            (mesh.material as any).opacity = toOpacity;
          }
          resolve();
        }
      });
      
      this.addTween(tweenFn);
    });
  }

  animatePositionAndOpacity(
    mesh: THREE.Mesh,
    fromPosition: { x: number; y: number; z: number },
    toPosition: { x: number; y: number; z: number },
    fromOpacity: number,
    toOpacity: number,
    durationSec: number
  ): Promise<void> {
    return new Promise((resolve) => {
      // Ensure material supports transparency
      if (mesh.material && 'transparent' in mesh.material) {
        (mesh.material as any).transparent = true;
      }
      
      const tweenFn = this.makeTween(durationSec, (progress: number) => {
        const ex = this.easeOutCubic(progress);
        const ez = this.easeInOutCubic(progress);
        
        // Animate position
        const x = this.lerp(fromPosition.x, toPosition.x, ex);
        const y = this.lerp(fromPosition.y, toPosition.y, ex);
        const z = this.lerp(fromPosition.z, toPosition.z, ez);
        mesh.position.set(x, y, z);
        
        // Animate opacity
        const opacity = this.lerp(fromOpacity, toOpacity, ex);
        if (mesh.material && 'opacity' in mesh.material) {
          (mesh.material as any).opacity = opacity;
        }
        
        if (progress >= 1.0) {
          mesh.position.set(toPosition.x, toPosition.y, toPosition.z);
          if (mesh.material && 'opacity' in mesh.material) {
            (mesh.material as any).opacity = toOpacity;
          }
          resolve();
        }
      });
      
      this.addTween(tweenFn);
    });
  }

  // Camera management
  updateCameraTarget(newBounds: SceneBounds): void {
    this.bounds = { ...newBounds };
    if (this.autoFitEnabled) {
      const targetCamZ = this.computeFitZWithMargin(
        this.bounds,
        THREE.MathUtils.degToRad(this.camera.fov),
        this.container!.clientWidth / this.container!.clientHeight,
        this.CAM_MARGIN
      );
      this.targetCamZ = targetCamZ;
    }
  }

  animateCameraTarget(newBounds: SceneBounds, durationSec: number): Promise<void> {
    return new Promise((resolve) => {
      this.bounds = { ...newBounds };
      if (!this.autoFitEnabled) {
        resolve();
        return;
      }
      
      const targetCamZ = this.computeFitZWithMargin(
        this.bounds,
        THREE.MathUtils.degToRad(this.camera.fov),
        this.container!.clientWidth / this.container!.clientHeight,
        this.CAM_MARGIN
      );
      
      const startCamZ = this.targetCamZ;
      const finalTargetCamZ = targetCamZ;
      
      // If no change needed, resolve immediately
      if (Math.abs(finalTargetCamZ - startCamZ) < 0.01) {
        resolve();
        return;
      }
      
      const tweenFn = this.makeTween(durationSec, (progress: number) => {
        const eased = this.easeOutCubic(progress);
        this.targetCamZ = this.lerp(startCamZ, finalTargetCamZ, eased);
        
        if (progress >= 1.0) {
          this.targetCamZ = finalTargetCamZ;
          resolve();
        }
      });
      
      this.addTween(tweenFn);
    });
  }

  /**
   * Enable or disable user camera controls
   */
  setUserControlEnabled(enabled: boolean): void {
    this.userControlEnabled = enabled;
  }

  /**
   * Enable or disable auto-fit mode
   * When enabled, camera automatically fits all content
   * When disabled, user controls the camera with zoom/pan
   */
  setAutoFit(enabled: boolean): void {
    this.autoFitEnabled = enabled;
    if (enabled) {
      // Re-calculate target position to fit bounds
      this.updateCameraTarget(this.bounds);
    }
  }

  /**
   * Reset camera view to fit all content
   */
  resetCameraView(animated = true): void {
    this.autoFitEnabled = true;
    this.targetCamX = 0;
    this.targetCamY = 0;
    
    if (animated) {
      this.animateCameraTarget(this.bounds, 0.5);
    } else {
      this.updateCameraTarget(this.bounds);
    }
  }


  /**
   * Zoom camera by a factor at a specific screen point
   * Simple and direct: anchor to cursor position
   */
  zoomAtPoint(factor: number, screenX: number, screenY: number): void {
    if (!this.userControlEnabled || this.autoFitEnabled) return;

    const rect = this.container!.getBoundingClientRect();
    const ndcX = ((screenX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((screenY - rect.top) / rect.height) * 2 + 1;

    // Where does this screen point hit the world plane NOW?
    const worldBefore = this.projectScreenToWorld(ndcX, ndcY, this.targetCamX, this.targetCamY, this.targetCamZ);
    
    // Apply zoom
    const newZ = THREE.MathUtils.clamp(this.targetCamZ * factor, this.minCamZ, this.maxCamZ);
    this.targetCamZ = newZ;
    
    // Where does this screen point hit the world plane AFTER zoom?
    const worldAfter = this.projectScreenToWorld(ndcX, ndcY, this.targetCamX, this.targetCamY, this.targetCamZ);
    
    // Pan camera to keep cursor pointing at same world location
    this.targetCamX += (worldBefore.x - worldAfter.x);
    this.targetCamY += (worldBefore.y - worldAfter.y);
  }

  /**
   * Calculate rotation angle for a photo based on plausibility and favorable_future metadata
   * Returns rotation in radians
   */
  private calculatePhotoRotation(photoData: PhotoData): number {
    const metadata = photoData.metadata;
    
    const plausibility = metadata['plausibility'];
    const favorableFuture = metadata['_svgZoneFavorableFuture'] as string | undefined || metadata['favorable_future'];
    
    // If either value is missing, use stable random rotation
    if (plausibility === undefined || plausibility === null || !favorableFuture) {
      console.warn('[ROTATION] Missing data for photo:', photoData.id, '- plausibility:', plausibility, 'favorable_future:', favorableFuture);
      return this.getStableRandomRotation(photoData.id);
    }
    
    // Normalize plausibility to 0-1 range (0=preposterous, 100=projected)
    // Expected values: 0, 25, 50, 75, 100
    const normalizedPlausibility = plausibility / 100;
    
    // Maximum rotation at extremes (32 degrees in radians)
    const maxRotationDeg = 32;
    const maxRotationRad = THREE.MathUtils.degToRad(maxRotationDeg);
    
    // Calculate base rotation based on plausibility
    // At plausibility=0 (preposterous): full rotation
    // At plausibility=100 (projected): no rotation
    const rotationMagnitude = (1 - normalizedPlausibility) * maxRotationRad;
    
    // Apply direction based on favorable_future
    // "favor" -> positive rotation, "prevent" -> negative rotation
    const favorableFutureLower = favorableFuture.toLowerCase().trim();
    const isFavor = favorableFutureLower === 'favor' || favorableFutureLower === 'favorable' || 
                    favorableFutureLower === 'prefer' || favorableFutureLower === 'preferred' ||
                    favorableFutureLower === 'mostly prefer' || favorableFutureLower === 'mostly preferred';
    const isPrevent = favorableFutureLower === 'prevent' || favorableFutureLower === 'prevented' || 
                      favorableFutureLower === 'unfavorable' ||
                      favorableFutureLower === 'mostly prevent' || favorableFutureLower === 'mostly prevented';
    const isUncertain = favorableFutureLower === 'uncertain' || favorableFutureLower === 'unsure';
    
    if (isUncertain) {
      // Uncertain items should have no rotation (neutral)
      return 0;
    }
    
    if (!isFavor && !isPrevent) {
      // Unknown favorable_future value, don't rotate
      console.warn('[ROTATION] Unknown favorable_future value:', favorableFuture, 'for photo:', photoData.id);
      return this.getStableRandomRotation(photoData.id);
    }
    
    const finalRotation = isFavor ? rotationMagnitude : -rotationMagnitude;

    return finalRotation;
  }

  /**
   * Calculate evaluation rotation (based on plausibility/favorable_future, ignoring cluster rotation)
   * Used when fisheye is active to override cluster rotation
   */
  private calculateEvaluationRotation(photoData: PhotoData): number {
    const metadata = photoData.metadata;
    const plausibility = metadata['plausibility'];
    const favorableFuture = metadata['_svgZoneFavorableFuture'] as string | undefined || metadata['favorable_future'];
    
    // If either value is missing, use stable random rotation
    if (plausibility === undefined || plausibility === null || !favorableFuture) {
      return this.getStableRandomRotation(photoData.id);
    }
    
    // Normalize plausibility to 0-1 range (0=preposterous, 100=projected)
    const normalizedPlausibility = plausibility / 100;
    
    // Maximum rotation at extremes (32 degrees in radians)
    const maxRotationDeg = 32;
    const maxRotationRad = THREE.MathUtils.degToRad(maxRotationDeg);
    
    // Calculate base rotation based on plausibility
    const rotationMagnitude = (1 - normalizedPlausibility) * maxRotationRad;
    
    // Apply direction based on favorable_future
    const favorableFutureLower = favorableFuture.toLowerCase().trim();
    const isFavor = favorableFutureLower === 'favor' || favorableFutureLower === 'favorable' || 
                    favorableFutureLower === 'prefer' || favorableFutureLower === 'preferred';
    const isPrevent = favorableFutureLower === 'prevent' || favorableFutureLower === 'prevented' || 
                      favorableFutureLower === 'unfavorable';
    
    if (!isFavor && !isPrevent) {
      return this.getStableRandomRotation(photoData.id);
    }
    
    return isFavor ? rotationMagnitude : -rotationMagnitude;
  }

  /**
   * Get a stable random rotation offset for natural layout
   * Returns -1°, 0°, or +1° in radians, consistent for the same photo ID
   */
  private getStableRandomRotation(photoId: string): number {
    // Simple hash of photo ID to get consistent random value
    let hash = 0;
    for (let i = 0; i < photoId.length; i++) {
      hash = ((hash << 5) - hash) + photoId.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Map hash to -1, 0, or +1 degrees
    const offset = (Math.abs(hash) % 3) - 1; // Results in -1, 0, or 1
    return THREE.MathUtils.degToRad(offset);
  }

  /**
   * Project a screen coordinate to world space at Z=0 plane
   * camX, camY, camZ: camera position
   * ndcX, ndcY: normalized device coordinates
   */
  private projectScreenToWorld(ndcX: number, ndcY: number, camX: number, camY: number, camZ: number): THREE.Vector3 {
    // Field of view
    const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
    const height = 2 * Math.tan(vFOV / 2) * camZ;
    const width = height * this.camera.aspect;
    
    // World position on Z=0 plane
    const worldX = camX + (ndcX * width / 2);
    const worldY = camY + (ndcY * height / 2);
    
    return new THREE.Vector3(worldX, worldY, 0);
  }

  /**
   * Pan camera by pixel amount
   */
  panCamera(deltaX: number, deltaY: number): void {
    if (!this.userControlEnabled || this.autoFitEnabled) return;

    const rect = this.container!.getBoundingClientRect();
    // Convert pixel deltas to world space
    const worldDeltaX = (deltaX / rect.width) * 2 * this.getVisibleWidth();
    const worldDeltaY = (deltaY / rect.height) * 2 * this.getVisibleHeight();
    
    // Apply pan sensitivity multiplier if set
    const panSensitivity = this.panSensitivityMultiplier;
    
    this.targetCamX -= worldDeltaX * panSensitivity;
    this.targetCamY += worldDeltaY * panSensitivity;
  }

  /**
   * Get visible world width at current zoom level
   */
  private getVisibleWidth(): number {
    const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
    const height = 2 * Math.tan(vFOV / 2) * this.targetCamZ;
    const width = height * this.camera.aspect;
    return width / 2;
  }

  /**
   * Get visible half-width in world units at a specific depth from camera
   */
  private getVisibleWidthAtDepth(depth: number): number {
    const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
    const height = 2 * Math.tan(vFOV / 2) * depth;
    const width = height * this.camera.aspect;
    return width / 2;
  }

  /**
   * Get visible world height at current zoom level
   */
  private getVisibleHeight(): number {
    const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
    const height = 2 * Math.tan(vFOV / 2) * this.targetCamZ;
    return height / 2;
  }

  /**
   * Convert screen coordinates to world coordinates at a given depth
   * Used for non-zoom operations (drag detection, hotspot finding)
   */
  private screenToWorld(x: number, y: number, depth: number): THREE.Vector3 {
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(this.camera);
    
    const dir = vector.sub(this.camera.position).normalize();
    const distance = (depth - this.camera.position.z) / dir.z;
    
    return this.camera.position.clone().add(dir.multiplyScalar(distance));
  }

  getCameraSpawnZ(): number {
    return this.camera.position.z - this.zSpawn;
  }

  getCurrentBounds(): Readonly<SceneBounds> {
    return { ...this.bounds };
  }

  // Fisheye Effect API
  enableFisheyeEffect(enabled: boolean): void {
    console.log('[RENDERER] enableFisheyeEffect called with:', enabled);
    this.fisheyeEnabled = enabled;
    this.fisheyeEnabledSignal = enabled; // Track original request
    console.log('[RENDERER] fisheyeEnabled is now:', this.fisheyeEnabled, 'fisheyeEnabledSignal:', this.fisheyeEnabledSignal);
    if (!enabled) {
      // Reset all affected meshes to their original state
      this.resetAllFisheyeEffects();
    }
  }

  isFisheyeEnabled(): boolean {
    return this.fisheyeEnabled;
  }

  isDraggingItem(): boolean {
    return this.isDragging;
  }

  isHoveringItem(): Signal<boolean> {
    return this.hoveredItemSignal;
  }

  setFisheyeConfig(config: { radius?: number; magnification?: number; distortion?: number; zoomRelative?: number; maxHeight?: number; viewportHeight?: number; cameraZ?: number; fov?: number }): void {
    // Pass all config parameters to fisheye service
    // Also pass current camera state for zoom-agnostic calculations
    this.fisheyeService.setConfig({
      ...config,
      cameraZ: config.cameraZ ?? this.targetCamZ,
      fov: config.fov ?? this.FOV_DEG
    });
  }

  getFisheyeConfig() {
    return this.fisheyeService.getConfig();
  }

  // Animation system
  addTween(tweenFn: TweenFn): void {
    this.activeTweens.push(tweenFn);
  }

  runTween(tweenFn: TweenFn): Promise<void> {
    return new Promise((resolve) => {
      this.activeTweens.push((dt) => {
        const finished = tweenFn(dt);
        if (finished) { 
          resolve(); 
          return true; 
        }
        return false;
      });
    });
  }

  makeTween(durationSec: number, onUpdate: (progress: number) => void): TweenFn {
    let elapsed = 0;
    return (dt: number) => {
      elapsed += dt;
      const progress = this.clamp01(elapsed / durationSec);
      onUpdate(progress);
      return progress >= 1.0;
    };
  }

  // Utility methods for animations
  expandBounds(centerX: number, centerY: number, width: number, height: number): void {
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    this.bounds.minX = Math.min(this.bounds.minX, centerX - halfW);
    this.bounds.maxX = Math.max(this.bounds.maxX, centerX + halfW);
    this.bounds.minY = Math.min(this.bounds.minY, centerY - halfH);
    this.bounds.maxY = Math.max(this.bounds.maxY, centerY + halfH);
  }

  // Easing functions
  easeOutCubic(t: number): number {
    t = this.clamp01(t);
    return 1 - Math.pow(1 - t, 2);
  }

  easeInOutCubic(t: number): number {
    t = this.clamp01(t);
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  easeOutBack(t: number, s = 1.70158): number {
    t = this.clamp01(t);
    return 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
  }

  lerp(a: number, b: number, t: number): number {
    return THREE.MathUtils.lerp(a, b, t);
  }

  damp(current: number, target: number, lambda: number, deltaTime: number): number {
    return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * deltaTime));
  }

  // Fisheye Effect Helper Methods
  
  /**
   * Disable fisheye immediately on zoom and re-enable once zoom completes
   */
  private disableFisheyeForZoom(): void {
    // Disable fisheye immediately
    if (this.fisheyeEnabled) {
      this.fisheyeEnabled = false;
      // Reset all affected meshes to their original non-fisheye scale/position
      this.resetAllFisheyeEffects();
    }
  }

  /**
   * Re-enable fisheye after zoom action completes
   */
  private reEnableFisheyeAfterZoom(): void {
    if (this.fisheyeEnabledSignal) {
      this.fisheyeEnabled = true;
    }
  }
  
  private applyFisheyeEffect(): void {
    
    // Get viewport dimensions
    const viewportHeight = this.container?.clientHeight ?? window.innerHeight;

    // Update camera state in fisheye config for accurate world-to-screen conversions
    this.fisheyeService.setConfig({
      cameraZ: this.targetCamZ,
      fov: this.FOV_DEG,
      viewportHeight: viewportHeight
    });

    // Exit early if disabled
    if (!this.fisheyeEnabled) {
      return;
    }

    // Get the world position of the mouse cursor
    const worldPos = this.screenToWorld(this.mouse.x, this.mouse.y, 0);
    this.fisheyeFocusPoint.set(worldPos.x, worldPos.y, 0);

    // Clear previously affected meshes
    const previouslyAffected = new Set(this.fisheyeAffectedMeshes);
    this.fisheyeAffectedMeshes.clear();

    // Apply fisheye effect to all meshes in the scene
    const config = this.fisheyeService.getConfig();
    const effectRadiusSquared = config.radius * config.radius; // Use squared distance to avoid sqrt
    
    this.root.children.forEach((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      // Get the logical position from PhotoData (if available)
      const photoData = this.meshToPhotoData.get(mesh);
      
      // Skip hidden items (animationState === 'hidden')
      if (photoData && photoData.animationState === 'hidden') return;
      
      let logicalPosition: THREE.Vector3;
      let meshHeight = this.PHOTO_H; // Default to standard photo height
      
      if (photoData && photoData.currentPosition) {
        // Use PhotoData's current position as the logical position
        logicalPosition = new THREE.Vector3(
          photoData.currentPosition.x,
          photoData.currentPosition.y,
          photoData.currentPosition.z
        );
        // Use PhotoData's dimensions if available
        if (photoData.height) {
          meshHeight = photoData.height;
        }
      } else {
        // Fallback to mesh's current position if no PhotoData
        // Store original state if not already stored
        if (!this.meshOriginalStates.has(mesh)) {
          this.meshOriginalStates.set(mesh, {
            position: mesh.position.clone(),
            scale: mesh.scale.clone(),
            renderOrder: mesh.renderOrder
          });
        }
        logicalPosition = this.meshOriginalStates.get(mesh)!.position.clone();
      }

      // Early culling: check squared distance to avoid sqrt calculation
      const dx = logicalPosition.x - this.fisheyeFocusPoint.x;
      const dy = logicalPosition.y - this.fisheyeFocusPoint.y;
      const distanceSquared = dx * dx + dy * dy;
      
      // Skip meshes that are clearly outside the effect radius
      if (distanceSquared > effectRadiusSquared) {
        // Reset if previously affected
        if (previouslyAffected.has(mesh)) {
          mesh.scale.set(1, 1, 1);
          mesh.position.copy(logicalPosition);
          
          // Reset renderOrder to metadata-based value
          if (photoData) {
            const metadataRenderOrder = photoData.metadata['renderOrder'] as number | undefined;
            mesh.renderOrder = metadataRenderOrder !== undefined ? metadataRenderOrder : 0;
          } else {
            mesh.renderOrder = 0;
          }
          
          if (mesh.material && 'opacity' in mesh.material) {
            (mesh.material as any).opacity = 1;
          }
          // Remove shadow if dragging
          if (this.draggedMesh === mesh && mesh.userData['shadowMesh']) {
            this.scene.remove(mesh.userData['shadowMesh']);
            mesh.userData['shadowMesh'] = null;
          }
        }
        return;
      }

      const effect = this.fisheyeService.calculateEffect(
        logicalPosition, 
        this.fisheyeFocusPoint,
        meshHeight,
        viewportHeight
      );

      if (effect) {
        // Mesh is within fisheye radius - apply effect
        this.fisheyeAffectedMeshes.add(mesh);

        // Override cluster rotation with evaluation rotation when in fisheye
        // Store original rotation if not already stored
        if (!mesh.userData['originalRotation']) {
          mesh.userData['originalRotation'] = mesh.rotation.z;
        }
        
        // Calculate evaluation rotation for fisheye override
        if (photoData) {
          const evaluationRotation = this.calculateEvaluationRotation(photoData);
          mesh.rotation.z = evaluationRotation;
        }

        // Apply scale (magnification)
        let targetScale = effect.scale;
        
        // If dragging, scale back to 1.0 and add drop shadow
        if (this.isDragging && this.draggedMesh === mesh) {
          targetScale = 1.0;
          
          // Add or update drop shadow
          if (!mesh.userData['shadowMesh']) {
            // Create a shadow mesh
            const shadowGeometry = new THREE.PlaneGeometry(1, 1);
            const shadowMaterial = new THREE.MeshBasicMaterial({
              color: 0x000000,
              transparent: true,
              opacity: 0.3,
              depthWrite: false
            });
            const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
            shadowMesh.scale.set(mesh.scale.x, mesh.scale.y, 1);
            shadowMesh.position.set(
              mesh.position.x + 20,
              mesh.position.y - 30,
              mesh.position.z - 1
            );
            shadowMesh.renderOrder = effect.renderOrder - 1;
            this.scene.add(shadowMesh);
            mesh.userData['shadowMesh'] = shadowMesh;
          } else {
            // Update shadow position and scale
            const shadowMesh = mesh.userData['shadowMesh'] as THREE.Mesh;
            shadowMesh.position.set(
              logicalPosition.x + effect.positionOffset.x + 20,
              logicalPosition.y + effect.positionOffset.y - 30,
              logicalPosition.z - 1
            );
            shadowMesh.scale.set(targetScale, targetScale, 1);
            shadowMesh.renderOrder = effect.renderOrder - 1;
          }
        } else {
          // Not dragging - remove shadow if it exists
          if (mesh.userData['shadowMesh']) {
            this.scene.remove(mesh.userData['shadowMesh']);
            mesh.userData['shadowMesh'] = null;
          }
        }

        // Apply scale with damping for smooth animation
        const currentScale = mesh.scale.x;
        const dampedScale = this.damp(currentScale, targetScale, this.FISHEYE_SCALE_DAMPING, 0.016); // 0.016s ≈ 60fps frame
        mesh.scale.set(dampedScale, dampedScale, 1);

        // Apply position offset (radial displacement from logical position)
        mesh.position.set(
          logicalPosition.x + effect.positionOffset.x,
          logicalPosition.y + effect.positionOffset.y,
          logicalPosition.z
        );

        // Apply render order (z-index)
        mesh.renderOrder = effect.renderOrder;
      } else {
        // Mesh is outside fisheye radius - reset to logical position
        if (previouslyAffected.has(mesh)) {
          mesh.scale.set(1, 1, 1);
          mesh.position.copy(logicalPosition);
          
          // Reset renderOrder to metadata-based value
          if (photoData) {
            const metadataRenderOrder = photoData.metadata['renderOrder'] as number | undefined;
            mesh.renderOrder = metadataRenderOrder !== undefined ? metadataRenderOrder : 0;
          } else {
            mesh.renderOrder = 0;
          }
          
          // Restore original rotation (cluster rotation)
          if (mesh.userData['originalRotation'] !== undefined) {
            mesh.rotation.z = mesh.userData['originalRotation'];
            mesh.userData['originalRotation'] = undefined;
          }
          
          // Remove shadow
          if (mesh.userData['shadowMesh']) {
            this.scene.remove(mesh.userData['shadowMesh']);
            mesh.userData['shadowMesh'] = null;
          }
        }
      }
    });
  }

  private resetAllFisheyeEffects(): void {
    // Reset all affected meshes to their original positions
    this.fisheyeAffectedMeshes.forEach((mesh) => {
      const photoData = this.meshToPhotoData.get(mesh);
      if (photoData && photoData.currentPosition) {
        // Reset to PhotoData's current position
        mesh.position.set(
          photoData.currentPosition.x,
          photoData.currentPosition.y,
          photoData.currentPosition.z
        );
      } else if (this.meshOriginalStates.has(mesh)) {
        // Fallback to stored original position
        const originalState = this.meshOriginalStates.get(mesh)!;
        mesh.position.copy(originalState.position);
      }
      
      // Reset scale and render order
      mesh.scale.set(1, 1, 1);
      mesh.renderOrder = 0;
      
      // Restore original rotation (cluster rotation)
      if (mesh.userData['originalRotation'] !== undefined) {
        mesh.rotation.z = mesh.userData['originalRotation'];
        mesh.userData['originalRotation'] = undefined;
      }
    });
    this.fisheyeAffectedMeshes.clear();
  }

  /**
   * Enable or update SVG background
   */
  setSvgBackground(svgElement: SVGSVGElement, options?: { scale?: number; offsetX?: number; offsetY?: number; radius?: number; desiredOpacity?: number; }): void {
    // Remove existing background if present
    if (this.svgBackgroundPlane) {
      this.scene.remove(this.svgBackgroundPlane);
      this.svgBackgroundPlane.geometry.dispose();
      if (this.svgBackgroundPlane.material instanceof THREE.Material) {
        this.svgBackgroundPlane.material.dispose();
      }
      this.svgBackgroundPlane = undefined;
    }
    
    if (this.svgBackgroundTexture) {
      this.svgBackgroundTexture.dispose();
      this.svgBackgroundTexture = undefined;
    }
    
    // Remove existing SVG container from DOM
    if (this.svgContainer) {
      this.svgContainer.remove();
    }
    
    // Set up new background
    this.svgBackgroundOptions = {
      enabled: true,
      svgElement,
      scale: options?.scale ?? 1,
      offsetX: options?.offsetX ?? 0,
      offsetY: options?.offsetY ?? 0,
      radius: options?.radius,
      desiredOpacity: options?.desiredOpacity ?? 1
    } as any;
    
    // Create DOM container for SVG hotspot detection
    this.createSvgDomContainer(svgElement);
    
    this.setupSvgBackground(this.svgBackgroundOptions!);
  }

  /**
   * Enable drag functionality for a mesh with callback
   */
  enableDragForMesh(mesh: THREE.Mesh, callback: (position: { x: number; y: number; z: number }) => void) {
    this.dragCallbacks.set(mesh, callback);
  }

  /**
   * Set the photo ID for a mesh (for hotspot detection)
   */
  setMeshPhotoId(mesh: THREE.Mesh, photoId: string): void {
    this.meshToPhotoId.set(mesh, photoId);
  }

  /**
   * Set the current layout strategy for drag integration
   */
  setLayoutStrategy(strategy: any): void {
    this.currentLayoutStrategy = strategy;
  }

  /**
   * Set the hotspot drop callback
   */
  setHotspotDropCallback(callback: (photoId: string, hotspotData: { [key: string]: string | number }, position: { x: number, y: number, z: number }) => Promise<void>): void {
    this.onHotspotDropCallback = callback;
  }

  /**
   * Set layout strategy reference for debug visualization
   */
  setLayoutStrategyReference(strategy: any): void {
    this.layoutStrategyRef = strategy;
  }

  /**
   * Set PhotoData for a mesh (needed for drag callbacks)
   */
  setMeshPhotoData(mesh: THREE.Mesh, photoData: any): void {
    this.meshToPhotoData.set(mesh, photoData);
  }

  /**
   * Find the photo ID for a given mesh
   */
  private findPhotoIdForMesh(mesh: THREE.Mesh): string | null {
    return this.meshToPhotoId.get(mesh) || null;
  }

  /**
   * Check if current layout supports interactive features (drag & drop)
   */
  private isInteractiveLayout(): boolean {
    return this.svgBackgroundOptions?.enabled || false;
  }

  /**
   * Create DOM container for SVG hotspot detection
   */
  private createSvgDomContainer(svgElement: SVGSVGElement): void {
    if (!this.container) {
      return;
    }

    // Create a container div for the SVG
    this.svgContainer = document.createElement('div');
    this.svgContainer.style.position = 'absolute';
    this.svgContainer.style.top = '0';
    this.svgContainer.style.left = '0';
    this.svgContainer.style.width = '100%';
    this.svgContainer.style.height = '100%';
    this.svgContainer.style.pointerEvents = 'none'; // Don't interfere with Three.js interactions
    this.svgContainer.style.zIndex = '1'; // Behind Three.js canvas but above background
    this.svgContainer.style.opacity = '0'; // Invisible but still queryable

    // Clone the SVG element and add it to the container
    const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
    svgClone.style.width = '100%';
    svgClone.style.height = '100%';
    svgClone.style.position = 'absolute';
    
    this.svgContainer.appendChild(svgClone);
    this.container.appendChild(this.svgContainer);
  }

  private animateMaterialOpacity(material: THREE.Material, targetOpacity: number, durationMs = 600): void {
    const startOpacity = (material as any).opacity ?? 1;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = t * (2 - t); // easeOutQuad
      (material as any).opacity = startOpacity + (targetOpacity - startOpacity) * eased;
      material.needsUpdate = true;
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  /**
   * Create dragging preview widget
   */
  private createPreviewWidget(): void {
    if (!this.container) {
      return;
    }

    // Create main widget container
    this.previewWidget = document.createElement('div');
    this.previewWidget.style.position = 'absolute';
    this.previewWidget.style.top = '50%';
    this.previewWidget.style.transform = 'translateY(-50%)';
    this.previewWidget.style.height = '50vh';
    this.previewWidget.style.width = 'auto';
    this.previewWidget.style.aspectRatio = '530/1000'; // Actual photo proportions (530x1000)
    this.previewWidget.style.backgroundColor = 'transparent';
    this.previewWidget.style.borderRadius = '12px';
    this.previewWidget.style.padding = '0';
    this.previewWidget.style.pointerEvents = 'none';
    this.previewWidget.style.zIndex = '1000';
    this.previewWidget.style.display = 'none';
    this.previewWidget.style.transition = 'opacity 0.2s ease-in-out, left 0.3s ease-in-out';
    this.previewWidget.style.fontFamily = 'Arial, sans-serif';
    this.previewWidget.style.fontSize = '14px';
    this.previewWidget.style.color = 'white';
    this.previewWidget.style.filter = 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3))';

    // Create image element
    this.previewImage = document.createElement('img');
    this.previewImage.style.width = '100%';
    this.previewImage.style.height = '100%';
    this.previewImage.style.objectFit = 'contain'; // Changed from 'cover' to 'contain' to prevent cropping
    this.previewImage.style.borderRadius = '12px';
    this.previewImage.style.display = 'block';

    // Create hotspot info element
    this.previewHotspotInfo = document.createElement('div');
    this.previewHotspotInfo.style.display = 'none';
    this.previewHotspotInfo.style.position = 'absolute';
    this.previewHotspotInfo.style.bottom = '10px';
    this.previewHotspotInfo.style.left = '50%';
    this.previewHotspotInfo.style.transform = 'translateX(-50%)';
    this.previewHotspotInfo.style.padding = '8px 12px';
    this.previewHotspotInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    this.previewHotspotInfo.style.borderRadius = '20px';
    this.previewHotspotInfo.style.fontWeight = 'bold';
    this.previewHotspotInfo.style.fontSize = '12px';
    this.previewHotspotInfo.style.whiteSpace = 'nowrap';
    this.previewHotspotInfo.style.maxWidth = '90%';
    this.previewHotspotInfo.style.textAlign = 'center';
    this.previewHotspotInfo.style.overflow = 'hidden';
    this.previewHotspotInfo.style.textOverflow = 'ellipsis';

    // Assemble widget
    this.previewWidget.appendChild(this.previewImage);
    this.previewWidget.appendChild(this.previewHotspotInfo);
    this.container.appendChild(this.previewWidget);
  }

  /**
   * Create confirmation toast widget that appears after dropping on hotspot
   * Shows image with rotation, pin icon, textual evaluation, and countdown timer
   */
  private createConfirmationToast(): void {
    if (!this.container) {
      return;
    }

    // Create main toast container
    this.confirmationToast = document.createElement('div');
    this.confirmationToast.style.position = 'fixed';
    this.confirmationToast.style.bottom = '-300px'; // Start off-screen
    this.confirmationToast.style.right = '32px';
    this.confirmationToast.style.width = '320px';
    this.confirmationToast.style.backgroundColor = '#FFFDF6';
    this.confirmationToast.style.borderRadius = '16px';
    this.confirmationToast.style.padding = '20px';
    this.confirmationToast.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.25)';
    this.confirmationToast.style.zIndex = '2000';
    this.confirmationToast.style.display = 'none';
    this.confirmationToast.style.transition = 'bottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    this.confirmationToast.style.fontFamily = 'Arial, sans-serif';
    this.confirmationToast.innerHTML = `
      <div style="position: relative;">
        <!-- Close button with countdown -->
        <button id="toast-close-btn" style="
          position: absolute;
          top: -8px;
          right: -8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #334155;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #334155;
          z-index: 10;
        ">×</button>
        
        <!-- Countdown circle -->
        <svg id="toast-countdown" style="
          position: absolute;
          top: -8px;
          right: -8px;
          width: 32px;
          height: 32px;
          transform: rotate(-90deg);
          pointer-events: none;
          z-index: 11;
        ">
          <circle cx="16" cy="16" r="14" fill="none" stroke="#10b981" stroke-width="2" 
            stroke-dasharray="87.96" stroke-dashoffset="0" 
            style="transition: stroke-dashoffset 3s linear;"/>
        </svg>
        
        <!-- Content container -->
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <!-- Image with pin -->
          <div style="position: relative; flex-shrink: 0;">
            <img id="toast-image" style="
              width: 80px;
              height: 150px;
              object-fit: cover;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            " />
            <!-- Pin icon overlay -->
            <div id="toast-pin" style="
              position: absolute;
              top: -12px;
              left: 50%;
              transform: translateX(-50%);
              font-size: 32px;
              filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            ">📍</div>
          </div>
          
          <!-- Text content -->
          <div style="flex: 1; min-width: 0;">
            <div id="toast-evaluation" style="
              font-size: 16px;
              font-weight: 600;
              color: #0f172a;
              margin-bottom: 8px;
              line-height: 1.4;
            "></div>
            
            <!-- Ambivalence button -->
            <button id="toast-ambivalence-btn" style="
              margin-top: 8px;
              padding: 8px 12px;
              background: #e2e8f0;
              border: 1px solid #cbd5e1;
              border-radius: 8px;
              font-size: 12px;
              color: #475569;
              cursor: pointer;
              width: 100%;
              transition: all 0.2s;
            ">
              ± Add ambivalence marker
            </button>
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(this.confirmationToast);
    
    // Set up event listeners
    const closeBtn = this.confirmationToast.querySelector('#toast-close-btn') as HTMLButtonElement;
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hideConfirmationToast());
    }
    
    const ambivalenceBtn = this.confirmationToast.querySelector('#toast-ambivalence-btn') as HTMLButtonElement;
    if (ambivalenceBtn) {
      ambivalenceBtn.addEventListener('click', () => this.handleAmbivalenceClick());
      // Hover effect
      ambivalenceBtn.addEventListener('mouseenter', () => {
        ambivalenceBtn.style.background = '#cbd5e1';
        ambivalenceBtn.style.borderColor = '#94a3b8';
      });
      ambivalenceBtn.addEventListener('mouseleave', () => {
        ambivalenceBtn.style.background = '#e2e8f0';
        ambivalenceBtn.style.borderColor = '#cbd5e1';
      });
    }
  }

  /**
   * Create drag-out toast for "evaluation removed" message
   */
  private createDragOutToast(): void {
    if (!this.container) {
      return;
    }

    // Create simple toast for drag-out notification
    this.dragOutToast = document.createElement('div');
    this.dragOutToast.style.position = 'fixed';
    this.dragOutToast.style.bottom = '-80px'; // Start off-screen
    this.dragOutToast.style.left = '50%';
    this.dragOutToast.style.transform = 'translateX(-50%)';
    this.dragOutToast.style.padding = '16px 24px';
    this.dragOutToast.style.backgroundColor = '#475569';
    this.dragOutToast.style.color = 'white';
    this.dragOutToast.style.borderRadius = '12px';
    this.dragOutToast.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
    this.dragOutToast.style.zIndex = '2000';
    this.dragOutToast.style.display = 'none';
    this.dragOutToast.style.transition = 'bottom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    this.dragOutToast.style.fontFamily = 'Arial, sans-serif';
    this.dragOutToast.style.fontSize = '14px';
    this.dragOutToast.style.fontWeight = '500';
    this.dragOutToast.innerHTML = '↩️ Evaluation removed';

    this.container.appendChild(this.dragOutToast);
  }

  /**
   * Update preview widget position based on mouse position
   */
  private updatePreviewWidgetPosition(mouseX: number, mouseY: number): void {
    if (!this.previewWidget || !this.container) return;

    const containerRect = this.container.getBoundingClientRect();
    const widgetHeight = containerRect.height * 0.5; // 50vh
    const widgetWidth = widgetHeight * (530/1000); // Actual photo aspect ratio (530x1000)
    const margin = 30;

    // Position on opposite side of mouse
    let left: number;
    if (mouseX < containerRect.width / 2) {
      // Mouse on left, put widget on right
      left = containerRect.width - widgetWidth - margin;
    } else {
      // Mouse on right, put widget on left
      left = margin;
    }

    this.previewWidget.style.left = `${left}px`;
  }

  /**
   * Show preview widget with photo
   */
  private showPreviewWidget(mesh: THREE.Mesh): void {
    if (!this.previewWidget || !this.previewImage || !this.previewHotspotInfo) return;

    const photoData = this.meshToPhotoData.get(mesh);
    if (!photoData) return;

    // Reset hotspot info and image styles
    this.previewHotspotInfo.style.display = 'none';
    this.previewHotspotInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    this.previewHotspotInfo.style.fontSize = '12px';
    this.previewImage.style.opacity = '1';
    this.previewImage.style.transition = '';
    this.currentMatchedHotspot = null;

    // Load high-res image
    this.previewImage.src = photoData.url;
    this.previewWidget.style.display = 'block';
    this.previewWidget.style.opacity = '1';
  }

  /**
   * Update preview widget with hotspot info and apply rotation preview
   */
  private updatePreviewWidgetHotspot(hotspotData: { [key: string]: string | number } | null): void {
    if (!this.previewHotspotInfo) return;

    if (hotspotData) {
      const displayText = this.formatHotspotDisplay(hotspotData);
      this.previewHotspotInfo.innerHTML = displayText;
      this.previewHotspotInfo.style.display = 'block';
      
      // Apply rotation preview to dragged mesh based on hotspot zone
      if (this.draggedMesh) {
        const photoData = this.meshToPhotoData.get(this.draggedMesh);
        if (photoData) {
          // Store original rotation if not already stored
          if (this.draggedMesh.userData['previewOriginalRotation'] === undefined) {
            this.draggedMesh.userData['previewOriginalRotation'] = this.draggedMesh.rotation.z;
          }
          
          // Calculate new rotation based on hotspot zone
          const newRotation = this.calculatePreviewRotation(photoData, hotspotData);
          this.draggedMesh.rotation.z = newRotation;
        }
      }
    } else {
      this.previewHotspotInfo.style.display = 'none';
      
      // Restore original rotation when not hovering any hotspot
      if (this.draggedMesh && this.draggedMesh.userData['previewOriginalRotation'] !== undefined) {
        this.draggedMesh.rotation.z = this.draggedMesh.userData['previewOriginalRotation'];
      }
    }

    this.currentMatchedHotspot = hotspotData;
  }

  /**
   * Hide preview widget
   */
  private hidePreviewWidget(): void {
    if (!this.previewWidget) return;

    this.previewWidget.style.opacity = '0';
    setTimeout(() => {
      if (this.previewWidget) {
        this.previewWidget.style.display = 'none';
      }
    }, 200);
  }

  /**
   * Show confirmation toast with evaluation details after drop
   */
  private showConfirmationToast(photoUrl: string, hotspotData: { [key: string]: string | number }, rotation: number): void {
    if (!this.confirmationToast) return;
    
    // Clear any existing countdown timer
    if (this.toastCountdownTimer) {
      window.clearTimeout(this.toastCountdownTimer);
    }
    
    // Set image with rotation
    const toastImage = this.confirmationToast.querySelector('#toast-image') as HTMLImageElement;
    if (toastImage) {
      toastImage.src = photoUrl;
      toastImage.style.transform = `rotate(${rotation}deg)`;
    }
    
    // Set evaluation text
    const toastEvaluation = this.confirmationToast.querySelector('#toast-evaluation') as HTMLDivElement;
    if (toastEvaluation) {
      const displayText = this.formatHotspotDisplay(hotspotData);
      toastEvaluation.innerHTML = displayText.replace(/<br>/g, '<br>✓ ');
      toastEvaluation.innerHTML = '✓ ' + toastEvaluation.innerHTML;
    }
    
    // Reset countdown circle
    const countdownCircle = this.confirmationToast.querySelector('#toast-countdown circle') as SVGCircleElement;
    if (countdownCircle) {
      countdownCircle.style.strokeDashoffset = '0';
      // Trigger reflow to restart animation
      void (countdownCircle as any).offsetWidth;
      countdownCircle.style.strokeDashoffset = '87.96';
    }
    
    // Show toast with slide-up animation
    this.confirmationToast.style.display = 'block';
    // Force reflow
    void this.confirmationToast.offsetWidth;
    this.confirmationToast.style.bottom = '32px';
    
    // Auto-hide after 3 seconds
    this.toastCountdownTimer = window.setTimeout(() => {
      this.hideConfirmationToast();
    }, 3000);
  }
  
  /**
   * Hide confirmation toast
   */
  private hideConfirmationToast(): void {
    if (!this.confirmationToast) return;
    
    // Clear countdown timer
    if (this.toastCountdownTimer) {
      window.clearTimeout(this.toastCountdownTimer);
      this.toastCountdownTimer = null;
    }
    
    // Slide down
    this.confirmationToast.style.bottom = '-300px';
    
    // Hide after animation
    setTimeout(() => {
      if (this.confirmationToast) {
        this.confirmationToast.style.display = 'none';
      }
    }, 500);
  }
  
  /**
   * Handle ambivalence button click
   * Converts "prevent" to "mostly prevent" and "preferred" to "mostly preferred"
   */
  private handleAmbivalenceClick(): void {
    // TODO: Implement ambivalence marker logic
    // This would modify the favorable_future value to add "mostly" prefix
    console.log('[AMBIVALENCE] Ambivalence marker clicked - feature to be implemented');
    
    // For now, just update the toast text to show the change
    const toastEvaluation = this.confirmationToast?.querySelector('#toast-evaluation') as HTMLDivElement;
    if (toastEvaluation) {
      const currentText = toastEvaluation.innerHTML;
      const updatedText = currentText
        .replace(/Prevent/g, 'Mostly Prevent')
        .replace(/Prefer/g, 'Mostly Prefer')
        .replace(/Favorable/g, 'Mostly Favorable');
      toastEvaluation.innerHTML = updatedText;
    }
    
    // Hide the ambivalence button after click
    const ambivalenceBtn = this.confirmationToast?.querySelector('#toast-ambivalence-btn') as HTMLButtonElement;
    if (ambivalenceBtn) {
      ambivalenceBtn.style.display = 'none';
    }
  }

  /**
   * Show drag-out toast notification
   */
  private showDragOutToast(): void {
    if (!this.dragOutToast) return;
    
    // Clear any existing timer
    if (this.dragOutToastTimer) {
      window.clearTimeout(this.dragOutToastTimer);
    }
    
    // Show toast with slide-up animation
    this.dragOutToast.style.display = 'block';
    // Force reflow
    void this.dragOutToast.offsetWidth;
    this.dragOutToast.style.bottom = '32px';
    
    // Auto-hide after 2 seconds
    this.dragOutToastTimer = window.setTimeout(() => {
      this.hideDragOutToast();
    }, 2000);
  }
  
  /**
   * Hide drag-out toast
   */
  private hideDragOutToast(): void {
    if (!this.dragOutToast) return;
    
    // Clear timer
    if (this.dragOutToastTimer) {
      window.clearTimeout(this.dragOutToastTimer);
      this.dragOutToastTimer = null;
    }
    
    // Slide down
    this.dragOutToast.style.bottom = '-80px';
    
    // Hide after animation
    setTimeout(() => {
      if (this.dragOutToast) {
        this.dragOutToast.style.display = 'none';
      }
    }, 400);
  }

  /**
   * Animate preview widget disappearance with hotspot highlight
   * Now shows confirmation toast instead of preview widget
   */
  private animatePreviewWidgetDrop(hotspotData: { [key: string]: string | number } | null): void {
    // Hide preview widget immediately
    this.hidePreviewWidget();
    
    // Reset preview widget styles for next use
    setTimeout(() => {
      if (this.previewImage) {
        this.previewImage.style.opacity = '1';
        this.previewImage.style.transition = '';
      }
      if (this.previewHotspotInfo) {
        this.previewHotspotInfo.style.display = 'none';
        this.previewHotspotInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        this.previewHotspotInfo.style.fontSize = '12px';
        this.previewHotspotInfo.innerHTML = '';
      }
    }, 300);

    if (hotspotData && this.draggedMesh) {
      // Get photo data for the dropped image
      const photoData = this.meshToPhotoData.get(this.draggedMesh);
      if (photoData) {
        // Calculate rotation in degrees for display
        const rotationRad = this.draggedMesh.rotation.z;
        const rotationDeg = THREE.MathUtils.radToDeg(rotationRad);
        
        // Show confirmation toast with image, rotation, and evaluation
        this.showConfirmationToast(photoData.url, hotspotData, rotationDeg);
      }
    }
  }

  /**
   * Calculate preview rotation when hovering over a hotspot zone
   */
  /**
   * Calculate preview rotation based on hotspot data during drag
   * Uses hotspot's plausibility and favorable_future values
   * 
   * Rotation mapping:
   * - plausibility: 0 → ±32º
   * - plausibility: 25 → ±24º  
   * - plausibility: 50 → ±16º
   * - plausibility: 75 → ±8º
   * - plausibility: 100 → 0º
   * - Plus (+) for preferred, minus (-) for prevent
   */
  private calculatePreviewRotation(photoData: PhotoData, hotspotData: { [key: string]: string | number }): number {
    const plausibility = hotspotData['plausibility'] as number | undefined;
    const favorableFuture = hotspotData['favorable_future'] as string | undefined;
    
    if (plausibility === undefined || !favorableFuture) {
      return this.draggedMesh?.userData['previewOriginalRotation'] || 0;
    }
    
    // Calculate rotation magnitude based on plausibility
    // Linear interpolation: plausibility 0 → 32°, plausibility 100 → 0°
    const normalizedPlaus = plausibility / 100;
    const magnitude = (1 - normalizedPlaus) * 32;
    
    // Determine direction based on favorable_future
    const favorableLower = favorableFuture.toLowerCase().trim();
    const isFavor = favorableLower === 'favor' || favorableLower === 'favorable'
      || favorableLower === 'prefer' || favorableLower === 'preferred'
      || favorableLower === 'mostly prefer';
    const isPrevent = favorableLower === 'prevent' || favorableLower === 'prevented'
      || favorableLower === 'mostly prevent';
    
    // Apply direction: positive for favor/prefer, negative for prevent
    let degrees = 0;
    if (isFavor) {
      degrees = magnitude;
    } else if (isPrevent) {
      degrees = -magnitude;
    }
    
    return THREE.MathUtils.degToRad(degrees);
  }

  /**
   * Parse hotspot group ID format: s-key1=value1,key2=value2,key3=value3...
   * Returns parsed object with key-value pairs
   */
  private parseHotspotGroupId(groupId: string): { [key: string]: string | number } | null {
    if (!groupId || !groupId.startsWith('s-')) {
      return null;
    }
    
    try {
      const keyValueString = groupId.substring(2); // Remove 's-' prefix
      const pairs = keyValueString.split(',');
      const result: { [key: string]: string | number } = {};
      
      for (const pair of pairs) {
        const [key, value] = pair.split('=');
        if (key && value) {
          const trimmedValue = value.trim();
          // Try to parse as integer first, fallback to string
          const parsedNumber = parseInt(trimmedValue, 10);
          const finalValue = !isNaN(parsedNumber) && parsedNumber.toString() === trimmedValue 
            ? parsedNumber 
            : trimmedValue;
          result[key.trim()] = finalValue;
        }
      }
      
      return Object.keys(result).length > 0 ? result : null;
    } catch (error) {
      console.warn('Failed to parse hotspot group ID:', groupId, error);
      return null;
    }
  }

  /**
   * Format hotspot data for display in widget (with HTML line breaks)
   */
  private formatHotspotDisplay(hotspotData: { [key: string]: string | number }): string {
    const entries = Object.entries(hotspotData);
    if (entries.length === 0) return '';
    
    // Format as key: value pairs on separate lines with special transformations
    return entries
      .map(([key, value]) => {
        // Transform key for display
        let displayKey: string;
        if (key === 'plausibility') {
          displayKey = 'Potential';
        } else {
          // Remove underscores and capitalize each word
          displayKey = key
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
        
        // Transform value for display
        let displayValue: string | number = value;
        if (key === 'plausibility' && typeof value === 'number') {
          const plausibilityMap: { [key: number]: string } = {
            0: 'Preposterous',
            25: 'Possible',
            50: 'Plausible',
            75: 'Probable',
            100: 'Projected'
          };
          displayValue = plausibilityMap[value] || value;
        } else if (typeof value === 'string') {
          // Capitalize string values (remove underscores and capitalize each word)
          displayValue = value
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
        
        return `${displayKey}: ${displayValue}`;
      })
      .join('<br>');
  }

  /**
   * Find hotspot at mesh position (for live detection during drag)
   * Returns the parsed hotspot data if found, null otherwise
   */
  private findHotspotAtMeshPosition(mesh: THREE.Mesh, photoId: string): { [key: string]: string | number } | null {
    if (!this.svgContainer) {
      return null;
    }
    
    // Get the mesh's CENTER world position
    const meshCenterWorld = new THREE.Vector3();
    mesh.getWorldPosition(meshCenterWorld);
    
    // Project to screen coordinates
    const projectedVector = meshCenterWorld.clone();
    projectedVector.project(this.camera);
    
    const canvas = this.renderer.domElement;
    const canvasX = (projectedVector.x * 0.5 + 0.5) * canvas.clientWidth;
    const canvasY = (projectedVector.y * -0.5 + 0.5) * canvas.clientHeight;
    
    // Get SVG element and convert coordinates
    const svgElement = this.svgContainer.querySelector('svg');
    if (!svgElement) return null;
    
    const canvasRect = canvas.getBoundingClientRect();
    const viewportX = canvasRect.left + canvasX;
    const viewportY = canvasRect.top + canvasY;
    
    const svgContainerRect = this.svgContainer.getBoundingClientRect();
    const containerX = viewportX - svgContainerRect.left;
    const containerY = viewportY - svgContainerRect.top;
    
    let svgX, svgY;
    
    try {
      const svgPoint = svgElement.createSVGPoint();
      svgPoint.x = viewportX;
      svgPoint.y = viewportY;
      
      const screenCTM = svgElement.getScreenCTM();
      if (screenCTM) {
        const transformedPoint = svgPoint.matrixTransform(screenCTM.inverse());
        svgX = transformedPoint.x;
        svgY = transformedPoint.y;
      } else {
        throw new Error('No screenCTM available');
      }
    } catch (error) {
      if (svgElement.viewBox.baseVal.width > 0 && svgElement.viewBox.baseVal.height > 0) {
        const svgRect = svgElement.getBoundingClientRect();
        svgX = (containerX / svgRect.width) * svgElement.viewBox.baseVal.width;
        svgY = (containerY / svgRect.height) * svgElement.viewBox.baseVal.height;
      } else {
        svgX = containerX;
        svgY = containerY;
      }
    }
    
    // Test hotspots
    const hotspots = svgElement.querySelectorAll('[id^="hit"]');
    
    for (const hotspot of hotspots) {
      const svgHotspot = hotspot as SVGGraphicsElement;
      const testPoint = svgElement.createSVGPoint();
      testPoint.x = svgX;
      testPoint.y = svgY;
      
      let isInside = false;
      
      if ('isPointInFill' in hotspot && typeof hotspot.isPointInFill === 'function') {
        try {
          isInside = (hotspot as any).isPointInFill(testPoint);
        } catch (error) {
          const bbox = svgHotspot.getBBox();
          isInside = svgX >= bbox.x && svgX <= bbox.x + bbox.width &&
                    svgY >= bbox.y && svgY <= bbox.y + bbox.height;
        }
      } else {
        const bbox = svgHotspot.getBBox();
        isInside = svgX >= bbox.x && svgX <= bbox.x + bbox.width &&
                  svgY >= bbox.y && svgY <= bbox.y + bbox.height;
      }
      
      if (isInside) {
        const parentGroup = hotspot.parentElement?.closest('g');
        if (parentGroup && parentGroup.id) {
          // Parse the group ID immediately and return parsed data
          const parsedHotspot = this.parseHotspotGroupId(parentGroup.id);
          if (parsedHotspot) {
            return parsedHotspot;
          }
          // Fallback: return raw ID as single-key object
          return { 'hotspot': parentGroup.id };
        }
      }
    }
    
    return null;
  }

  /**
   * Check if a position is outside the SVG area (for drag out detection)
   */
  private isPositionOutOfCanvas(position: THREE.Vector3): boolean {
    // In SVG mode, check if position is outside SVG bounds
    if (!this.svgBackgroundOptions?.radius) return false;
    
    const svgOffsetX = this.svgBackgroundOptions.offsetX ?? 0;
    const svgOffsetY = this.svgBackgroundOptions.offsetY ?? 0;
    const radius = this.svgBackgroundOptions.radius;
    
    // Check if position is outside the SVG circle bounds
    const relX = position.x - svgOffsetX;
    const relY = position.y - svgOffsetY;
    const distance = Math.sqrt(relX * relX + relY * relY);
    
    // Consider it "out of canvas" if it's outside the SVG radius
    const isOutside = distance > radius;
    
    console.log('[DRAG-OUT-CHECK]', {
      position: { x: position.x, y: position.y },
      svgOffset: { x: svgOffsetX, y: svgOffsetY },
      relativePos: { x: relX, y: relY },
      distance,
      radius,
      isOutside
    });
    
    return isOutside;
  }

  /**
   * Check for hotspot collision when a photo is dropped
   * Uses the core findHotspotAtMeshPosition method
   */
  private async checkHotspotCollision(mesh: THREE.Mesh, photoId: string): Promise<void> {
    // Use the core collision detection method
    const hotspotData = this.findHotspotAtMeshPosition(mesh, photoId);
    
    if (hotspotData && this.onHotspotDropCallback) {
      try {
        const position = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z };
        await this.onHotspotDropCallback(photoId, hotspotData, position);
      } catch (error) {
        console.error('Error in hotspot drop callback:', error);
      }
    }
  }

  /**
   * Disable drag functionality for a mesh
   */
  disableDragForMesh(mesh: THREE.Mesh): void {
    this.dragCallbacks.delete(mesh);
  }

  /**
   * Disable dragging for all meshes
   */
  disableAllDragging(): void {
    this.dragCallbacks.clear();
    this.meshToPhotoId.clear();
    this.isDragging = false;
    this.draggedMesh = null;
  }

  private setupDragAndDrop(): void {
    if (!this.container) {
      console.warn('Container not available for drag setup');
      return;
    }

    const canvas = this.renderer.domElement;

    // Mouse down - start dragging or panning
    canvas.addEventListener('mousedown', (event) => {
      this.updateMousePosition(event);
      this.onMouseDown(event);
    });

    // Mouse move - drag or pan
    canvas.addEventListener('mousemove', (event) => {
      this.updateMousePosition(event);
      this.onMouseMove(event);
    });

    // Mouse up - stop dragging or panning
    canvas.addEventListener('mouseup', () => {
      this.onMouseUp();
    });

    // Mouse leave - reset fisheye effect
    canvas.addEventListener('mouseleave', () => {
      // Only reset if fisheye is enabled and there are affected meshes
      if (this.fisheyeEnabled && this.fisheyeAffectedMeshes.size > 0) {
        this.resetAllFisheyeEffects();
      }
    });

    // Mouse wheel - zoom
    canvas.addEventListener('wheel', (event) => {
      this.onMouseWheel(event);
    }, { passive: false });

    // Double-click - zoom in/out
    canvas.addEventListener('dblclick', (event) => {
      this.onDoubleClick(event);
    });

    // Touch events for mobile
    canvas.addEventListener('touchstart', (event) => {
      if (event.touches.length === 1) {
        this.updateMousePositionFromTouch(event.touches[0]);
        const mouseEvent = new MouseEvent('mousedown', {
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY
        });
        this.onMouseDown(mouseEvent);
      } else if (event.touches.length === 2) {
        // Two-finger touch for pinch zoom (to be implemented)
        event.preventDefault();
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (event) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        this.updateMousePositionFromTouch(event.touches[0]);
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY
        });
        this.onMouseMove(mouseEvent);
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      this.onMouseUp();
    });

    // Keyboard controls
    window.addEventListener('keydown', (event) => {
      this.onKeyDown(event);
    });
  }

  private updateMousePosition(event: MouseEvent): void {
    if (!this.container) return;
    
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;
    
    // Update preview widget position based on mouse screen coordinates
    this.updatePreviewWidgetPosition(event.clientX - rect.left, event.clientY - rect.top);
  }

  private updateMousePositionFromTouch(touch: Touch): void {
    if (!this.container) return;
    
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    this.lastClientX = touch.clientX;
    this.lastClientY = touch.clientY;
    
    // Update preview widget position based on touch screen coordinates  
    this.updatePreviewWidgetPosition(touch.clientX - rect.left, touch.clientY - rect.top);
  }

  private onMouseDown(event: MouseEvent): void {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.root.children, false);

    if (intersects.length > 0) {
      const intersectedMesh = intersects[0].object as THREE.Mesh;
      
      // Check if this mesh is draggable
      if (this.dragCallbacks.has(intersectedMesh)) {
        this.isDragging = true;
        this.draggedMesh = intersectedMesh;
        
        // Store fisheye state and temporarily disable while dragging
        this.wasFisheyeEnabled = this.fisheyeEnabled;
        if (this.fisheyeEnabled) {
          this.fisheyeEnabled = false;
          // Reset any fisheye effects
          this.resetAllFisheyeEffects();
        }
        
        // Set up drag plane parallel to camera
        const cameraDirection = new THREE.Vector3();
        this.camera.getWorldDirection(cameraDirection);
        this.dragPlane.setFromNormalAndCoplanarPoint(cameraDirection, intersectedMesh.position);
        
        // Calculate offset from mesh center to intersection point
        const intersection = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(this.dragPlane, intersection);
        this.dragOffset.copy(intersection).sub(intersectedMesh.position);
        
        // Change cursor to indicate dragging
        this.renderer.domElement.style.cursor = 'grabbing';
        
        // Call layout strategy drag start if available
        if (this.currentLayoutStrategy && this.currentLayoutStrategy.onPhotoDragStart) {
          const photoData = this.meshToPhotoData.get(intersectedMesh);
          if (photoData) {
            const startPosition = {
              x: intersectedMesh.position.x,
              y: intersectedMesh.position.y,
              z: intersectedMesh.position.z
            };

            this.currentLayoutStrategy.onPhotoDragStart(photoData, startPosition);
          }
        }
        return; // Don't start panning if dragging a photo
      }
    }

    // Start panning if not dragging a photo and user controls are enabled
    if (this.userControlEnabled && !this.autoFitEnabled) {
      this.isPanning = true;
      this.panStartMouse.set(event.clientX, event.clientY);
      this.panStartCameraPos.set(this.targetCamX, this.targetCamY, this.targetCamZ);
      this.renderer.domElement.style.cursor = 'grabbing';
    }
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.isDragging && this.draggedMesh) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      const intersection = new THREE.Vector3();
      if (this.raycaster.ray.intersectPlane(this.dragPlane, intersection)) {
        // Update mesh position
        const newPosition = intersection.sub(this.dragOffset);
        this.draggedMesh.position.copy(newPosition);
        
        // Check for hotspot collision during drag and update preview widget
        const photoId = this.findPhotoIdForMesh(this.draggedMesh);
        if (photoId) {
          const matchedHotspot = this.findHotspotAtMeshPosition(this.draggedMesh, photoId);
          this.updatePreviewWidgetHotspot(matchedHotspot);
        }
        
        // Call drag callback if registered
        const callback = this.dragCallbacks.get(this.draggedMesh);
        if (callback) {
          callback({
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z
          });
        }
        
        // Call layout strategy drag move if available
        if (this.currentLayoutStrategy && this.currentLayoutStrategy.onPhotoDragMove) {
          const photoData = this.meshToPhotoData.get(this.draggedMesh);
          if (photoData) {
            const movePosition = {
              x: newPosition.x,
              y: newPosition.y,
              z: newPosition.z
            };
            this.currentLayoutStrategy.onPhotoDragMove(photoData, movePosition);
          }
        }
      }
    } else if (this.isPanning) {
      // Handle camera panning
      const deltaX = event.clientX - this.panStartMouse.x;
      const deltaY = event.clientY - this.panStartMouse.y;
      this.panCamera(deltaX, deltaY);
      this.panStartMouse.set(event.clientX, event.clientY);
    } else {
      // Check for hover effects
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.root.children, false);
      
      if (intersects.length > 0 && this.dragCallbacks.has(intersects[0].object as THREE.Mesh)) {
        const mesh = intersects[0].object as THREE.Mesh;
        
        // Only show preview widget on hover if fisheye is NOT enabled
        // (Fisheye provides magnification so preview is redundant)
        if (this.hoveredMesh !== mesh) {
          this.hoveredMesh = mesh;
          this.hoveredItemSignal.set(true);
          if (!this.fisheyeEnabled) {
            this.showPreviewWidget(mesh);
          }
        }
      } else {
        // Hide preview widget when not hovering
        if (this.hoveredMesh) {
          this.hoveredMesh = null;
          this.hoveredItemSignal.set(false);
          this.hidePreviewWidget();
        }
      }

      // Apply fisheye effect during normal mouse movement
      this.applyFisheyeEffect();
    }
  }

  private onMouseUp(): void {
    if (this.isDragging && this.draggedMesh) {
      const draggedMesh = this.draggedMesh; // Store reference before clearing
      
      // Clear preview rotation data
      if (draggedMesh.userData['previewOriginalRotation'] !== undefined) {
        delete draggedMesh.userData['previewOriginalRotation'];
      }
      
      this.isDragging = false;
      
      // Animate preview widget drop with current matched hotspot
      this.animatePreviewWidgetDrop(this.currentMatchedHotspot);
      
      // Call layout strategy drag end if available
      if (this.currentLayoutStrategy && this.currentLayoutStrategy.onPhotoDragEnd) {
        const photoData = this.meshToPhotoData.get(draggedMesh);
        if (photoData) {
          const endPosition = {
            x: draggedMesh.position.x,
            y: draggedMesh.position.y,
            z: draggedMesh.position.z
          };

          // Call the async drag end handler
          this.currentLayoutStrategy.onPhotoDragEnd(photoData, endPosition);
        }
      }
      
      // Check for hotspot collision in SVG mode
      if (this.isInteractiveLayout()) {
        const photoId = this.findPhotoIdForMesh(draggedMesh);
        if (photoId) {
          // Check if item is outside canvas bounds
          const isOutOfBounds = this.isPositionOutOfCanvas(draggedMesh.position);
          
          if (isOutOfBounds) {
            // Item dragged out of canvas - remove evaluation metadata
            const photoData = this.meshToPhotoData.get(draggedMesh);
            if (photoData) {
              console.log('[DRAG-OUT] Photo', photoId, 'dragged out of canvas, clearing evaluation metadata');
              
              // Show drag-out toast notification
              this.showDragOutToast();
              
              // Update photo metadata locally to clear evaluation fields
              photoData.updateMetadata({
                plausibility: undefined,
                favorable_future: undefined,
                _svgZoneFavorableFuture: undefined
              });
              
              // Update rotation to 0°
              draggedMesh.rotation.z = 0;
              
              // Trigger async callback to save to API (fire and forget)
              if (this.onHotspotDropCallback) {
                const position = { x: draggedMesh.position.x, y: draggedMesh.position.y, z: draggedMesh.position.z };
                // Use empty object for cleared metadata (callback will handle undefined values)
                this.onHotspotDropCallback(photoId, {}, position).catch(error => {
                  console.error('[DRAG-OUT] Error saving cleared metadata:', error);
                });
              }
            }
          } else {
            // Check for hotspot collision only if within bounds
            this.checkHotspotCollision(draggedMesh, photoId);
          }
        }
      }
      
      this.draggedMesh = null;
      this.hoveredMesh = null; // Clear hovered mesh on drop
      console.log('[CURSOR] Drop event, setting hover signal to false');
      this.hoveredItemSignal.set(false);
      this.currentMatchedHotspot = null; // Clear matched hotspot
      
      // Re-enable fisheye if it was enabled before dragging
      if (this.wasFisheyeEnabled) {
        this.fisheyeEnabled = true;
      }
    } else if (this.isPanning) {
      // Stop panning
      this.isPanning = false;
    }
  }

  private onMouseWheel(event: WheelEvent): void {
    if (!this.userControlEnabled) return;

    event.preventDefault();

    // Disable auto-fit when user starts zooming
    if (this.autoFitEnabled) {
      this.autoFitEnabled = false;
    }

    // Disable fisheye immediately on zoom
    this.disableFisheyeForZoom();

    // Detect trackpad vs mouse wheel using deltaMode
    // deltaMode 0 = pixels (trackpad), 1 = lines (mouse wheel), 2 = pages
    const isTrackpad = event.deltaMode === 0;
    
    // Soften trackpad zoom significantly
    const baseDelta = event.deltaY;
    const adjustedDelta = isTrackpad ? baseDelta * 0.01 : baseDelta;
    
    // Calculate zoom factor based on adjusted delta (150% larger step than before)
    const zoomStep = 1.125; // 12.5% step vs previous 5%
    const zoomFactor = adjustedDelta > 0 ? zoomStep : 1 / zoomStep;

    // Zoom at the cursor position
    this.zoomAtPoint(zoomFactor, event.clientX, event.clientY);

    // Re-enable fisheye now that zoom is complete
    this.reEnableFisheyeAfterZoom();
  }

  private async onDoubleClick(event: MouseEvent): Promise<void> {
    if (!this.userControlEnabled) return;

    event.preventDefault();

    // Disable auto-fit when user starts zooming
    if (this.autoFitEnabled) {
      this.autoFitEnabled = false;
    }

    // Disable fisheye immediately on zoom
    this.disableFisheyeForZoom();

    // Shift+double-click zooms out, normal double-click zooms in (faster step)
    const zoomFactor = event.shiftKey ? 2.2 : 0.45;

    // Zoom at the cursor position with smooth animation
    await this.animatedZoomAtPoint(zoomFactor, event.clientX, event.clientY, 0.4);

    // Re-enable fisheye now that zoom animation is queued
    this.reEnableFisheyeAfterZoom();
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (!this.userControlEnabled) return;

    const panSpeed = 50; // pixels per key press

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (this.autoFitEnabled) this.autoFitEnabled = false;
        this.panCamera(0, panSpeed);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (this.autoFitEnabled) this.autoFitEnabled = false;
        this.panCamera(0, -panSpeed);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (this.autoFitEnabled) this.autoFitEnabled = false;
        this.panCamera(panSpeed, 0);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (this.autoFitEnabled) this.autoFitEnabled = false;
        this.panCamera(-panSpeed, 0);
        break;
      case '+':
      case '=':
        event.preventDefault();
        if (this.autoFitEnabled) this.autoFitEnabled = false;
        // Zoom in at center of screen
        const centerX = this.container!.clientWidth / 2;
        const centerY = this.container!.clientHeight / 2;
        this.zoomAtPoint(0.9, centerX, centerY);
        break;
      case '-':
      case '_':
        event.preventDefault();
        if (this.autoFitEnabled) this.autoFitEnabled = false;
        // Zoom out at center of screen
        const centerX2 = this.container!.clientWidth / 2;
        const centerY2 = this.container!.clientHeight / 2;
        this.zoomAtPoint(1.1, centerX2, centerY2);
        break;
      case 'r':
      case 'R':
        event.preventDefault();
        this.resetCameraView(true);
        break;
    }
  }

  /**
   * Remove SVG background
   */
  removeSvgBackground(): void {
    if (this.svgBackgroundPlane) {
      this.scene.remove(this.svgBackgroundPlane);
      this.svgBackgroundPlane.geometry.dispose();
      if (this.svgBackgroundPlane.material instanceof THREE.Material) {
        this.svgBackgroundPlane.material.dispose();
      }
      this.svgBackgroundPlane = undefined;
    }
    
    if (this.svgBackgroundTexture) {
      this.svgBackgroundTexture.dispose();
      this.svgBackgroundTexture = undefined;
    }
    
    // Remove SVG container from DOM
    if (this.svgContainer) {
      this.svgContainer.remove();
      this.svgContainer = null;
    }
    
    this.svgBackgroundOptions = undefined;
  }

  // Cleanup
  dispose(): void {
    if (!this.isInitialized) return;

    window.removeEventListener('resize', this.onResize);
    
    // Clear textures
    this.textureCache.forEach(texture => texture.dispose());
    this.textureCache.clear();
    this.loadingTextures.clear();
    
    // Clear high-res textures
    this.highResTextureCache.forEach(texture => texture.dispose());
    this.highResTextureCache.clear();
    this.loadingHighResTextures.clear();

    // Clear SVG background
    this.removeSvgBackground();

    // Clear preview widget
    if (this.previewWidget) {
      this.previewWidget.remove();
      this.previewWidget = null;
      this.previewImage = null;
      this.previewHotspotInfo = null;
    }
    
    // Clear confirmation toast
    if (this.toastCountdownTimer) {
      window.clearTimeout(this.toastCountdownTimer);
      this.toastCountdownTimer = null;
    }
    if (this.confirmationToast) {
      this.confirmationToast.remove();
      this.confirmationToast = null;
    }
    
    // Clear drag-out toast
    if (this.dragOutToastTimer) {
      window.clearTimeout(this.dragOutToastTimer);
      this.dragOutToastTimer = null;
    }
    if (this.dragOutToast) {
      this.dragOutToast.remove();
      this.dragOutToast = null;
    }

    // Clear drag callbacks
    this.dragCallbacks.clear();
    this.isDragging = false;
    this.draggedMesh = null;
    this.hoveredMesh = null;
    console.log('[CURSOR] Pointer left canvas, setting hover signal to false');
    this.hoveredItemSignal.set(false);
    this.currentMatchedHotspot = null;

    // Dispose Three.js objects
    this.renderer?.dispose();
    this.scene?.clear();
    this.meshToUrl.clear();
    this.highResActive.clear();
    
    this.rafRunning = false;
    this.isInitialized = false;
  }

  // Private methods
  private async initializeThreeJS(): Promise<void> {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.setSize(this.container!.clientWidth, this.container!.clientHeight);
    this.container!.appendChild(this.renderer.domElement);

    // Set up drag and drop after canvas is in DOM
    this.setupDragAndDrop();

    // Create preview widget
    this.createPreviewWidget();
    
    // Create confirmation toast
    this.createConfirmationToast();
    
    // Create drag-out toast
    this.createDragOutToast();

    // Scene & camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.BG);

    // Set up SVG background if enabled
    if (this.svgBackgroundOptions?.enabled) {
      this.setupSvgBackground(this.svgBackgroundOptions);
    }

    const aspect = this.container!.clientWidth / this.container!.clientHeight;
    this.camera = new THREE.PerspectiveCamera(this.FOV_DEG, aspect, 0.1, 100000);

    // Initialize camera position
    this.targetCamZ = this.computeFitZWithMargin(
      { minX: -this.PHOTO_W, maxX: this.PHOTO_W, minY: -this.PHOTO_H, maxY: this.PHOTO_H },
      THREE.MathUtils.degToRad(this.camera.fov),
      this.container!.clientWidth / this.container!.clientHeight,
      this.CAM_MARGIN
    );
    this.zSpawn = this.targetCamZ / 2;
    this.camera.position.set(0, 0, this.targetCamZ);
    this.camera.lookAt(0, 0, 0);

    // Root group for photos
    this.root = new THREE.Group();
    this.scene.add(this.root);

    // Lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    // Texture loader
    this.texLoader = new THREE.TextureLoader();
    this.texLoader.setCrossOrigin('anonymous');

    // Event listeners
    window.addEventListener('resize', this.onResize);

    // Start render loop
    this.clock = new THREE.Clock();
    this.startRenderLoop();
  }

  private startRenderLoop(): void {
    if (this.rafRunning) return;
    
    this.rafRunning = true;
    const loop = () => {
      if (!this.rafRunning) return;

      const dt = this.clock.getDelta();

      // Update tweens
      this.activeTweens = this.activeTweens.filter((fn) => !fn(dt));

      // Camera damping for X, Y, Z
      this.camera.position.x = this.damp(
        this.camera.position.x,
        this.targetCamX,
        this.CAM_DAMP,
        dt
      );
      this.camera.position.y = this.damp(
        this.camera.position.y,
        this.targetCamY,
        this.CAM_DAMP,
        dt
      );
      this.camera.position.z = this.damp(
        this.camera.position.z, 
        this.targetCamZ, 
        this.CAM_DAMP, 
        dt
      );
      this.camera.lookAt(this.targetCamX, this.targetCamY, 0);

      // Apply fisheye effect if enabled (continuously, not just on mouse move)
      if (this.fisheyeEnabled) {
        this.applyFisheyeEffect();
      }

      this.renderer.render(this.scene, this.camera);
      // Run LOD checks more frequently for responsive high-res loading on hover
      this.lodAccumTime += dt;
      const lodInterval = this.hoveredMesh ? 0.05 : 0.2; // 20Hz when hovering, 5Hz otherwise
      if (this.lodAccumTime >= lodInterval) {
        this.lodAccumTime = 0;
        this.runLodPass();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private onResize = (): void => {
    if (!this.container || !this.isInitialized) return;

    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  private async loadTexture(url: string): Promise<THREE.Texture> {
    // Check cache first
    if (this.textureCache.has(url)) {
      return this.textureCache.get(url)!;
    }

    // Check if already loading
    if (this.loadingTextures.has(url)) {
      return this.loadingTextures.get(url)!;
    }

    // Start loading with image downscaling
    const loadPromise = this.loadAndDownscaleImage(url).then(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = this.ANISO;
      texture.generateMipmaps = true;
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      
      this.textureCache.set(url, texture);
      this.loadingTextures.delete(url);
      
      return texture;
    }).catch(error => {
      this.loadingTextures.delete(url);
      throw error;
    });

    this.loadingTextures.set(url, loadPromise);
    return loadPromise;
  }

  /**
   * Load high-resolution texture without downscaling for showcase mode
   */
  async loadHighResTexture(url: string): Promise<THREE.Texture> {
    // Check high-res cache first
    if (this.highResTextureCache.has(url)) {
      return this.highResTextureCache.get(url)!;
    }

    // Check if already loading high-res
    if (this.loadingHighResTextures.has(url)) {
      return this.loadingHighResTextures.get(url)!;
    }

    // Start loading without downscaling
    const loadPromise = this.loadFullResolutionImage(url).then(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = this.ANISO;
      texture.generateMipmaps = true;
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      
      this.highResTextureCache.set(url, texture);
      this.loadingHighResTextures.delete(url);
      

      return texture;
    }).catch(error => {
      console.error('Failed to load high-res texture:', url, error);
      this.loadingHighResTextures.delete(url);
      throw error;
    });

    this.loadingHighResTextures.set(url, loadPromise);
    return loadPromise;
  }

  /**
   * Load full resolution image without downscaling for showcase mode
   */
  private async loadFullResolutionImage(url: string): Promise<THREE.Texture> {
    return new Promise<THREE.Texture>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Enable CORS
      
      img.onload = () => {
        try {
          // Create texture directly from full-size image
          const texture = new THREE.Texture(img);
          texture.needsUpdate = true;
          

          resolve(texture);
          
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to load full-res image: ${url}`));
      };
      
      img.src = url;
    });
  }

  /**
   * Load and downscale image to maximum dimension for performance optimization
   */
  private async loadAndDownscaleImage(url: string): Promise<THREE.Texture> {
    const MAX_DIMENSION = PHOTO_CONSTANTS.MAX_TEXTURE_DIMENSION;
    
    return new Promise<THREE.Texture>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Enable CORS
      
      img.onload = () => {
        try {
          const { width: originalWidth, height: originalHeight } = img;
          
          // Check if downscaling is needed
          if (originalWidth <= MAX_DIMENSION && originalHeight <= MAX_DIMENSION) {
            // No downscaling needed - create texture directly from image
            const texture = new THREE.Texture(img);
            texture.needsUpdate = true;
            resolve(texture);
            return;
          }
          
          // Calculate new dimensions maintaining aspect ratio
          const aspectRatio = originalWidth / originalHeight;
          let newWidth: number;
          let newHeight: number;
          
          if (originalWidth > originalHeight) {
            newWidth = Math.min(MAX_DIMENSION, originalWidth);
            newHeight = newWidth / aspectRatio;
          } else {
            newHeight = Math.min(MAX_DIMENSION, originalHeight);
            newWidth = newHeight * aspectRatio;
          }
          
          // Create canvas for downscaling
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get 2D context from canvas'));
            return;
          }
          
          canvas.width = Math.round(newWidth);
          canvas.height = Math.round(newHeight);
          
          // Draw downscaled image
          ctx.drawImage(img, 0, 0, originalWidth, originalHeight, 0, 0, canvas.width, canvas.height);
          
          // Create texture from canvas
          const texture = new THREE.CanvasTexture(canvas);
          texture.needsUpdate = true;
          
          resolve(texture);
          
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`));
      };
      
      img.src = url;
    });
  }

  private setupSvgBackground(svgOptions: NonNullable<ThreeRendererOptions['svgBackground']>): void {
    if (!svgOptions.svgElement) {
      console.warn('❌ No SVG element provided to setupSvgBackground');
      return;
    }

    // Convert SVG to canvas for texture
    const svgString = new XMLSerializer().serializeToString(svgOptions.svgElement);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas size based on SVG dimensions or container
    // Use SVG width/height attributes since getBoundingClientRect() returns 0 for non-DOM elements
    const svgWidthAttr = svgOptions.svgElement.getAttribute('width');
    const svgHeightAttr = svgOptions.svgElement.getAttribute('height');
    
    const svgWidth = parseInt(svgWidthAttr || '0') || this.container!.clientWidth;
    const svgHeight = parseInt(svgHeightAttr || '0') || this.container!.clientHeight;
    
    canvas.width = svgWidth;
    canvas.height = svgHeight;
    
    // Create an image from SVG data
    const img = new Image();
    img.onload = () => {
      // Clear canvas and draw SVG
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Create texture from canvas
      this.svgBackgroundTexture = new THREE.CanvasTexture(canvas);
      this.svgBackgroundTexture.needsUpdate = true;
      
      // Create plane geometry sized to match the coordinate system used by photos
      // Use the radius from the layout strategy directly
      const backgroundRadius = svgOptions.radius || 20000;
      const geometry = new THREE.PlaneGeometry(backgroundRadius * 2, backgroundRadius * 2);
      
      // Use desired opacity if set (defaults to 1.0), otherwise use 1.0
      const desiredOpacity = (svgOptions as any).desiredOpacity ?? 1.0;
      
      const material = new THREE.MeshBasicMaterial({
        map: this.svgBackgroundTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false // Transparent background shouldn't write to depth buffer
      });
      
      this.svgBackgroundPlane = new THREE.Mesh(geometry, material);
      
      // Position the plane far behind the photos at z = -1
      // This ensures it's always behind photos which are at z = 0
      this.svgBackgroundPlane.position.set(0, 0, -1);
      
      // Set renderOrder to ensure background is rendered first (lower values render first)
      this.svgBackgroundPlane.renderOrder = -1000;
      
      // Apply any offset transformations
      if (svgOptions.offsetX) this.svgBackgroundPlane.position.x += svgOptions.offsetX;
      if (svgOptions.offsetY) this.svgBackgroundPlane.position.y += svgOptions.offsetY;
      if (svgOptions.scale) this.svgBackgroundPlane.scale.setScalar(svgOptions.scale);
      
      // Add to scene
      this.scene.add(this.svgBackgroundPlane);
      // Fade in to preserve original SVG element opacities while bringing the plane into view
      this.animateMaterialOpacity(material, desiredOpacity, 650);
    };
    
    img.onerror = (error) => {
      console.error('❌ Failed to load SVG image:', error);
    };
    
    // Convert SVG to data URL
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  }

  private computeFitZWithMargin(
    bounds: SceneBounds,
    fovY: number,
    aspect: number,
    margin: number
  ): number {
    // Calculate the actual width and height of the bounds
    const boundsWidth = bounds.maxX - bounds.minX;
    const boundsHeight = bounds.maxY - bounds.minY;
    
    // Add margin to both dimensions
    const totalWidth = boundsWidth + 2 * margin;
    const totalHeight = boundsHeight + 2 * margin;
    
    // Calculate camera distance needed to fit the height (vertical FOV constraint)
    const distanceForHeight = (totalHeight * 0.5) / Math.tan(fovY * 0.5);
    
    // Calculate camera distance needed to fit the width (horizontal FOV constraint)
    // Horizontal FOV = 2 * atan(tan(verticalFOV/2) * aspectRatio)
    const horizontalFOV = 2 * Math.atan(Math.tan(fovY * 0.5) * aspect);
    const distanceForWidth = (totalWidth * 0.5) / Math.tan(horizontalFOV * 0.5);
    
    // Use the larger distance to ensure both width and height fit
    // Add 10% safety margin to guarantee all elements are visible
    const requiredDistance = Math.max(distanceForHeight, distanceForWidth);
    const safeDistance = requiredDistance * 1.1;
    
    return safeDistance;
  }

  private clamp01(t: number): number {
    return Math.max(0, Math.min(1, t));
  }

  /**
   * Zoom at the viewport center with smooth animation (used by UI buttons)
   */
  zoomAtCenter(factor: number): Promise<void> {
    if (!this.container) return Promise.resolve();
    if (this.autoFitEnabled) this.autoFitEnabled = false;
    this.disableFisheyeForZoom();
    const rect = this.container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return this.animatedZoomAtPoint(factor, cx, cy, 0.3).then(() => {
      this.reEnableFisheyeAfterZoom();
    });
  }

  /**
   * Zoom at a point with smooth animation
   * Maintains cursor position as exact anchor throughout animation
   */
  private animatedZoomAtPoint(factor: number, screenX: number, screenY: number, durationSec: number): Promise<void> {
    if (!this.userControlEnabled || this.autoFitEnabled) return Promise.resolve();

    const startZ = this.targetCamZ;
    const startCamX = this.targetCamX;
    const startCamY = this.targetCamY;

    // Calculate new camera Z
    const targetZ = THREE.MathUtils.clamp(
      startZ * factor,
      this.minCamZ,
      this.maxCamZ
    );

    // Convert screen coordinates to NDC
    const rect = this.container!.getBoundingClientRect();
    const ndcX = ((screenX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((screenY - rect.top) / rect.height) * 2 + 1;

    // Calculate world position at start and target Z
    const beforeZoom = this.projectScreenToWorld(ndcX, ndcY, startCamX, startCamY, startZ);
    const afterZoom = this.projectScreenToWorld(ndcX, ndcY, startCamX, startCamY, targetZ);

    // Pre-compute where the camera needs to be
    const targetCamX = startCamX + (beforeZoom.x - afterZoom.x);
    const targetCamY = startCamY + (beforeZoom.y - afterZoom.y);

    // Animate smoothly
    return this.runTween(this.makeTween(durationSec, (progress) => {
      this.targetCamZ = THREE.MathUtils.lerp(startZ, targetZ, progress);
      this.targetCamX = THREE.MathUtils.lerp(startCamX, targetCamX, progress);
      this.targetCamY = THREE.MathUtils.lerp(startCamY, targetCamY, progress);
    }));
  }

  /**
   * Decide whether to upgrade/downgrade textures based on on-screen size.
   */
  private runLodPass(): void {
    if (!this.container) return;
    // Hysteresis thresholds (in pixels) - upgrade immediately on any hover
    const UPGRADE_THRESHOLD = 1; // Upgrade immediately
    const DOWNGRADE_THRESHOLD = 0;

    // Iterate over meshes
    for (const child of this.root.children) {
      const mesh = child as THREE.Mesh;
      const url = this.meshToUrl.get(mesh);
      if (!url) continue;

      const isHigh = this.highResActive.has(mesh);

      // Compute projected width for this mesh based on its depth
      const depth = Math.max(0.001, Math.abs(mesh.position.z - this.camera.position.z));
      const fullWorldWidth = this.getVisibleWidthAtDepth(depth) * 2;
      const pxPerWorldUnit = this.container.clientWidth / Math.max(1, fullWorldWidth);
      const photoWidthPx = this.PHOTO_W * pxPerWorldUnit;

      if (!isHigh && photoWidthPx >= UPGRADE_THRESHOLD) {
        // Upgrade to high-res (fire-and-forget)
        this.upgradeToHighResTexture(mesh, url)
          .then(() => {
            this.highResActive.add(mesh);
          })
          .catch(() => {/* keep low-res */});
      } else if (isHigh && photoWidthPx <= DOWNGRADE_THRESHOLD) {
        // Downgrade to low-res (fire-and-forget)
        this.downgradeToLowResTexture(mesh, url)
          .then(() => {
            this.highResActive.delete(mesh);
          })
          .catch(() => {/* keep current */});
      }
    }
  }

  /**
   * Update camera field of view (for settings panel)
   */
  updateCameraFov(fov: number): void {
    if (this.camera && (this.camera as any).isPerspectiveCamera) {
      (this.camera as any).fov = fov;
      (this.camera as any).updateProjectionMatrix();
      console.log(`📹 Camera FOV updated to ${fov}°`);
    }
  }

  /**
   * Get current zoom level as a multiplier (e.g., 1.0 = 100% zoom, 2.0 = 200% zoom)
   */
  getCurrentZoomLevel(): number {
    // Zoom is inversely related to camera Z position
    // Lower Z = more zoomed in, higher Z = more zoomed out
    // Return zoom as a ratio: maxExtentZoomLevel / currentZoom
    // maxExtentZoomLevel is set to the furthest extent (largest view composition)
    const maxExtentCamZ = (1200 / this.maxExtentZoomLevel);
    return maxExtentCamZ / this.targetCamZ;
  }

  /**
   * Fit camera to view specific bounds (used for SVG layout with calculated positions)
   * Calculates camera position to show all positions with padding, allowing unlimited zoom out
   */
  fitCameraToBounds(positions: Array<{ x: number; y: number; z?: number }>): Promise<void> {
    if (positions.length === 0) return Promise.resolve();

    // Calculate bounds from positions
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const pos of positions) {
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
    }

    // Add minimal padding (5% of bounds) with small floor
    const padX = Math.max((maxX - minX) * 0.05, 200);
    const padY = Math.max((maxY - minY) * 0.05, 200);

    minX -= padX;
    maxX += padX;
    minY -= padY;
    maxY += padY;

    // Update bounds
    this.bounds = {
      minX,
      maxX,
      minY,
      maxY
    };

    // Center camera on these bounds
    this.targetCamX = (minX + maxX) * 0.5;
    this.targetCamY = (minY + maxY) * 0.5;

    // Calculate camera Z to fit these bounds (no clamping to minCamZ/maxCamZ)
    const targetCamZ = this.computeFitZWithMargin(
      this.bounds,
      THREE.MathUtils.degToRad(this.camera.fov),
      this.container!.clientWidth / this.container!.clientHeight,
      this.CAM_MARGIN
    );

    // Update max extent zoom level if this view is larger than previous
    // This becomes the baseline for fisheye zoom calculations
    const baselineZ = 1200;
    const zoomLevelAtThisExtent = baselineZ / targetCamZ;
    if (zoomLevelAtThisExtent < this.maxExtentZoomLevel) {
      this.maxExtentZoomLevel = zoomLevelAtThisExtent;
    }

    // Animate to this target Z without clamping
    const startCamZ = this.targetCamZ;
    if (Math.abs(targetCamZ - startCamZ) < 0.01) {
      return Promise.resolve(); // Already at target
    }

    return this.runTween(this.makeTween(0.5, (progress) => {
      this.targetCamZ = THREE.MathUtils.lerp(startCamZ, targetCamZ, progress);
    }));
  }

  /**
   * Fit camera to positions while also including an SVG background radius footprint.
   */
  fitCameraToBoundsIncludingSvg(
    positions: Array<{ x: number; y: number; z?: number }>,
    svgRadius: number,
    svgOffsetX = 0,
    svgOffsetY = 0
  ): Promise<void> {
    if (!positions.length && !svgRadius) {
      return Promise.resolve();
    }

    const merged = [...positions];
    if (svgRadius > 0) {
      merged.push({ x: svgOffsetX + svgRadius, y: svgOffsetY + svgRadius });
      merged.push({ x: svgOffsetX - svgRadius, y: svgOffsetY - svgRadius });
      merged.push({ x: svgOffsetX + svgRadius, y: svgOffsetY - svgRadius });
      merged.push({ x: svgOffsetX - svgRadius, y: svgOffsetY + svgRadius });
    }

    return this.fitCameraToBounds(merged);
  }

  /**
   * Update camera zoom level (for settings panel)
   */
  updateCameraZoom(zoom: number): void {
    if (this.camera) {
      this.camera.zoom = zoom;
      (this.camera as any).updateProjectionMatrix?.();
      console.log(`🔍 Camera zoom updated to ${zoom}x`);
    }
  }

  /**
   * Set rotation speed multiplier for interactive controls (1 = normal, 2 = double speed)
   */
  setRotationSpeed(speed: number): void {
    // Store the speed value for use in camera rotation calculations
    this.rotationSpeedMultiplier = speed;
    console.log(`🔄 Rotation speed set to ${speed}x`);
  }

  /**
   * Set pan sensitivity multiplier for interactive controls (1 = normal, 2 = twice as sensitive)
   */
  setPanSensitivity(sensitivity: number): void {
    // Store the sensitivity value for use in pan calculations
    this.panSensitivityMultiplier = sensitivity;
    console.log(`👆 Pan sensitivity set to ${sensitivity}x`);
  }

  /**
   * Set depth of field effect strength (0-100)
   * 0 = disabled, 100 = maximum blur
   */
  setDepthOfField(strength: number): void {
    // Enable post-processing with DOF
    if (!this.dofPass) {
      // Create DOF pass if not exists (would need THREE.js post-processing)
      this.dofStrength = strength;
      console.log(`🎬 Depth of field set to ${strength}%`);
      return;
    }
    
    this.dofStrength = strength;
    // Apply DOF effect to the renderer
    if (strength > 0) {
      const focusDistance = 5000; // Focus on center of scene
      const bokehScale = (strength / 100) * 15; // 0 to 15 pixels blur radius
      this.dofPass.uniforms.focalDepth.value = focusDistance;
      this.dofPass.uniforms.bokeh.value = true;
      this.dofPass.uniforms.maxblur.value = bokehScale;
    }
    
    console.log(`🎬 Depth of field set to ${strength}%`);
  }

  /**
   * Disable depth of field effect
   */
  disableDepthOfField(): void {
    this.dofStrength = 0;
    if (this.dofPass) {
      this.dofPass.uniforms.bokeh.value = false;
    }
    console.log(`🎬 Depth of field disabled`);
  }
}

