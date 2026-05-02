import { MeshRegistry } from "@/features/viewer/types/registry.types";
import * as THREE from "three";

export const useMeshDebugger = (registry: MeshRegistry, enabled: boolean) => {
  const toggleVisibility = (name: string) => {
    if (!enabled) return;

    const obj = registry.byName.get(name);
    if (!obj || !(obj as THREE.Mesh).isMesh) return;

    obj.visible = !obj.visible;
  };

  const highlight = (name: string) => {
    if (!enabled) return;

    const obj = registry.byName.get(name);
    if (!obj || !(obj as THREE.Mesh).isMesh) return;

    const mesh = obj as THREE.Mesh;

    mesh.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
  };

  return { toggleVisibility, highlight };
};