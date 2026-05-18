import { packSiblings } from 'd3-hierarchy';
import { LayoutStrategy, LayoutPosition, LayoutConfiguration } from './layout-strategy.interface';
import { PhotoData } from './photo-data';
import { PHOTO_CONSTANTS } from './photo-constants';

/**
 * Circle Packing Layout Strategy that implements 2-level hierarchical circle packing
 * Groups photos by author_id and packs them in circles within larger group circles
 */
export class CirclePackingLayoutStrategy extends LayoutStrategy {
  private readonly photoWidth: number;
  private readonly photoHeight: number;
  private readonly spacingX: number;
  private readonly spacingY: number;
  private readonly photoRadius: number;
  private readonly groupBuffer: number;
  private readonly photoBuffer: number;
  private readonly groupByFn: (photo: PhotoData) => string;
  private photoGroups = new Map<string, PhotoData[]>();
  private groupPositions = new Map<string, { x: number; y: number; radius: number }>();
  private readonly hexPositionCache = new Map<number, Array<{x: number; y: number}>>();

  constructor(options: {
    photoWidth?: number;
    photoHeight?: number;
    spacingX?: number;
    spacingY?: number;
    groupBuffer?: number;
    photoBuffer?: number;
    useFanLayout?: boolean; // accepted but unused — hexbin is used for all layouts
    /** Override the group key function. Defaults to author_id from metadata. */
    groupBy?: (photo: PhotoData) => string;
  } = {}) {
    super();

    this.photoWidth = options.photoWidth ?? PHOTO_CONSTANTS.PHOTO_WIDTH;
    this.photoHeight = options.photoHeight ?? PHOTO_CONSTANTS.PHOTO_HEIGHT;
    this.spacingX = options.spacingX ?? PHOTO_CONSTANTS.SPACING_X;
    this.spacingY = options.spacingY ?? PHOTO_CONSTANTS.SPACING_Y;
    this.groupBuffer = options.groupBuffer ?? 2000;
    this.photoBuffer = options.photoBuffer ?? 50;
    this.groupByFn = options.groupBy ?? this.defaultGroupBy.bind(this);
    this.photoRadius = Math.sqrt(this.photoWidth ** 2 + this.photoHeight ** 2) / 2 + this.photoBuffer;
    

  }

  /**
   * Calculate evaluation score for sorting within clusters
   * Higher score = closer to centre of hexbin
   * Lower score = further from centre of hexbin
   */
  private calculateEvaluationScore(photo: PhotoData): number {
    const plausibility = photo.metadata['plausibility'] as number | undefined | null;
    const favorableFuture = photo.metadata['_svgZoneFavorableFuture'] as string | undefined | null
      || photo.metadata['favorable_future'] as string | undefined | null;

    // Validate that both values are valid (not null, not undefined, and plausibility is a finite number)
    if (typeof plausibility !== 'number' || !isFinite(plausibility) || !favorableFuture || typeof favorableFuture !== 'string') {
      return 0; // keep stable when missing data
    }

    const normalizedPlaus = plausibility / 100;
    const favorableLower = favorableFuture.toLowerCase().trim();
    const isFavor = favorableLower === 'favor' || favorableLower === 'favorable' ||
                    favorableLower === 'prefer' || favorableLower === 'preferred';

    // Match rotation formula: rotation = (1 - plaus) * direction
    const rotationMagnitude = 1 - normalizedPlaus;
    const score = isFavor ? rotationMagnitude : -rotationMagnitude;

    // Validate the result
    return isFinite(score) ? score : 0;
  }

  /**
   * Gets the configuration for this layout strategy
   */
  getConfiguration(): LayoutConfiguration {
    return {
      name: 'circle-packing',
      displayName: 'Circle Packing Layout',
      description: 'Groups photos by author in hierarchical circle packing arrangement',
      supportsInteraction: false,
      requiresWebService: false,
      settings: {
        photoWidth: this.photoWidth,
        photoHeight: this.photoHeight,
        spacingX: this.spacingX,
        spacingY: this.spacingY,
        groupBuffer: this.groupBuffer,
        photoBuffer: this.photoBuffer
      }
    };
  }

