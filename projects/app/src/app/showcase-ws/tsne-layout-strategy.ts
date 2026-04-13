import { LayoutStrategy, LayoutPosition, LayoutConfiguration, WebServiceLayoutStrategy } from './layout-strategy.interface';
import { PhotoData } from './photo-data';
import { Observable, from } from 'rxjs';
import { PHOTO_CONSTANTS } from './photo-constants';

/**
 * TSNE Layout Strategy that fetches positioning data from a remote configuration service
 * and positions photos according to TSNE (t-Distributed Stochastic Neighbor Embedding) algorithm results.
 */
export class TsneLayoutStrategy extends LayoutStrategy implements WebServiceLayoutStrategy {
  private workspaceConfigUrl: string;
  private tsneConfigUrl: string | null = null;
  private tsneData: TsneConfigData | null = null;
  private currentStateHash: string | null = null;
  private currentSetId: number | null = null;
  private isLoading = false;
  private loadPromise: Promise<void> | null = null;
  private readonly photoWidth: number;
  private readonly photoHeight: number;
  private readonly spacingX: number;
  private readonly spacingY: number;
  private readonly cellW: number;
  private readonly cellH: number;

  /**
   * Creates a new TSNE layout strategy
   * @param workspaceId The UUID of the workspace to fetch TSNE data for
   * @param baseUrl The base URL for the config service (defaults to Google Cloud Storage)
   */
  constructor(
    private workspaceId: string,
    private baseUrl: string = 'https://storage.googleapis.com/chronomaps3-eu',
    options: {
      photoWidth?: number;
      photoHeight?: number;
      spacingX?: number;
      spacingY?: number;
    } = {}
  ) {
    super();
    this.workspaceConfigUrl = `${this.baseUrl}/tiles/${this.workspaceId}/config.json`;
    
    // Use same dimensions as grid layout to ensure consistency
    this.photoWidth = options.photoWidth ?? PHOTO_CONSTANTS.PHOTO_WIDTH;
    this.photoHeight = options.photoHeight ?? PHOTO_CONSTANTS.PHOTO_HEIGHT;
    this.spacingX = options.spacingX ?? PHOTO_CONSTANTS.SPACING_X;
    this.spacingY = options.spacingY ?? PHOTO_CONSTANTS.SPACING_Y;
    this.cellW = this.photoWidth + this.spacingX;  // 780
    this.cellH = this.photoHeight + this.spacingY; // 1030
  }

  /**
   * Initialize the layout strategy - forces refresh every time we switch to this layout
   */
  override async initialize(): Promise<void> {
    await super.initialize();
    // Always refresh data when switching to TSNE layout to ensure we have the latest data
    await this.forceRefresh();

  }

  /**
   * Gets the configuration for this layout strategy
   */
  getConfiguration(): LayoutConfiguration {
    return {
      name: 'tsne',
      displayName: 'TSNE Layout',
      description: 'Positions photos using TSNE coordinates from a web service with proper spacing',
      supportsInteraction: false,
      requiresWebService: true,
      settings: {
        workspaceId: this.workspaceId,
        baseUrl: this.baseUrl,
        photoWidth: this.photoWidth,
        photoHeight: this.photoHeight,
        spacingX: this.spacingX,
        spacingY: this.spacingY
      }
    };
  }

  /**
   * Forces a refresh of the TSNE data by clearing cache and reloading
   */
  public async forceRefresh(): Promise<void> {
    this.tsneData = null;
    this.currentStateHash = null;
    this.currentSetId = null;
    this.tsneConfigUrl = null;
    this.isLoading = false;
    this.loadPromise = null;
    await this.fetchTsneData();
  }

