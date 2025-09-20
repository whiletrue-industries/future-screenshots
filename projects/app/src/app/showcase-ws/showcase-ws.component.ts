import * as THREE from 'three';

import { AfterViewInit, Component, computed, ElementRef, signal, ViewChild } from '@angular/core';
import { catchError, distinctUntilChanged, filter, forkJoin, from, interval, Observable, of, Subject, timer } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QrcodeComponent } from "./qrcode/qrcode.component";

type TweenFn = (dt: number) => boolean;

export interface PhotoGridOptions {
  photoWidth?: number;   // default 530
  photoHeight?: number;  // default 1000
  spacingX?: number;      // default 20
  spacingY?: number;      // default 20
  fovDeg?: number;       // default 45
  cameraMargin?: number; // world units, default 120
  cameraDamp?: number;   // default 6
  durPreFloat?: number;     // seconds, default 3
  durFloat?: number;     // seconds, default 1.1
  durSnap?: number;      // seconds, default 0.18
  anisotropy?: number;   // default 4
  background?: number;   // default 0x0b0e13
  getEmptyPosition: () => [number, number];
}

export class PhotoGrid {
  // ---- Config (with defaults) ----
  private readonly PHOTO_W: number;
  private readonly PHOTO_H: number;
  private readonly SPACING_X: number;
  private readonly SPACING_Y: number;
  private readonly CELL_W: number;
  private readonly CELL_H: number;
  private readonly FOV_DEG: number;
  private readonly CAM_MARGIN: number;
  private readonly CAM_DAMP: number;
  private readonly DUR_PRE_FLOAT: number;
  private readonly DUR_FLOAT: number;
  private readonly DUR_SNAP: number;
  private readonly ANISO: number;
  private readonly BG: number;

  // ---- Three.js bits ----
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private root!: THREE.Group;
  private clock!: THREE.Clock;
  private texLoader!: THREE.TextureLoader;

  // ---- State ----
  private rafRunning = false;
  private activeTweens: TweenFn[] = [];
  private bounds = { minX: +Infinity, maxX: -Infinity, minY: +Infinity, maxY: -Infinity };
  private targetCamZ = 1200;
  private zSpawn = 700;
  getEmptyPosition: () => [number, number];

  private meshes = new Map<string, {mesh: THREE.Mesh, position: [number, number]}>();

  constructor(container: HTMLElement, opts: PhotoGridOptions = { getEmptyPosition: () => [0, 0] }) {
    this.container = container;

    this.PHOTO_W = opts.photoWidth  ?? 530;
    this.PHOTO_H = opts.photoHeight ?? 1000;
    this.SPACING_X = opts.spacingX     ?? 250;
    this.SPACING_Y = opts.spacingY     ?? 30;
    this.CELL_W  = this.PHOTO_W + this.SPACING_X;
    this.CELL_H  = this.PHOTO_H + this.SPACING_Y;

    this.FOV_DEG    = opts.fovDeg       ?? 45;
    this.CAM_MARGIN = opts.cameraMargin ?? 120;
    this.CAM_DAMP   = opts.cameraDamp   ?? 0.1 * 10000;
    this.DUR_PRE_FLOAT  = opts.durPreFloat ?? 6;
    this.DUR_FLOAT  = opts.durFloat     ?? 1.1;
    this.DUR_SNAP   = opts.durSnap      ?? 0.18;
    this.ANISO      = opts.anisotropy   ?? 4;
    this.BG         = opts.background   ?? 0xFFFDF6;
    this.getEmptyPosition = opts.getEmptyPosition;
  }

