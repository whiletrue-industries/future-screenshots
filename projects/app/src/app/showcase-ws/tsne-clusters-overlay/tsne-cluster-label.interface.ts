/** A t-SNE cluster label positioned in Three.js world space. */
export interface TsneClusterLabel {
  /** Unique identifier for the cluster. */
  id: string;
  /** Cluster title in the active locale. */
  name: string;
  /** Three.js world-space coordinates of the cluster centre. */
  worldX: number;
  worldY: number;
  /** Width of the cluster region in world units – drives font size. */
  worldWidth: number;
  /** Mean item rotation (degrees) in the cluster – drives label tilt and colour. */
  rotationDeg: number;
}
