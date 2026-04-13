import { LayoutStrategy, LayoutPosition, LayoutConfiguration } from './layout-strategy.interface';
import { PhotoData } from './photo-data';
import { PHOTO_CONSTANTS } from './photo-constants';

const THEME_CLUSTER_GAP_FACTOR = 6.0;
const SUBTHEME_CLUSTER_MARGIN_FACTOR = 0.9;
const HEXBIN_STEP_X_FACTOR = 1.122;
const HEXBIN_STEP_Y_FACTOR = 1.1;

/**
 * Force-directed thematic layout.
 *
 * Items attract based on shared taxonomy and repel otherwise, producing an
 * entangled map where related topics form neighborhoods without rigid bands.
 */
export class TaxonomyLayoutStrategy extends LayoutStrategy {
  private readonly photoWidth: number;
  private readonly photoHeight: number;
  private readonly spacingX: number;
  private readonly spacingY: number;
  private readonly cellW: number;
  private readonly cellH: number;

  /** Cache populated by calculateAllPositions; keyed by photo ID. */
  private positionCache = new Map<string, { x: number; y: number }>();
  private themeLabelCache = new Map<string, TaxonomyLabelNodePosition>();
  private subThemeLabelCache = new Map<string, TaxonomyLabelNodePosition>();

  constructor(
    options: {
      photoWidth?: number;
      photoHeight?: number;
      spacingX?: number;
      spacingY?: number;
    } = {}
  ) {
    super();
    this.photoWidth = options.photoWidth ?? PHOTO_CONSTANTS.PHOTO_WIDTH;
    this.photoHeight = options.photoHeight ?? PHOTO_CONSTANTS.PHOTO_HEIGHT;
    this.spacingX = options.spacingX ?? PHOTO_CONSTANTS.SPACING_X;
    this.spacingY = options.spacingY ?? PHOTO_CONSTANTS.SPACING_Y;
    this.cellW = this.photoWidth + this.spacingX;
    this.cellH = this.photoHeight + this.spacingY;
  }

  getConfiguration(): LayoutConfiguration {
    return {
      name: 'tsne',
      displayName: 'Thematic Layout',
      description: 'Groups photos by taxonomy theme and sub-topic',
      supportsInteraction: false,
      requiresWebService: false,
      settings: {}
    };
  }

  /**
   * Returns the cached world position for a photo by ID.
   * Only works after calculateAllPositions has been called.
   */
  async getPositionForPhoto(
    photo: PhotoData,
    _existingPhotos: PhotoData[]
  ): Promise<LayoutPosition | null> {
    const cached = this.positionCache.get(photo.id);
    if (!cached) return null;
    return { x: cached.x, y: cached.y, gridKey: `taxonomy-${photo.id}` };
  }

  /**
   * Primary entry point. Groups all photos by taxonomy and assigns deterministic
   * non-overlapping grid positions so items cluster by theme then by sub-topic.
   */
  async calculateAllPositions(photos: PhotoData[]): Promise<(LayoutPosition | null)[]> {
    const nodes = photos.map(photo => this.createNode(photo));
    const { themeNodes, subThemeNodes, themeGroups, subThemeGroups } = this.createLabelNodes(nodes);
    this.linkPhotosToLabelNodes(nodes, themeNodes, subThemeNodes);

    this.layoutThemeNodes(themeNodes);
    this.layoutSubThemeNodes(themeNodes, subThemeNodes, subThemeGroups);
    this.layoutPhotosAsHexbin(subThemeGroups);
    this.flattenPhotosToGlobalHexGrid(nodes, subThemeNodes);
    this.centerAllNodes(nodes, themeNodes, subThemeNodes);

    this.positionCache.clear();
    this.themeLabelCache.clear();
    this.subThemeLabelCache.clear();

    for (const label of themeNodes) {
      this.themeLabelCache.set(label.id, {
        id: label.id,
        worldX: label.x,
        worldY: label.y,
        itemCount: label.itemCount,
      });
    }

    for (const label of subThemeNodes) {
      this.subThemeLabelCache.set(label.id, {
        id: label.id,
        worldX: label.x,
        worldY: label.y,
        itemCount: label.itemCount,
      });
    }

    const positions: (LayoutPosition | null)[] = nodes.map(node => {
      const world = { x: node.x, y: node.y };
      this.positionCache.set(node.photo.id, world);
      return {
        x: world.x,
        y: world.y,
        gridKey: `taxonomy-${node.photo.id}`,
      };
    });

    return positions;
  }

  getThemeLabelNodes(): TaxonomyLabelNodePosition[] {
    return [...this.themeLabelCache.values()];
  }

  getSubThemeLabelNodes(): TaxonomyLabelNodePosition[] {
    return [...this.subThemeLabelCache.values()];
  }

