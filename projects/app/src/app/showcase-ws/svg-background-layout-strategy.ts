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
  useProportionalLayout?: boolean;
  onHotspotDrop?: (photoId: string, hotspotData: { [key: string]: string | number }) => Promise<void>;
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
    radiusVariation: 4000,
    useProportionalLayout: true,
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
      description: 'Interactive layout with SVG background and proportional group-based circle slicing',
      supportsInteraction: true,
      requiresWebService: false,
      settings: {
        svgPath: this.options.svgPath,
        centerX: this.options.centerX,
        centerY: this.options.centerY,
        circleRadius: this.options.circleRadius,
        radiusVariation: this.options.radiusVariation,
        useProportionalLayout: this.options.useProportionalLayout
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
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const svgText = await response.text();

      
      // Parse SVG text into DOM element
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      this.svgElement = svgDoc.documentElement as unknown as SVGSVGElement;
      

    } catch (error) {
      console.error('❌ Failed to load SVG background:', error);
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

      } else {
        console.warn(`Hotspot element ${elementId} has no parent group with ID`);
      }
    });
  }

  async getPositionForPhoto(photoData: PhotoData, existingPhotos: PhotoData[]): Promise<LayoutPosition | null> {
    this.validateInitialized();
    

    
    // Check if this photo already has a stored position in current strategy
    const existingPosition = this.photoPositions.get(photoData.id);
    if (existingPosition) {

      return existingPosition;
    }
    
    // Check if photo has a saved SVG layout position from previous session
    const savedSvgPosition = photoData.getProperty<LayoutPosition>('svgLayoutPosition');

    if (savedSvgPosition && savedSvgPosition.metadata?.['layoutType'] === 'proportional-circular') {

      // Store the restored position in current strategy
      this.photoPositions.set(photoData.id, savedSvgPosition);
      return savedSvgPosition;
    }
    
    // Generate position based on layout mode
    const position = this.options.useProportionalLayout
      ? this.generateProportionalCircularPosition(photoData, existingPhotos)
      : this.generateRandomCircularPosition();
    
    const positionType = this.options.useProportionalLayout ? 'proportional' : 'random';

    
    // Store the position both in strategy and photo properties
    this.photoPositions.set(photoData.id, position);
    photoData.setProperty('svgLayoutPosition', position);

    
    return position;
  }

  async calculateAllPositions(photos: PhotoData[]): Promise<(LayoutPosition | null)[]> {
    this.validateInitialized();
    
    // Clear existing positions to ensure fresh calculation with proportional layout
    this.photoPositions.clear();
    
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

  private generateProportionalCircularPosition(photo: PhotoData, allPhotos: PhotoData[]): LayoutPosition {
    // Group photos by their SVG group affinity (using circle packing logic)
    const groupId = this.getPhotoGroupId(photo);
    const photoGroups = this.groupPhotosByGroupId(allPhotos);
    
    // Calculate proportional slice angles for each group
    const groupSlices = this.calculateGroupSlices(photoGroups);
    const groupSlice = groupSlices.get(groupId);
    
    if (!groupSlice) {
      // Fallback to random positioning if group not found
      return this.generateRandomCircularPosition();
    }
    
    // Find photo's position within its group
    const groupPhotos = photoGroups.get(groupId) || [];
    const photoIndex = groupPhotos.findIndex(p => p.id === photo.id);
    const totalInGroup = groupPhotos.length;
    
    // Calculate angle within the group's slice with spacing between groups
    const groupSpacing = 0.5; // 25% of full circle spacing between groups
    const effectiveSliceWidth = (groupSlice.endAngle - groupSlice.startAngle) * (1 - groupSpacing);
    const sliceCenter = (groupSlice.startAngle + groupSlice.endAngle) / 2;
    
    let angle: number;
    if (totalInGroup === 1) {
      // Single photo goes to center of slice
      angle = sliceCenter;
    } else {
      // Distribute photos within the effective slice width
      const photoSpacing = effectiveSliceWidth / totalInGroup;
      const startAngle = sliceCenter - effectiveSliceWidth / 2;
      angle = startAngle + (photoIndex + 0.5) * photoSpacing;
    }
    
    // Create packed appearance with varied radius for each photo in the group
    // Use consistent random seed based on photo ID for reproducible positioning
    const photoSeed = this.hashCode(photo.id) / 2147483647; // Normalize to [-1, 1]
    const groupRadiusVariation = this.options.radiusVariation * 0.8; // Use most of the variation for packing
    const radiusVariation = photoSeed * groupRadiusVariation;
    
    // Add slight inward/outward variation based on group size for more natural packing
    const groupPackingFactor = Math.min(totalInGroup / 10, 0.5); // More packing for larger groups
    const packingVariation = (photoIndex / totalInGroup - 0.5) * groupPackingFactor * this.options.radiusVariation * 0.3;
    
    const radius = this.options.circleRadius + radiusVariation + packingVariation;
    
    // Calculate position
    let x = this.options.centerX + Math.cos(angle) * radius;
    const y = this.options.centerY + Math.sin(angle) * radius;
    x = x * 0.5 + Math.sign(x) * radius;
    
    return {
      x,
      y,
      metadata: {
        angle,
        radius,
        groupId,
        groupSlice,
        photoIndex,
        totalInGroup,
        radiusVariation,
        packingVariation,
        layoutType: 'proportional-circular'
      }
    };
  }

  private getPhotoGroupId(photo: PhotoData): string {
    // Use the same grouping logic as circle packing layout
    // Priority 1: author_id from metadata
    const authorId = photo.metadata['author_id'];
    if (authorId) {
      return `author:${authorId}`;
    }
    
    // Priority 2: _private_email from metadata
    const email = photo.metadata['_private_email'];
    if (email) {
      return `email:${email}`;
    }
    
    // Priority 3: Generate random group ID and store it as a property
    let randomId = photo.getProperty<string>('_svg_background_group_id');
    if (!randomId) {
      randomId = Math.random().toString(36).substring(2, 15);
      photo.setProperty('_svg_background_group_id', randomId);
    }
    
    return `random:${randomId}`;
  }

  private groupPhotosByGroupId(photos: PhotoData[]): Map<string, PhotoData[]> {
    const groups = new Map<string, PhotoData[]>();
    
    for (const photo of photos) {
      const groupId = this.getPhotoGroupId(photo);
      if (!groups.has(groupId)) {
        groups.set(groupId, []);
      }
      groups.get(groupId)!.push(photo);
    }
    
    return groups;
  }

  private calculateGroupSlices(photoGroups: Map<string, PhotoData[]>): Map<string, { startAngle: number; endAngle: number; size: number }> {
    const totalPhotos = Array.from(photoGroups.values()).reduce((sum, photos) => sum + photos.length, 0);
    const groupSlices = new Map<string, { startAngle: number; endAngle: number; size: number }>();
    
    if (totalPhotos === 0) {
      return groupSlices;
    }
    
    // Sort groups by size (descending) for consistent ordering
    const sortedGroups = Array.from(photoGroups.entries())
      .sort(([groupIdA, photosA], [groupIdB, photosB]) => {
        // First by size (descending)
        if (photosB.length !== photosA.length) {
          return photosB.length - photosA.length;
        }
        // Then by group ID (ascending) for consistent ordering
        return groupIdA.localeCompare(groupIdB);
      });
    
    let currentAngle = 0;
    const fullCircle = 2 * Math.PI;
    
    for (const [groupId, photos] of sortedGroups) {
      const groupSize = photos.length;
      const proportionalAngle = (groupSize / totalPhotos) * fullCircle;
      const endAngle = currentAngle + proportionalAngle;
      
      groupSlices.set(groupId, {
        startAngle: currentAngle,
        endAngle: endAngle,
        size: groupSize
      });
      
      currentAngle = endAngle;
    }
    
    return groupSlices;
  }

  /**
   * Simple hash function to generate consistent pseudo-random values from strings
   */
  private hashCode(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  // InteractiveLayoutStrategy implementation
  getDropZones(): SvgDropZone[] {
    return this.hotspots.map(hotspot => ({
      id: hotspot.id,
      bounds: hotspot.bounds,
      hotspot,
      acceptsPhoto: () => true, // Accept all photos for now
      onPhotoDrop: async (photo: PhotoData) => {
        // Position is handled by three-renderer collision detection
      }
    }));
  }



  // Drag and drop event handlers
  override onPhotoDragStart?(photo: PhotoData, startPosition: Position3D): boolean {
    this.draggedPhoto = photo;
    this.isDragging = true;

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

  }

  override async onPhotoDragEnd?(photo: PhotoData, endPosition: Position3D): Promise<boolean> {
    if (!this.isDragging || this.draggedPhoto?.id !== photo.id) {
      return false;
    }
    
    this.isDragging = false;
    this.draggedPhoto = null;
    
    // Update position to final drag position (three-renderer will handle hotspot collision)
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

    return true; // Let three-renderer handle hotspot collision detection
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