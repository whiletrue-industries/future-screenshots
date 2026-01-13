import { LayoutStrategy, LayoutConfiguration, LayoutPosition, InteractiveLayoutStrategy } from './layout-strategy.interface';
import { PhotoData, Position3D } from './photo-data';

export interface SvgHotspot {
  id: string;
  bounds: { x: number; y: number; width: number; height: number };
  parentGroupId: string;
  transitionBarPosition: string; // 'before', 'during', or 'after'
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
  private hotspotPhotoCount = new Map<string, number>(); // Track how many photos are in each hotspot
  private photoHotspotMap = new Map<string, SvgHotspot>(); // Track which hotspot each photo is matched to
  private debugOverlay: SVGSVGElement | HTMLDivElement | null = null; // Debug visualization overlay
  private photoSizes = new Map<string, { width: number; height: number }>(); // Track photo dimensions
  private readonly MAX_OVERLAP_PERCENT = 10; // Maximum 10% overlap allowed
  private readonly PHOTO_WIDTH = 120; // Default photo width in pixels
  private readonly PHOTO_HEIGHT = 120; // Default photo height in pixels

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
    this.hotspotPhotoCount.clear();
    this.photoHotspotMap.clear();
    this.photoSizes.clear();
    this.removeDebugOverlay();
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
    
    // Temporarily attach SVG to DOM so getBBox() works correctly
    // (getBBox returns 0x0 for detached elements)
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.visibility = 'hidden';
    tempContainer.style.pointerEvents = 'none';
    tempContainer.appendChild(this.svgElement);
    document.body.appendChild(tempContainer);
    