  /**
   * Returns the world-space position for a photo by ID.
   * Populated after `calculateAllPositions()` is called.
   */
  getWorldPositionForId(id: string): { x: number; y: number } | null {
    return this.positionCache.get(id) ?? null;
  }

  /**
   * No server-defined cluster regions are used — labels are derived from photo
   * world-position centroids in the component's `computeTaxonomyLabels` method.
   */
  getClustersWithWorldCoords(): TaxonomyClusterWithWorldCoords[] {
    return [];
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private createNode(photo: PhotoData): TaxonomyNode {
    const topics = this.extractTopics(photo);
    const themes = new Set([...topics].map(topic => topic.split('/')[0]));
    const primaryTopic = [...topics][0] ?? null;
    const primaryTheme = primaryTopic ? primaryTopic.split('/')[0] : null;

    // Deterministic seed position based on primary theme and photo id.
    const themeAngle = this.hashToUnit(primaryTheme ?? 'unthemed') * Math.PI * 2;
    const themeRadius = Math.max(this.cellW, this.cellH) * 1.8;
    const jitterR = Math.max(this.cellW, this.cellH) * (0.4 + this.hashToUnit(photo.id + '-r') * 0.8);
    const jitterA = this.hashToUnit(photo.id + '-a') * Math.PI * 2;

    return {
      photo,
      topics,
      themes,
      primaryTopic,
      primaryTheme,
      themeNodes: [],
      subThemeNodes: [],
      x: Math.cos(themeAngle) * themeRadius + Math.cos(jitterA) * jitterR,
      y: Math.sin(themeAngle) * themeRadius + Math.sin(jitterA) * jitterR,
      vx: 0,
      vy: 0,
    };
  }

  private extractTopics(photo: PhotoData): Set<string> {
    const rawTopics = photo.metadata['topics'];
    const topics = Array.isArray(rawTopics) ? rawTopics : [];
    return new Set(
      topics
        .map((t: unknown) => String(t || '').trim())
        .filter((t: string) => t.length > 0)
    );
  }

  private centerAllNodes(
    nodes: TaxonomyNode[],
    themeNodes: TaxonomyLabelNode[],
    subThemeNodes: TaxonomyLabelNode[],
  ): void {
    const allNodes: Array<{ x: number; y: number }> = [...nodes, ...themeNodes, ...subThemeNodes];
    if (allNodes.length === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const n of allNodes) {
      if (n.x < minX) minX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.x > maxX) maxX = n.x;
      if (n.y > maxY) maxY = n.y;
    }

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    for (const n of allNodes) {
      n.x -= cx;
      n.y -= cy;
    }
  }

  private createLabelNodes(nodes: TaxonomyNode[]): {
    themeNodes: TaxonomyLabelNode[];
    subThemeNodes: TaxonomyLabelNode[];
    themeGroups: Map<string, TaxonomyNode[]>;
    subThemeGroups: Map<string, TaxonomyNode[]>;
  } {
    const themeCounts = new Map<string, number>();
    const subThemeCounts = new Map<string, number>();
    const themeGroups = new Map<string, TaxonomyNode[]>();
    const subThemeGroups = new Map<string, TaxonomyNode[]>();

    for (const node of nodes) {
      const primaryTheme = node.primaryTheme ?? '__unthemed';
      const primaryTopic = node.primaryTopic ?? `${primaryTheme}/__untopiced`;
      themeCounts.set(primaryTheme, (themeCounts.get(primaryTheme) ?? 0) + 1);
      subThemeCounts.set(primaryTopic, (subThemeCounts.get(primaryTopic) ?? 0) + 1);
      if (!themeGroups.has(primaryTheme)) themeGroups.set(primaryTheme, []);
      if (!subThemeGroups.has(primaryTopic)) subThemeGroups.set(primaryTopic, []);
      themeGroups.get(primaryTheme)!.push(node);
      subThemeGroups.get(primaryTopic)!.push(node);
    }

    const themeNodes = [...themeCounts.entries()].map(([themeId, count]) => {
      return {
        id: themeId,
        themeId,
        itemCount: count,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      };
    });

    const subThemeNodes = [...subThemeCounts.entries()].map(([topicId, count]) => {
      const themeId = topicId.split('/')[0] || '__unthemed';
      return {
        id: topicId,
        themeId,
        itemCount: count,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      };
    });

    return { themeNodes, subThemeNodes, themeGroups, subThemeGroups };
  }

