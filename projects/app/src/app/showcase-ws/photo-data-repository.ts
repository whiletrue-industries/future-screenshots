import { Injectable } from '@angular/core';
import { Subject, Observable, timer, from, forkJoin } from 'rxjs';
import { PhotoData, PhotoMetadata, PhotoAnimationState } from './photo-data';
import { LayoutStrategy, LayoutPosition } from './layout-strategy.interface';
import { ThreeRendererService } from './three-renderer.service';
import { ANIMATION_CONSTANTS } from './animation-constants';

export interface PhotoDataRepositoryOptions {
  enableRandomShowcase?: boolean;
  showcaseInterval?: number; // milliseconds
  newPhotoAnimationDelay?: number; // milliseconds
}

/**
 * PhotoDataRepository manages all PhotoData objects and their lifecycle
 * Handles layout positioning, visibility, and showcase behavior
 */
@Injectable({
  providedIn: 'root'
})
export class PhotoDataRepository {
  private photos = new Map<string, PhotoData>();
  private layoutStrategy: LayoutStrategy | null = null;
  private renderer: ThreeRendererService | null = null;
  
  // Configuration
  private enableRandomShowcase = false;
  private showcaseInterval: number = ANIMATION_CONSTANTS.SHOWCASE_INTERVAL;
  private newPhotoAnimationDelay: number = ANIMATION_CONSTANTS.NEW_PHOTO_ANIMATION_DELAY;
  
  // State management
  private showcaseTimer: any = null;
  private isShowcasing = false;
  private cameraBoundsUpdateTimer: any = null;
  
    // Event subjects for external subscribers
  private photoAddedSubject = new Subject<PhotoData>();
  private photoRemovedSubject = new Subject<string>();
  private layoutChangedSubject = new Subject<void>();

  // Public observables
  public photoAdded$ = this.photoAddedSubject.asObservable();
  public photoRemoved$ = this.photoRemovedSubject.asObservable();
  public layoutChanged$ = this.layoutChangedSubject.asObservable();

  constructor() {}

  /**
   * Initialize the repository with layout strategy and renderer
   */
  async initialize(
    layoutStrategy: LayoutStrategy, 
    renderer: ThreeRendererService,
    options: PhotoDataRepositoryOptions = {}
  ): Promise<void> {
    this.layoutStrategy = layoutStrategy;
    this.renderer = renderer;
    
    // Apply options
    this.enableRandomShowcase = options.enableRandomShowcase ?? false;
    this.showcaseInterval = options.showcaseInterval ?? ANIMATION_CONSTANTS.SHOWCASE_INTERVAL;
    this.newPhotoAnimationDelay = options.newPhotoAnimationDelay ?? ANIMATION_CONSTANTS.NEW_PHOTO_ANIMATION_DELAY;

    // Initialize layout strategy
    await this.layoutStrategy.initialize();
    
    // Start showcase loop if enabled
    this.updateShowcaseLoop();
  }

