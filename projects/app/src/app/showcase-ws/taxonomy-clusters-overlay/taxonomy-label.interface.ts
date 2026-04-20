/** A single cluster label positioned in Three.js world space. */
export interface TaxonomyClusterLabel {
  /** Unique identifier for the cluster (e.g. taxonomy theme/sub-theme ID). */
  id: string;
  /** Display name of the cluster in the active locale. */
  name: string;
  /** Three.js world-space X coordinate of the cluster centre. */
  worldX: number;
  /** Three.js world-space Y coordinate of the cluster centre. */
  worldY: number;
  /** Number of items in this cluster – used to scale label prominence. */
  itemCount: number;
}
