import * as THREE from "three"
import { MeshRegistry } from "../../ui/registry.types"

export function buildRegistry(scene: THREE.Object3D): MeshRegistry {
  const byName = new Map<string, THREE.Mesh>()

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      byName.set(mesh.name, mesh)
    }
  })

  return { byName }
}