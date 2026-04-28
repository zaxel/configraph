import { useEffect } from "react";
import { applyPartsVisibility } from "../lib/applyPartsVisibility";
import { MeshRegistry } from "@/features/viewer/types/registry.types";
import { DefaultParts } from "@/features/configurator/model";

type VisibilityProps = {
  registry: MeshRegistry | null, 
  enabled: boolean,
  selections: DefaultParts["selections"]

}

export function useVisibility({registry, selections, enabled}: VisibilityProps) {

  useEffect(() => {
    if (!registry || !enabled || !selections) return;
    applyPartsVisibility(registry, selections);
  }, [registry, selections, enabled]);
}