  /**
   * Fetches workspace configuration to get set_id and state_hash
   */
  private async fetchWorkspaceConfig(): Promise<WorkspaceConfig> {
    try {
      const response = await fetch(this.workspaceConfigUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch workspace config: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (typeof data.set_id !== 'number') {
        throw new Error('Invalid workspace config: missing or invalid set_id: ' + data.set_id + ' ' + typeof data.set_id);
      }
      
      if (!data.state_hash || typeof data.state_hash !== 'string') {
        throw new Error('Invalid workspace config: missing or invalid state_hash: ' + data.state_hash);
      }

      return {
        set_id: data.set_id,
        state_hash: data.state_hash
      };
    } catch (error) {
      console.error('Error fetching workspace configuration:', error);
      throw error;
    }
  }

  /**
   * Fetches the TSNE configuration data from the remote service
   */
  private async fetchTsneData(): Promise<void> {
    if (this.tsneData || this.isLoading) {
      return this.loadPromise || Promise.resolve();
    }

    this.isLoading = true;
    this.loadPromise = this.doFetchTsneData();
    
    try {
      await this.loadPromise;
    } finally {
      this.isLoading = false;
    }
  }

  private async doFetchTsneData(): Promise<void> {
    try {
      // First, fetch workspace configuration to get set_id and state_hash
      const workspaceConfig = await this.fetchWorkspaceConfig();
      
      // Check if we need to refresh based on state_hash
      if (this.currentStateHash === workspaceConfig.state_hash && this.tsneData) {

        return;
      }
      
      // Update our tracking variables
      this.currentStateHash = workspaceConfig.state_hash;
      this.currentSetId = workspaceConfig.set_id;
      this.tsneConfigUrl = `${this.baseUrl}/tiles/${this.workspaceId}/${workspaceConfig.set_id}/config.json`;
      

      
      // Now fetch the actual TSNE configuration
      const response = await fetch(this.tsneConfigUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch TSNE config: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.tsneData = this.validateTsneConfig(data);
      

    } catch (error) {
      console.error('Error fetching TSNE configuration:', error);
      throw error;
    }
  }

  /**
   * Validates and type-checks the TSNE configuration data
   */
  private validateTsneConfig(data: any): TsneConfigData {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid TSNE config: not an object');
    }

    if (!Array.isArray(data.dim) || data.dim.length !== 2) {
      throw new Error('Invalid TSNE config: dim must be an array of 2 numbers');
    }

    if (!Array.isArray(data.grid)) {
      throw new Error('Invalid TSNE config: grid must be an array');
    }

    // Validate grid items
    for (let i = 0; i < data.grid.length; i++) {
      const item = data.grid[i];
      if (!item || typeof item !== 'object') {
        throw new Error(`Invalid TSNE config: grid item ${i} is not an object`);
      }
      
      if (!Array.isArray(item.pos) || item.pos.length !== 2) {
        throw new Error(`Invalid TSNE config: grid item ${i} pos must be an array of 2 numbers`);
      }
      
      if (typeof item.id !== 'string') {
        throw new Error(`Invalid TSNE config: grid item ${i} id must be a string`);
      }
    }

    return {
      dim: data.dim as [number, number],
      grid: data.grid as TsneGridItem[],
      padding_ratio: data.padding_ratio || 0.5,
      conversion_ratio: data.conversion_ratio || [1, 1],
      cell_ratios: data.cell_ratios || [1, 1]
    };
  }

  /**
   * Gets the position for a photo based on TSNE coordinates
   */
  async getPositionForPhoto(photo: PhotoData, existingPhotos: PhotoData[]): Promise<LayoutPosition | null> {
    // Ensure TSNE data is loaded
    await this.fetchTsneData();
    
    if (!this.tsneData) {
      throw new Error('TSNE data not available');
    }

    // Find the photo in the TSNE grid data by matching ID
    const gridItem = this.tsneData.grid.find(item => item.id === photo.id);
    
    if (!gridItem) {
      const fallbackWorldPos = this.getFallbackWorldPosition(photo, existingPhotos);
      if (fallbackWorldPos) {
        return {
          x: fallbackWorldPos.x,
          y: fallbackWorldPos.y,
          gridKey: `tsne-fallback-${photo.id}`,
          metadata: {
            tsneFallback: true,
            tsneMissingId: photo.id,
          }
        };
      }

      // Last-resort fallback: place near layout center instead of hiding.
      const centerJitter = this.getDeterministicJitter(photo.id, Math.min(this.cellW, this.cellH) * 0.35);
      return {
        x: centerJitter.x,
        y: centerJitter.y,
        gridKey: `tsne-fallback-center-${photo.id}`,
        metadata: {
          tsneFallback: true,
          tsneMissingId: photo.id,
        }
      };
    }

    // Convert TSNE grid coordinates to world coordinates
    const worldPos = this.convertTsneToWorldCoordinates(gridItem.pos, this.tsneData.dim);

    return {
      x: worldPos.x,
      y: worldPos.y,
      gridKey: `tsne-${gridItem.pos[0]}-${gridItem.pos[1]}`,
      metadata: {
        tsnePosition: gridItem.pos,
        originalMetadata: gridItem.metadata
      }
    };
  }

  /**
   * Compute a fallback world position for items missing from TSNE grid data.
   * Strategy:
   * 1) Place near centroid of mapped items sharing the same topic.
   * 2) Else place near centroid of mapped items sharing the same theme.
    * 3) Else place near the global centroid of all mapped items.
    * 4) Else return null and let caller use center fallback.
   */
  private getFallbackWorldPosition(photo: PhotoData, existingPhotos: PhotoData[]): { x: number; y: number } | null {
    if (!this.tsneData) return null;

    const mappedById = new Set(this.tsneData.grid.map(item => item.id));
    const topicCentroids = new Map<string, { sumX: number; sumY: number; count: number }>();
    const themeCentroids = new Map<string, { sumX: number; sumY: number; count: number }>();

    const globalAccumulator = { sumX: 0, sumY: 0, count: 0 };

    for (const existing of existingPhotos) {
      if (!mappedById.has(existing.id)) continue;
      const world = this.getWorldPositionForId(existing.id);
      if (!world) continue;

      globalAccumulator.sumX += world.x;
      globalAccumulator.sumY += world.y;
      globalAccumulator.count += 1;

      const topics: string[] = (existing.metadata['topics'] as string[]) || [];
      const uniqueTopics = new Set(topics);

      for (const topic of uniqueTopics) {
        const topicAcc = topicCentroids.get(topic) ?? { sumX: 0, sumY: 0, count: 0 };
        topicAcc.sumX += world.x;
        topicAcc.sumY += world.y;
        topicAcc.count += 1;
        topicCentroids.set(topic, topicAcc);

        const theme = topic.split('/')[0];
        const themeAcc = themeCentroids.get(theme) ?? { sumX: 0, sumY: 0, count: 0 };
        themeAcc.sumX += world.x;
        themeAcc.sumY += world.y;
        themeAcc.count += 1;
        themeCentroids.set(theme, themeAcc);
      }
    }

    const photoTopics: string[] = (photo.metadata['topics'] as string[]) || [];
    for (const topic of photoTopics) {
      const acc = topicCentroids.get(topic);
      if (acc && acc.count > 0) {
        const center = { x: acc.sumX / acc.count, y: acc.sumY / acc.count };
        const jitter = this.getDeterministicJitter(photo.id, Math.min(this.cellW, this.cellH) * 0.22);
        return { x: center.x + jitter.x, y: center.y + jitter.y };
      }
    }

    for (const topic of photoTopics) {
      const theme = topic.split('/')[0];
      const acc = themeCentroids.get(theme);
      if (acc && acc.count > 0) {
        const center = { x: acc.sumX / acc.count, y: acc.sumY / acc.count };
        const jitter = this.getDeterministicJitter(photo.id, Math.min(this.cellW, this.cellH) * 0.3);
        return { x: center.x + jitter.x, y: center.y + jitter.y };
      }
    }

    // Non-evaluated / topic-less items: anchor to overall mapped cloud with stable jitter.
    if (globalAccumulator.count > 0) {
      const center = {
        x: globalAccumulator.sumX / globalAccumulator.count,
        y: globalAccumulator.sumY / globalAccumulator.count,
      };
      const jitter = this.getDeterministicJitter(photo.id, Math.min(this.cellW, this.cellH) * 0.35);
      return { x: center.x + jitter.x, y: center.y + jitter.y };
    }

    return null;
  }

  /**
   * Stable pseudo-random offset based on item ID to avoid overlap while staying deterministic.
   */
  private getDeterministicJitter(id: string, radius: number): { x: number; y: number } {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0;
    }

    const seedA = Math.abs(hash);
    const seedB = Math.abs(hash * 1103515245 + 12345);
    const angle = (seedA % 360) * (Math.PI / 180);
    const dist = ((seedB % 1000) / 1000) * radius;

    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    };
  }

  /**
   * Calculate positions for all photos
   */
  async calculateAllPositions(photos: PhotoData[]): Promise<(LayoutPosition | null)[]> {
    await this.fetchTsneData();
    
    if (!this.tsneData) {
      throw new Error('TSNE data not available');
    }

    const positions: (LayoutPosition | null)[] = [];
    
    for (const photo of photos) {
      const position = await this.getPositionForPhoto(photo, photos);
      positions.push(position);
    }

    return this.resolvePositionOverlaps(photos, positions);
  }

  /**
   * Ensure each item occupies a unique visual slot by spreading coordinate collisions
   * along a deterministic hex spiral around their shared base position.
   */
  private resolvePositionOverlaps(
    photos: PhotoData[],
    positions: (LayoutPosition | null)[]
  ): (LayoutPosition | null)[] {
    if (!this.tsneData) return positions;

    const dim = this.tsneData.dim;
    const resolved = positions.map(p => (p ? { ...p, metadata: p.metadata ? { ...p.metadata } : undefined } : null));
    const occupied = new Set<string>();

    const indices = resolved
      .map((p, index) => ({ p, index }))
      .filter(entry => !!entry.p)
      // Prefer explicit TSNE positions first, then stable by ID for deterministic output.
      .sort((a, b) => {
        const aHasTsnePos = Array.isArray(a.p!.metadata?.['tsnePosition']) ? 1 : 0;
        const bHasTsnePos = Array.isArray(b.p!.metadata?.['tsnePosition']) ? 1 : 0;
        if (aHasTsnePos !== bHasTsnePos) return bHasTsnePos - aHasTsnePos;
        return photos[a.index].id.localeCompare(photos[b.index].id);
      })
      .map(entry => entry.index);

    for (const index of indices) {
      const position = resolved[index];
      if (!position) continue;

      const desired = this.getDesiredGridCoord(position, dim);
      const assigned = this.findNearestFreeGridCoord(desired, occupied);
      occupied.add(this.gridCoordKey(assigned));

      const world = this.convertTsneToWorldCoordinates([assigned.x, assigned.y], dim);
      position.x = world.x;
      position.y = world.y;
      position.gridKey = `tsne-${assigned.x}-${assigned.y}`;
      position.metadata = {
        ...(position.metadata || {}),
        tsneAssignedGridPos: [assigned.x, assigned.y],
      };
    }

    return resolved;
  }

  /**
   * Determine the desired integer grid coordinate for a position.
   * Uses native TSNE grid position when available; otherwise rounds from world-space.
   */
  private getDesiredGridCoord(position: LayoutPosition, dim: [number, number]): { x: number; y: number } {
    const tsnePosition = position.metadata?.['tsnePosition'];
    if (Array.isArray(tsnePosition) && tsnePosition.length === 2) {
      return {
        x: Math.round(Number(tsnePosition[0])),
        y: Math.round(Number(tsnePosition[1])),
      };
    }

    return this.worldToGridCoordinates(position.x, position.y, dim);
  }

  /** Convert world coordinates back to nearest integer TSNE grid coordinate. */
  private worldToGridCoordinates(worldX: number, worldY: number, dim: [number, number]): { x: number; y: number } {
    const [maxGridX, maxGridY] = dim;
    const centerOffsetX = (maxGridX - 1) * this.cellW / 2 + this.cellW / 4;
    const centerOffsetY = (maxGridY - 1) * this.cellH / 2;

    // Estimate gridY first, then correct for the hex row offset when computing gridX.
    const gridY = Math.round((centerOffsetY - worldY) / this.cellH);
    const hexOffsetX = (gridY % 2 !== 0) ? this.cellW / 2 : 0;
    const gridX = Math.round((worldX + centerOffsetX - hexOffsetX) / this.cellW);

    return { x: gridX, y: gridY };
  }

  /** Find the nearest unoccupied grid coordinate using deterministic hex-spiral expansion. */
  private findNearestFreeGridCoord(
    desired: { x: number; y: number },
    occupied: Set<string>
  ): { x: number; y: number } {
    const desiredKey = this.gridCoordKey(desired);
    if (!occupied.has(desiredKey)) return desired;

    let ring = 1;
    while (ring < 1024) {
      let q = desired.x - ring;
      let r = desired.y + ring;

      const dirs: ReadonlyArray<readonly [number, number]> = [
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
      ];

      for (let d = 0; d < dirs.length; d++) {
        const [dq, dr] = dirs[d];
        for (let step = 0; step < ring; step++) {
          const candidate = { x: q, y: r };
          if (!occupied.has(this.gridCoordKey(candidate))) {
            return candidate;
          }
          q += dq;
          r += dr;
        }
      }

      ring += 1;
    }

    // Should be practically unreachable; keeps function total in pathological cases.
    return { x: desired.x, y: desired.y + 2048 };
  }

  private gridCoordKey(coord: { x: number; y: number }): string {
    return `${coord.x}:${coord.y}`;
  }

  /**
   * Fetch layout data from web service (WebServiceLayoutStrategy interface)
   */
  fetchLayoutData(photos: PhotoData[]): Observable<{ [photoId: string]: LayoutPosition | null }> {
    return from(this.getAllPositionsAsMap(photos));
  }

  /**
   * Converts TSNE grid coordinates to Three.js world coordinates.
   * Uses a hexbin (offset-row) layout: odd rows are shifted right by half
   * a cell width to produce the classic brick/beehive stagger.
   */
  private convertTsneToWorldCoordinates(
    tsnePos: [number, number], 
    gridDim: [number, number]
  ): { x: number; y: number } {
    const [gridX, gridY] = tsnePos;
    const [maxGridX, maxGridY] = gridDim;
    
    // Hexbin offset: odd rows are shifted right by half a cell width.
    const hexOffsetX = (Math.round(gridY) % 2 !== 0) ? this.cellW / 2 : 0;

    // Center the grid around origin. The extra cellW/4 accounts for the average
    // half-cell shift across odd/even rows so the overall layout stays centred.
    const centerOffsetX = (maxGridX - 1) * this.cellW / 2 + this.cellW / 4;
    const centerOffsetY = (maxGridY - 1) * this.cellH / 2;
    
    const worldX = gridX * this.cellW + hexOffsetX - centerOffsetX;
    const worldY = centerOffsetY - gridY * this.cellH; // Flip Y axis for screen coordinates
    
    return { x: worldX, y: worldY };
  }

  /**
   * Gets all positions as a map (for WebServiceLayoutStrategy interface)
   */
  private async getAllPositionsAsMap(photos: PhotoData[]): Promise<{ [photoId: string]: LayoutPosition | null }> {
    await this.fetchTsneData();
    
    if (!this.tsneData) {
      throw new Error('TSNE data not available');
    }

    const positions: { [photoId: string]: LayoutPosition | null } = {};
    
    for (const photo of photos) {
      const position = await this.getPositionForPhoto(photo, photos);
      positions[photo.id] = position;
    }
    
    return positions;
  }
  
  /**
   * Gets the layout bounds based on TSNE data
   */
  async getLayoutBounds(): Promise<{ width: number; height: number }> {
    await this.fetchTsneData();
    
    if (!this.tsneData) {
      return { width: this.cellW * 10, height: this.cellH * 10 }; // Default fallback
    }

    // Calculate dimensions based on TSNE grid size using actual cell dimensions
    const [maxGridX, maxGridY] = this.tsneData.dim;
    
    // Extra cellW/2 for the hex row offset on odd rows.
    const width = maxGridX * this.cellW + this.cellW / 2;
    const height = maxGridY * this.cellH;
    
    return { width, height };
  }  /**
   * Updates the workspace ID and reloads TSNE data
   */
  async setWorkspaceId(workspaceId: string): Promise<void> {
    if (this.workspaceId === workspaceId) {
      return;
    }
    
    this.workspaceId = workspaceId;
    this.workspaceConfigUrl = `${this.baseUrl}/tiles/${this.workspaceId}/config.json`;
    this.tsneData = null;
    this.currentStateHash = null;
    this.currentSetId = null;
    this.tsneConfigUrl = null;
    this.isLoading = false;
    this.loadPromise = null;
    
    // Preload new data
    await this.fetchTsneData();
  }

  /**
   * Gets the current workspace ID
   */
  getWorkspaceId(): string {
    return this.workspaceId;
  }

  /**
   * Gets information about the loaded TSNE configuration
   */
  getTsneInfo(): TsneInfo | null {
    if (!this.tsneData) {
      return null;
    }
    
    return {
      workspaceId: this.workspaceId,
      gridSize: this.tsneData.dim,
      itemCount: this.tsneData.grid.length,
      workspaceConfigUrl: this.workspaceConfigUrl,
      tsneConfigUrl: this.tsneConfigUrl || 'not set',
      setId: this.currentSetId || -1,
      stateHash: this.currentStateHash || 'not set'
    };
  }

  /**
   * Returns the world-space position for an item by its ID, or null if not found.
   * Requires that TSNE data has been loaded (call fetchTsneData / initialize first).
   */
  getWorldPositionForId(id: string): { x: number; y: number } | null {
    if (!this.tsneData) return null;
    const item = this.tsneData.grid.find(g => g.id === id);
    if (!item) return null;
    return this.convertTsneToWorldCoordinates(item.pos, this.tsneData.dim);
  }

  /**
   * Returns the cluster regions defined in the TSNE configuration, converted to
   * world-space centre coordinates and approximate sizes.
   * Returns an empty array if no clusters are defined or data has not been loaded.
   */
  getClustersWithWorldCoords(): TsneClusterWithWorldCoords[] {
    if (!this.tsneData || !this.tsneData.clusters) return [];
    const dim = this.tsneData.dim;
    return this.tsneData.clusters.map(cluster => {
      const [[x1, y1], [x2, y2]] = cluster.bounds;
      const gridCenterX = (x1 + x2) / 2;
      const gridCenterY = (y1 + y2) / 2;
      const center = this.convertTsneToWorldCoordinates([gridCenterX, gridCenterY], dim);
      const topLeft = this.convertTsneToWorldCoordinates([x1, y1], dim);
      const bottomRight = this.convertTsneToWorldCoordinates([x2, y2], dim);
      return {
        title: cluster.title,
        centerX: center.x,
        centerY: center.y,
        halfW: Math.abs(bottomRight.x - topLeft.x) / 2,
        halfH: Math.abs(bottomRight.y - topLeft.y) / 2,
      };
    });
  }
}