  private layoutThemeNodes(themeNodes: TaxonomyLabelNode[]): void {
    const gap = Math.max(this.cellW, this.cellH) * THEME_CLUSTER_GAP_FACTOR;
    const sorted = [...themeNodes].sort((a, b) => b.itemCount - a.itemCount || a.id.localeCompare(b.id));
    const positions = this.generateHexSpiralCoords(sorted.length);

    for (let i = 0; i < sorted.length; i++) {
      const p = positions[i];
      sorted[i].x = (p.q + p.r * 0.5) * gap;
      sorted[i].y = p.r * gap * 0.9;
    }
  }

  private layoutSubThemeNodes(
    themeNodes: TaxonomyLabelNode[],
    subThemeNodes: TaxonomyLabelNode[],
    subThemeGroups: Map<string, TaxonomyNode[]>
  ): void {
    const themeLookup = new Map(themeNodes.map(node => [node.id, node]));
    const groupsByTheme = new Map<string, TaxonomyLabelNode[]>();
    for (const subThemeNode of subThemeNodes) {
      const themeId = subThemeNode.themeId ?? '__unthemed';
      if (!groupsByTheme.has(themeId)) groupsByTheme.set(themeId, []);
      groupsByTheme.get(themeId)!.push(subThemeNode);
    }

    const baseRadius = Math.max(this.cellW, this.cellH) * 0.65;
    const margin = Math.max(this.cellW, this.cellH) * SUBTHEME_CLUSTER_MARGIN_FACTOR;

    for (const [themeId, list] of groupsByTheme.entries()) {
      const anchor = themeLookup.get(themeId);
      if (!anchor) continue;

      const placed: Array<{ x: number; y: number; radius: number }> = [];
      const sorted = [...list].sort((a, b) => b.itemCount - a.itemCount || a.id.localeCompare(b.id));

      for (const node of sorted) {
        const clusterSize = (subThemeGroups.get(node.id)?.length ?? node.itemCount) + 1;
        const ringCount = this.hexRingsForCount(clusterSize);
        const nodeRadius = (ringCount + 1) * baseRadius;

        const placement = this.findNonOverlappingPlacement(anchor.x, anchor.y, nodeRadius, placed, margin, node.id);
        node.x = placement.x;
        node.y = placement.y;
        placed.push({ x: node.x, y: node.y, radius: nodeRadius });
      }
    }
  }

  private layoutPhotosAsHexbin(subThemeGroups: Map<string, TaxonomyNode[]>): void {
    const stepX = this.cellW * HEXBIN_STEP_X_FACTOR;
    const stepY = this.cellH * HEXBIN_STEP_Y_FACTOR;

    for (const [_, members] of subThemeGroups.entries()) {
      if (members.length === 0) continue;

      const anchor = members[0].subThemeNodes[0] ?? members[0].themeNodes[0] ?? null;
      if (!anchor) continue;

      const sorted = [...members].sort((a, b) => a.photo.id.localeCompare(b.photo.id));
      const coords = this.generateHexSpiralCoords(sorted.length + 1).slice(1);

      for (let i = 0; i < sorted.length; i++) {
        const c = coords[i];
        sorted[i].x = anchor.x + (c.q + c.r * 0.5) * stepX;
        sorted[i].y = anchor.y + c.r * stepY;
      }
    }
  }

  private flattenPhotosToGlobalHexGrid(
    nodes: TaxonomyNode[],
    subThemeNodes: TaxonomyLabelNode[]
  ): void {
    const stepX = this.cellW * HEXBIN_STEP_X_FACTOR;
    const stepY = this.cellH * HEXBIN_STEP_Y_FACTOR;
    const occupied = new Set<string>();

    for (const labelNode of subThemeNodes) {
      const anchorHex = this.roundAxial(
        (labelNode.x / stepX) - (labelNode.y / stepY) * 0.5,
        labelNode.y / stepY,
      );
      occupied.add(this.hexKey(anchorHex.q, anchorHex.r));
    }

    const sorted = [...nodes].sort((a, b) => {
      const topicCompare = (a.primaryTopic ?? '').localeCompare(b.primaryTopic ?? '');
      if (topicCompare !== 0) return topicCompare;
      return a.photo.id.localeCompare(b.photo.id);
    });

    for (const node of sorted) {
      const desired = this.roundAxial(
        (node.x / stepX) - (node.y / stepY) * 0.5,
        node.y / stepY,
      );
      const target = this.findNearestFreeHex(desired.q, desired.r, occupied);
      node.x = (target.q + target.r * 0.5) * stepX;
      node.y = target.r * stepY;
      occupied.add(this.hexKey(target.q, target.r));
    }
  }

