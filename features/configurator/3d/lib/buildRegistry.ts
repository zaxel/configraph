import * as THREE from "three"
import { MeshRegistry } from "../../ui/registry.types"
import { PartsComponent, Product } from "../../model";

export function buildRegistry(scene: THREE.Object3D, product: Product): MeshRegistry {

  const byName = new Map<string, THREE.Mesh>();
  const byGroup = new Map<string, THREE.Mesh[]>();

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      byName.set(mesh.name, mesh)
    }
  })

  const partsModule = product.modules.find((m) => m.id === "parts");
  const partsComponent = partsModule?.components.find(
    (c): c is PartsComponent => c.type === "parts"
  );

  partsComponent?.options.forEach((part) => {
    part.groups.forEach((group) => {
      const meshes = group.meshes
        .map((name) => byName.get(name))
        .filter((m): m is THREE.Mesh => !!m);

      byGroup.set(group.id, meshes);
    });
  });

  return { byName, byGroup };
}