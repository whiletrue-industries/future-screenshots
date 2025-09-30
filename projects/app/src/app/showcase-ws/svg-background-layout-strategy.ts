import { LayoutStrategy, LayoutConfiguration, LayoutPosition, InteractiveLayoutStrategy } from './layout-strategy.interface';
import { PhotoData, Position3D } from './photo-data';

export interface SvgHotspot {
  id: string;
  bounds: { x: number; y: number; width: number; height: number };
  parentGroupId: string;
  element: SVGElement;
}

export interface SvgDropZone {
  id: string;
  bounds: { x: number; y: number; width: number; height: number };
  hotspot: SvgHotspot;
  acceptsPhoto: (photo: PhotoData) => boolean;
  onPhotoDrop: (photo: PhotoData) => Promise<void>;
}

export interface SvgLayoutOptions {
  svgPath?: string;
  centerX?: number;
  centerY?: number;
  circleRadius?: number;
  radiusVariation?: number;
  onHotspotDrop?: (photoId: string, hotspotGroupId: string) => Promise<void>;
}

export class SvgBackgroundLayoutStrategy extends LayoutStrategy implements InteractiveLayoutStrategy {
  private svgElement: SVGSVGElement | null = null;
  private hotspots: SvgHotspot[] = [];
  private photoPositions = new Map<string, LayoutPosition>();
  private draggedPhoto: PhotoData | null = null;
  private isDragging = false;

  // Configuration
  private options: Required<SvgLayoutOptions> = {
    svgPath: '/showcase-bg.svg',
    centerX: 0,
    centerY: 0,
    circleRadius: 20000,
    radiusVariation: 2000,
    onHotspotDrop: async () => {}
  };

  constructor(options?: SvgLayoutOptions) {
    super();
    if (options) {
      this.options = { ...this.options, ...options };
    }
  }

  getConfiguration(): LayoutConfiguration {
    return {
      name: 'svg-background',
      displayName: 'SVG Background',
      description: 'Interactive layout with SVG background and hotspot-based positioning',
      supportsInteraction: true,
      requiresWebService: false,
      settings: {
        svgPath: this.options.svgPath,
        centerX: this.options.centerX,
        centerY: this.options.centerY,
        circleRadius: this.options.circleRadius,
        radiusVariation: this.options.radiusVariation
      }
    };
  }

  override async initialize(options?: SvgLayoutOptions): Promise<void> {
    await super.initialize(options);
    
    if (options) {
      this.options = { ...this.options, ...options };
    }

    // Load and parse the SVG background
    await this.loadSvgBackground();
    
    // Extract hotspots from the SVG
    this.extractHotspots();
  }

  override async dispose(): Promise<void> {
    await super.dispose();
    this.svgElement = null;
    this.hotspots = [];
    this.photoPositions.clear();
    this.draggedPhoto = null;
    this.isDragging = false;
  }

  private async loadSvgBackground(): Promise<void> {
    try {
      const response = await fetch(this.options.svgPath);
      const svgText = await response.text();
      
      // Parse SVG text into DOM element
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      this.svgElement = svgDoc.documentElement as unknown as SVGSVGElement;
      
      console.log('SVG background loaded successfully');
    } catch (error) {
      console.error('Failed to load SVG background:', error);
      throw new Error(`Failed to load SVG background from ${this.options.svgPath}`);
    }
  }

