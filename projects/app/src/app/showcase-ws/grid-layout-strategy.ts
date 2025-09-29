import { PhotoData } from './photo-data';
import { 
  LayoutStrategy, 
  LayoutConfiguration, 
  LayoutPosition, 
  LayoutTransitionOptions 
} from './layout-strategy.interface';
import { PHOTO_CONSTANTS } from './photo-constants';

export interface GridLayoutOptions {
  photoWidth?: number;     // default PHOTO_CONSTANTS.PHOTO_WIDTH
  photoHeight?: number;    // default PHOTO_CONSTANTS.PHOTO_HEIGHT
  spacingX?: number;      // default PHOTO_CONSTANTS.SPACING_X
  spacingY?: number;      // default PHOTO_CONSTANTS.SPACING_Y
  useRandomPositioning?: boolean; // default true
  hexagonalOffset?: boolean; // default true (offset every other row)
  initialRadius?: number; // for random positioning
}

export class GridLayoutStrategy extends LayoutStrategy {
  private gridOccupancy: { [key: string]: boolean } = {};
  private minM = 0; // For spiral positioning
  private photoWidth: number;
  private photoHeight: number;
  private spacingX: number;
  private spacingY: number;
  private cellW: number;  // Photo width + spacing
  private cellH: number;  // Photo height + spacing
  private useRandomPositioning: boolean;
  private hexagonalOffset: boolean;
  private initialRadius: number;

  constructor(private options: GridLayoutOptions = {}) {
    super();
    this.photoWidth = options.photoWidth ?? PHOTO_CONSTANTS.PHOTO_WIDTH;
    this.photoHeight = options.photoHeight ?? PHOTO_CONSTANTS.PHOTO_HEIGHT;
    this.spacingX = options.spacingX ?? PHOTO_CONSTANTS.SPACING_X;
    this.spacingY = options.spacingY ?? PHOTO_CONSTANTS.SPACING_Y;
    this.cellW = this.photoWidth + this.spacingX;
    this.cellH = this.photoHeight + this.spacingY;
    this.useRandomPositioning = options.useRandomPositioning ?? true;
    this.hexagonalOffset = options.hexagonalOffset ?? true;
    this.initialRadius = options.initialRadius ?? 1;
  }

  getConfiguration(): LayoutConfiguration {
    return {
      name: 'grid',
      displayName: 'Grid Layout',
      description: 'Arranges photos in a grid pattern with optional random distribution',
      supportsInteraction: false,
      requiresWebService: false,
      settings: {
        photoWidth: this.photoWidth,
        photoHeight: this.photoHeight,
        spacingX: this.spacingX,
        spacingY: this.spacingY,
        cellW: this.cellW,
        cellH: this.cellH,
        useRandomPositioning: this.useRandomPositioning,
        hexagonalOffset: this.hexagonalOffset
      }
    };
  }

  override async initialize(options?: GridLayoutOptions): Promise<void> {
    await super.initialize();
    
    if (options) {
      this.photoWidth = options.photoWidth ?? this.photoWidth;
      this.photoHeight = options.photoHeight ?? this.photoHeight;
      this.spacingX = options.spacingX ?? this.spacingX;
      this.spacingY = options.spacingY ?? this.spacingY;
      this.cellW = this.photoWidth + this.spacingX;
      this.cellH = this.photoHeight + this.spacingY;
      this.useRandomPositioning = options.useRandomPositioning ?? this.useRandomPositioning;
      this.hexagonalOffset = options.hexagonalOffset ?? this.hexagonalOffset;
      this.initialRadius = options.initialRadius ?? this.initialRadius;
    }
    
    // Reset occupancy tracking
    this.gridOccupancy = {};
    this.minM = 0;
  }

  override async dispose(): Promise<void> {
    this.gridOccupancy = {};
    this.minM = 0;
    await super.dispose();
  }

  async getPositionForPhoto(
    photoData: PhotoData, 
    existingPhotos: PhotoData[]
  ): Promise<LayoutPosition | null> {
    this.validateInitialized();

    const [x, y] = this.useRandomPositioning ? 
      this.getRandomEmptyPosition() : 
      this.getNextEmptyPosition();

    // Apply cell spacing to get world coordinates
    const worldX = x * this.cellW;
    const worldY = y * this.cellH;

    return {
      x: worldX,
      y: worldY,
      gridKey: `${x},${y}`,
      metadata: {
        gridX: x,
        gridY: y,
        spacing: { x: this.spacingX, y: this.spacingY }
      }
    };
  }

  async calculateAllPositions(photos: PhotoData[]): Promise<(LayoutPosition | null)[]> {
    this.validateInitialized();

    // Reset occupancy for recalculation
    const oldOccupancy = { ...this.gridOccupancy };
    this.gridOccupancy = {};
    this.minM = 0;

    const positions: (LayoutPosition | null)[] = [];
    
    try {
      for (const photo of photos) {
        const position = await this.getPositionForPhoto(photo, photos);
        positions.push(position);
      }
    } catch (error) {
      // Restore previous state on error
      this.gridOccupancy = oldOccupancy;
      throw error;
    }

    return positions;
  }

