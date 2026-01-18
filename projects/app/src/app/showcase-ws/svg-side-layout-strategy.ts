import { PhotoData } from './photo-data';
import { LayoutStrategy, LayoutPosition, LayoutConfiguration } from './layout-strategy.interface';
import { CirclePackingLayoutStrategy } from './circle-packing-layout-strategy';

/**
 * SVG Side Layout Strategy
 * Positions items on the left and right sides to make room for SVG in the center
 * Maintains fan arrangement with rotation and y-axis curves
 */
export class SvgSideLayoutStrategy extends LayoutStrategy {
  private readonly inner: CirclePackingLayoutStrategy;
  private readonly svgRadius: number;
  private readonly centerGapMargin = 2000; // extra margin to avoid overlap with SVG
  private lastComputedGap: number | null = null;

  constructor(config?: { photoWidth?: number; photoHeight?: number; spacingX?: number; spacingY?: number; groupBuffer?: number; photoBuffer?: number; svgRadius?: number; }) {
    super();
    this.inner = new CirclePackingLayoutStrategy({
      photoWidth: config?.photoWidth,
      photoHeight: config?.photoHeight,
      spacingX: config?.spacingX,
      spacingY: config?.spacingY,
      groupBuffer: config?.groupBuffer ?? 1500,
      photoBuffer: config?.photoBuffer ?? 0
    });
    this.svgRadius = (config as any)?.svgRadius ?? 20000;
  }

  override async initialize(options?: any): Promise<void> {
    await this.inner.initialize(options);
    this.isInitialized = true;
  }

  override async dispose(): Promise<void> {
    await this.inner.dispose();
    this.photos = [];
    this.isInitialized = false;
  }

  override addPhoto(photo: PhotoData): void {
    this.photos.push(photo);
    this.inner.addPhoto(photo);
  }

  override removePhoto(photoId: string): boolean {
    this.photos = this.photos.filter(p => p.id !== photoId);
    return this.inner.removePhoto(photoId);
  }

  getConfiguration(): LayoutConfiguration {
    return this.inner.getConfiguration();
  }

  async calculateAllPositions(photos: PhotoData[]): Promise<(LayoutPosition | null)[]> {
    // Use circle-packing to get fan positions
    const basePositions = await this.inner.calculateAllPositions(photos);

    // Determine how far to push clusters so they clear the SVG footprint
    const gap = this.computeCenterGap(basePositions);


    // Offset positions left/right to clear center for SVG
    return basePositions.map((pos, idx) => {
      if (!pos) return null;
      const rotation = pos.metadata?.['clusterRotation'] as number | undefined;
      const side = rotation !== undefined ? (rotation >= 0 ? -1 : 1) : (idx % 2 === 0 ? -1 : 1); // left if positive rotation, else right
      const offsetX = gap * side;
      return {
        ...pos,
        x: pos.x + offsetX,
        metadata: {
          ...pos.metadata,
          // keep cluster rotation and render order
          clusterRotation: pos.metadata?.['clusterRotation'],
          renderOrder: pos.metadata?.['renderOrder']
        }
      };
    });
  }

  async getPositionForPhoto(photo: PhotoData, existingPhotos: PhotoData[]): Promise<LayoutPosition | null> {
    const basePos = await this.inner.getPositionForPhoto(photo, existingPhotos);
    if (!basePos) return null;
    const rotation = basePos.metadata?.['clusterRotation'] as number | undefined;
    const side = rotation !== undefined ? (rotation >= 0 ? -1 : 1) : 1;
    const offsetX = (this.lastComputedGap ?? this.svgRadius + this.centerGapMargin + 8000) * side;
    return {
      ...basePos,
      x: basePos.x + offsetX,
      metadata: {
        ...basePos.metadata,
        clusterRotation: basePos.metadata?.['clusterRotation'],
        renderOrder: basePos.metadata?.['renderOrder']
      }
    };
  }

  private getGroupId(photo: PhotoData): string {
    const authorId = photo.metadata['author_id'];
    if (authorId) {
      return `author:${authorId}`;
    }

    let randomId = photo.getProperty<string>('_circle_pack_group_id');
    if (!randomId) {
      randomId = Math.random().toString(36).substring(2, 15);
      photo.setProperty('_circle_pack_group_id', randomId);
    }

    return `random:${randomId}`;
  }

  private computeCenterGap(basePositions: Array<LayoutPosition | null>): number {
    const maxAbsX = basePositions
      .filter((p): p is LayoutPosition => !!p)
      .reduce((max, p) => Math.max(max, Math.abs(p.x)), 0);

    const fallback = this.svgRadius + this.centerGapMargin + 8000; // keep a generous buffer when data is sparse
    const gap = this.svgRadius + maxAbsX + this.centerGapMargin;
    this.lastComputedGap = Number.isFinite(gap) && gap > 0 ? gap : fallback;
    return this.lastComputedGap;
  }

}