  /**
   * Add a photo to the layout and trigger recalculation
   */
  override addPhoto(photo: PhotoData): void {
    const groupId = this.getGroupId(photo);
    
    if (!this.photoGroups.has(groupId)) {
      this.photoGroups.set(groupId, []);
    }
    
    this.photoGroups.get(groupId)!.push(photo);
    // No recalculation here: the repository always calls calculateAllPositions
    // immediately after addPhoto when requiresFullRecalculationOnAdd() is true.
  }

  /**
   * Remove a photo from the layout and trigger recalculation
   */
  override removePhoto(photoId: string): boolean {
    // Find and remove the photo from its group
    for (const [groupId, photos] of this.photoGroups.entries()) {
      const index = photos.findIndex(p => p.id === photoId);
      if (index !== -1) {
        photos.splice(index, 1);
        
        // Remove empty groups
        if (photos.length === 0) {
          this.photoGroups.delete(groupId);
        }
        
        this.recalculateLayout();
        return true;
      }
    }
    return false;
  }

  /**
   * Get position for a specific photo
   */
  async getPositionForPhoto(photo: PhotoData, existingPhotos: PhotoData[]): Promise<LayoutPosition | null> {
    // Always regroup to ensure consistent layout
    // (This method is used for individual photo additions, not bulk operations)
    this.regroupAllPhotos(existingPhotos);
    
    return this.getPositionForPhotoOptimized(photo);
  }

  /**
   * Get position for a specific photo without triggering recalculation
   * Assumes layout has already been calculated
   */
  private async getPositionForPhotoOptimized(photo: PhotoData): Promise<LayoutPosition | null> {
    const groupId = this.getGroupId(photo);
    const groupPosition = this.groupPositions.get(groupId);

    if (!groupPosition) {
      console.warn(`No group position found for photo ${photo.id} in group ${groupId}`);
      return null;
    }

    const groupPhotos = this.photoGroups.get(groupId) || [];
    const photoIndex = groupPhotos.findIndex(p => p.id === photo.id);

    if (photoIndex === -1) {
      console.warn(`Photo ${photo.id} not found in group ${groupId}`);
      return null;
    }

    const pos = this.computeHexPositions(groupPhotos.length)[photoIndex] ?? { x: 0, y: 0 };

    return {
      x: groupPosition.x + pos.x,
      y: groupPosition.y + pos.y,
      metadata: {
        groupId,
        groupSize: groupPhotos.length,
        photoIndex,
        groupPosition: { x: groupPosition.x, y: groupPosition.y, radius: groupPosition.radius },
        circlePackKey: `circle-pack-${groupId}-${photoIndex}`,
        renderOrder: photoIndex
      }
    };
  }

  /**
   * Calculate positions for all photos
   */
  async calculateAllPositions(photos: PhotoData[]): Promise<(LayoutPosition | null)[]> {
    // Clear and regroup all photos, then recalculate layout once
    this.photoGroups.clear();
    
    for (const photo of photos) {
      const groupId = this.getGroupId(photo);
      
      if (!this.photoGroups.has(groupId)) {
        this.photoGroups.set(groupId, []);
      }
      
      this.photoGroups.get(groupId)!.push(photo);
    }

    // Sort photos within each group by evaluation score BEFORE layout calculation
    for (const groupPhotos of this.photoGroups.values()) {
      groupPhotos.sort((a, b) => {
        const scoreA = this.calculateEvaluationScore(a);
        const scoreB = this.calculateEvaluationScore(b);
        return scoreB - scoreA; // Descending: highest score = centre of hexbin
      });
    }
    
    // Recalculate layout once with all photos
    this.recalculateLayout();
    
    // Now get positions for all photos
    const positions: (LayoutPosition | null)[] = [];
    
    for (const photo of photos) {
      const position = await this.getPositionForPhotoOptimized(photo);
      positions.push(position);
    }
    
    return positions;
  }