  // Grid positioning methods (moved from component)
  private getNextEmptyPosition(): [number, number] {
    while (true) {
      for (let x = 0; x <= this.minM; x++) {
        for (const [dx, dy] of [
          [x, this.minM], [x, -this.minM], [-x, this.minM], [-x, -this.minM],
          [this.minM, x], [this.minM, -x], [-this.minM, x], [-this.minM, -x]
        ]) {
          const key = `${dx},${dy}`;
          if (this.gridOccupancy[key]) {
            continue;
          }
          
          this.gridOccupancy[key] = true;
          
          // Apply hexagonal offset if enabled
          const offset = this.hexagonalOffset && dy % 2 === 0 ? 0.25 : 
                        this.hexagonalOffset && dy % 2 !== 0 ? -0.25 : 0;
          
          return [dx + offset, dy];
        }
      }
      this.minM++;
    }
  }

  private getRandomEmptyPosition(): [number, number] {
    const XtoY = 0.53;
    const occupiedCount = Object.keys(this.gridOccupancy).length || 1;
    let radius = Math.max(
      this.initialRadius, 
      Math.ceil(Math.sqrt(2 * XtoY * occupiedCount / Math.PI) + 1)
    );
    
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops
    
    while (attempts < maxAttempts) {
      // Generate random position within radius
      let x = 1 - Math.sqrt(Math.random());
      x = Math.round(x * radius / XtoY) * Math.sign(Math.random() - 0.5);
      
      let y = 1 - Math.sqrt(Math.random());
      y = Math.round(y * radius) * Math.sign(Math.random() - 0.5);
      
      const key = `${x},${y}`;
      
      if (!this.gridOccupancy[key]) {
        this.gridOccupancy[key] = true;
        
        // Sometimes add some randomness to the selection
        if (Math.random() < 0.5) {
          attempts++;
          continue;
        }
        
        // Apply hexagonal offset if enabled
        const offset = this.hexagonalOffset && y % 2 === 0 ? 0.25 : 
                      this.hexagonalOffset && y % 2 !== 0 ? -0.25 : 0;
        
        return [x + offset, y];
      }
      
      attempts++;
    }
    
    // Fallback to spiral if random fails
    return this.getNextEmptyPosition();
  }

  // Optional: Custom transition settings for grid layout
  override getTransitionOptions(): LayoutTransitionOptions {
    return {
      duration: 1100, // milliseconds
      easing: 'easeOut',
      staggerDelay: 50 // Small delay between each photo for wave effect
    };
  }

  // Utility methods for external access
  getOccupiedPositions(): string[] {
    return Object.keys(this.gridOccupancy);
  }

  isPositionOccupied(x: number, y: number): boolean {
    return this.gridOccupancy[`${x},${y}`] ?? false;
  }

  clearPosition(x: number, y: number): void {
    delete this.gridOccupancy[`${x},${y}`];
  }

  // Override removePhoto to clean up grid occupancy
  override removePhoto(photoId: string): boolean {
    const photo = this.getPhoto(photoId);
    if (photo) {
      // If photo has grid position metadata, clear the occupancy
      const gridKey = photo.getProperty<string>('gridKey');
      if (gridKey) {
        delete this.gridOccupancy[gridKey];
      }
    }
    return super.removePhoto(photoId);
  }

  // Debug helper
  getGridState(): { 
    occupancy: { [key: string]: boolean };
    minM: number;
    totalPhotos: number;
    settings: GridLayoutOptions & { cellW: number; cellH: number };
  } {
    return {
      occupancy: { ...this.gridOccupancy },
      minM: this.minM,
      totalPhotos: this.photos.length,
      settings: {
        photoWidth: this.photoWidth,
        photoHeight: this.photoHeight,
        spacingX: this.spacingX,
        spacingY: this.spacingY,
        cellW: this.cellW,
        cellH: this.cellH,
        useRandomPositioning: this.useRandomPositioning,
        hexagonalOffset: this.hexagonalOffset,
        initialRadius: this.initialRadius
      }
    };
  }

  // Method to update layout settings at runtime
  updateSettings(newOptions: Partial<GridLayoutOptions>): void {
    if (newOptions.photoWidth !== undefined) this.photoWidth = newOptions.photoWidth;
    if (newOptions.photoHeight !== undefined) this.photoHeight = newOptions.photoHeight;
    if (newOptions.spacingX !== undefined) this.spacingX = newOptions.spacingX;
    if (newOptions.spacingY !== undefined) this.spacingY = newOptions.spacingY;
    if (newOptions.useRandomPositioning !== undefined) this.useRandomPositioning = newOptions.useRandomPositioning;
    if (newOptions.hexagonalOffset !== undefined) this.hexagonalOffset = newOptions.hexagonalOffset;
    if (newOptions.initialRadius !== undefined) this.initialRadius = newOptions.initialRadius;
    
    // Recalculate cell dimensions
    this.cellW = this.photoWidth + this.spacingX;
    this.cellH = this.photoHeight + this.spacingY;
  }
}