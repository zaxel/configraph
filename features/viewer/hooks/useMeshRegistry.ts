import { useMemo } from "react"
import { buildRegistry } from "../lib/buildRegistry"
import { GLTF } from "three-stdlib";
import { Product } from "@/features/configurator/model";

export default function useMeshRegistry(gltf: GLTF, product: Product | null | undefined) {
  return useMemo(() => {
    if (!gltf?.scene || !product) return null;
    return buildRegistry(gltf.scene, product);
  }, [gltf, product])
}