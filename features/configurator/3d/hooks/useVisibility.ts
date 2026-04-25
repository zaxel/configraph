import { useEffect } from "react";
import { useConfiguratorStore } from "../../store/configurator.store";
import { MeshRegistry } from "../../ui/registry.types";
import { applyPartsVisibility } from "../lib/applyPartsVisibility";

export function useVisibility({registry}: {registry: MeshRegistry | null}) {
  const selections = useConfiguratorStore(s => s.selectedOptions.parts.items);

  useEffect(() => {
    if (!registry) return;
    applyPartsVisibility(registry, selections);
  }, [registry, selections]);
}