  /**
   * Add a new photo to the repository
   */
  async addPhoto(metadata: PhotoMetadata, animate: boolean = true): Promise<PhotoData> {
    if (this.photos.has(metadata.id)) {
      return this.photos.get(metadata.id)!;
    }

    if (!this.layoutStrategy || !this.renderer) {
      throw new Error('Repository not initialized');
    }

    // Create PhotoData
    const photoData = new PhotoData(metadata, { x: 0, y: 0, z: 0 });
    this.photos.set(metadata.id, photoData);
    this.layoutStrategy.addPhoto(photoData);

    // Get position from layout strategy
    const layoutPosition = await this.layoutStrategy.getPositionForPhoto(
      photoData, 
      Array.from(this.photos.values())
    );

    // Set visibility based on whether layout strategy provided a position
    const hasValidPosition = layoutPosition && 
      (layoutPosition.x !== undefined && layoutPosition.y !== undefined);
    
    if (hasValidPosition) {
      photoData.setProperty('opacity', 1);
      photoData.setTargetPosition({
        x: layoutPosition.x,
        y: layoutPosition.y,
        z: 0
      });
      
      // Store layout metadata
      if (layoutPosition.metadata) {
        photoData.updateMetadata(layoutPosition.metadata);
      }
      if (layoutPosition.gridKey) {
        photoData.setProperty('gridKey', layoutPosition.gridKey);
      }
    } else {
      // No valid position from strategy - hide the photo
      photoData.setProperty('opacity', 0);
      photoData.setTargetPosition({ x: 0, y: 0, z: 0 });
    }

    // Create mesh through renderer
    const mesh = await this.renderer.createPhotoMesh(photoData);
    photoData.setMesh(mesh);

    if (animate && hasValidPosition) {
      // Animate new photo into position
      await this.animateNewPhoto(photoData);
    } else if (hasValidPosition) {
      // Place immediately at target position
      photoData.setCurrentPosition(photoData.targetPosition);
      this.renderer.updateMeshPosition(mesh, photoData.targetPosition);
      photoData.setAnimationState(PhotoAnimationState.POSITIONED);
    }

    // Update renderer opacity
    if (mesh.material && 'opacity' in mesh.material) {
      (mesh.material as any).opacity = photoData.getProperty('opacity') ?? 1;
    }

    // Update camera bounds if photo was placed immediately (not animated)
    if (!animate && hasValidPosition) {
      this.updateCameraBounds();
    }

    this.photoAddedSubject.next(photoData);
    return photoData;
  }

  /**
   * Remove a photo from the repository
   */
  removePhoto(id: string): boolean {
    const photoData = this.photos.get(id);
    if (!photoData) {
      return false;
    }

    // Clean up mesh
    if (photoData.mesh && this.renderer) {
      this.renderer.removeMesh(photoData.mesh);
    }

    // Remove from layout strategy
    if (this.layoutStrategy) {
      this.layoutStrategy.removePhoto(id);
    }

    // Clean up PhotoData
    photoData.dispose();
    this.photos.delete(id);
    
    // Update camera bounds since grid size changed
    this.updateCameraBounds();
    
    this.photoRemovedSubject.next(id);
    return true;
  }

  /**
   * Get photo by ID
   */
  getPhoto(id: string): PhotoData | undefined {
    return this.photos.get(id);
  }

  /**
   * Get all photos
   */
  getAllPhotos(): PhotoData[] {
    return Array.from(this.photos.values());
  }

  /**
   * Get visible photos (opacity > 0)
   */
  getVisiblePhotos(): PhotoData[] {
    return this.getAllPhotos().filter(photo => {
      const opacity = photo.getProperty<number>('opacity') ?? 1;
      return opacity > 0;
    });
  }

  /**
   * Switch to a new layout strategy
   */
  async setLayoutStrategy(newStrategy: LayoutStrategy): Promise<void> {
    if (!this.renderer) {
      throw new Error('Repository not initialized');
    }

    console.log(`Switching layout strategy to ${newStrategy.getConfiguration().name}`);

    // Initialize new strategy
    await newStrategy.initialize();

    // Transfer all photos to new strategy
    const currentPhotos = Array.from(this.photos.values());
    for (const photo of currentPhotos) {
      newStrategy.addPhoto(photo);
    }

    // Calculate new positions for all photos
    const newPositions = await newStrategy.calculateAllPositions(currentPhotos);

    // Update layout strategy
    this.layoutStrategy = newStrategy;

    // Update all photos with new positions and visibility
    const animationPromises = currentPhotos.map(async (photo, index) => {
      const newPosition = newPositions[index];
      
      // Check if photo has valid position in new layout (not null)
      const hasValidPosition = newPosition !== null;
      
      if (hasValidPosition) {
        photo.setProperty('opacity', 1);
        photo.setTargetPosition({
          x: newPosition.x,
          y: newPosition.y,
          z: photo.targetPosition.z
        });
        
        // Store layout metadata
        if (newPosition.metadata) {
          photo.updateMetadata(newPosition.metadata);
        }
        if (newPosition.gridKey) {
          photo.setProperty('gridKey', newPosition.gridKey);
        }
      } else {
        // Hide photo if no valid position
        photo.setProperty('opacity', 0);
      }

      // Update mesh opacity
      if (photo.mesh?.material && 'opacity' in photo.mesh.material) {
        (photo.mesh.material as any).opacity = photo.getProperty('opacity') ?? 1;
      }

      // Animate to new position if visible
      if (hasValidPosition && photo.mesh) {
        return this.animateToPositionWithUpdate(
          photo,
          photo.currentPosition, 
          photo.targetPosition, 
          ANIMATION_CONSTANTS.LAYOUT_TRANSITION_DURATION
        );
      }
    });

    // Wait for all animations to complete
    await Promise.all(animationPromises.filter(Boolean));
    
    // Update camera bounds (positions are already updated by animateToPositionWithUpdate)
    this.updateCameraBounds();
    
    this.layoutChangedSubject.next();
    console.log(`Successfully switched to ${newStrategy.getConfiguration().name} layout`);
  }