/**
 * Interface for TSNE configuration data structure
 */
interface TsneConfigData {
  dim: [number, number];
  grid: TsneGridItem[];
  padding_ratio: number;
  conversion_ratio: [number, number];
  cell_ratios: [number, number];
  clusters?: TsneClusterItem[];
}

/**
 * Interface for a cluster region in the TSNE configuration
 */
interface TsneClusterItem {
  title: { english: string; dutch?: string; hebrew?: string; arabic?: string };
  bounds: [[number, number], [number, number]]; // [[x_min, y_min], [x_max, y_max]] in grid coords
  average_rotation?: number;
  geo_bounds?: [[number, number], [number, number]];
}

/**
 * A cluster with world-space center coordinates (resolved from grid coordinates)
 */
export interface TsneClusterWithWorldCoords {
  title: { english: string; dutch?: string; hebrew?: string; arabic?: string };
  /** Center of the cluster in Three.js world coordinates */
  centerX: number;
  centerY: number;
  /** Approximate half-width/height of the cluster region in world units */
  halfW: number;
  halfH: number;
}

/**
 * Interface for individual grid items in TSNE data
 */
interface TsneGridItem {
  pos: [number, number];
  id: string;
  metadata?: {
    rotate?: number;
    sign?: number;
    mostly?: boolean;
    favorable_future?: string;
    timestamp?: string;
    lang?: string;
    url?: string;
  };
  geo_pos?: [number, number];
  geo_bounds?: [[number, number], [number, number]];
}

/**
 * Interface for workspace configuration data
 */
interface WorkspaceConfig {
  set_id: number;
  state_hash: string;
}

/**
 * Information about the loaded TSNE configuration
 */
export interface TsneInfo {
  workspaceId: string;
  gridSize: [number, number];
  itemCount: number;
  workspaceConfigUrl: string;
  tsneConfigUrl: string;
  setId: number;
  stateHash: string;
}
