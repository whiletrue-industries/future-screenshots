import * as THREE from 'three';
import { Injectable } from '@angular/core';
import { PhotoData, PhotoAnimationState } from './photo-data';
import { PHOTO_CONSTANTS } from './photo-constants';

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
  private svgBackgroundOptions?: { enabled: boolean; svgElement?: SVGSVGElement; scale?: number; offsetX?: number; offsetY?: number; radius?: number; };

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
  
  // SVG Container for hotspot detection
  private svgContainer: HTMLElement | null = null;

  constructor() {
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
    
    this.root.add(mesh);
    photoData.setMesh(mesh);
    
    return mesh;
  }

  updatePhotoMesh(photoData: PhotoData): void {
    if (!photoData.mesh) return;

    const pos = photoData.currentPosition;
    photoData.mesh.position.set(pos.x, pos.y, pos.z);
  }

  removePhotoMesh(photoData: PhotoData): void {
    if (!photoData.mesh) return;

    this.root.remove(photoData.mesh);
    
    // Dispose of geometry and material
    photoData.mesh.geometry.dispose();
    if (photoData.mesh.material instanceof THREE.Material) {
      photoData.mesh.material.dispose();
    }
    
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
        
        console.log(`Mesh texture upgraded to high-res: ${url}`);
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
        
        console.log(`Mesh texture downgraded to low-res: ${url}`);
      }
    } catch (error) {
      console.warn('Failed to downgrade to low-res texture:', error);
    }
  }

  removeMesh(mesh: THREE.Mesh): void {
    this.root.remove(mesh);
    
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
    const targetCamZ = this.computeFitZWithMargin(
      this.bounds,
      THREE.MathUtils.degToRad(this.camera.fov),
      this.container!.clientWidth / this.container!.clientHeight,
      this.CAM_MARGIN
    );
    this.targetCamZ = targetCamZ;
  }

  animateCameraTarget(newBounds: SceneBounds, durationSec: number): Promise<void> {
    return new Promise((resolve) => {
      this.bounds = { ...newBounds };
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

  getCameraSpawnZ(): number {
    return this.camera.position.z - this.zSpawn;
  }

  getCurrentBounds(): Readonly<SceneBounds> {
    return { ...this.bounds };
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

  /**
   * Enable or update SVG background
   */
  setSvgBackground(svgElement: SVGSVGElement, options?: { scale?: number; offsetX?: number; offsetY?: number; radius?: number; }): void {
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
      radius: options?.radius
    };
    
    // Create DOM container for SVG hotspot detection
    this.createSvgDomContainer(svgElement);
    
    this.setupSvgBackground(this.svgBackgroundOptions);
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
      console.log('❌ No container element available for SVG DOM');
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
    
    console.log('📍 SVG DOM container created and added');
  }

  /**
   * Check for hotspot collision when a photo is dropped
   * Uses the CENTER coordinate of the dragged mesh for collision detection
   */
  private checkHotspotCollision(mesh: THREE.Mesh, photoId: string): void {
    console.log('🔍 Checking hotspot collision for photo:', photoId);
    console.log('SVG Container:', this.svgContainer);
    
    if (!this.svgContainer) {
      console.log('❌ No SVG container found');
      return;
    }
    
    // Get the mesh's CENTER world position (not cursor position)
    const meshCenterWorld = new THREE.Vector3();
    mesh.getWorldPosition(meshCenterWorld);
    console.log('Mesh center world position:', { 
      x: meshCenterWorld.x, 
      y: meshCenterWorld.y, 
      z: meshCenterWorld.z 
    });
    
    // Project the mesh center to screen coordinates
    const projectedVector = meshCenterWorld.clone();
    projectedVector.project(this.camera);
    
    // Convert projected coordinates to screen pixels
    const canvas = this.renderer.domElement;
    const x = (projectedVector.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (projectedVector.y * -0.5 + 0.5) * canvas.clientHeight;
    
    console.log('Mesh center screen coordinates:', { x, y });
    
    // Get the SVG element at this position
    const svgElement = this.svgContainer.querySelector('svg');
    console.log('SVG Element found:', !!svgElement);
    
    if (!svgElement) {
      console.log('❌ No SVG element found in container');
      return;
    }
    
    // Convert screen coordinates to SVG coordinates
    const svgRect = svgElement.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    
    console.log('SVG rect:', svgRect);
    console.log('Canvas rect:', canvasRect);
    console.log('Screen coordinates (canvas relative):', { x, y });
    
    // Convert canvas-relative coordinates to viewport coordinates
    const viewportX = canvasRect.left + x;
    const viewportY = canvasRect.top + y;
    
    console.log('Viewport coordinates:', { viewportX, viewportY });
    
    // More precise approach: get SVG container's actual position
    const svgContainerRect = this.svgContainer!.getBoundingClientRect();
    console.log('SVG container rect:', svgContainerRect);
    
    // Convert viewport coordinates to SVG container coordinates
    const containerX = viewportX - svgContainerRect.left;
    const containerY = viewportY - svgContainerRect.top;
    console.log('Container-relative coordinates:', { containerX, containerY });
    
    // Use SVG's native coordinate transformation with screen coordinates
    let svgX, svgY;
    
    try {
      // Method 1: Try using SVG's native screen coordinate transformation
      const svgPoint = svgElement.createSVGPoint();
      svgPoint.x = viewportX;
      svgPoint.y = viewportY;
      
      const screenCTM = svgElement.getScreenCTM();
      if (screenCTM) {
        const transformedPoint = svgPoint.matrixTransform(screenCTM.inverse());
        svgX = transformedPoint.x;
        svgY = transformedPoint.y;
        console.log('Using getScreenCTM() transformation:', { svgX, svgY });
      } else {
        throw new Error('No screenCTM available');
      }
    } catch (error) {
      console.log('getScreenCTM failed, using manual conversion:', error);
      
      // Method 2: Manual coordinate conversion using container position
      if (svgElement.viewBox.baseVal.width > 0 && svgElement.viewBox.baseVal.height > 0) {
        // Scale container coordinates to SVG viewBox coordinate system
        svgX = (containerX / svgRect.width) * svgElement.viewBox.baseVal.width;
        svgY = (containerY / svgRect.height) * svgElement.viewBox.baseVal.height;
        console.log('Using viewBox scaling:', { 
          containerX, containerY, 
          svgRectWidth: svgRect.width, svgRectHeight: svgRect.height,
          viewBoxWidth: svgElement.viewBox.baseVal.width, viewBoxHeight: svgElement.viewBox.baseVal.height,
          svgX, svgY 
        });
      } else {
        // Use container coordinates directly
        svgX = containerX;
        svgY = containerY;
        console.log('Using direct container coordinates:', { svgX, svgY });
      }
    }
    
    console.log('Final SVG coordinates (mesh center):', { svgX, svgY });
    console.log('SVG viewBox:', svgElement.viewBox.baseVal);
    console.log('SVG dimensions:', { width: svgRect.width, height: svgRect.height });
    
    // Find hotspot elements and test mesh center against them
    const hotspots = svgElement.querySelectorAll('[id^="hit"]');
    console.log(`Found ${hotspots.length} hotspots to test against mesh center:`);
    
    for (const hotspot of hotspots) {
      const svgHotspot = hotspot as SVGGraphicsElement;
      console.log(`Testing hotspot ${hotspot.id}`);
      
      // Create SVG point for hit testing (coordinates are already in SVG space)
      const testPoint = svgElement.createSVGPoint();
      testPoint.x = svgX;
      testPoint.y = svgY;
      
      let isInside = false;
      
      // Use isPointInFill for accurate geometry hit testing
      if ('isPointInFill' in hotspot && typeof hotspot.isPointInFill === 'function') {
        try {
          isInside = (hotspot as any).isPointInFill(testPoint);
          console.log(`${hotspot.tagName} ${hotspot.id} isPointInFill result:`, isInside);
        } catch (error) {
          console.warn(`isPointInFill failed for ${hotspot.id}, falling back to bbox:`, error);
          // Fallback to bounding box
          const bbox = svgHotspot.getBBox();
          isInside = svgX >= bbox.x && svgX <= bbox.x + bbox.width &&
                    svgY >= bbox.y && svgY <= bbox.y + bbox.height;
          console.log(`${hotspot.id} bbox fallback result:`, isInside);
        }
      } else {
        // Fallback to bounding box for elements that don't support isPointInFill
        const bbox = svgHotspot.getBBox();
        isInside = svgX >= bbox.x && svgX <= bbox.x + bbox.width &&
                  svgY >= bbox.y && svgY <= bbox.y + bbox.height;
        console.log(`${hotspot.id} bbox-only result:`, isInside);
      }
      
      if (isInside) {
        // Found a hotspot collision, find the parent group
        const parentGroup = hotspot.parentElement?.closest('g');
        if (parentGroup && parentGroup.id) {
          console.log('🎯 Photo center dropped on hotspot!', {
            photoId: photoId,
            hotspotId: hotspot.id,
            groupId: parentGroup?.id,
            elementType: hotspot.tagName,
            meshCenterCoordinates: { svgX, svgY }
          });
          
          // Here you would call your web service or callback
          // this.onHotspotDrop?.(photoId, parentGroup.id);
          
          break;
        }
      }
    }
    
    console.log('✅ Hotspot collision check complete');
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
    if (this.renderer?.domElement) {
      this.renderer.domElement.style.cursor = 'default';
    }
  }

  private setupDragAndDrop(): void {
    if (!this.container) {
      console.warn('Container not available for drag setup');
      return;
    }

    const canvas = this.renderer.domElement;
    console.log('Setting up drag and drop on canvas:', canvas);

    // Mouse down - start dragging
    canvas.addEventListener('mousedown', (event) => {
      console.log('Canvas mousedown event fired');
      this.updateMousePosition(event);
      this.onMouseDown();
    });

    // Mouse move - drag
    canvas.addEventListener('mousemove', (event) => {
      this.updateMousePosition(event);
      this.onMouseMove();
    });

    // Mouse up - stop dragging
    canvas.addEventListener('mouseup', () => {
      this.onMouseUp();
    });

    // Touch events for mobile
    canvas.addEventListener('touchstart', (event) => {
      if (event.touches.length === 1) {
        this.updateMousePositionFromTouch(event.touches[0]);
        this.onMouseDown();
      }
    });

    canvas.addEventListener('touchmove', (event) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        this.updateMousePositionFromTouch(event.touches[0]);
        this.onMouseMove();
      }
    });

    canvas.addEventListener('touchend', () => {
      this.onMouseUp();
    });
  }

  private updateMousePosition(event: MouseEvent): void {
    if (!this.container) return;
    
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private updateMousePositionFromTouch(touch: Touch): void {
    if (!this.container) return;
    
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private onMouseDown(): void {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.root.children, false);

    if (intersects.length > 0) {
      const intersectedMesh = intersects[0].object as THREE.Mesh;
      
      // Check if this mesh is draggable
      if (this.dragCallbacks.has(intersectedMesh)) {
        this.isDragging = true;
        this.draggedMesh = intersectedMesh;
        
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
            console.log(`🎯 Drag started for photo ${photoData.id}`);
            this.currentLayoutStrategy.onPhotoDragStart(photoData, startPosition);
          }
        }
      }
    }
  }

  private onMouseMove(): void {
    if (this.isDragging && this.draggedMesh) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      const intersection = new THREE.Vector3();
      if (this.raycaster.ray.intersectPlane(this.dragPlane, intersection)) {
        // Update mesh position
        const newPosition = intersection.sub(this.dragOffset);
        this.draggedMesh.position.copy(newPosition);
        
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
    } else {
      // Check for hover effects
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.root.children, false);
      
      if (intersects.length > 0 && this.dragCallbacks.has(intersects[0].object as THREE.Mesh)) {
        this.renderer.domElement.style.cursor = 'grab';
      } else {
        this.renderer.domElement.style.cursor = 'default';
      }
    }
  }

  private onMouseUp(): void {
    if (this.isDragging && this.draggedMesh) {
      const draggedMesh = this.draggedMesh; // Store reference before clearing
      this.isDragging = false;
      
      // Call layout strategy drag end if available
      if (this.currentLayoutStrategy && this.currentLayoutStrategy.onPhotoDragEnd) {
        const photoData = this.meshToPhotoData.get(draggedMesh);
        if (photoData) {
          const endPosition = {
            x: draggedMesh.position.x,
            y: draggedMesh.position.y,
            z: draggedMesh.position.z
          };
          console.log(`🎯 Drag ended for photo ${photoData.id} at:`, endPosition);
          // Call the async drag end handler
          this.currentLayoutStrategy.onPhotoDragEnd(photoData, endPosition);
        }
      }
      
      // Check for hotspot collision in SVG mode
      if (this.isInteractiveLayout()) {
        const photoId = this.findPhotoIdForMesh(draggedMesh);
        if (photoId) {
          this.checkHotspotCollision(draggedMesh, photoId);
        }
      }
      
      this.draggedMesh = null;
      this.renderer.domElement.style.cursor = 'default';
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

    // Clear drag callbacks
    this.dragCallbacks.clear();
    this.isDragging = false;
    this.draggedMesh = null;

    // Dispose Three.js objects
    this.renderer?.dispose();
    this.scene?.clear();
    
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

      // Camera damping
      this.camera.position.z = this.damp(
        this.camera.position.z, 
        this.targetCamZ, 
        this.CAM_DAMP, 
        dt
      );
      this.camera.lookAt(0, 0, 0);

      this.renderer.render(this.scene, this.camera);
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
      
      console.log(`High-res texture loaded for showcase: ${url}`);
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
          
          console.log(`Full-res image loaded: ${img.width}x${img.height}`);
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

    console.log('🎨 Setting up SVG background with element:', svgOptions.svgElement);

    // Convert SVG to canvas for texture
    const svgString = new XMLSerializer().serializeToString(svgOptions.svgElement);
    console.log('📄 Serialized SVG string length:', svgString.length);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas size based on SVG dimensions or container
    // Use SVG width/height attributes since getBoundingClientRect() returns 0 for non-DOM elements
    const svgWidthAttr = svgOptions.svgElement.getAttribute('width');
    const svgHeightAttr = svgOptions.svgElement.getAttribute('height');
    console.log('📏 SVG attributes - width:', svgWidthAttr, 'height:', svgHeightAttr);
    
    const svgWidth = parseInt(svgWidthAttr || '0') || this.container!.clientWidth;
    const svgHeight = parseInt(svgHeightAttr || '0') || this.container!.clientHeight;
    
    canvas.width = svgWidth;
    canvas.height = svgHeight;
    console.log('🖼️ Canvas dimensions (using SVG attributes):', canvas.width, 'x', canvas.height);
    
    // Create an image from SVG data
    const img = new Image();
    img.onload = () => {
      console.log('🖼️ SVG image loaded successfully');
      
      // Clear canvas and draw SVG
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Create texture from canvas
      this.svgBackgroundTexture = new THREE.CanvasTexture(canvas);
      this.svgBackgroundTexture.needsUpdate = true;
      
      console.log('✅ SVG texture created successfully');
      
      // Create plane geometry sized to match the coordinate system used by photos
      // Use the radius from the layout strategy directly
      const backgroundRadius = svgOptions.radius || 20000;
      const geometry = new THREE.PlaneGeometry(backgroundRadius * 2, backgroundRadius * 2);
      
      const material = new THREE.MeshBasicMaterial({
        map: this.svgBackgroundTexture,
        transparent: true,
        opacity: 0.8 // Make background more visible
      });
      
      this.svgBackgroundPlane = new THREE.Mesh(geometry, material);
      
      // Position the plane just behind the photos at z = -0.01
      this.svgBackgroundPlane.position.set(0, 0, -0.01);
      
      // Apply any offset transformations
      if (svgOptions.offsetX) this.svgBackgroundPlane.position.x += svgOptions.offsetX;
      if (svgOptions.offsetY) this.svgBackgroundPlane.position.y += svgOptions.offsetY;
      if (svgOptions.scale) this.svgBackgroundPlane.scale.setScalar(svgOptions.scale);
      
      console.log('📐 SVG background plane details:', {
        width: backgroundRadius * 2,
        height: backgroundRadius * 2,
        positionZ: this.svgBackgroundPlane.position.z,
        scale: svgOptions.scale || 1,
        opacity: material.opacity
      });
      
      // Add to scene
      this.scene.add(this.svgBackgroundPlane);
      console.log('🎯 SVG background plane added to scene successfully');
    };
    
    img.onerror = (error) => {
      console.error('❌ Failed to load SVG image:', error);
    };
    
    // Convert SVG to data URL
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    console.log('🔗 Created blob URL for SVG:', url);
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
    
    console.log(`📐 Camera fit calculation:`, {
      bounds: { width: boundsWidth, height: boundsHeight },
      withMargin: { width: totalWidth, height: totalHeight },
      fovY: THREE.MathUtils.radToDeg(fovY),
      aspect,
      distanceForHeight,
      distanceForWidth,
      requiredDistance,
      safeDistance
    });
    
    return safeDistance;
  }

  private clamp01(t: number): number {
    return Math.max(0, Math.min(1, t));
  }
}