  /**
   * Enable or disable random showcase behavior
   */
  setRandomShowcaseEnabled(enabled: boolean): void {
    this.enableRandomShowcase = enabled;
    this.updateShowcaseLoop();
    // Note: Camera bounds don't need updating just for showcase behavior change
  }

  /**
   * Get current showcase state
   */
  isRandomShowcaseEnabled(): boolean {
    return this.enableRandomShowcase;
  }

  /**
   * Manually trigger showcase of a specific photo
   */
  async showcasePhoto(id: string): Promise<void> {
    const photo = this.photos.get(id);
    if (!photo || !photo.mesh || !this.renderer) {
      return;
    }

    if (this.isShowcasing) {
      return; // Already showcasing
    }

    this.isShowcasing = true;

    try {
      // Move photo forward to center of screen
      const originalZ = photo.currentPosition.z;
      const showcaseZ = this.renderer.getCameraSpawnZ() - 100;
      
      const showcaseForwardPos = { x: 0, y: 0, z: showcaseZ };
      await this.animateToPositionWithUpdate(
        photo,
        photo.currentPosition,
        showcaseForwardPos,
        ANIMATION_CONSTANTS.SHOWCASE_FORWARD_DURATION
      );

      // Shorter showcase duration for less disruption
      await new Promise(resolve => setTimeout(resolve, Math.min(this.newPhotoAnimationDelay, ANIMATION_CONSTANTS.MAX_SHOWCASE_DURATION)));

      // Move back to original position
      const returnPos = { ...photo.targetPosition, z: originalZ };
      await this.animateToPositionWithUpdate(
        photo,
        photo.currentPosition, // Use updated current position
        returnPos,
        ANIMATION_CONSTANTS.SHOWCASE_RETURN_DURATION
      );
      photo.setAnimationState(PhotoAnimationState.POSITIONED);
      // Note: No camera bounds update needed - showcase doesn't change layout positions

    } finally {
      this.isShowcasing = false;
    }
  }

  /**
   * Observable for photo addition events
   */
  get photoAdded(): Observable<PhotoData> {
    return this.photoAdded$;
  }

  /**
   * Observable for photo removal events
   */
  get photoRemoved(): Observable<string> {
    return this.photoRemoved$;
  }

  /**
   * Observable for layout change events
   */
  get layoutChanged(): Observable<void> {
    return this.layoutChanged$;
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    // Stop showcase loop
    if (this.showcaseTimer) {
      clearTimeout(this.showcaseTimer);
      this.showcaseTimer = null;
    }
    
    // Stop camera bounds updates
    if (this.cameraBoundsUpdateTimer) {
      clearTimeout(this.cameraBoundsUpdateTimer);
      this.cameraBoundsUpdateTimer = null;
    }

    // Clean up all photos
    this.photos.forEach(photo => {
      if (photo.mesh && this.renderer) {
        this.renderer.removeMesh(photo.mesh);
      }
      photo.dispose();
    });
    this.photos.clear();

    // Clean up layout strategy
    if (this.layoutStrategy) {
      this.layoutStrategy.dispose();
    }

    // Complete subjects
    this.photoAddedSubject.complete();
    this.photoRemovedSubject.complete();
    this.layoutChangedSubject.complete();
  }

