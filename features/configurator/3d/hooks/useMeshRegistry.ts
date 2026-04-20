import { useMemo } from "react"
import { buildRegistry } from "../lib/buildRegistry"
import { GLTF } from "three-stdlib";

export default function useMeshRegistry(gltf: GLTF) {
  return useMemo(() => {
    if (!gltf?.scene) return null;
    return buildRegistry(gltf.scene);
  }, [gltf])
}