  private getGroupId(photo: PhotoData): string {
    return this.groupByFn(photo);
  }

  /** Default grouping: by author_id, falling back to a stable random id per photo. */
  private defaultGroupBy(photo: PhotoData): string {
    const authorId = photo.metadata['author_id'];
    if (authorId) return `author:${authorId}`;

    let randomId = photo.getProperty<string>('_circle_pack_group_id');
    if (!randomId) {
      randomId = Math.random().toString(36).substring(2, 15);
      photo.setProperty('_circle_pack_group_id', randomId);
    }
    return `random:${randomId}`;
  }

  /**
   * Regroup all photos when the photo list changes
   */
  private regroupAllPhotos(photos: PhotoData[]): void {
    this.photoGroups.clear();
    
    for (const photo of photos) {
      const groupId = this.getGroupId(photo);
      
      if (!this.photoGroups.has(groupId)) {
        this.photoGroups.set(groupId, []);
      }
      
      this.photoGroups.get(groupId)!.push(photo);
    }
    
    // Sort photos within each group by evaluation score
    // Highest score (favorable + low plausibility) → centre of hexbin
    for (const [groupId, groupPhotos] of this.photoGroups.entries()) {
      groupPhotos.sort((a, b) => {
        const scoreA = this.calculateEvaluationScore(a);
        const scoreB = this.calculateEvaluationScore(b);
        return scoreB - scoreA; // Descending: highest score = centre
      });
    }
    
    this.recalculateLayout();
  }

  /**
   * Recalculate the entire layout whenever photos change
   */
  private recalculateLayout(): void {
    // Sort groups by size (descending) and group ID (ascending)
    const sortedGroups = Array.from(this.photoGroups.entries())
      .sort(([groupIdA, photosA], [groupIdB, photosB]) => {
        // First by size (descending)
        if (photosB.length !== photosA.length) {
          return photosB.length - photosA.length;
        }
        // Then by group ID (ascending)
        return groupIdA.localeCompare(groupIdB);
      });

    // Calculate radius for each group based on photo count
    const groupCircles: Circle[] = sortedGroups.map(([groupId, photos]) => {
      const groupRadius = this.calculateGroupRadius(photos.length);
      return {
        id: groupId,
        radius: groupRadius,
        x: 0, // Will be set by circle packing
        y: 0  // Will be set by circle packing
      };
    });

    const packedGroups = this.packCircles(groupCircles, this.groupBuffer);

    // Store group positions
    this.groupPositions.clear();
    for (const group of packedGroups) {
      // Validate group position before storing
      if (!isFinite(group.x) || !isFinite(group.y) || !isFinite(group.radius)) {
        // Use a fallback position at origin for this group
        this.groupPositions.set(group.id, {
          x: 0,
          y: 0,
          radius: group.radius || 1000
        });
        continue;
      }

      this.groupPositions.set(group.id, {
        x: group.x,
        y: group.y,
        radius: group.radius
      });
    }


  }

  /**
   * Hexagonal grid positions for `count` photos, sorted centre-outward.
   * Odd rows are offset by half a cell width to form the hex brick pattern.
   * Results are memoised by count since dimensions never change after construction.
   */
  private computeHexPositions(count: number): Array<{x: number; y: number}> {
    if (count <= 0) return [];
    const cached = this.hexPositionCache.get(count);
    if (cached) return cached;

    const cellW = this.photoWidth + this.photoBuffer;
    const cellH = this.photoHeight + this.photoBuffer;
    const rings = Math.ceil(Math.sqrt(count / 3)) + 2;

    const candidates: Array<{x: number; y: number; distSq: number}> = [];
    for (let row = -rings; row <= rings; row++) {
      for (let col = -rings; col <= rings; col++) {
        const x = col * cellW + (Math.abs(row) % 2) * (cellW / 2);
        const y = row * cellH;
        candidates.push({ x, y, distSq: x * x + y * y });
      }
    }
    candidates.sort((a, b) => a.distSq - b.distSq || a.x - b.x || a.y - b.y);

    const positions = candidates.slice(0, count).map(({ x, y }) => ({ x, y }));
    this.hexPositionCache.set(count, positions);
    return positions;
  }

