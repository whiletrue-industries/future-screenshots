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
  private svgContainer: HTMLDivElement | null = null; // Keep reference to hidden container
  private hotspots: SvgHotspot[] = [];
  private photoPositions = new Map<string, LayoutPosition>();
  private draggedPhoto: PhotoData | null = null;
  private isDragging = false;
  private hotspotPhotoCount = new Map<string, number>();
  private photoHotspotMap = new Map<string, SvgHotspot>();
  private debugOverlay: SVGSVGElement | HTMLDivElement | null = null;
  private photoSizes = new Map<string, { width: number; height: number }>();
  private batchPositionedPhotos = new Map<string, Array<{ svgX: number; svgY: number }>>();
  private readonly MAX_OVERLAP_PERCENT = 10;
  private readonly PHOTO_WIDTH = 120;
  private readonly PHOTO_HEIGHT = 120;
  private hotspotSlots = new Map<string, Array<{ svgX: number; svgY: number }>>();
  private slotLogEnabled = ((): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      const params = new URLSearchParams(window.location.search);
      return params.get('slotlog') === '1';
    } catch {
      return false;
    }
  })();

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
    // Remove SVG container from DOM
    if (this.svgContainer && this.svgContainer.parentNode) {
      this.svgContainer.parentNode.removeChild(this.svgContainer);
    }
    this.svgContainer = null;
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
    // Skip on server-side rendering
    if (typeof fetch === 'undefined' || typeof document === 'undefined') {
      console.log('[SVG-LOAD] Skipping SVG load on server-side rendering');
      return;
    }
    
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
    // Skip on server-side rendering
    if (typeof document === 'undefined') {
      console.log('[SVG-HOTSPOT] Skipping hotspot extraction on server-side rendering');
      return;
    }
    
    if (!this.svgElement) {
      console.warn('SVG element not loaded, cannot extract hotspots');
      return;
    }

    this.hotspots = [];
    
    // Attach SVG to DOM permanently (but hidden) so isPointInFill() works correctly
    // getBBox and isPointInFill return 0/false for detached elements
    if (!this.svgContainer) {
      this.svgContainer = document.createElement('div');
      this.svgContainer.style.position = 'absolute';
      this.svgContainer.style.visibility = 'hidden';
      this.svgContainer.style.pointerEvents = 'none';
      this.svgContainer.style.top = '-9999px';
      this.svgContainer.style.left = '-9999px';
      document.body.appendChild(this.svgContainer);
    }
    this.svgContainer.appendChild(this.svgElement);
    
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
        
        // Find path element that represents the actual hit region
        // For prefer/prevent regions, we need to find the path that corresponds to the transition_bar_position
        // The path ID should start with the transition_bar_position (e.g., 'before', 'during', 'after')
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
        
        this.hotspots.push(hotspot);
      });
    } catch (error) {
      console.error('[HOTSPOT-EXTRACT] Error extracting hotspots:', error);
    }
    // SVG remains in DOM for hit testing
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
    
    // Priority 2: Check for rejected status - hide rejected photos by returning null
    const moderation = photoData.metadata['_private_moderation'] as number | undefined;
    if (moderation === 0) { // Rejected
      return null;
    }
    
    // Priority 3: If auto-positioning is enabled, try to get position from metadata-hotspot matching
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
    
    // Clear batch position tracker at the start of each layout calculation
    this.batchPositionedPhotos.clear();
    
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
    const plausibilityRaw = metadata['plausibility'];
    const favorableFuture = this.normalizeFavorableFuture(metadata['favorable_future']);
    const transitionBarPosition = this.normalizeTransitionBar(metadata['transition_bar_position']);
    const plausibility = this.normalizePlausibility(plausibilityRaw);
    
    // Return null if metadata is missing
    if (plausibility === null || !favorableFuture || !transitionBarPosition) {
      return null;
    }
    
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

      const groupFavorable = this.normalizeFavorableFuture(groupMetadata.favorable_future);
      const groupTransition = this.normalizeTransitionBar(groupMetadata.transition_bar_position);
      const groupPlausibility = this.normalizePlausibility(groupMetadata.plausibility);
      if (groupPlausibility === null) {
        continue;
      }
      
      // Check if this hotspot matches the photo's metadata (all three fields must match)
        if (groupPlausibility === plausibility &&
          groupFavorable === favorableFuture &&
          groupTransition === transitionBarPosition) {
        
        // Store the hotspot association BEFORE calculating position
        // This ensures overlap detection can see all previously placed photos in this hotspot
        this.photoHotspotMap.set(photoData.id, hotspot);
        
        // Get how many photos are already in this hotspot
        const elementId = (hotspot.element as SVGElement)?.id || 'path';
        const hotspotKey = `${parentGroupId}:${groupTransition}:${elementId}`;
        const photoIndex = this.hotspotPhotoCount.get(hotspotKey) || 0;
        this.hotspotPhotoCount.set(hotspotKey, photoIndex + 1);
        
        // Calculate distributed position within hotspot bounds
        // (now with access to complete photoHotspotMap)
        const position = this.distributePhotoInHotspot(hotspot, photoIndex);
        
        return position;
      }
    }
    
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
    
    // Get precomputed slots for this hotspot (grid/hex clipped to path)
    const slots = this.getSlotsForHotspot(hotspot, viewBox);

    if (slots.length === 0) {
      console.warn(`[AUTO-POS] No valid positions found in path for ${hotspot.parentGroupId} (bounds=${hotspot.bounds.width.toFixed(1)}x${hotspot.bounds.height.toFixed(1)}), using center`);
      // Fallback to center of bounding box
      const svgX = hotspot.bounds.x + hotspot.bounds.width / 2;
      const svgY = hotspot.bounds.y + hotspot.bounds.height / 2;
      const normalizedX = (svgX - viewBox.width / 2) / (viewBox.width / 2);
      // Invert Y axis: SVG has Y increasing downward, but 3D world has Y increasing upward
      const normalizedY = -((svgY - viewBox.height / 2) / (viewBox.height / 2));
      // console.log(`[DIST-DEBUG] Fallback to center: normalized=(${normalizedX.toFixed(3)}, ${normalizedY.toFixed(3)})`);
      return { auto_x: normalizedX, auto_y: normalizedY };
    }
    // Use all slots without header filtering
    const useCandidates = slots;
    
    // Check if this position was already used in this batch (track per unique path segment)
    const elementIdForKey = (hotspot.element as SVGElement)?.id || 'path';
    const hotspotKey = `${hotspot.parentGroupId}:${hotspot.transitionBarPosition}:${elementIdForKey}`;
    if (!this.batchPositionedPhotos.has(hotspotKey)) {
      this.batchPositionedPhotos.set(hotspotKey, []);
    }
    const usedPositions = this.batchPositionedPhotos.get(hotspotKey)!;

    const POSITION_THRESHOLD = 12; // Consider positions within 12px as "same position" (adjusted for 20px grid)
    const isUsedPosition = (candidate: { svgX: number; svgY: number }) => {
      return usedPositions.some((pos: { svgX: number; svgY: number }) => {
        const dist = Math.sqrt(
          Math.pow(candidate.svgX - pos.svgX, 2) +
          Math.pow(candidate.svgY - pos.svgY, 2)
        );
        return dist < POSITION_THRESHOLD;
      });
    };

    let bestPlacement = {
      normalizedX: 0,
      normalizedY: 0,
      overlap: Number.POSITIVE_INFINITY,
      displacement: Number.POSITIVE_INFINITY,
      spacing: -1,
      svgX: 0,
      svgY: 0,
    };

    // Evaluate all candidates in the predetermined slot order; pick first non-overlapping or minimally nudged
    for (let i = 0; i < useCandidates.length; i++) {
      const candidate = useCandidates[i];
      if (isUsedPosition(candidate)) {
        continue;
      }

      const baseNormalizedX = (candidate.svgX - viewBox.width / 2) / (viewBox.width / 2);
      // Invert Y: SVG has Y increasing downward, 3D world has Y increasing upward
      const baseNormalizedY = -((candidate.svgY - viewBox.height / 2) / (viewBox.height / 2));

      // When slotlog=1, skip overlap resolution for cleaner testing
      if (this.slotLogEnabled) {
        bestPlacement = {
          normalizedX: baseNormalizedX,
          normalizedY: baseNormalizedY,
          overlap: 0,
          displacement: 0,
          spacing: 0,
          svgX: candidate.svgX,
          svgY: candidate.svgY,
        };
        break;
      }

      const resolved = this.resolveOverlapByNudging(
        baseNormalizedX,
        baseNormalizedY,
        hotspot,
        viewBox
      );

      const spacing = this.getMinDistanceToExistingPhotos(resolved.normalizedX, resolved.normalizedY, hotspot);
      const svgCoords = this.normalizedToSvg(resolved.normalizedX, resolved.normalizedY, viewBox);

      const isBetter =
        resolved.overlap < bestPlacement.overlap ||
        (resolved.overlap === bestPlacement.overlap && resolved.displacement < bestPlacement.displacement) ||
        (resolved.overlap === bestPlacement.overlap && resolved.displacement === bestPlacement.displacement && spacing > bestPlacement.spacing);

      if (isBetter) {
        bestPlacement = {
          normalizedX: resolved.normalizedX,
          normalizedY: resolved.normalizedY,
          overlap: resolved.overlap,
          displacement: resolved.displacement,
          spacing,
          svgX: svgCoords.svgX,
          svgY: svgCoords.svgY,
        };
        // If we completely eliminated overlap with a tiny displacement, take it immediately
        if (bestPlacement.overlap === 0 && bestPlacement.displacement <= Math.max(2, Math.min(viewBox.width, viewBox.height) * 0.01)) {
          break;
        }
      }
    }

    // If all candidates were used or loop didn't find any, use round-robin to distribute overflow
    if (!isFinite(bestPlacement.overlap)) {
      // Use modulo to cycle through slots when capacity is exceeded
      const slotIndex = usedPositions.length % useCandidates.length;
      const bestCandidate = useCandidates[slotIndex];
      
      if (this.slotLogEnabled) {
        console.log(`[OVERFLOW] Hotspot capacity exceeded, using round-robin slot ${slotIndex}/${useCandidates.length}`);
      }
      
      const baseNormalizedX = (bestCandidate.svgX - viewBox.width / 2) / (viewBox.width / 2);
      const baseNormalizedY = -((bestCandidate.svgY - viewBox.height / 2) / (viewBox.height / 2));
      
      // When slotlog=1, skip overlap resolution for consistency
      if (this.slotLogEnabled) {
        bestPlacement = {
          normalizedX: baseNormalizedX,
          normalizedY: baseNormalizedY,
          overlap: 100, // Mark as overlapping since we're reusing a slot
          displacement: 0,
          spacing: 0,
          svgX: bestCandidate.svgX,
          svgY: bestCandidate.svgY,
        };
      } else {
        const resolved = this.resolveOverlapByNudging(baseNormalizedX, baseNormalizedY, hotspot, viewBox);
        const svgCoords = this.normalizedToSvg(resolved.normalizedX, resolved.normalizedY, viewBox);
        bestPlacement = {
          normalizedX: resolved.normalizedX,
          normalizedY: resolved.normalizedY,
          overlap: resolved.overlap,
          displacement: resolved.displacement,
          spacing: this.getMinDistanceToExistingPhotos(resolved.normalizedX, resolved.normalizedY, hotspot),
          svgX: svgCoords.svgX,
          svgY: svgCoords.svgY,
        };
      }
    }

    // Record this position as used
    usedPositions.push({ svgX: bestPlacement.svgX, svgY: bestPlacement.svgY });

    return { auto_x: bestPlacement.normalizedX, auto_y: bestPlacement.normalizedY };
  }
  
  /**
   * Check if a point is inside a hotspot using pre-calculated bounds.
   * This avoids DOM access issues since elements may be detached after initialization.
   */
  private isPointInHotspot(hotspot: SvgHotspot, x: number, y: number): boolean {
    try {
      const bounds = hotspot.bounds;
      if (!bounds || bounds.width === 0 || bounds.height === 0) {
        if (this.slotLogEnabled) {
          console.warn(`[PATH-CHECK] Invalid bounds:`, bounds);
        }
        return false;
      }

      // Fast reject with bounding box
      const bboxHit = x >= bounds.x && x <= (bounds.x + bounds.width) &&
                      y >= bounds.y && y <= (bounds.y + bounds.height);
      if (!bboxHit) {
        return false;
      }

      // If we have a path geometry, use precise fill check
      const element = hotspot.element as SVGGeometryElement | null;
      if (element && typeof (element as any).isPointInFill === 'function') {
        const pt = (element.ownerSVGElement || this.svgElement)?.createSVGPoint();
        if (pt) {
          pt.x = x;
          pt.y = y;
          return element.isPointInFill(pt);
        }
      }

      // Fallback: accept bounding box hit
      return true;
    } catch (e) {
      console.error('[PATH-CHECK] Error checking point with bounds:', e);
      return false;
    }
  }

  /**
   * Get position for rejected photo using circle packing on bottom left of SVG
   */
  private getPositionForRejectedPhoto(photoData: PhotoData, existingPhotos: PhotoData[]): LayoutPosition | null {
    if (!this.svgElement) return null;
    
    const viewBox = this.getSvgViewBox();
    if (!viewBox) return null;
    
    // Bottom left area: use 20% of width/height from bottom-left corner
    const rejectedAreaSize = Math.min(viewBox.width, viewBox.height) * 0.2;
    const centerX = -viewBox.width / 2 + rejectedAreaSize / 2;
    const centerY = viewBox.height / 2 - rejectedAreaSize / 2;
    
    // Collect all existing rejected photos
    const rejectedPhotos: Array<{ x: number; y: number; radius: number }> = [];
    
    for (const photo of existingPhotos) {
      const photoModeration = photo.metadata['_private_moderation'] as number | undefined;
      if (photoModeration === 0) { // Also rejected
        const position = this.photoPositions.get(photo.id);
        if (position) {
          const photoSize = this.photoSizes.get(photo.id) || { width: this.PHOTO_WIDTH, height: this.PHOTO_HEIGHT };
          const radius = Math.max(photoSize.width, photoSize.height) / 2;
          rejectedPhotos.push({ x: position.x, y: position.y, radius });
        }
      }
    }
    
    const photoSize = this.photoSizes.get(photoData.id) || { width: this.PHOTO_WIDTH, height: this.PHOTO_HEIGHT };
    const newRadius = Math.max(photoSize.width, photoSize.height) / 2;
    
    // Find position using circle packing
    let position: { x: number; y: number };
    
    if (rejectedPhotos.length === 0) {
      // First rejected photo - place at center of rejected area
      position = { x: centerX, y: centerY };
    } else {
      // Pack around existing rejected photos
      position = this.findCirclePackPosition(
        newRadius,
        rejectedPhotos,
        centerX,
        centerY,
        rejectedAreaSize / 2
      );
    }
    
    return {
      x: position.x,
      y: position.y,
      metadata: {
        layoutType: 'rejected-packed',
        circleRadius: this.options.circleRadius,
        isRejected: true
      }
    };
  }
  
  /**
   * Calculate minimum distance from a position to any existing photo in the same hotspot
   */
  private getMinDistanceToExistingPhotos(
    normalizedX: number,
    normalizedY: number,
    hotspot: SvgHotspot
  ): number {
    const circleRadius = this.options.circleRadius;
    const worldX = normalizedX * circleRadius;
    const worldY = normalizedY * circleRadius;
    
    let minDistance = Number.MAX_VALUE;
    
    // Find all photos in the same hotspot
    for (const [photoId, photoHotspot] of this.photoHotspotMap.entries()) {
      if (photoHotspot.parentGroupId === hotspot.parentGroupId) {
        const position = this.photoPositions.get(photoId);
        if (position) {
          const existingWorldX = position.x;
          const existingWorldY = position.y;
          const distance = Math.sqrt(
            Math.pow(worldX - existingWorldX, 2) + 
            Math.pow(worldY - existingWorldY, 2)
          );
          minDistance = Math.min(minDistance, distance);
        }
      }
    }
    
    return minDistance;
  }
  
  private getPhotoSizeInSvg(viewBox: { width: number; height: number }): { w: number; h: number } {
    const w = (this.PHOTO_WIDTH / this.options.circleRadius) * (viewBox.width / 2);
    const h = (this.PHOTO_HEIGHT / this.options.circleRadius) * (viewBox.height / 2);
    return { w, h };
  }

  private seededShuffle<T>(arr: T[], seed: number): T[] {
    // LCG-based deterministic shuffle (Fisher-Yates)
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0x100000000;
    };
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  private getSlotsForHotspot(hotspot: SvgHotspot, viewBox: { x: number; y: number; width: number; height: number }): Array<{ svgX: number; svgY: number }> {
    const elementId = (hotspot.element as SVGElement)?.id || 'path';
    const key = `${hotspot.parentGroupId}:${hotspot.transitionBarPosition}:${elementId}`;
    const cached = this.hotspotSlots.get(key);
    if (cached && cached.length > 0) {
      return cached;
    }

    const padding = Math.min(hotspot.bounds.width, hotspot.bounds.height) * 0.02;
    // Use fixed SVG pixel spacing instead of world-coordinate-based photo size
    const stepX = 15; // 15 SVG pixels for maximum density (eliminate all stacking)
    const stepY = 15;
    
    const slots: Array<{ svgX: number; svgY: number }> = [];
    let rowIndex = 0;
    for (let y = hotspot.bounds.y + padding; y <= hotspot.bounds.y + hotspot.bounds.height - padding; y += stepY) {
      const offsetX = (rowIndex % 2 === 1) ? stepX * 0.5 : 0; // hex-like staggering
      for (let x = hotspot.bounds.x + padding + offsetX; x <= hotspot.bounds.x + hotspot.bounds.width - padding; x += stepX) {
        if (this.isPointInHotspot(hotspot, x, y)) {
          slots.push({ svgX: x, svgY: y });
        }
      }
      rowIndex++;
    }

    // Deterministic spread ordering
    const seed = Math.abs(this.hashCode(key));
    const ordered = this.seededShuffle(slots, seed);
    this.hotspotSlots.set(key, ordered);
    return ordered;
  }
  
  /**
   * Check if a photo at a position would overlap with any header element (IDs starting with "header")
   * or any elements within header elements
   */
  private overlapsHeaderElement(
    svgX: number,
    svgY: number,
    viewBox: { x: number; y: number; width: number; height: number }
  ): boolean {
    // Skip on server-side rendering
    if (typeof document === 'undefined') {
      return false;
    }
    
    if (!this.svgElement) return false;
    
    // Calculate photo bounds in SVG coordinates (center point given)
    // Using default photo size, need to convert from world space to SVG space
    const photoWidthInSvg = (this.PHOTO_WIDTH / this.options.circleRadius) * (viewBox.width / 2);
    const photoHeightInSvg = (this.PHOTO_HEIGHT / this.options.circleRadius) * (viewBox.height / 2);
    
    const photoLeft = svgX - photoWidthInSvg / 2;
    const photoRight = svgX + photoWidthInSvg / 2;
    const photoTop = svgY - photoHeightInSvg / 2;
    const photoBottom = svgY + photoHeightInSvg / 2;
    
    // Find all elements with IDs starting with "header"
    const headerElements = Array.from(this.svgElement.querySelectorAll('[id^="header"]'));
    
    for (const headerElement of headerElements) {
      if (headerElement instanceof SVGGraphicsElement) {
        try {
          // Check the header element itself
          const bbox = headerElement.getBBox();
          const buffer = 15; // Buffer to avoid placing photos too close to headers
          
          // Check if photo bounds overlap with header element bounds (with buffer)
          const overlaps = !(
            photoRight < (bbox.x - buffer) ||
            photoLeft > (bbox.x + bbox.width + buffer) ||
            photoBottom < (bbox.y - buffer) ||
            photoTop > (bbox.y + bbox.height + buffer)
          );
          
          if (overlaps) {
            return true;
          }
          
          // Also check all descendants of the header element
          const descendants = headerElement.querySelectorAll('*');
          for (const descendant of descendants) {
            if (descendant instanceof SVGGraphicsElement) {
              try {
                const descBbox = descendant.getBBox();
                const descOverlaps = !(
                  photoRight < (descBbox.x - buffer) ||
                  photoLeft > (descBbox.x + descBbox.width + buffer) ||
                  photoBottom < (descBbox.y - buffer) ||
                  photoTop > (descBbox.y + descBbox.height + buffer)
                );
                
                if (descOverlaps) {
                  return true;
                }
              } catch (e) {
                // If getBBox fails, skip this descendant
                continue;
              }
            }
          }
        } catch (e) {
          // If getBBox fails, skip this element
          continue;
        }
      }
    }
    
    return false;
  }

  private normalizedToSvg(
    normalizedX: number,
    normalizedY: number,
    viewBox: { width: number; height: number }
  ): { svgX: number; svgY: number } {
    const svgX = viewBox.width / 2 + normalizedX * (viewBox.width / 2);
    const svgY = viewBox.height / 2 - normalizedY * (viewBox.height / 2);
    return { svgX, svgY };
  }

  private resolveOverlapByNudging(
    normalizedX: number,
    normalizedY: number,
    hotspot: SvgHotspot,
    viewBox: { width: number; height: number; x?: number; y?: number }
  ): { normalizedX: number; normalizedY: number; overlap: number; displacement: number } {
    const initialOverlap = this.calculateOverlapWithExistingPhotos(normalizedX, normalizedY, hotspot);
    if (initialOverlap === 0) {
      return { normalizedX, normalizedY, overlap: 0, displacement: 0 };
    }

    const startSvg = this.normalizedToSvg(normalizedX, normalizedY, viewBox);
    const step = Math.max(Math.min(viewBox.width, viewBox.height) * 0.01, 2);
    const maxRadius = Math.min(viewBox.width, viewBox.height) * 0.2;

    let best = {
      normalizedX,
      normalizedY,
      overlap: initialOverlap,
      displacement: 0,
    };

    for (let radius = step; radius <= maxRadius; radius += step) {
      const directions = 16;
      for (let i = 0; i < directions; i++) {
        const angle = (i / directions) * 2 * Math.PI;
        const candidateSvgX = startSvg.svgX + Math.cos(angle) * radius;
        const candidateSvgY = startSvg.svgY + Math.sin(angle) * radius;

        if (!this.isPointInHotspot(hotspot, candidateSvgX, candidateSvgY)) {
          continue;
        }

        if (this.overlapsHeaderElement(candidateSvgX, candidateSvgY, viewBox as any)) {
          continue;
        }

        const candidateNormalizedX = (candidateSvgX - viewBox.width / 2) / (viewBox.width / 2);
        const candidateNormalizedY = -((candidateSvgY - viewBox.height / 2) / (viewBox.height / 2));
        const overlap = this.calculateOverlapWithExistingPhotos(candidateNormalizedX, candidateNormalizedY, hotspot);

        if (overlap === 0) {
          return {
            normalizedX: candidateNormalizedX,
            normalizedY: candidateNormalizedY,
            overlap: 0,
            displacement: radius,
          };
        }

        const isBetter = overlap < best.overlap || (overlap === best.overlap && radius < best.displacement);
        if (isBetter) {
          best = {
            normalizedX: candidateNormalizedX,
            normalizedY: candidateNormalizedY,
            overlap,
            displacement: radius,
          };
        }
      }
    }

    return best;
  }
  
  /**
   * Find best position for a circle using circle packing algorithm
   */
  private findCirclePackPosition(
    radius: number,
    existingCircles: Array<{ x: number; y: number; radius: number }>,
    centerX: number,
    centerY: number,
    maxRadius: number
  ): { x: number; y: number } {
    const buffer = 50; // Small gap between circles
    let bestPosition = { x: centerX, y: centerY };
    let minDistanceFromCenter = Infinity;
    
    // Try positions around each existing circle
    for (const existing of existingCircles) {
      const angles = [
        0,
        Math.PI / 4,
        Math.PI / 2,
        Math.PI * 3 / 4,
        Math.PI,
        Math.PI * 5 / 4,
        Math.PI * 3 / 2,
        Math.PI * 7 / 4
      ];
      
      for (const angle of angles) {
        const distance = existing.radius + radius + buffer;
        const x = existing.x + Math.cos(angle) * distance;
        const y = existing.y + Math.sin(angle) * distance;
        
        // Check if this position conflicts with any existing circle
        const conflicts = existingCircles.some(other => {
          const dx = x - other.x;
          const dy = y - other.y;
          const distBetween = Math.sqrt(dx * dx + dy * dy);
          return distBetween < (radius + other.radius + buffer);
        });
        
        if (!conflicts) {
          // Prefer positions closer to center of rejected area
          const distFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          );
          
          // Only consider if within the rejected area
          if (distFromCenter < maxRadius && distFromCenter < minDistanceFromCenter) {
            minDistanceFromCenter = distFromCenter;
            bestPosition = { x, y };
          }
        }
      }
    }
    
    return bestPosition;
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
    
    // Collect all photos already in this hotspot from repository
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
      // console.log(`[OVERLAP-DEBUG] No existing photos in hotspot, overlap=0%`);
      return 0; // No overlap if no existing photos
    }
    
    // console.log(`[OVERLAP-DEBUG] Checking ${existingPhotosInHotspot.length} existing photos in hotspot for candidate at (${normalizedX.toFixed(3)},${normalizedY.toFixed(3)})`);
    
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
      
      // if (i === 0) {
      //   console.log(`[OVERLAP-DEBUG] Existing photo ${i}: pos=(${existing.x.toFixed(1)},${existing.y.toFixed(1)}) size=(${existing.width},${existing.height}), overlap=${overlapPercent.toFixed(1)}%`);
      // }
      
      maxOverlapPercent = Math.max(maxOverlapPercent, overlapPercent);
    }
    
    // console.log(`[OVERLAP-DEBUG] Max overlap for this candidate: ${maxOverlapPercent.toFixed(1)}%`);
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
      // console.log('[RECT-MATH] No intersection: right<=left or bottom<=top');
      return 0;
    }
    
    // Calculate overlap area
    const overlapWidth = intersectRight - intersectLeft;
    const overlapHeight = intersectBottom - intersectTop;
    const overlapArea = overlapWidth * overlapHeight;
    
    // Calculate percentage relative to new photo area
    const newArea = newWidth * newHeight;
    const overlapPercent = (overlapArea / newArea) * 100;
    // console.log('[RECT-MATH] New rect:', {newLeft, newTop, newRight, newBottom, newWidth, newHeight, newArea}, 
    //             'Existing rect:', {existingLeft, existingTop, existingRight, existingBottom, existingWidth, existingHeight},
    //             'Intersection:', {intersectLeft, intersectTop, intersectRight, intersectBottom, overlapWidth, overlapHeight, overlapArea},
    //             'Result:', overlapPercent);
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

  private normalizeFavorableFuture(value: string | undefined): string {
    if (!value) return '';
    const v = value.toLowerCase().trim();
    if (v.includes('prevent')) return 'prevent';
    if (v.includes('prefer')) return 'prefer';
    if (v.includes('uncertain')) return 'uncertain';
    return v;
  }

  private normalizeTransitionBar(value: string | undefined): string {
    if (!value) return '';
    const v = value.toLowerCase().trim();
    if (v.startsWith('bef')) return 'before';
    if (v.startsWith('dur')) return 'during';
    if (v.startsWith('aft') || v.startsWith('acher')) return 'after';
    if (v.includes('unclear')) return 'unclear';
    return v;
  }

  private normalizePlausibility(value: unknown): number | null {
    if (value === undefined || value === null) return null;
    const num = typeof value === 'number' ? value : parseFloat(String(value));
    if (Number.isNaN(num)) return null;
    const buckets = [0, 25, 50, 75, 100];
    let closest = buckets[0];
    let bestDelta = Math.abs(num - buckets[0]);
    for (let i = 1; i < buckets.length; i++) {
      const delta = Math.abs(num - buckets[i]);
      if (delta < bestDelta) {
        bestDelta = delta;
        closest = buckets[i];
      }
    }
    return closest;
  }

  /**
   * Get SVG viewBox dimensions
   */
  private getSvgViewBox(): { x: number; y: number; width: number; height: number } | null {
    // Skip on server-side rendering
    if (typeof document === 'undefined') {
      return null;
    }
    
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

  private removeDebugOverlay(): void {
    if (typeof document === 'undefined') return;

    const hotspotOverlay = document.getElementById('svg-hotspot-debug-overlay');
    if (hotspotOverlay?.parentNode) {
      hotspotOverlay.parentNode.removeChild(hotspotOverlay);
    }

    const candidateOverlay = document.getElementById('svg-candidate-slots-overlay');
    if (candidateOverlay?.parentNode) {
      candidateOverlay.parentNode.removeChild(candidateOverlay);
    }
  }

}