import * as THREE from 'three';
import { Injectable } from '@angular/core';
import { PhotoData, PhotoAnimationState } from './photo-data';

export interface ThreeRendererOptions {
  photoWidth?: number;   // default 530
  photoHeight?: number;  // default 1000
  fovDeg?: number;       // default 45
  cameraMargin?: number; // world units, default 120
  cameraDamp?: number;   // default 6
  anisotropy?: number;   // default 4
  background?: number;   // default 0x0b0e13
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

  constructor() {
    const opts: ThreeRendererOptions = {};
    this.PHOTO_W = opts.photoWidth ?? 530;
    this.PHOTO_H = opts.photoHeight ?? 1000;
    this.FOV_DEG = opts.fovDeg ?? 45;
    this.CAM_MARGIN = opts.cameraMargin ?? 120;
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
      // Update configuration if needed
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

  // Camera management
  updateCameraTarget(newBounds: SceneBounds): void {
    this.bounds = { ...newBounds };
    const targetCamZ = this.computeFitZWithMargin(
      this.bounds,
      THREE.MathUtils.degToRad(this.camera.fov),
      this.container!.clientWidth / this.container!.clientHeight,
      this.CAM_MARGIN
    );
    this.targetCamZ = Math.max(targetCamZ, this.targetCamZ);
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
    return 1 - Math.pow(1 - t, 3);
  }

  easeOutExpo(t: number): number {
    t = this.clamp01(t);
    const n = 3;
    const d = Math.pow(2, -n);
    t = Math.pow(2, -n * t);
    t = (t - d) / (1 - d);
    return t === 1 ? 1 : 1 - t;
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

  // Cleanup
  dispose(): void {
    if (!this.isInitialized) return;

    window.removeEventListener('resize', this.onResize);
    
    // Clear textures
    this.textureCache.forEach(texture => texture.dispose());
    this.textureCache.clear();
    this.loadingTextures.clear();

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

    // Scene & camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.BG);

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

    // Start loading
    const loadPromise = this.texLoader.loadAsync(url).then(texture => {
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

  private computeFitZWithMargin(
    bounds: SceneBounds,
    fovY: number,
    aspect: number,
    margin: number
  ): number {
    const width = Math.max(bounds.maxX, -bounds.minX) + 2 * margin;
    const height = Math.max(bounds.maxY, -bounds.minY) + 2 * margin;
    const hw = width * 0.5;
    const hh = height * 0.5;

    const ret = Math.sqrt(hw * hw + hh * hh) / Math.tan(fovY * 0.5);
    return ret * 1.41;
  }

  private clamp01(t: number): number {
    return Math.max(0, Math.min(1, t));
  }
}