    try {
      // Find all groups with IDs starting with 's-' (metadata groups)
      const metadataGroups = this.svgElement.querySelectorAll('[id^="s-"]');
      
      metadataGroups.forEach((metadataGroup) => {
        const groupElement = metadataGroup as SVGElement;
        const groupId = groupElement.id;
        
        // Parse metadata from this group ID
        const groupMetadata = this.parseGroupIdMetadata(groupId);
        if (!groupMetadata) {
          return;
        }
        
        // Find the child element with ID starting with 'hit'
        const hitElement = groupElement.querySelector('[id^="hit"]') as SVGElement;
        if (!hitElement) {
          console.warn(`No hit element found in group ${groupId}`);
          return;
        }
        
        // Find path element that starts with the transition_bar_position (e.g., 'before', 'during', 'after')
        // The ID might be 'before_2' or just 'before', so we use startsWith
        const pathElement = Array.from(hitElement.querySelectorAll('path'))
          .find(p => p.id.startsWith(groupMetadata.transition_bar_position)) as SVGGraphicsElement;
        
        if (!pathElement) {
          console.warn(`No path element found starting with '${groupMetadata.transition_bar_position}' in hit element of group ${groupId}`);
          return;
        }
        
        // Calculate bounding box for the specific path element
        const bbox = pathElement.getBBox();
        
        // CRITICAL: Log bbox at creation time to catch zero-size issues early
        if (bbox.width === 0 || bbox.height === 0) {
          console.error(`[SVG-HOTSPOT] ZERO-SIZE bbox at initialization for ${groupId}:`, {
            elementId: pathElement.id,
            elementTag: pathElement.tagName,
            bbox: { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height },
            inDOM: document.contains(pathElement),
            parentId: pathElement.parentElement?.id,
            svg: this.svgElement ? 'exists' : 'null'
          });
        }
        
        const hotspot: SvgHotspot = {
          id: hitElement.id,
          bounds: {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height
          },
          parentGroupId: groupId,
          transitionBarPosition: groupMetadata.transition_bar_position,
          element: pathElement
        };
        
        console.log(`[SVG-HOTSPOT] ${groupId} -> bounds: (${bbox.x.toFixed(1)}, ${bbox.y.toFixed(1)}, ${bbox.width.toFixed(1)}x${bbox.height.toFixed(1)})`);
        
        this.hotspots.push(hotspot);
      });
    } finally {
      // Remove temporary container
      document.body.removeChild(tempContainer);
    }
  }

  async getPositionForPhoto(photoData: PhotoData, existingPhotos: PhotoData[], enableAutoPositioning: boolean = false): Promise<LayoutPosition | null> {
    this.validateInitialized();
    
    // Track photo dimensions if available
    const photoWidth = photoData.metadata['width'] as number | undefined || this.PHOTO_WIDTH;
    const photoHeight = photoData.metadata['height'] as number | undefined || this.PHOTO_HEIGHT;
    this.photoSizes.set(photoData.id, { width: photoWidth, height: photoHeight });
    
    // Check if this photo already has a stored position in current strategy
    const existingPosition = this.photoPositions.get(photoData.id);
    if (existingPosition) {
      return existingPosition;
    }
    
    // Priority 1: Check for saved manual layout coordinates (layout_x, layout_y) - user overrides auto positioning
    const layout_x = photoData.metadata['layout_x'];
    const layout_y = photoData.metadata['layout_y'];
    
    if (typeof layout_x === 'number' && typeof layout_y === 'number') {
      // Convert normalized coordinates [-1,1] back to world coordinates using currentRadius
      const x = layout_x * this.options.circleRadius;
      const y = layout_y * this.options.circleRadius;
      
      const restoredPosition: LayoutPosition = {
        x,
        y,
        metadata: {
          layoutType: 'restored-normalized',
          layout_x,
          layout_y,
          circleRadius: this.options.circleRadius
        }
      };
      
      // Store the restored position in current strategy and save it
      this.photoPositions.set(photoData.id, restoredPosition);
      photoData.setProperty('svgLayoutPosition', restoredPosition);
      
      return restoredPosition;
    }
    
    // Priority 2: If auto-positioning is enabled, try to get position from metadata-hotspot matching
    if (enableAutoPositioning) {
      const autoPosition = this.getAutoPositionFromMetadata(photoData);
      if (autoPosition) {
        const x = autoPosition.auto_x * this.options.circleRadius;
        const y = autoPosition.auto_y * this.options.circleRadius;
        
        const autoPositionData: LayoutPosition = {
          x,
          y,
          metadata: {
            layoutType: 'auto-positioned',
            auto_x: autoPosition.auto_x,
            auto_y: autoPosition.auto_y,
            circleRadius: this.options.circleRadius
          }
        };
        
        this.photoPositions.set(photoData.id, autoPositionData);
        photoData.setProperty('svgLayoutPosition', autoPositionData);
        return autoPositionData;
      }
    }
    
    // Priority 3: Check if photo has a saved SVG layout position from previous session
    const savedSvgPosition = photoData.getProperty<LayoutPosition>('svgLayoutPosition');

    if (savedSvgPosition && savedSvgPosition.metadata?.['layoutType'] === 'proportional-circular') {

      // Store the restored position in current strategy
      this.photoPositions.set(photoData.id, savedSvgPosition);
      return savedSvgPosition;
    }
    
    // Fallback: Generate position based on layout mode
    const position = this.options.useProportionalLayout
      ? this.generateProportionalCircularPosition(photoData, existingPhotos)
      : this.generateRandomCircularPosition();
    
    const positionType = this.options.useProportionalLayout ? 'proportional' : 'random';

    
    // Store the position both in strategy and photo properties
    this.photoPositions.set(photoData.id, position);
    photoData.setProperty('svgLayoutPosition', position);

    
    return position;
  }

  async calculateAllPositions(photos: PhotoData[], enableAutoPositioning: boolean = false): Promise<(LayoutPosition | null)[]> {
    this.validateInitialized();
    
    // Reset hotspot photo count for fresh distribution
    this.hotspotPhotoCount.clear();
    
    // Clear existing positions EXCEPT for dragged/free positions that should be preserved
    const preservedPositions = new Map<string, LayoutPosition>();
    for (const [photoId, position] of this.photoPositions.entries()) {
      // Preserve positions that were explicitly dragged by the user
      if (position.metadata?.['layoutType'] === 'free-dragged' || position.metadata?.['layoutType'] === 'dragging') {
        preservedPositions.set(photoId, position);
      }
    }
    
    // Clear all positions, then restore the preserved ones
    this.photoPositions.clear();
    for (const [photoId, position] of preservedPositions.entries()) {
      this.photoPositions.set(photoId, position);
    }
    
    const positions: (LayoutPosition | null)[] = [];
    
    for (const photo of photos) {
      const position = await this.getPositionForPhoto(photo, photos, enableAutoPositioning);
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
    
    // Calculate normalized coordinates during drag for consistent tracking
    const layout_x = Math.max(-1, Math.min(1, currentPosition.x / this.options.circleRadius));
    const layout_y = Math.max(-1, Math.min(1, currentPosition.y / this.options.circleRadius));
    
    // Update photo position during drag
    const layoutPosition: LayoutPosition = {
      x: currentPosition.x,
      y: currentPosition.y,
      metadata: {
        layoutType: 'dragging',
        layout_x,
        layout_y,
        circleRadius: this.options.circleRadius
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
    
    // Calculate normalized coordinates for the new drag position
    const layout_x = Math.max(-1, Math.min(1, endPosition.x / this.options.circleRadius));
    const layout_y = Math.max(-1, Math.min(1, endPosition.y / this.options.circleRadius));
    
    // Update position to final drag position (three-renderer will handle hotspot collision)
    const finalPosition: LayoutPosition = {
      x: endPosition.x,
      y: endPosition.y,
      metadata: {
        layoutType: 'free-dragged',
        layout_x,
        layout_y,
        circleRadius: this.options.circleRadius
      }
    };
    
    // Store position both in strategy and photo properties for persistence
    this.photoPositions.set(photo.id, finalPosition);
    photo.setProperty('svgLayoutPosition', finalPosition);
    
    // Update the photo metadata with new normalized coordinates
    // This ensures the drag position is maintained across layout changes
    photo.updateMetadata({
      layout_x,
      layout_y
    });

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

  /**
   * Calculate auto position for a photo based on its metadata matching SVG hotspot regions
   * Returns null if no matching hotspot or if metadata is incomplete
   */
  getAutoPositionFromMetadata(photoData: PhotoData): { auto_x: number; auto_y: number } | null {
    const metadata = photoData.metadata;
    const plausibility = metadata['plausibility'];
    const favorableFuture = metadata['favorable_future'];
    const transitionBarPosition = metadata['transition_bar_position'];
    
    // Return null if metadata is missing
    if (plausibility === undefined || !favorableFuture || !transitionBarPosition) {
      console.log(`[AUTO-POS] Photo ${photoData.id}: missing metadata - plausibility=${plausibility}, favorable_future=${favorableFuture}, transition_bar_position=${transitionBarPosition}`);
      return null;
    }
    
    console.log(`[AUTO-POS] Matching photo ${photoData.id}: plausibility=${plausibility}, favorable_future=${favorableFuture}, transition_bar_position=${transitionBarPosition}`);
    
    // Find matching hotspot by comparing metadata from parent group ID
    for (const hotspot of this.hotspots) {
      // Parse metadata from parent group ID (format: s-favorable_future=X,plausibility=Y,...)
      const parentGroupId = hotspot.parentGroupId;
      if (!parentGroupId.startsWith('s-')) {
        continue;
      }
      
      // Extract metadata from group ID
      const groupMetadata = this.parseGroupIdMetadata(parentGroupId);
      if (!groupMetadata) {
        continue;
      }
      
      // Check if this hotspot matches the photo's metadata (all three fields must match)
      if (groupMetadata.plausibility === plausibility && 
          groupMetadata.favorable_future === favorableFuture &&
          groupMetadata.transition_bar_position === transitionBarPosition) {
        
        console.log(`[AUTO-POS] MATCH FOUND for photo ${photoData.id} in hotspot ${parentGroupId}`);
        
        // Store the hotspot association BEFORE calculating position
        // This ensures overlap detection can see all previously placed photos in this hotspot
        this.photoHotspotMap.set(photoData.id, hotspot);
        
        // Get how many photos are already in this hotspot
        const photoIndex = this.hotspotPhotoCount.get(parentGroupId) || 0;
        this.hotspotPhotoCount.set(parentGroupId, photoIndex + 1);
        
        // Calculate distributed position within hotspot bounds
        // (now with access to complete photoHotspotMap)
        const position = this.distributePhotoInHotspot(hotspot, photoIndex);
        
        return position;
      }
    }
    
    console.log(`[AUTO-POS] NO MATCH for photo ${photoData.id} - no hotspot found with plausibility=${plausibility}, favorable_future=${favorableFuture}, transition_bar_position=${transitionBarPosition}`);
    return null;
  }

  /**
   * Distribute a photo within a hotspot's bounds at equal spacing
   * Note: This uses a first-come, first-served distribution where each photo gets a sequential position
   * Positions are validated to ensure they overlap with the actual path geometry, not just the bounding box
   */
  private distributePhotoInHotspot(hotspot: SvgHotspot, photoIndex: number): { auto_x: number; auto_y: number } {
    // Get SVG viewBox to understand coordinate system
    const viewBox = this.getSvgViewBox();
    if (!viewBox) {
      console.warn('No SVG viewBox found, using default distribution');
      return { auto_x: 0, auto_y: 0 };
    }
    
    // Generate candidate positions in a grid pattern
    const padding = Math.min(hotspot.bounds.width, hotspot.bounds.height) * 0.05; // Smaller padding (5%)
    const usableWidth = hotspot.bounds.width - (2 * padding);
    const usableHeight = hotspot.bounds.height - (2 * padding);
    
    console.log(`[DIST-DEBUG] Hotspot ${hotspot.parentGroupId}: bounds=(${hotspot.bounds.x.toFixed(1)},${hotspot.bounds.y.toFixed(1)}) size=(${hotspot.bounds.width.toFixed(1)}x${hotspot.bounds.height.toFixed(1)}), padding=${padding.toFixed(1)}, usable=(${usableWidth.toFixed(1)}x${usableHeight.toFixed(1)})`);
    
    // Try to find a position that overlaps with the path
    // We'll generate positions in a spiral pattern and test each one
    const candidates: { svgX: number; svgY: number; distance: number }[] = [];
    
    // Sample points within the bounding box
    const samplesPerRow = 8; // More samples for better coverage
    const samplesPerCol = 8;
    
    for (let row = 0; row < samplesPerCol; row++) {
      for (let col = 0; col < samplesPerRow; col++) {
        const xRatio = (col + 0.5) / samplesPerRow;
        const yRatio = (row + 0.5) / samplesPerCol;
        
        const svgX = hotspot.bounds.x + padding + usableWidth * xRatio;
        const svgY = hotspot.bounds.y + padding + usableHeight * yRatio;
        
        // Check if this point is inside the path (use pre-calculated bounds to avoid DOM issues)
        const isInPath = this.isPointInPathWithBounds(hotspot.bounds, svgX, svgY);
        if (row === 0 && col === 0) {
          console.log(`[DIST-DEBUG] Testing sample (0,0): svg=(${svgX.toFixed(1)},${svgY.toFixed(1)}), isInPath=${isInPath}`);
        }
        
        if (isInPath) {
          // Calculate distance from center (prefer central positions)
          const centerX = hotspot.bounds.x + hotspot.bounds.width / 2;
          const centerY = hotspot.bounds.y + hotspot.bounds.height / 2;
          const distance = Math.sqrt(Math.pow(svgX - centerX, 2) + Math.pow(svgY - centerY, 2));
          
          candidates.push({ svgX, svgY, distance });
        }
      }
    }
    
    console.log(`[DIST-DEBUG] Generated ${candidates.length} valid candidates out of ${samplesPerRow * samplesPerCol} samples for hotspot ${hotspot.parentGroupId}`);
    
    if (candidates.length === 0) {
      console.warn(`[AUTO-POS] No valid positions found in path for ${hotspot.parentGroupId}, using center`);
      // Fallback to center of bounding box
      const svgX = hotspot.bounds.x + hotspot.bounds.width / 2;
      const svgY = hotspot.bounds.y + hotspot.bounds.height / 2;
      const normalizedX = (svgX - viewBox.width / 2) / (viewBox.width / 2);
      const normalizedY = (svgY - viewBox.height / 2) / (viewBox.height / 2);
      console.log(`[DIST-DEBUG] Fallback to center: normalized=(${normalizedX.toFixed(3)}, ${normalizedY.toFixed(3)})`);
      return { auto_x: normalizedX, auto_y: normalizedY };
    }
    
    // Sort candidates by distance from center (prefer central positions)
    candidates.sort((a, b) => a.distance - b.distance);
    console.log(`[DIST-DEBUG] Sorted candidates. First 3 candidates for ${hotspot.parentGroupId}:`);
    for (let i = 0; i < Math.min(3, candidates.length); i++) {
      console.log(`  [${i}] svg=(${candidates[i].svgX.toFixed(1)},${candidates[i].svgY.toFixed(1)}) dist=${candidates[i].distance.toFixed(1)}`);
    }
    
    // Find best position that minimizes overlap
    let selectedCandidate = candidates[photoIndex % candidates.length];
    let minOverlap = 100;
    console.log(`[DIST-DEBUG] Starting evaluation loop for photo index ${photoIndex} (will check up to ${Math.min(candidates.length, 10)} candidates)`);
    
    // Only evaluate first 10 candidates to avoid performance issues
    const evalCandidates = candidates.slice(0, Math.min(candidates.length, 10));
    
    for (let i = 0; i < evalCandidates.length; i++) {
      const candidate = evalCandidates[i];
      const normalizedX = (candidate.svgX - viewBox.width / 2) / (viewBox.width / 2);
      const normalizedY = (candidate.svgY - viewBox.height / 2) / (viewBox.height / 2);
      
      const overlapPercent = this.calculateOverlapWithExistingPhotos(
        normalizedX,
        normalizedY,
        hotspot
      );
      
      if (i < 3) {
        console.log(`[DIST-DEBUG] Candidate ${i}: normalized=(${normalizedX.toFixed(3)},${normalizedY.toFixed(3)}), overlap=${overlapPercent.toFixed(1)}%`);
      }
      
      if (overlapPercent < minOverlap) {
        minOverlap = overlapPercent;
        selectedCandidate = candidate;
        console.log(`[DIST-DEBUG] New best candidate ${i}: overlap=${overlapPercent.toFixed(1)}%`);
        
        // If we find a position with acceptable overlap, use it
        if (overlapPercent <= this.MAX_OVERLAP_PERCENT) {
          console.log(`[DIST-DEBUG] Found acceptable position at candidate ${i} with ${overlapPercent.toFixed(1)}% overlap`);
          break;
        }
      }
    }
    
    // Transform SVG coordinates to normalized [-1, 1] space
    const normalizedX = (selectedCandidate.svgX - viewBox.width / 2) / (viewBox.width / 2);
    const normalizedY = (selectedCandidate.svgY - viewBox.height / 2) / (viewBox.height / 2);
    
    console.log(`[AUTO-POS] Photo index=${photoIndex} in hotspot ${hotspot.parentGroupId}: FINAL position svg=(${selectedCandidate.svgX.toFixed(1)},${selectedCandidate.svgY.toFixed(1)}), normalized=(${normalizedX.toFixed(3)},${normalizedY.toFixed(3)}), minOverlap=${minOverlap.toFixed(1)}%`);
    
    return { auto_x: normalizedX, auto_y: normalizedY };
  }
  
  /**
   * Check if a point is inside an SVG path's bounding box
   * Uses bounding box for efficiency since we're distributing multiple photos
   * and the padding already handles boundary issues
   */
  private isPointInPath(pathElement: SVGElement, x: number, y: number): boolean {
    if (!pathElement) {
      console.log('[PATH-CHECK] No path element provided');
      return false;
    }
    
    try {
      // CRITICAL: Check if element is still in DOM
      const isConnected = document.contains(pathElement);
      
      // Get the bounding box of the path element
      const bbox = (pathElement as SVGGraphicsElement).getBBox();
      
      // CRITICAL: Validate bbox is not zero (indicates element issues)
      if (bbox.width === 0 || bbox.height === 0) {
        console.warn(`[PATH-CHECK] ZERO-SIZE bbox detected:`, {
          elementId: pathElement.id,
          elementTag: pathElement.tagName,
          bbox: { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height },
          inDOM: isConnected,
          parentId: pathElement.parentElement?.id
        });
        return false;
      }
      
      // Simple bounding box check: is the point within the bounds?
      const isInside = x >= bbox.x && x <= (bbox.x + bbox.width) &&
                       y >= bbox.y && y <= (bbox.y + bbox.height);
      
      if (!isInside && x < 450 && y < 300) {
        // Log first few failures to debug
        console.log(`[PATH-CHECK] Point (${x.toFixed(1)},${y.toFixed(1)}) OUTSIDE bbox (${bbox.x.toFixed(1)},${bbox.y.toFixed(1)},${bbox.width.toFixed(1)}x${bbox.height.toFixed(1)})`);
      }
      
      return isInside;
    } catch (e) {
      console.error('[PATH-CHECK] Error checking point in path:', e);
      // If anything fails, return false to be safe
      return false;
    }
  }

  /**
   * Check if a point is inside a hotspot using pre-calculated bounds.
   * This avoids DOM access issues since elements may be detached after initialization.
   */
  private isPointInPathWithBounds(bounds: { x: number; y: number; width: number; height: number }, x: number, y: number): boolean {
    try {
      // Validate bounds
      if (!bounds || bounds.width === 0 || bounds.height === 0) {
        console.warn(`[PATH-CHECK] Invalid bounds:`, bounds);
        return false;
      }
      
      // Simple bounding box check: is the point within the bounds?
      const isInside = x >= bounds.x && x <= (bounds.x + bounds.width) &&
                       y >= bounds.y && y <= (bounds.y + bounds.height);
      
      return isInside;
    } catch (e) {
      console.error('[PATH-CHECK] Error checking point with bounds:', e);
      return false;
    }
  }

  /**
   * Calculate overlap percentage between a candidate position and existing photos in the hotspot
   * Returns percentage of overlap (0-100%)
   */
  private calculateOverlapWithExistingPhotos(
    normalizedX: number,
    normalizedY: number,
    hotspot: SvgHotspot
  ): number {
    const existingPhotosInHotspot: Array<{ x: number; y: number; width: number; height: number }> = [];
    
    // Collect all photos already in this hotspot
    for (const [photoId, position] of this.photoPositions.entries()) {
      if (this.photoHotspotMap.get(photoId) === hotspot) {
        const photoSize = this.photoSizes.get(photoId) || {
          width: this.PHOTO_WIDTH,
          height: this.PHOTO_HEIGHT
        };
        
        existingPhotosInHotspot.push({
          x: position.x,
          y: position.y,
          width: photoSize.width,
          height: photoSize.height
        });
      }
    }
    
    if (existingPhotosInHotspot.length === 0) {
      console.log(`[OVERLAP-DEBUG] No existing photos in hotspot, overlap=0%`);
      return 0; // No overlap if no existing photos
    }
    
    console.log(`[OVERLAP-DEBUG] Checking ${existingPhotosInHotspot.length} existing photos in hotspot for candidate at (${normalizedX.toFixed(3)},${normalizedY.toFixed(3)})`);
    
    // Get dimensions of photo to be placed
    const newPhotoSize = {
      width: this.PHOTO_WIDTH,
      height: this.PHOTO_HEIGHT
    };
    
    // Calculate max overlap percentage with any existing photo
    let maxOverlapPercent = 0;
    
    for (let i = 0; i < existingPhotosInHotspot.length; i++) {
      const existing = existingPhotosInHotspot[i];
      const overlapPercent = this.calculateRectangleOverlapPercent(
        normalizedX * this.options.circleRadius,
        normalizedY * this.options.circleRadius,
        newPhotoSize.width,
        newPhotoSize.height,
        existing.x,
        existing.y,
        existing.width,
        existing.height
      );
      
      if (i === 0) {
        console.log(`[OVERLAP-DEBUG] Existing photo ${i}: pos=(${existing.x.toFixed(1)},${existing.y.toFixed(1)}) size=(${existing.width},${existing.height}), overlap=${overlapPercent.toFixed(1)}%`);
      }
      
      maxOverlapPercent = Math.max(maxOverlapPercent, overlapPercent);
    }
    
    console.log(`[OVERLAP-DEBUG] Max overlap for this candidate: ${maxOverlapPercent.toFixed(1)}%`);
    return maxOverlapPercent;
  }

  /**
   * Calculate overlap percentage between two rectangles
   * Returns percentage of the new rectangle that overlaps with the existing rectangle (0-100%)
   */
  private calculateRectangleOverlapPercent(
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number,
    existingX: number,
    existingY: number,
    existingWidth: number,
    existingHeight: number
  ): number {
    const newLeft = newX - newWidth / 2;
    const newRight = newX + newWidth / 2;
    const newTop = newY - newHeight / 2;
    const newBottom = newY + newHeight / 2;
    
    const existingLeft = existingX - existingWidth / 2;
    const existingRight = existingX + existingWidth / 2;
    const existingTop = existingY - existingHeight / 2;
    const existingBottom = existingY + existingHeight / 2;
    
    // Calculate intersection rectangle
    const intersectLeft = Math.max(newLeft, existingLeft);
    const intersectRight = Math.min(newRight, existingRight);
    const intersectTop = Math.max(newTop, existingTop);
    const intersectBottom = Math.min(newBottom, existingBottom);
    
    // No overlap if rectangles don't intersect
    if (intersectRight <= intersectLeft || intersectBottom <= intersectTop) {
      console.log('[RECT-MATH] No intersection: right<=left or bottom<=top');
      return 0;
    }
    
    // Calculate overlap area
    const overlapWidth = intersectRight - intersectLeft;
    const overlapHeight = intersectBottom - intersectTop;
    const overlapArea = overlapWidth * overlapHeight;
    
    // Calculate percentage relative to new photo area
    const newArea = newWidth * newHeight;
    const overlapPercent = (overlapArea / newArea) * 100;
    console.log('[RECT-MATH] New rect:', {newLeft, newTop, newRight, newBottom, newWidth, newHeight, newArea}, 
                'Existing rect:', {existingLeft, existingTop, existingRight, existingBottom, existingWidth, existingHeight},
                'Intersection:', {intersectLeft, intersectTop, intersectRight, intersectBottom, overlapWidth, overlapHeight, overlapArea},
                'Result:', overlapPercent);
    return overlapPercent;
  }

  /**
   * Parse metadata from SVG group ID
   * Format: s-favorable_future=preferred,plausibility=0,transition_bar_position=after
   */
  private parseGroupIdMetadata(groupId: string): { plausibility: number; favorable_future: string; transition_bar_position: string } | null {
    try {
      // Remove the 's-' prefix and split by comma
      const metadataString = groupId.substring(2); // Remove 's-'
      const pairs = metadataString.split(',');
      
      let plausibility: number | undefined;
      let favorable_future: string | undefined;
      let transition_bar_position: string | undefined;
      
      for (const pair of pairs) {
        const [key, value] = pair.split('=');
        if (key === 'plausibility') {
          plausibility = parseInt(value, 10);
        } else if (key === 'favorable_future') {
          favorable_future = value;
        } else if (key === 'transition_bar_position') {
          transition_bar_position = value;
        }
      }
      
      if (plausibility !== undefined && favorable_future !== undefined && transition_bar_position !== undefined) {
        return { plausibility, favorable_future, transition_bar_position };
      }
    } catch (error) {
      console.warn(`Failed to parse group ID metadata: ${groupId}`, error);
    }
    
    return null;
  }

  /**
   * Get SVG viewBox dimensions
   */
  private getSvgViewBox(): { x: number; y: number; width: number; height: number } | null {
    if (!this.svgElement) {
      return null;
    }
    
    const viewBoxAttr = this.svgElement.getAttribute('viewBox');
    if (!viewBoxAttr) {
      // Fallback to width/height attributes
      const width = parseFloat(this.svgElement.getAttribute('width') || '800');
      const height = parseFloat(this.svgElement.getAttribute('height') || '800');
      return { x: 0, y: 0, width, height };
    }
    
    const parts = viewBoxAttr.split(/\s+/);
    if (parts.length === 4) {
      return {
        x: parseFloat(parts[0]),
        y: parseFloat(parts[1]),
        width: parseFloat(parts[2]),
        height: parseFloat(parts[3])
      };
    }
    
    return null;
  }

  /**
   * Update a photo's position and normalized coordinates after a hotspot drop
   * This ensures consistency between drag positions and API-saved positions
   */
  updatePhotoAfterHotspotDrop(photoId: string, position: { x: number, y: number, z: number }, hotspotData: { [key: string]: string | number }): void {
    const photo = this.photoPositions.has(photoId) ? null : null; // We don't have direct access to PhotoData here
    
    // Calculate normalized coordinates for the hotspot drop position
    const layout_x = Math.max(-1, Math.min(1, position.x / this.options.circleRadius));
    const layout_y = Math.max(-1, Math.min(1, position.y / this.options.circleRadius));
    
    // Create position with hotspot drop metadata
    const hotspotDropPosition: LayoutPosition = {
      x: position.x,
      y: position.y,
      metadata: {
        layoutType: 'hotspot-drop',
        layout_x,
        layout_y,
        circleRadius: this.options.circleRadius,
        hotspotData
      }
    };
    
    // Update the stored position
    this.photoPositions.set(photoId, hotspotDropPosition);
  }

  /**
   * Show all hotspot boundaries for debugging (call when auto-positioning is enabled)
   */
  showAllHotspotsDebug(): void {
    console.log('[DEBUG] Showing all hotspots, count:', this.hotspots.length);
    this.removeDebugOverlay();
    this.createDebugOverlayForAllHotspots();
  }

  private createDebugOverlayForAllHotspots(): void {
    if (this.hotspots.length === 0) {
      console.warn('[DEBUG] No hotspots to display');
      return;
    }

    // Create an HTML container div to hold our debug boxes
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.id = 'svg-hotspot-debug-overlay';

    // Get the SVG element's position and size on screen
    if (!this.svgElement) {
      console.warn('[DEBUG] SVG element not found');
      return;
    }

    const svgRect = this.svgElement.getBoundingClientRect();
    const viewBox = this.getSvgViewBox();
    
    if (!viewBox) {
      console.warn('[DEBUG] Could not get SVG viewBox');
      return;
    }

    console.log('[DEBUG] SVG on screen:', { 
      top: svgRect.top, 
      left: svgRect.left, 
      width: svgRect.width, 
      height: svgRect.height,
      viewBox: viewBox
    });

    // Draw each hotspot as an HTML div (easier to position and style)
    this.hotspots.forEach((hotspot, index) => {
      // Calculate the position and size in screen coordinates
      const x = svgRect.left + (hotspot.bounds.x / viewBox.width) * svgRect.width;
      const y = svgRect.top + (hotspot.bounds.y / viewBox.height) * svgRect.height;
      const w = (hotspot.bounds.width / viewBox.width) * svgRect.width;
      const h = (hotspot.bounds.height / viewBox.height) * svgRect.height;

      // Create the rectangle div
      const rect = document.createElement('div');
      rect.style.position = 'fixed';
      rect.style.left = x + 'px';
      rect.style.top = y + 'px';
      rect.style.width = w + 'px';
      rect.style.height = h + 'px';
      rect.style.border = `2px solid hsl(${(index * 60) % 360}, 100%, 50%)`;
      rect.style.backgroundColor = `rgba(${index % 2 === 0 ? 255 : 0}, ${index % 3 === 0 ? 255 : 0}, ${index % 4 === 0 ? 255 : 0}, 0.05)`;
      rect.style.boxSizing = 'border-box';
      rect.style.pointerEvents = 'none';
      rect.style.zIndex = '9999';

      // Create the label
      const label = document.createElement('div');
      label.style.position = 'absolute';
      label.style.top = '2px';
      label.style.left = '2px';
      label.style.color = '#ffffff';
      label.style.backgroundColor = `hsl(${(index * 60) % 360}, 100%, 40%)`;
      label.style.padding = '2px 4px';
      label.style.fontSize = '10px';
      label.style.fontWeight = 'bold';
      label.style.borderRadius = '2px';
      label.textContent = hotspot.parentGroupId.substring(2); // Remove 's-' prefix
      label.style.maxWidth = '90%';
      label.style.overflow = 'hidden';
      label.style.textOverflow = 'ellipsis';
      label.style.whiteSpace = 'nowrap';

      rect.appendChild(label);
      container.appendChild(rect);
    });

    document.body.appendChild(container);
    this.debugOverlay = container;
    
    console.log(`[DEBUG] Created debug overlay with ${this.hotspots.length} hotspots at z-index 9999`);
  }

  private removeDebugOverlay(): void {
    if (this.debugOverlay && this.debugOverlay.parentNode) {
      this.debugOverlay.parentNode.removeChild(this.debugOverlay);
      this.debugOverlay = null;
    }
  }

}