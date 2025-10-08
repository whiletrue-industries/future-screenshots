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
      console.log('🔄 Loading SVG background from:', this.options.svgPath);
      const response = await fetch(this.options.svgPath);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const svgText = await response.text();
      console.log('📄 SVG text loaded, length:', svgText.length);
      
      // Parse SVG text into DOM element
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      this.svgElement = svgDoc.documentElement as unknown as SVGSVGElement;
      
      console.log('✅ SVG background loaded successfully:', this.svgElement);
      console.log('📏 SVG viewBox:', this.svgElement.getAttribute('viewBox'));
      console.log('📐 SVG dimensions:', this.svgElement.getAttribute('width'), 'x', this.svgElement.getAttribute('height'));
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
    if (savedSvgPosition && savedSvgPosition.metadata?.['layoutType'] === 'proportional-circular') {
      console.log(`✅ Restoring saved proportional SVG position for photo ${photoData.id}:`, savedSvgPosition);
      // Store the restored position in current strategy
      this.photoPositions.set(photoData.id, savedSvgPosition);
      return savedSvgPosition;
    }
    
    // Generate position based on layout mode
    const position = this.options.useProportionalLayout
      ? this.generateProportionalCircularPosition(photoData, existingPhotos)
      : this.generateRandomCircularPosition();
    
    const positionType = this.options.useProportionalLayout ? 'proportional' : 'random';
    console.log(`🎯 Generated new ${positionType} circular position for photo ${photoData.id}:`, position);
    
    // Store the position both in strategy and photo properties
    this.photoPositions.set(photoData.id, position);
    photoData.setProperty('svgLayoutPosition', position);
    console.log(`💾 Saved new ${positionType} position to photo properties for ${photoData.id}`);
    
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