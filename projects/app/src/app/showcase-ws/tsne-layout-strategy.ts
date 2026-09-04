import { LayoutStrategy, LayoutPosition, LayoutConfiguration, WebServiceLayoutStrategy } from './layout-strategy.interface';
import { PhotoData } from './photo-data';
import { Observable, from } from 'rxjs';
import { PHOTO_CONSTANTS } from './photo-constants';

/**
 * TSNE Layout Strategy that positions photos according to the t-SNE embedding
 * precalculated server-side and published alongside the map tiles.
 *
 * The same data backs the raster tiles rendered by the Leaflet `/show` output map,
 * so this layout is a vector reproduction of that view inside the Three.js scene.
 * Items that are absent from the precalculated grid (e.g. added after the last
 * recalculation) are hidden rather than approximated.
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
      name: 'tsne-grid',
      displayName: 'TSNE Layout',
      description: 'Positions photos on the server-precalculated t-SNE grid',
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

      await this.loadSet(workspaceConfig);
    } catch (error) {
      console.error('Error fetching TSNE configuration:', error);
      throw error;
    }
  }

  /**
   * Fetches the set named by the workspace config and makes it current. The
   * tracking fields only move once the set has loaded, so a failed fetch
   * leaves the previous set in place and is retried on the next check.
   */
  private async loadSet(workspaceConfig: WorkspaceConfig): Promise<void> {
    const url = `${this.baseUrl}/tiles/${this.workspaceId}/${workspaceConfig.set_id}/config.json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch TSNE config: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.tsneData = this.validateTsneConfig(data);
    this.currentStateHash = workspaceConfig.state_hash;
    this.currentSetId = workspaceConfig.set_id;
    this.tsneConfigUrl = url;
  }

  /**
   * Re-reads the workspace config and, when the server has published a new set
   * (its `state_hash` changed), loads it. Returns true when the set changed and
   * the caller should re-run the layout. Returns false when nothing changed,
   * and also when a fetch failed: a transient error must not disturb the
   * layout currently on screen, and the next check will try again.
   */
  async refreshIfChanged(): Promise<boolean> {
    if (this.isLoading) {
      return false;
    }

    try {
      const workspaceConfig = await this.fetchWorkspaceConfig();
      if (this.currentStateHash === workspaceConfig.state_hash && this.tsneData) {
        return false;
      }

      this.isLoading = true;
      try {
        await this.loadSet(workspaceConfig);
      } finally {
        this.isLoading = false;
      }
      return true;
    } catch (error) {
      console.error('Error checking for a new TSNE set:', error);
      return false;
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
      cell_ratios: data.cell_ratios || [1, 1],
      clusters: Array.isArray(data.clusters) ? data.clusters as TsneClusterItem[] : []
    };
  }

  /**
   * Gets the position for a photo based on TSNE coordinates.
   * Returns null (i.e. hides the photo) for items missing from the precalculated grid.
   */
  async getPositionForPhoto(photo: PhotoData): Promise<LayoutPosition | null> {
    // Ensure TSNE data is loaded
    await this.fetchTsneData();

    if (!this.tsneData) {
      throw new Error('TSNE data not available');
    }

    const gridItem = this.tsneData.grid.find(item => item.id === photo.id);
    if (!gridItem) {
      return null;
    }

    const worldPos = this.convertTsneToWorldCoordinates(gridItem.pos, this.tsneData.dim);
    const rotateDeg = gridItem.metadata?.rotate;

    return {
      x: worldPos.x,
      y: worldPos.y,
      gridKey: `tsne-${gridItem.pos[0]}-${gridItem.pos[1]}`,
      metadata: {
        tsnePosition: gridItem.pos,
        // Consumed by ThreeRendererService when the layout rotation override is enabled,
        // so item tilt matches the server-rendered tiles exactly.
        _tsneRotateDeg: typeof rotateDeg === 'number' ? rotateDeg : undefined,
      }
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
      positions.push(await this.getPositionForPhoto(photo));
    }
    return positions;
  }

  /**
   * Fetch layout data from web service (WebServiceLayoutStrategy interface)
   */
  fetchLayoutData(photos: PhotoData[]): Observable<{ [photoId: string]: LayoutPosition | null }> {
    return from(this.getAllPositionsAsMap(photos));
  }

  /**
   * Converts TSNE grid coordinates to Three.js world coordinates.
   *
   * The layout is a hexbin (offset-row) grid, but the half-cell stagger of odd
   * rows is already baked into the published `pos[0]` values (odd rows end in
   * `.5`), so no extra offset is applied here.
   */
  private convertTsneToWorldCoordinates(
    tsnePos: [number, number],
    gridDim: [number, number]
  ): { x: number; y: number } {
    const [gridX, gridY] = tsnePos;
    const [maxGridX, maxGridY] = gridDim;

    // Center the grid around origin. The extra cellW/4 accounts for the average
    // half-cell shift across odd/even rows so the overall layout stays centred.
    const centerOffsetX = (maxGridX - 1) * this.cellW / 2 + this.cellW / 4;
    const centerOffsetY = (maxGridY - 1) * this.cellH / 2;

    const worldX = gridX * this.cellW - centerOffsetX;
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
      positions[photo.id] = await this.getPositionForPhoto(photo);
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
  }

  /**
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
   * Requires that TSNE data has been loaded (call initialize() first).
   */
  getWorldPositionForId(id: string): { x: number; y: number } | null {
    if (!this.tsneData) return null;
    const item = this.tsneData.grid.find(g => g.id === id);
    if (!item) return null;
    return this.convertTsneToWorldCoordinates(item.pos, this.tsneData.dim);
  }

  /**
   * Returns the cluster regions defined in the TSNE configuration, converted to
   * world-space centre coordinates and sizes.
   * Returns an empty array if no clusters are defined or data has not been loaded.
   */
  getClustersWithWorldCoords(): TsneClusterWithWorldCoords[] {
    if (!this.tsneData || !this.tsneData.clusters) return [];
    const dim = this.tsneData.dim;
    return this.tsneData.clusters.map(cluster => {
      const [[x1, y1], [x2, y2]] = cluster.bounds;
      const center = this.convertTsneToWorldCoordinates([(x1 + x2) / 2, (y1 + y2) / 2], dim);
      return {
        title: cluster.title,
        centerX: center.x,
        centerY: center.y,
        width: Math.abs(x2 - x1) * this.cellW,
        height: Math.abs(y2 - y1) * this.cellH,
        averageRotation: cluster.average_rotation ?? 0,
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
  clusters: TsneClusterItem[];
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
  /** Size of the cluster region in world units */
  width: number;
  height: number;
  /** Mean item rotation (degrees) within the cluster – drives label tilt and colour */
  averageRotation: number;
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
