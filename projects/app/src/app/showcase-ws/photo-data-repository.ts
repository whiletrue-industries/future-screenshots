import { Injectable } from '@angular/core';
import { Subject, Observable, timer, from, forkJoin } from 'rxjs';
import * as THREE from 'three';
import { PhotoData, PhotoMetadata, PhotoAnimationState } from './photo-data';
import { LayoutStrategy, LayoutPosition, isInteractiveLayout } from './layout-strategy.interface';
import { ThreeRendererService } from './three-renderer.service';
import { ANIMATION_CONSTANTS } from './animation-constants';
import { PHOTO_CONSTANTS } from './photo-constants';

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
    console.log('📥 ADD_PHOTO called for:', metadata.id, 'animate:', animate);
    
    if (this.photos.has(metadata.id)) {
      console.log('♻️ ADD_PHOTO: Photo already exists, returning existing:', metadata.id, 'Stack:', new Error().stack?.split('\n').slice(1, 3).join(' -> '));
      return this.photos.get(metadata.id)!;
    }

    if (!this.layoutStrategy || !this.renderer) {
      throw new Error('Repository not initialized');
    }

    console.log('🆕 ADD_PHOTO: Creating new photo:', metadata.id, 'Layout requires full recalc:', this.layoutStrategy.requiresFullRecalculationOnAdd());

    // Create PhotoData
    const photoData = new PhotoData(metadata, { x: 0, y: 0, z: 0 });
    this.photos.set(metadata.id, photoData);
    this.layoutStrategy.addPhoto(photoData);

    // Check if this layout requires full recalculation when adding photos
    let hasValidPosition = false;
    
    if (this.layoutStrategy.requiresFullRecalculationOnAdd()) {
      // Recalculate all positions and update all photos
      const allPhotos = Array.from(this.photos.values());
      const allPositions = await this.layoutStrategy.calculateAllPositions(allPhotos);
      
      // Update all photos with new positions
      const animationPromises: Promise<void>[] = [];
      
      allPhotos.forEach((photo, index) => {
        const layoutPosition = allPositions[index];
        
        if (layoutPosition && layoutPosition.x !== undefined && layoutPosition.y !== undefined) {
          const newPosition = { x: layoutPosition.x, y: layoutPosition.y, z: 0 };
          photo.setProperty('opacity', 1);
          photo.setTargetPosition(newPosition);
          
          // For existing photos with meshes, animate smoothly to new position
          if (photo.mesh && photo.id !== photoData.id) {
            // Animate from current position to new position
            const fromPosition = photo.currentPosition;
            const currentOpacity = photo.getProperty<number>('opacity') || 1;
            
            animationPromises.push(
              this.animateToPositionWithOpacityUpdate(
                photo,
                fromPosition,
                newPosition,
                currentOpacity,
                1, // target opacity
                ANIMATION_CONSTANTS.LAYOUT_TRANSITION_DURATION
              )
            );
          }
          
          // Store layout metadata
          if (layoutPosition.metadata) {
            photo.updateMetadata(layoutPosition.metadata);
          }
          if (layoutPosition.gridKey) {
            photo.setProperty('gridKey', layoutPosition.gridKey);
          }
          
          // Check if the new photo has a valid position
          if (photo.id === photoData.id) {
            hasValidPosition = true;
          }
        } else {
          // No valid position - hide the photo
          const hiddenPosition = { x: 0, y: 0, z: 0 };
          photo.setProperty('opacity', 0);
          photo.setTargetPosition(hiddenPosition);
          
          // For existing photos with meshes, animate to hidden position
          if (photo.mesh && photo.id !== photoData.id) {
            const fromPosition = photo.currentPosition;
            const currentOpacity = photo.getProperty<number>('opacity') || 1;
            
            animationPromises.push(
              this.animateToPositionWithOpacityUpdate(
                photo,
                fromPosition,
                hiddenPosition,
                currentOpacity,
                0, // target opacity
                ANIMATION_CONSTANTS.LAYOUT_TRANSITION_DURATION
              )
            );
          }
        }
      });
      
      // Wait for all position animations to complete before continuing
      if (animationPromises.length > 0) {
        await Promise.all(animationPromises);
      }
    } else {
      // Only position the new photo (existing behavior for grid, tsne, svg layouts)
      const layoutPosition = await this.layoutStrategy.getPositionForPhoto(
        photoData, 
        Array.from(this.photos.values())
      );

      // Set visibility based on whether layout strategy provided a position
      hasValidPosition = !!(layoutPosition && 
        (layoutPosition.x !== undefined && layoutPosition.y !== undefined));
      
      if (hasValidPosition && layoutPosition) {
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
    }

    // Create mesh through renderer
    const mesh = await this.renderer.createPhotoMesh(photoData);
    photoData.setMesh(mesh);

    // Set mesh-to-photoId mapping for hotspot detection
    this.renderer.setMeshPhotoId(mesh, photoData.id);

    // Enable dragging for interactive layouts
    if (this.layoutStrategy && isInteractiveLayout(this.layoutStrategy)) {
      this.setupInteractiveDragForPhoto(photoData);
    }

    if (animate && hasValidPosition) {
      // Start with opacity 0 for animation
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as any).opacity = 0; // Start at 0 opacity for proper fade-in
        (mesh.material as any).transparent = true;
      }
      // Animate new photo into position with fade in
      console.log('🎬 REPOSITORY: Starting animateNewPhoto for:', photoData.id);
      await this.animateNewPhoto(photoData);
      console.log('✅ REPOSITORY: Completed animateNewPhoto for:', photoData.id);
    } else if (hasValidPosition) {
      // Place immediately at target position with full opacity
      photoData.setCurrentPosition(photoData.targetPosition);
      this.renderer.updateMeshPosition(mesh, photoData.targetPosition);
      photoData.setAnimationState(PhotoAnimationState.POSITIONED);
      
      // Set full opacity immediately
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as any).opacity = photoData.getProperty('opacity') ?? 1;
        (mesh.material as any).transparent = true;
      }
    } else {
      // Hidden photo - ensure it's invisible and at (0,0)
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as any).opacity = 0;
        (mesh.material as any).transparent = true;
      }
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
    if (!this.layoutStrategy || !this.renderer) {
      throw new Error('PhotoDataRepository not initialized');
    }

    const fromLayout = this.layoutStrategy.getConfiguration().name;
    const toLayout = newStrategy.getConfiguration().name;

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

      // Get current opacity from mesh material
      const currentOpacity = photo.mesh?.material && 'opacity' in photo.mesh.material ? 
        (photo.mesh.material as any).opacity : 1;
      
      if (hasValidPosition) {
        // Always make photo visible when it has a valid position
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
        
        // Animate both position and opacity to visible state
        if (photo.mesh) {
          const actualCurrentPosition = {
            x: photo.mesh.position.x,
            y: photo.mesh.position.y,
            z: photo.mesh.position.z
          };
          
          return this.animateToPositionWithOpacityUpdate(
            photo,
            actualCurrentPosition,
            photo.targetPosition,
            currentOpacity,
            1, // target opacity
            ANIMATION_CONSTANTS.LAYOUT_TRANSITION_DURATION
          );
        }
      } else {
        // Hide photo and move to (0,0)
        photo.setProperty('opacity', 0);
        photo.setTargetPosition({ x: 0, y: 0, z: 0 });
        // Animate to (0,0) and fade out simultaneously
        if (photo.mesh) {
          const actualCurrentPosition = {
            x: photo.mesh.position.x,
            y: photo.mesh.position.y,
            z: photo.mesh.position.z
          };
          
          return this.animateToPositionWithOpacityUpdate(
            photo,
            actualCurrentPosition,
            { x: 0, y: 0, z: 0 },
            currentOpacity,
            0, // target opacity
            ANIMATION_CONSTANTS.INVISIBLE_POSITION_TRANSITION_DURATION
          );
        }
      }
    });

    // Start camera animation simultaneously with photo animations
    const cameraAnimationPromise = this.updateCameraBoundsAnimated(true);
    
    // Wait for both photo animations and camera animation to complete
    await Promise.all([
      Promise.all(animationPromises.filter(Boolean)),
      cameraAnimationPromise
    ]);
    
    // Enable dragging for all existing photos if switching to interactive layout
    if (isInteractiveLayout(this.layoutStrategy)) {
      for (const photo of currentPhotos) {
        if (photo.mesh) {
          // Set mesh-to-photoId mapping for hotspot detection
          this.renderer.setMeshPhotoId(photo.mesh, photo.id);
          
          this.setupInteractiveDragForPhoto(photo);
        }
      }
    } else {
      // Disable dragging for all photos when switching to non-interactive layout
      this.renderer.disableAllDragging();
    }
    
    this.layoutChangedSubject.next();
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
      // Upgrade to high-resolution texture before showcasing
      await this.renderer.upgradeToHighResTexture(photo.mesh, photo.url);

      // Move photo forward to center of screen
      const originalZ = photo.currentPosition.z;
      const showcaseZ = this.renderer.getCameraSpawnZ() - 100;
      
      const showcaseForwardPos = { x: 0, y: 0, z: showcaseZ };
      const actualStartPos = {
        x: photo.mesh.position.x,
        y: photo.mesh.position.y,
        z: photo.mesh.position.z
      };
      await this.animateToPositionWithUpdate(
        photo,
        actualStartPos,
        showcaseForwardPos,
        ANIMATION_CONSTANTS.SHOWCASE_FORWARD_DURATION
      );

      // Shorter showcase duration for less disruption
      await new Promise(resolve => setTimeout(resolve, Math.min(this.newPhotoAnimationDelay, ANIMATION_CONSTANTS.MAX_SHOWCASE_DURATION)));

      // Move back to original position
      const returnPos = { ...photo.targetPosition, z: originalZ };
      const actualReturnStartPos = {
        x: photo.mesh.position.x,
        y: photo.mesh.position.y,
        z: photo.mesh.position.z
      };
      await this.animateToPositionWithUpdate(
        photo,
        actualReturnStartPos,
        returnPos,
        ANIMATION_CONSTANTS.SHOWCASE_RETURN_DURATION
      );
      photo.setAnimationState(PhotoAnimationState.POSITIONED);
      
      // Downgrade back to low-resolution texture to save memory
      await this.renderer.downgradeToLowResTexture(photo.mesh, photo.url);
      
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
    console.log('🎬 ANIMATE_NEW_PHOTO called for:', photoData.id, 'Current state:', photoData.animationState, 'Stack trace:', new Error().stack?.split('\n').slice(1, 4).join(' -> '));
    
    if (!photoData.mesh || !this.renderer) {
      console.log('❌ ANIMATE_NEW_PHOTO: Missing mesh or renderer for:', photoData.id);
      return;
    }

    // Prevent duplicate animations - if already animating or positioned, don't restart
    if (photoData.animationState === PhotoAnimationState.FLOATING_BACK || 
        photoData.animationState === PhotoAnimationState.POSITIONED) {
      console.warn('🚫 ANIMATE_NEW_PHOTO: Attempted to animate photo that is already animating or positioned:', photoData.id, 'State:', photoData.animationState);
      return;
    }

    console.log('✅ ANIMATE_NEW_PHOTO: Starting animation for:', photoData.id);
    photoData.setAnimationState(PhotoAnimationState.SPAWNING);
    
    // Start at spawn position with opacity 0
    const spawnZ = this.renderer.getCameraSpawnZ() - 100;
    const spawnPosition = { x: 0, y: 0, z: spawnZ };
    photoData.setCurrentPosition(spawnPosition);
    this.renderer.updateMeshPosition(photoData.mesh, spawnPosition);

    // Wait before animating (reduced delay for better responsiveness)
    await new Promise(resolve => setTimeout(resolve, Math.min(this.newPhotoAnimationDelay, ANIMATION_CONSTANTS.NEW_PHOTO_ANIMATION_DELAY)));

    // Animate to target position with fade in
    photoData.setAnimationState(PhotoAnimationState.FLOATING_BACK);
    await this.animateToPositionWithOpacityUpdate(
      photoData,
      spawnPosition,
      photoData.targetPosition,
      0, // start opacity
      1, // target opacity
      ANIMATION_CONSTANTS.NEW_PHOTO_ANIMATION_DURATION
    );

    photoData.setAnimationState(PhotoAnimationState.POSITIONED);
    
    // Update camera bounds with animation for new photos
    await this.updateCameraBoundsAnimated(true);
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
   * Update camera bounds with animation after layout changes
   */
  private async updateCameraBoundsAnimated(animate: boolean = true): Promise<void> {
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
    
    if (animate) {
      // Use animated camera bounds update for layout changes
      await this.renderer.animateCameraTarget(bounds, ANIMATION_CONSTANTS.CAMERA_BOUNDS_ANIMATION_DURATION);
    } else {
      // Use immediate update for non-layout changes
      this.renderer.updateCameraTarget(bounds);
    }
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
   * Animate both position and opacity, then update PhotoData
   */
  private async animateToPositionWithOpacityUpdate(
    photoData: PhotoData,
    fromPosition: { x: number; y: number; z: number },
    toPosition: { x: number; y: number; z: number },
    fromOpacity: number,
    toOpacity: number,
    duration: number
  ): Promise<void> {
    if (!photoData.mesh) return;
    
    await this.renderer!.animatePositionAndOpacity(
      photoData.mesh,
      fromPosition,
      toPosition,
      fromOpacity,
      toOpacity,
      duration
    );
    
    // Update current position and opacity after animation
    photoData.setCurrentPosition(toPosition);
    photoData.setProperty('opacity', toOpacity);
  }

  /**
   * Set up interactive drag functionality for a photo with layout strategy integration
   */
  private setupInteractiveDragForPhoto(photoData: PhotoData): void {
    if (!photoData.mesh || !this.renderer || !this.layoutStrategy || !isInteractiveLayout(this.layoutStrategy)) {
      return;
    }

    const interactiveStrategy = this.layoutStrategy as any; // Cast to access drag methods
    
    // Store the layout strategy reference in the renderer for drag integration
    this.renderer.setLayoutStrategy(interactiveStrategy);
    
    // Store PhotoData reference for drag callbacks
    this.renderer.setMeshPhotoData(photoData.mesh, photoData);
    
    this.renderer.enableDragForMesh(photoData.mesh, (position: { x: number; y: number; z: number }) => {
      // Update photo data position when dragged (this is called during drag move)
      photoData.setCurrentPosition(position);
      photoData.setTargetPosition(position);
      
      // Note: Layout strategy drag handlers are now called directly by the renderer
    });
  }

  /**
   * Calculate bounds for a set of positions, accounting for photo dimensions
   */
  private calculateBounds(positions: { x: number; y: number }[]): {
    minX: number; maxX: number; minY: number; maxY: number;
  } {
    if (positions.length === 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    // Account for photo dimensions (half width/height from center)
    const halfWidth = PHOTO_CONSTANTS.PHOTO_WIDTH / 2;
    const halfHeight = PHOTO_CONSTANTS.PHOTO_HEIGHT / 2;

    let minX = positions[0].x - halfWidth;
    let maxX = positions[0].x + halfWidth;
    let minY = positions[0].y - halfHeight;
    let maxY = positions[0].y + halfHeight;

    for (const pos of positions) {
      minX = Math.min(minX, pos.x - halfWidth);
      maxX = Math.max(maxX, pos.x + halfWidth);
      minY = Math.min(minY, pos.y - halfHeight);
      maxY = Math.max(maxY, pos.y + halfHeight);
    }

    return { minX, maxX, minY, maxY };
  }
}