  private extractHotspots(): void {
    if (!this.svgElement) {
      console.warn('SVG element not loaded, cannot extract hotspots');
      return;
    }

    this.hotspots = [];
    
    // Find all elements with IDs starting with "hit"
    const hitElements = this.svgElement.querySelectorAll('[id^="hit"]');
    
    console.log(`Found ${hitElements.length} hotspot elements`);
    
    hitElements.forEach((element) => {
      const hitElement = element as SVGElement;
      const elementId = hitElement.id;
      
      // Find the parent 'g' element
      let parentGroup = hitElement.parentElement;
      while (parentGroup && parentGroup.tagName.toLowerCase() !== 'g') {
        parentGroup = parentGroup.parentElement;
      }
      
      if (parentGroup && parentGroup.id) {
        // Calculate bounding box for collision detection
        const bbox = (hitElement as SVGGraphicsElement).getBBox();
        
        const hotspot: SvgHotspot = {
          id: elementId,
          bounds: {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height
          },
          parentGroupId: parentGroup.id,
          element: hitElement
        };
        
        this.hotspots.push(hotspot);
        console.log(`Extracted hotspot: ${elementId} (parent: ${parentGroup.id})`);
      } else {
        console.warn(`Hotspot element ${elementId} has no parent group with ID`);
      }
    });
  }

  async getPositionForPhoto(photoData: PhotoData, existingPhotos: PhotoData[]): Promise<LayoutPosition | null> {
    this.validateInitialized();
    
    console.log(`🔍 Getting position for photo ${photoData.id}`);
    
    // Check if this photo already has a stored position in current strategy
    const existingPosition = this.photoPositions.get(photoData.id);
    if (existingPosition) {
      console.log(`📍 Found existing position in strategy for photo ${photoData.id}:`, existingPosition);
      return existingPosition;
    }
    
    // Check if photo has a saved SVG layout position from previous session
    const savedSvgPosition = photoData.getProperty<LayoutPosition>('svgLayoutPosition');
    console.log(`💾 Checking saved SVG position for photo ${photoData.id}:`, savedSvgPosition);
    if (savedSvgPosition) {
      console.log(`✅ Restoring saved SVG position for photo ${photoData.id}:`, savedSvgPosition);
      // Store the restored position in current strategy
      this.photoPositions.set(photoData.id, savedSvgPosition);
      return savedSvgPosition;
    }
    
    // Generate random circular position
    const position = this.generateRandomCircularPosition();
    console.log(`🎲 Generated new circular position for photo ${photoData.id}:`, position);
    
    // Store the position both in strategy and photo properties
    this.photoPositions.set(photoData.id, position);
    photoData.setProperty('svgLayoutPosition', position);
    console.log(`💾 Saved new position to photo properties for ${photoData.id}`);
    
    return position;
  }

  async calculateAllPositions(photos: PhotoData[]): Promise<(LayoutPosition | null)[]> {
    this.validateInitialized();
    
    const positions: (LayoutPosition | null)[] = [];
    
    for (const photo of photos) {
      const position = await this.getPositionForPhoto(photo, photos);
      positions.push(position);
    }
    
    return positions;
  }

  private generateRandomCircularPosition(): LayoutPosition {
    // Random angle in radians
    const angle = Math.random() * 2 * Math.PI;
    
    // Random radius with variation
    const radiusVariation = (Math.random() - 0.5) * 2 * this.options.radiusVariation;
    const radius = this.options.circleRadius + radiusVariation;
    
    // Calculate position
    const x = this.options.centerX + Math.cos(angle) * radius;
    const y = this.options.centerY + Math.sin(angle) * radius;
    
    return {
      x,
      y,
      metadata: {
        angle,
        radius,
        layoutType: 'circular'
      }
    };
  }

  // InteractiveLayoutStrategy implementation
  getDropZones(): SvgDropZone[] {
    return this.hotspots.map(hotspot => ({
      id: hotspot.id,
      bounds: hotspot.bounds,
      hotspot,
      acceptsPhoto: () => true, // Accept all photos for now
      onPhotoDrop: async (photo: PhotoData) => {
        await this.handlePhotoDrop(photo, hotspot);
      }
    }));
  }