  /**
   * Animate a new photo into position
   */
  private async animateNewPhoto(photoData: PhotoData): Promise<void> {
    if (!photoData.mesh || !this.renderer) {
      return;
    }

    photoData.setAnimationState(PhotoAnimationState.SPAWNING);
    
    // Start at spawn position
    const spawnZ = this.renderer.getCameraSpawnZ();
    const spawnPosition = { x: 0, y: 0, z: spawnZ };
    photoData.setCurrentPosition(spawnPosition);
    this.renderer.updateMeshPosition(photoData.mesh, spawnPosition);

    // Wait before animating (reduced delay for better responsiveness)
    await new Promise(resolve => setTimeout(resolve, Math.min(this.newPhotoAnimationDelay, ANIMATION_CONSTANTS.MAX_NEW_PHOTO_DELAY)));

    // Animate to target position
    photoData.setAnimationState(PhotoAnimationState.FLOATING_BACK);
    await this.animateToPositionWithUpdate(
      photoData,
      spawnPosition,
      photoData.targetPosition,
      ANIMATION_CONSTANTS.NEW_PHOTO_ANIMATION_DURATION
    );

    photoData.setAnimationState(PhotoAnimationState.POSITIONED);
    
    // Update camera bounds
    this.updateCameraBounds();
  }

  /**
   * Update showcase loop based on current settings
   */
  private updateShowcaseLoop(): void {
    // Clear existing timer
    if (this.showcaseTimer) {
      clearTimeout(this.showcaseTimer);
      this.showcaseTimer = null;
    }

    // Start new timer if enabled
    if (this.enableRandomShowcase) {
      this.scheduleRandomShowcase();
    }
  }

  /**
   * Schedule the next random showcase
   */
  private scheduleRandomShowcase(): void {
    if (!this.enableRandomShowcase) {
      return;
    }

    this.showcaseTimer = setTimeout(async () => {
      const visiblePhotos = this.getVisiblePhotos();
      if (visiblePhotos.length > 0 && !this.isShowcasing) {
        const randomPhoto = visiblePhotos[Math.floor(Math.random() * visiblePhotos.length)];
        await this.showcasePhoto(randomPhoto.id);
      }
      
      // Schedule next showcase
      this.scheduleRandomShowcase();
    }, this.showcaseInterval);
  }

  /**
   * Update camera bounds based on visible photos (debounced)
   */
  private updateCameraBounds(): void {
    // Debounce camera bounds updates to prevent excessive calls
    if (this.cameraBoundsUpdateTimer) {
      clearTimeout(this.cameraBoundsUpdateTimer);
    }
    
    this.cameraBoundsUpdateTimer = setTimeout(() => {
      this.performCameraBoundsUpdate();
    }, ANIMATION_CONSTANTS.CAMERA_BOUNDS_UPDATE_DEBOUNCE);
  }
  
  /**
   * Actually perform the camera bounds update
   */
  private performCameraBoundsUpdate(): void {
    if (!this.renderer) {
      return;
    }

    const visiblePhotos = this.getVisiblePhotos();
    if (visiblePhotos.length === 0) {
      return;
    }

    const positions = visiblePhotos.map(photo => ({
      x: photo.targetPosition.x,
      y: photo.targetPosition.y
    }));

    const bounds = this.calculateBounds(positions);
    this.renderer.updateCameraTarget(bounds);
  }

  /**
   * Animate to position and update PhotoData current position
   */
  private async animateToPositionWithUpdate(
    photoData: PhotoData,
    fromPosition: { x: number; y: number; z: number },
    toPosition: { x: number; y: number; z: number },
    duration: number
  ): Promise<void> {
    if (!photoData.mesh) return;
    
    await this.renderer!.animateToPosition(
      photoData.mesh,
      fromPosition,
      toPosition,
      duration
    );
    
    // Always update current position after animation
    photoData.setCurrentPosition(toPosition);
  }

  /**
   * Calculate bounds for a set of positions
   */
  private calculateBounds(positions: { x: number; y: number }[]): {
    minX: number; maxX: number; minY: number; maxY: number;
  } {
    if (positions.length === 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    let minX = positions[0].x;
    let maxX = positions[0].x;
    let minY = positions[0].y;
    let maxY = positions[0].y;

    for (const pos of positions) {
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
    }

    return { minX, maxX, minY, maxY };
  }
}