import { Observable } from 'rxjs';
import { PhotoData, Position3D } from './photo-data';

export interface LayoutPosition {
  x: number;
  y: number;
  gridKey?: string; // Optional identifier for grid-based layouts
  metadata?: { [key: string]: any }; // Additional layout-specific data
}

export interface LayoutConfiguration {
  name: string;
  displayName: string;
  description: string;
  supportsInteraction?: boolean; // Whether this layout supports drag-and-drop
  requiresWebService?: boolean; // Whether this layout needs external data
  settings?: { [key: string]: any }; // Layout-specific settings
}

export interface LayoutTransitionOptions {
  duration?: number; // Transition duration in milliseconds
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'bounce';
  staggerDelay?: number; // Delay between individual photo transitions
}

export abstract class LayoutStrategy {
  protected isInitialized = false;
  protected photos: PhotoData[] = [];

  // Required methods that each layout must implement
  abstract getConfiguration(): LayoutConfiguration;

  /**
   * Calculate position for a new photo being added to the layout
   * @param photoData The photo being positioned
   * @param existingPhotos Current photos in the scene
   * @returns Promise that resolves to the layout position, or null if photo should be hidden
   */
  abstract getPositionForPhoto(
    photoData: PhotoData, 
    existingPhotos: PhotoData[]
  ): Promise<LayoutPosition | null>;

  /**
   * Recalculate positions for all photos (used when switching layouts)
   * @param photos All photos to be positioned
   * @returns Promise that resolves to array of positions corresponding to input photos (null means hide photo)
   */
  abstract calculateAllPositions(photos: PhotoData[]): Promise<(LayoutPosition | null)[]>;

  // Optional lifecycle methods
  async initialize(options?: any): Promise<void> {
    this.isInitialized = true;
  }

  async dispose(): Promise<void> {
    this.photos = [];
    this.isInitialized = false;
  }

  // Photo management
  addPhoto(photo: PhotoData): void {
    this.photos.push(photo);
  }

  removePhoto(photoId: string): boolean {
    const index = this.photos.findIndex(p => p.id === photoId);
    if (index >= 0) {
      this.photos.splice(index, 1);
      return true;
    }
    return false;
  }

  getPhotos(): PhotoData[] {
    return [...this.photos];
  }

  getPhoto(id: string): PhotoData | undefined {
    return this.photos.find(p => p.id === id);
  }

  // Layout bounds calculation (used for camera positioning)
  calculateLayoutBounds(positions: (LayoutPosition | null)[], photoWidth: number, photoHeight: number): {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } {
    // Filter out null positions
    const validPositions = positions.filter((pos): pos is LayoutPosition => pos !== null);
    
    if (validPositions.length === 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const halfW = photoWidth * 0.5;
    const halfH = photoHeight * 0.5;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const pos of validPositions) {
      minX = Math.min(minX, pos.x - halfW);
      maxX = Math.max(maxX, pos.x + halfW);
      minY = Math.min(minY, pos.y - halfH);
      maxY = Math.max(maxY, pos.y + halfH);
    }

    return { minX, maxX, minY, maxY };
  }

  // Optional: Handle layout-specific interactions
  onPhotoClick?(photo: PhotoData): void;
  onPhotoDragStart?(photo: PhotoData, startPosition: Position3D): boolean; // Return false to prevent drag
  onPhotoDragMove?(photo: PhotoData, currentPosition: Position3D): void;
  onPhotoDragEnd?(photo: PhotoData, endPosition: Position3D): Promise<boolean>; // Return true if drop was handled

  // Optional: Layout-specific animations
  getTransitionOptions?(): LayoutTransitionOptions;

  // Optional: Custom update logic for animated layouts
  update?(deltaTime: number): void;

  // Optional: Handle external data updates (for layouts that depend on web services)
  onExternalDataUpdate?(data: any): Promise<void>;

  // Utility method for validation
  protected validateInitialized(): void {
    if (!this.isInitialized) {
      throw new Error(`${this.getConfiguration().name} layout strategy is not initialized`);
    }
  }
}

// Utility interface for layouts that need web service data
export interface WebServiceLayoutStrategy extends LayoutStrategy {
  /**
   * Fetch layout data from web service
   * @param photos Photos that need positioning data
   * @returns Observable of positioning data (null values mean hide photo)
   */
  fetchLayoutData(photos: PhotoData[]): Observable<{ [photoId: string]: LayoutPosition | null }>;
}

// Utility interface for interactive layouts
export interface InteractiveLayoutStrategy extends LayoutStrategy {
  /**
   * Get valid drop zones for drag and drop
   * @returns Array of drop zone definitions
   */
  getDropZones(): Array<{
    id: string;
    bounds: { x: number; y: number; width: number; height: number };
    acceptsPhoto: (photo: PhotoData) => boolean;
    onPhotoDrop: (photo: PhotoData) => Promise<void>;
  }>;
}

// Type guards for layout capabilities
export function isWebServiceLayout(layout: LayoutStrategy): layout is WebServiceLayoutStrategy {
  return 'fetchLayoutData' in layout;
}

export function isInteractiveLayout(layout: LayoutStrategy): layout is InteractiveLayoutStrategy {
  return 'getDropZones' in layout;
}