  /** Radius of the smallest circle enclosing the hexbin layout for `photoCount` photos. */
  private calculateGroupRadius(photoCount: number): number {
    if (photoCount <= 0) return this.photoRadius;
    const positions = this.computeHexPositions(photoCount);
    const maxDistSq = positions.reduce((max, p) => Math.max(max, p.x * p.x + p.y * p.y), 0);
    return Math.sqrt(maxDistSq) + this.photoRadius;
  }

  /**
   * Pack circles using d3-hierarchy's packSiblings (Wang front-chain algorithm, O(n log n)).
   * Each circle's radius is inflated by buffer/2 before packing so adjacent circles
   * end up separated by `buffer` in the final layout.
   */
  private packCircles(circles: Circle[], buffer: number = 0): Circle[] {
    if (circles.length === 0) return [];

    // packSiblings expects { r } objects and mutates them in-place adding { x, y }
    const nodes = circles.map(c => ({ ...c, r: c.radius + buffer / 2 }));
    packSiblings(nodes);

    return circles.map((c, i) => ({ ...c, x: nodes[i].x ?? 0, y: nodes[i].y ?? 0 }));
  }

  /**
   * Get layout bounds based on packed circles
   */
  async getLayoutBounds(): Promise<{ width: number; height: number }> {
    if (this.groupPositions.size === 0) {
      return { width: this.photoWidth * 2, height: this.photoHeight * 2 };
    }
    
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    for (const group of this.groupPositions.values()) {
      const left = group.x - group.radius;
      const right = group.x + group.radius;
      const top = group.y - group.radius;
      const bottom = group.y + group.radius;
      
      minX = Math.min(minX, left);
      maxX = Math.max(maxX, right);
      minY = Math.min(minY, top);
      maxY = Math.max(maxY, bottom);
    }
    
    return {
      width: maxX - minX + this.groupBuffer * 2,
      height: maxY - minY + this.groupBuffer * 2
    };
  }

  /**
   * Clean up resources and photo properties when disposing this layout
   */
  override async dispose(): Promise<void> {
    // Clean up circle packing specific properties from all photos
    for (const photos of this.photoGroups.values()) {
      for (const photo of photos) {
        // Remove circle packing specific properties
        photo.setProperty('_circle_pack_group_id', undefined);
      }
    }
    
    // Clear internal data structures
    this.photoGroups.clear();
    this.groupPositions.clear();
    this.hexPositionCache.clear();
    

    await super.dispose();
  }

  /**
   * Circle packing requires full recalculation when photos are added
   * because adding one photo can change the positions of all photos
   */
  override requiresFullRecalculationOnAdd(): boolean {
    return true;
  }

  /**
   * Get debug information about the current layout
   */
  getPackingInfo(): PackingInfo {
    const groupInfo = Array.from(this.photoGroups.entries()).map(([groupId, photos]) => ({
      groupId,
      photoCount: photos.length,
      position: this.groupPositions.get(groupId) || { x: 0, y: 0, radius: 0 }
    }));
    
    return {
      totalGroups: this.photoGroups.size,
      totalPhotos: Array.from(this.photoGroups.values()).reduce((sum, photos) => sum + photos.length, 0),
      groups: groupInfo
    };
  }
}

/**
 * Interface for circle data used in packing algorithm
 */
interface Circle {
  id: string;
  radius: number;
  x: number;
  y: number;
}

/**
 * Information about the current packing layout
 */
export interface PackingInfo {
  totalGroups: number;
  totalPhotos: number;
  groups: Array<{
    groupId: string;
    photoCount: number;
    position: { x: number; y: number; radius: number };
  }>;
}