  private async handlePhotoDrop(photo: PhotoData, hotspot: SvgHotspot): Promise<void> {
    console.log(`Photo ${photo.id} dropped on hotspot ${hotspot.id} (parent: ${hotspot.parentGroupId})`);
    
    // Update the photo's position to the hotspot center
    const newPosition: LayoutPosition = {
      x: hotspot.bounds.x + hotspot.bounds.width / 2,
      y: hotspot.bounds.y + hotspot.bounds.height / 2,
      metadata: {
        hotspotId: hotspot.id,
        parentGroupId: hotspot.parentGroupId,
        layoutType: 'hotspot'
      }
    };
    
    // Store position both in strategy and photo properties for persistence
    this.photoPositions.set(photo.id, newPosition);
    photo.setProperty('svgLayoutPosition', newPosition);
    console.log(`🎯 Saved hotspot drop position for photo ${photo.id}:`, newPosition);
    
    // Call the callback if provided
    if (this.options.onHotspotDrop) {
      await this.options.onHotspotDrop(photo.id, hotspot.parentGroupId);
    }
  }

  // Drag and drop event handlers
  override onPhotoDragStart?(photo: PhotoData, startPosition: Position3D): boolean {
    this.draggedPhoto = photo;
    this.isDragging = true;
    console.log(`Started dragging photo ${photo.id}`);
    return true; // Allow drag
  }

  override onPhotoDragMove?(photo: PhotoData, currentPosition: Position3D): void {
    if (!this.isDragging || this.draggedPhoto?.id !== photo.id) {
      return;
    }
    
    // Update photo position during drag
    const layoutPosition: LayoutPosition = {
      x: currentPosition.x,
      y: currentPosition.y,
      metadata: {
        layoutType: 'dragging'
      }
    };
    
    // Store position both in strategy and photo properties for persistence
    this.photoPositions.set(photo.id, layoutPosition);
    photo.setProperty('svgLayoutPosition', layoutPosition);
    console.log(`🎯 Saved drag position for photo ${photo.id}:`, layoutPosition);
  }

  override async onPhotoDragEnd?(photo: PhotoData, endPosition: Position3D): Promise<boolean> {
    if (!this.isDragging || this.draggedPhoto?.id !== photo.id) {
      return false;
    }
    
    this.isDragging = false;
    this.draggedPhoto = null;
    
    // Check if dropped on a hotspot
    const hotspot = this.findHotspotAtPosition(endPosition.x, endPosition.y);
    
    if (hotspot) {
      // Handle hotspot drop
      await this.handlePhotoDrop(photo, hotspot);
      console.log(`Photo ${photo.id} dropped on hotspot ${hotspot.id}`);
      return true; // Drop was handled
    } else {
      // Update position to final drag position
      const finalPosition: LayoutPosition = {
        x: endPosition.x,
        y: endPosition.y,
        metadata: {
          layoutType: 'free'
        }
      };
      
      // Store position both in strategy and photo properties for persistence
      this.photoPositions.set(photo.id, finalPosition);
      photo.setProperty('svgLayoutPosition', finalPosition);
      console.log(`💾 Saved final drop position for photo ${photo.id}:`, finalPosition);
      console.log(`Photo ${photo.id} dropped at free position (${endPosition.x}, ${endPosition.y})`);
      return true; // Drop was handled
    }
  }

  private findHotspotAtPosition(x: number, y: number): SvgHotspot | null {
    for (const hotspot of this.hotspots) {
      const bounds = hotspot.bounds;
      if (x >= bounds.x && x <= bounds.x + bounds.width &&
          y >= bounds.y && y <= bounds.y + bounds.height) {
        return hotspot;
      }
    }
    return null;
  }

  // Utility methods
  getSvgElement(): SVGSVGElement | null {
    return this.svgElement;
  }

  getHotspots(): SvgHotspot[] {
    return [...this.hotspots];
  }

  getPhotoPosition(photoId: string): LayoutPosition | null {
    return this.photoPositions.get(photoId) || null;
  }

  setPhotoPosition(photoId: string, position: LayoutPosition): void {
    this.photoPositions.set(photoId, position);
  }
}