  // ---- Public: initialization ----
  public init(): void {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    // Scene & camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.BG);

    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(this.FOV_DEG, aspect, 0.1, 100000);

    this.targetCamZ = this.computeFitZWithMargin(
      {minX: -this.PHOTO_W, maxX: this.PHOTO_W, minY: -this.PHOTO_H, maxY: this.PHOTO_H},
      THREE.MathUtils.degToRad(this.camera.fov),
      this.container.clientWidth / this.container.clientHeight,
      this.CAM_MARGIN
    );
    this.zSpawn = this.targetCamZ / 2;

    this.camera.position.set(0, 0, this.targetCamZ);
    this.camera.lookAt(0, 0, 0);

    // Root node for photos
    this.root = new THREE.Group();
    this.scene.add(this.root);

    // Light (MeshBasicMaterial doesn't need it, but harmless if you switch materials later)
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    // Texture loader
    this.texLoader = new THREE.TextureLoader();
    this.texLoader.setCrossOrigin('anonymous');

    // Resize
    window.addEventListener('resize', this.onResize);

    // Clock + RAF loop
    this.clock = new THREE.Clock();
    if (!this.rafRunning) {
      this.rafRunning = true;
      const loop = () => {
        const dt = this.clock.getDelta();

        // Update tweens (remove when they return true)
        this.activeTweens = this.activeTweens.filter((fn) => !fn(dt));

        // Camera damping toward target Z
        this.camera.position.z = this.damp(this.camera.position.z, this.targetCamZ, this.CAM_DAMP, dt);
        // this.camera.position.z = this.targetCamZ;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  // ---- Public: main operation ----
  public async animateInPhoto(id: string, url: string): Promise<void> {
    // 1) Load texture
    console.log('Loading', id, url);
    const tex = await this.loadTexture(url);
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = this.ANISO;
    tex.generateMipmaps = true;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;

    // 2) Mesh (one per photo for clarity)
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 1.0 });
    const geo = new THREE.PlaneGeometry(this.PHOTO_W, this.PHOTO_H);
    const mesh = new THREE.Mesh(geo, mat);
    this.root.add(mesh);

    // Spawn in front at center
    mesh.position.set(0, 0, this.camera.position.z - this.zSpawn);
    // mesh.scale.set(1.12, 1.12, 1);

    // 3) Target grid slot
    const [gx, gy] = this.getEmptyPosition();
    const tx = gx * this.CELL_W;
    const ty = gy * this.CELL_H;

    this.meshes.set(id, {
      mesh,
      position: [tx, ty]
    });
    // Wait here this.DUR_PRE_FLOAT
    await new Promise((resolve) => setTimeout(resolve, this.DUR_PRE_FLOAT * 1000));

      // 6) Update bounds and camera target
    this.expandBoundsWithRect(tx, ty, this.CELL_W, this.CELL_H);
    const targetCamZ = this.computeFitZWithMargin(
      this.bounds,
      THREE.MathUtils.degToRad(this.camera.fov),
      this.container.clientWidth / this.container.clientHeight,
      this.CAM_MARGIN
    );
    this.targetCamZ = targetCamZ > this.targetCamZ ? targetCamZ : this.targetCamZ;

    // 7) Wait until camera is close to target before resolving
    // await this.waitForCameraClose();

    // Float back to position
    await this.floatBack(mesh, tx, ty);
  }

  public async animateExistingPhoto(id: string): Promise<void> {
    const { mesh, position: [tx, ty]  } = this.meshes.get(id)!;
    if (!mesh) return;

    await this.floatForward(mesh);

    // Wait here this.DUR_PRE_FLOAT
    await new Promise((resolve) => setTimeout(resolve, this.DUR_PRE_FLOAT * 1000));

    // Float back to position
    await this.floatBack(mesh, tx, ty);
  }

  private async floatBack(mesh: THREE.Mesh, tx: number, ty: number): Promise<void> {
    // 4) Target world-space position on Z=0 with spacing baked into cell size
    const tz = 0;

    // 5) Animation: float back then snap
    const floatTween = this.makeTween(this.DUR_FLOAT, (e) => {
      const ex = this.easeOutCubic(e);
      const ez = this.easeOutExpo(e);
      const roll = 3.14159 * (0.25 - Math.pow(0.5 - ez, 2));
      const yaw  = 3.14159 * (0.25 - Math.pow(0.5 - ez, 2));
      // console.log('roll, yaw:', roll, yaw);
      // const yaw  = 6 * (0.25 - Math.pow(1.0 - e, 1));

      mesh.position.set(
        THREE.MathUtils.lerp(0,  tx, ex),
        THREE.MathUtils.lerp(0,  ty, ex),
        THREE.MathUtils.lerp(this.camera.position.z - this.zSpawn, tz, ez)
      );
      // mesh.scale.setScalar(THREE.MathUtils.lerp(1.12, 1.0, ex));
      // mesh.rotation.set(0.0, yaw, roll);
      mesh.rotation.set(roll, yaw, 0);
    });

    // const snapTween = this.makeTween(this.DUR_SNAP, (e) => {
    //   const s = this.easeOutBack(e, 1.2);
    //   const overshoot = 6; // pixels
    //   mesh.position.x = tx + (1 - s) * (tx === 0 ? 0 : Math.sign(tx) * overshoot);
    //   mesh.position.y = ty + (1 - s) * (ty === 0 ? 0 : Math.sign(ty) * overshoot);
    //   mesh.position.z = tz;
    //   mesh.scale.setScalar(1.0 + 0.02 * (1 - s));
    //   mesh.rotation.set(0, 0, 0);
    // });

    // Run the sequence
    await this.runTween(floatTween);
    // await this.runTween(snapTween);
  }


  private async floatForward(mesh: THREE.Mesh): Promise<void> {
    // Float an existing mesh back to the spawn point: 0, 0, this.targetCamZ - this.zSpawn

    const existingPosition = mesh.position.clone();

    // 5) Animation: float back then snap
    const floatTween = this.makeTween(this.DUR_FLOAT, (e) => {
      const ex = this.easeOutCubic(e);
      const ez = this.easeOutExpo(e);
      const roll = 3.14159 * (0.25 - Math.pow(0.5 - ez, 2));
      const yaw  = 3.14159 * (0.25 - Math.pow(0.5 - ez, 2));
      // console.log('roll, yaw:', roll, yaw);
      // const yaw  = 6 * (0.25 - Math.pow(1.0 - e, 1));

      mesh.position.set(
        THREE.MathUtils.lerp(existingPosition.x,  0, ex),
        THREE.MathUtils.lerp(existingPosition.y,  0, ex),
        THREE.MathUtils.lerp(existingPosition.z, this.camera.position.z - this.zSpawn, ez)
      );
      // mesh.scale.setScalar(THREE.MathUtils.lerp(1.12, 1.0, ex));
      // mesh.rotation.set(0.0, yaw, roll);
      mesh.rotation.set(roll, yaw, 0);
    });

    // Run the sequence
    await this.runTween(floatTween);
  }

  // ---- Optional: cleanup ----
  public dispose(): void {
    window.removeEventListener('resize', this.onResize);
    this.renderer?.dispose();
    // (If you manage many meshes, dispose their geometries/materials/textures here)
  }

  // ---- Private helpers ----
  private onResize = () => {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    console.log('resizing', w, h);
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  private async loadTexture(url: string): Promise<THREE.Texture> {
    const texture = await this.texLoader.loadAsync(url);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  private clamp01(t: number): number {
    return Math.max(0, Math.min(1, t));
  }
  private easeOutCubic = (t: number): number => {
    t = this.clamp01(t);
    return 1 - Math.pow(1 - t, 3);
  };
  private easeOutExpo = (t: number): number => {
    t = this.clamp01(t);
    const n = 3;
    const d = Math.pow(2, -n);
    t = Math.pow(2, -n * t);
    t = (t - d) / (1 - d);
    return t === 1 ? 1 : 1 - t;
  };
  private easeOutBack = (t: number, s = 1.70158): number => {
    t = this.clamp01(t);
    return 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
  };
  private damp(a: number, b: number, lambda: number, dt: number): number {
    return THREE.MathUtils.lerp(a, b, 1 - Math.exp(-lambda * dt));
  }

  private makeTween(durationSec: number, onUpdate: (e: number) => void): TweenFn {
    let elapsed = 0;
    return (dt: number) => {
      elapsed += dt;
      const e = this.clamp01(elapsed / durationSec);
      onUpdate(e);
      return e >= 1.0; // true => finished (to be removed)
    };
  }
  private runTween(tweenFn: TweenFn): Promise<void> {
    return new Promise((resolve) => {
      this.activeTweens.push((dt) => {
        const finished = tweenFn(dt);
        if (finished) { resolve(); return true; }
        return false;
      });
    });
  }

  private expandBoundsWithRect(cx: number, cy: number, w: number, h: number): void {
    const halfW = w * 0.5, halfH = h * 0.5;
    this.bounds.minX = Math.min(this.bounds.minX, cx - halfW);
    this.bounds.maxX = Math.max(this.bounds.maxX, cx + halfW);
    this.bounds.minY = Math.min(this.bounds.minY, cy - halfH);
    this.bounds.maxY = Math.max(this.bounds.maxY, cy + halfH);
  }

  private computeFitZWithMargin(
    b: { minX: number; maxX: number; minY: number; maxY: number },
    fovY: number,
    aspect: number,
    margin: number
  ): number {
    const width  = Math.max(b.maxX, -b.minX) + 2 * margin;
    const height = Math.max(b.maxY, -b.minY) + 2 * margin;
    const hw = width * 0.5, hh = height * 0.5;

    const ret = Math.sqrt(hw * hw + hh * hh) / Math.tan(fovY * 0.5);

    // console.log('computeFitZ: ', ret);
    return ret * 1.41;
  }

  private waitForCameraClose(eps = 0.5): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        const dz = Math.abs(this.camera.position.z - this.targetCamZ);
        if (dz <= eps) resolve();
        else requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  }
}

@Component({
  selector: 'app-showcase-ws',
  imports: [QrcodeComponent],
  templateUrl: './showcase-ws.component.html',
  styleUrl: './showcase-ws.component.less'
})
export class ShowcaseWsComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  grid: PhotoGrid;
  gridOccupancy: any = {};
  minM = 0;
  loop = new Subject<any[]>();
  lastCreatedAt = '0';
  qrSmall = signal(false);
  workspace = signal('');
  api_key = signal('');
  admin_key = signal('');
  lang = signal('');
  qrUrl = computed(() => 
    `https://mapfutur.es/${this.lang()}?workspace=${this.workspace()}&api_key=${this.api_key()}&ws=true`
  );

  constructor(private platform: PlatformService, private http: HttpClient, private el: ElementRef, private activatedRoute: ActivatedRoute) {
    timer(10000).subscribe(() => {
      this.qrSmall.set(true);
    });
    this.loop.pipe(
      distinctUntilChanged()
    ).subscribe(async (items) => {
      items = items.sort((item1, item2) => item1.created_at.localeCompare(item2.created_at));
      console.log(`GOT ${items.length} items`);
      for (const item of items) {
        const created_at = item.created_at;
        if (!created_at || created_at <= this.lastCreatedAt) {
          continue;
        }
        const id = item._id;
        const url = item.screenshot_url;
        if (this.lastCreatedAt === '0') {
            this.qrSmall.set(true);
        }
        // console.log('ITEM', item);
        try {
          await this.grid.animateInPhoto(id, url);
        } catch (error) {
          console.error('Error animating photo:', error);
        }
        this.lastCreatedAt = created_at;
      }

      let obs: Observable<any> = timer(5000);
      if (items.length > 0) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        obs = from(this.grid.animateExistingPhoto(randomItem._id));
      }
      forkJoin([
        obs,
        this.getItems()
      ]).subscribe(([_, items_]) => {
        this.loop.next(items_);
      });
    });
    const qp = this.activatedRoute.snapshot.queryParams;
    this.workspace.set(qp['workspace'] || 'WORKSPACE_NOT_SET');
    this.api_key.set(qp['api_key'] || 'API_KEY_NOT_SET');
    this.admin_key.set(qp['admin_key'] || 'ADMIN_KEY_NOT_SET');
    this.lang.set(qp['lang'] ? qp['lang'] + '/' : '');
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace}/items?page_size=10000`).pipe(
      catchError((error) => {
        console.error('Error loading items:', error);
        return of([]);
      })
    );
  }

  async ngAfterViewInit() {
    if (this.platform.browser()) {
      await this.initialize(this.container.nativeElement);
    }
  }

  getEmptyPosition(): [number, number] {
    while(true) {
      for (let x = 0; x <= this.minM; x++) {
        for (const [dx, dy] of [
          [x,this.minM], [x,-this.minM], [-x,this.minM], [-x,-this.minM],
          [this.minM,x], [this.minM,-x], [-this.minM,x], [-this.minM,-x]
        ]) {
          const key = `${dx},${dy}`;
          if (this.gridOccupancy[key]) {
            continue;
          }
          // console.log('ZZZ getEmpty', key, this.gridOccupancy);
          this.gridOccupancy[key] = true;
          // console.log('ZZZ getEmpty', dx, dy, this.gridOccupancy);
          const ofs = dy % 2 === 0 ? 0.25 : -0.25;
          return [dx + ofs, dy];
        }
      }
      this.minM++;
    }
  }

  getRandomEmpty(): [number, number] {
    const XtoY = 0.53;
    const L = Object.keys(this.gridOccupancy).length || 1;
    let radius = Math.ceil(Math.sqrt(2 * XtoY * L / Math.PI) + 1);
    while(true) {
      let x = 1 - Math.sqrt(Math.random());
      x = Math.round(x * radius / XtoY) * Math.sign(Math.random() - 0.5);
      let y = 1 - Math.sqrt(Math.random());
      y = Math.round(y * radius) * Math.sign(Math.random() - 0.5);
      const key = `${x},${y}`;
      // console.log('ZZZ getRandomEmpty', L, radius, key, this.gridOccupancy[key]);
      if (this.gridOccupancy[key]) {
        continue;
      }
      this.gridOccupancy[key] = true;
      if (Math.random() < 0.5) {
        continue;
      }
      const ofs = y % 2 === 0 ? 0.25 : -0.25;
      return [x + ofs, y];
    }
  }

  private async initialize(container: HTMLElement) {
    // console.log('ZZZ init');
    this.grid = new PhotoGrid(container, {getEmptyPosition: () => this.getRandomEmpty()});
    this.grid.init();
    // console.log('ZZZ init interval');
    timer(2000).subscribe(() => {
      this.getItems().subscribe((items) => {
        this.loop.next(items);
      });
    });
  }

}