  private findNonOverlappingPlacement(
    centerX: number,
    centerY: number,
    radius: number,
    placed: Array<{ x: number; y: number; radius: number }>,
    margin: number,
    seed: string
  ): { x: number; y: number } {
    if (placed.length === 0) {
      return { x: centerX, y: centerY };
    }

    const baseStep = Math.max(this.cellW, this.cellH) * 1.1;
    const angleOffset = this.hashToUnit(`placement-${seed}`) * Math.PI * 2;

    for (let ring = 1; ring < 80; ring++) {
      const sampleCount = Math.max(6, ring * 12);
      const radial = ring * baseStep;
      for (let i = 0; i < sampleCount; i++) {
        const angle = angleOffset + (Math.PI * 2 * i) / sampleCount;
        const x = centerX + Math.cos(angle) * radial;
        const y = centerY + Math.sin(angle) * radial;

        const collision = placed.some(p => {
          const dx = x - p.x;
          const dy = y - p.y;
          const minDist = radius + p.radius + margin;
          return dx * dx + dy * dy < minDist * minDist;
        });

        if (!collision) {
          return { x, y };
        }
      }
    }

    return { x: centerX, y: centerY };
  }

  private hexRingsForCount(count: number): number {
    if (count <= 1) return 0;
    let rings = 0;
    let capacity = 1;
    while (capacity < count) {
      rings += 1;
      capacity += rings * 6;
    }
    return rings;
  }

  private findNearestFreeHex(
    q: number,
    r: number,
    occupied: Set<string>
  ): { q: number; r: number } {
    for (const offset of this.generateHexSpiralCoords(2000)) {
      const candidate = { q: q + offset.q, r: r + offset.r };
      if (!occupied.has(this.hexKey(candidate.q, candidate.r))) {
        return candidate;
      }
    }

    return { q, r };
  }

  private roundAxial(q: number, r: number): { q: number; r: number } {
    const x = q;
    const z = r;
    const y = -x - z;

    let rx = Math.round(x);
    let ry = Math.round(y);
    let rz = Math.round(z);

    const xDiff = Math.abs(rx - x);
    const yDiff = Math.abs(ry - y);
    const zDiff = Math.abs(rz - z);

    if (xDiff > yDiff && xDiff > zDiff) {
      rx = -ry - rz;
    } else if (yDiff > zDiff) {
      ry = -rx - rz;
    } else {
      rz = -rx - ry;
    }

    return { q: rx, r: rz };
  }

  private hexKey(q: number, r: number): string {
    return `${q},${r}`;
  }

  private generateHexSpiralCoords(count: number): Array<{ q: number; r: number }> {
    if (count <= 0) return [];

    const results: Array<{ q: number; r: number }> = [{ q: 0, r: 0 }];
    if (count === 1) return results;

    const dirs: Array<{ dq: number; dr: number }> = [
      { dq: 1, dr: 0 },
      { dq: 1, dr: -1 },
      { dq: 0, dr: -1 },
      { dq: -1, dr: 0 },
      { dq: -1, dr: 1 },
      { dq: 0, dr: 1 },
    ];

    let ring = 1;
    while (results.length < count) {
      let q = -ring;
      let r = ring;
      for (let d = 0; d < dirs.length && results.length < count; d++) {
        const { dq, dr } = dirs[d];
        for (let step = 0; step < ring && results.length < count; step++) {
          results.push({ q, r });
          q += dq;
          r += dr;
        }
      }
      ring += 1;
    }

    return results;
  }

  private linkPhotosToLabelNodes(
    nodes: TaxonomyNode[],
    themeNodes: TaxonomyLabelNode[],
    subThemeNodes: TaxonomyLabelNode[]
  ): void {
    const themeLookup = new Map(themeNodes.map(node => [node.id, node]));
    const subThemeLookup = new Map(subThemeNodes.map(node => [node.id, node]));

    for (const node of nodes) {
      node.themeNodes = [...node.themes]
        .map(theme => themeLookup.get(theme))
        .filter((entry): entry is TaxonomyLabelNode => !!entry);

      node.subThemeNodes = [...node.topics]
        .map(topic => subThemeLookup.get(topic))
        .filter((entry): entry is TaxonomyLabelNode => !!entry);
    }
  }

  private hashToUnit(input: string): number {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const normalized = (hash >>> 0) / 4294967295;
    return normalized;
  }
}

interface TaxonomyClusterWithWorldCoords {
  title: { english: string; dutch?: string; hebrew?: string; arabic?: string };
  centerX: number;
  centerY: number;
  halfW: number;
  halfH: number;
}

interface TaxonomyNode {
  photo: PhotoData;
  topics: Set<string>;
  themes: Set<string>;
  primaryTopic: string | null;
  primaryTheme: string | null;
  themeNodes: TaxonomyLabelNode[];
  subThemeNodes: TaxonomyLabelNode[];
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface TaxonomyLabelNode extends ForcePoint {
  id: string;
  themeId?: string;
  itemCount: number;
}

interface ForcePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface TaxonomyLabelNodePosition {
  id: string;
  worldX: number;
  worldY: number;
  itemCount: number;
}
