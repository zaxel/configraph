import * as THREE from "three"

export type MeshRegistry = {
  byName: Map<string, THREE.Mesh>
}