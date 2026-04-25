import { useMemo } from "react"
import { buildRegistry } from "../lib/buildRegistry"
import { GLTF } from "three-stdlib";
import { useConfiguratorStore } from "../../store/configurator.store";

export default function useMeshRegistry(gltf: GLTF) {
    const product = useConfiguratorStore(s => s.product);
  
  return useMemo(() => {
    if (!gltf?.scene || !product) return null;
    return buildRegistry(gltf.scene, product);
  }, [gltf, product])
}