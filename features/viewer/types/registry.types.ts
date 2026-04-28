import * as THREE from "three"

export type MeshRegistry = {
  byName: Map<string, THREE.Mesh>,
  byGroup: Map<string, THREE.Mesh[]>,
  byPart: Map<string, THREE.Mesh[]>,
}