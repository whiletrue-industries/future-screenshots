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
  
  private photoGroups = new Map<string, PhotoData[]>();
  private groupPositions = new Map<string, { x: number; y: number; radius: number }>();
  
  constructor(options: {
    photoWidth?: number;
    photoHeight?: number;
    spacingX?: number;
    spacingY?: number;
    groupBuffer?: number;
    photoBuffer?: number;
  } = {}) {
    super();
    
    this.photoWidth = options.photoWidth ?? PHOTO_CONSTANTS.PHOTO_WIDTH;
    this.photoHeight = options.photoHeight ?? PHOTO_CONSTANTS.PHOTO_HEIGHT;
    this.spacingX = options.spacingX ?? PHOTO_CONSTANTS.SPACING_X;
    this.spacingY = options.spacingY ?? PHOTO_CONSTANTS.SPACING_Y;
    this.groupBuffer = options.groupBuffer ?? 2000; // Buffer between group circles
    this.photoBuffer = options.photoBuffer ?? 50;  // Buffer between photos within groups
    
    // Calculate photo radius (use the larger dimension for circle packing)
    this.photoRadius = Math.sqrt(this.photoWidth ** 2 + this.photoHeight ** 2) / 2 + this.photoBuffer;
    

  }

  /**
   * Calculate evaluation score for sorting within clusters
   * Higher score = more left in fan (+rotation)
   * Lower score = more right in fan (-rotation)
   */
  private calculateEvaluationScore(photo: PhotoData): number {
    const plausibility = photo.metadata['plausibility'] as number | undefined;
    const favorableFuture = photo.metadata['_svgZoneFavorableFuture'] as string | undefined
      || photo.metadata['favorable_future'] as string | undefined;

    if (!plausibility || !favorableFuture ) {
      return 0; // keep stable when missing data
    }

    const normalizedPlaus = plausibility / 100;
    const favorableLower = favorableFuture.toLowerCase().trim();
    const isFavor = favorableLower === 'favor' || favorableLower === 'favorable' ||
                    favorableLower === 'prefer' || favorableLower === 'preferred';

    // Match rotation formula: rotation = (1 - plaus) * direction
    const rotationMagnitude = 1 - normalizedPlaus;
    return isFavor ? rotationMagnitude : -rotationMagnitude;
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
    
    // Always recalculate when adding individual photos
    // (bulk operations use calculateAllPositions instead)
    this.recalculateLayout();
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
    
    // Find photo's position within its group
    const groupPhotos = this.photoGroups.get(groupId) || [];
    const photoIndex = groupPhotos.findIndex(p => p.id === photo.id);
    
    if (photoIndex === -1) {
      console.warn(`Photo ${photo.id} not found in group ${groupId}`);
      return null;
    }
    
    // Arrange photos in fan/bow layout like playing cards held in hand
    const groupSize = groupPhotos.length;
    
    // Calculate fan parameters
    const minRotation = 8; // degrees for small clusters
    const maxRotation = 32; // degrees for large clusters
    const sizeForMaxRotation = 10;
    const sizeFactor = Math.min(groupSize / sizeForMaxRotation, 1.0);
    const rotationRange = minRotation + (maxRotation - minRotation) * sizeFactor;
    
    // Evaluate rotation purely from plausibility + favorable_future
    const plausibility = photo.metadata['plausibility'] as number | undefined;
    const favorableFuture = photo.metadata['_svgZoneFavorableFuture'] as string | undefined
      || photo.metadata['favorable_future'] as string | undefined;

    let evaluationRotationDeg = 0;
    if (plausibility !== undefined && favorableFuture) {
      const normalizedPlaus = plausibility / 100;
      const magnitude = (1 - normalizedPlaus) * 32; // degrees
      const favorableLower = favorableFuture.toLowerCase().trim();
      const isFavor = favorableLower === 'favor' || favorableLower === 'favorable' ||
                      favorableLower === 'prefer' || favorableLower === 'preferred';
      evaluationRotationDeg = isFavor ? magnitude : -magnitude;
    }
    
    // Fan spread uses sorted index: left = positive, right = negative
    const cardWidth = this.photoWidth;
    const overlapSpacing = cardWidth * 0.65; // 35% overlap
    const totalWidth = (groupSize - 1) * overlapSpacing;
    const startX = -totalWidth / 2;
    const worldX = groupPosition.x + startX + (photoIndex * overlapSpacing);
    
    // Arc based on evaluation rotation magnitude - fan curve composition
    // Items at extremes (high |rotation|) curve down, center items (low |rotation|) stay higher
    const evaluationRotationRad = evaluationRotationDeg * Math.PI / 180;
    const normalizedRotation = Math.abs(evaluationRotationDeg) / 32; // 0 at center, 1 at edges
    const arcHeight = -normalizedRotation * normalizedRotation * 200; // quadratic curve: edges dip more
    const worldY = groupPosition.y + arcHeight;
    
    // Render order: rightmost on top (like hand of cards), accumulate right→left
    // Rightmost cards overlap leftmost cards
    const baseRenderOrder = (32 - evaluationRotationDeg) * 1.5625; // map -32..32 -> 100..0 (reversed)
    const tiebreaker = photoIndex * 0.01; // rightmost (high index) gets highest tiebreaker
    const renderOrder = Math.round((baseRenderOrder + tiebreaker) * 10) / 10; // preserve 1 decimal
    
    return {
      x: worldX,
      y: worldY,
      metadata: {
        groupId,
        groupSize: groupPhotos.length,
        photoIndex,
        groupPosition: { x: groupPosition.x, y: groupPosition.y, radius: groupPosition.radius },
        circlePackKey: `circle-pack-${groupId}-${photoIndex}`, // Use our own key instead of gridKey
        renderOrder: renderOrder // Preferred on top of prevent
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
        return scoreB - scoreA; // Descending: highest score (most positive rotation) = leftmost
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

  /**
   * Gets the group ID for a photo based on priority: author_id > random
   */
  private getGroupId(photo: PhotoData): string {
    // Priority 1: author_id from metadata
    const authorId = photo.metadata['author_id'];
    if (authorId) {
      return `author:${authorId}`;
    }
        
    // Priority 3: Generate random group ID and store it as a property
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
    // Left (+rotation): preferred + preposterous (high score)
    // Right (-rotation): prevent + preposterous (low score)
    for (const [groupId, groupPhotos] of this.photoGroups.entries()) {
      groupPhotos.sort((a, b) => {
        const scoreA = this.calculateEvaluationScore(a);
        const scoreB = this.calculateEvaluationScore(b);
        return scoreB - scoreA; // Descending order (highest score = leftmost)
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

    // Pack the group circles
    const packedGroups = this.packCircles(groupCircles, this.groupBuffer);
    
    // Store group positions
    this.groupPositions.clear();
    for (const group of packedGroups) {
      this.groupPositions.set(group.id, {
        x: group.x,
        y: group.y,
        radius: group.radius
      });
    }
    

  }

  /**
   * Calculate the radius needed for a group to contain N photos
   */
  private calculateGroupRadius(photoCount: number): number {
    if (photoCount === 1) {
      return this.photoRadius + this.photoBuffer;
    }
    
    // For multiple photos, estimate radius based on circle packing efficiency
    // This is a heuristic that works reasonably well for small to medium groups
    const area = photoCount * Math.PI * this.photoRadius * this.photoRadius;
    const estimatedRadius = Math.sqrt(area / Math.PI) + this.photoRadius + this.photoBuffer;
    
    return Math.max(estimatedRadius, this.photoRadius * 2);
  }

  /**
   * Pack photos within a single group using circle packing
   */
  private packPhotosInGroup(photos: PhotoData[]): Array<{ x: number; y: number }> {
    if (photos.length === 0) return [];
    
    if (photos.length === 1) {
      return [{ x: 0, y: 0 }]; // Single photo at center
    }
    
    // Create circles for each photo
    const photoCircles: Circle[] = photos.map((photo, index) => ({
      id: photo.id,
      radius: this.photoRadius,
      x: 0,
      y: 0
    }));
    
    // Pack the photo circles
    const packedPhotos = this.packCircles(photoCircles, this.photoBuffer);
    
    return packedPhotos.map(circle => ({ x: circle.x, y: circle.y }));
  }

  /**
   * Generic circle packing algorithm using a simple iterative approach
   */
  private packCircles(circles: Circle[], buffer: number = 0): Circle[] {
    if (circles.length === 0) return [];
    
    const packed: Circle[] = [];
    
    // Place first circle at origin
    packed.push({
      ...circles[0],
      x: 0,
      y: 0
    });
    
    // Place remaining circles
    for (let i = 1; i < circles.length; i++) {
      const circle = circles[i];
      let bestPosition = this.findBestPosition(circle, packed, buffer);
      
      packed.push({
        ...circle,
        x: bestPosition.x,
        y: bestPosition.y
      });
    }
    
    return packed;
  }

  /**
   * Find the best position for a new circle among existing circles
   */
  private findBestPosition(newCircle: Circle, existingCircles: Circle[], buffer: number): { x: number; y: number } {
    if (existingCircles.length === 0) {
      return { x: 0, y: 0 };
    }
    
    let bestPosition = { x: 0, y: 0 };
    let minDistanceFromOrigin = Infinity;
    
    // Try positions around each existing circle
    for (const existing of existingCircles) {
    //   const angles = [0, Math.PI / 3, Math.PI * 2 / 3, Math.PI, Math.PI * 4 / 3, Math.PI * 5 / 3];
      const angles = [0, 
        Math.PI * 5 / 7,
        Math.PI * 10 / 7,
        Math.PI * 1 / 7,
        Math.PI * 6 / 7,
        Math.PI * 11 / 7,
        Math.PI * 2 / 7,
        Math.PI * 7 / 7,
        Math.PI * 12 / 7,
        Math.PI * 3 / 7,
        Math.PI * 8 / 7,
        Math.PI * 13 / 7,
        Math.PI * 4 / 7,
        Math.PI * 9 / 7,
      ];

      for (const angle of angles) {
        const distance = existing.radius + newCircle.radius + buffer;
        const x = existing.x + Math.cos(angle) * distance;
        const y = existing.y + Math.sin(angle) * distance;
        
        // Check if this position conflicts with any existing circle
        const conflicts = existingCircles.some(other => {
          const dx = x - other.x;
          const dy = y - other.y;
          const minDistance = newCircle.radius + other.radius + buffer;// * (0.5 + 0.5 * Math.random());
          return Math.sqrt(dx * dx + dy * dy) < minDistance;
        });
        
        if (!conflicts) {
          const distanceFromOrigin = Math.sqrt(x * x + y * y);
          if (distanceFromOrigin < minDistanceFromOrigin) {
            minDistanceFromOrigin = distanceFromOrigin;
            bestPosition = { x, y };
          }
        }
      }
    }
    
    return bestPosition;
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