import { useEffect } from "react";
import { applyPartsVisibility } from "../lib/applyPartsVisibility";
import { MeshRegistry } from "@/features/configurator/ui/registry.types";
import { useConfiguratorStore } from "@/features/configurator/store/configurator.store";

export function useVisibility({registry}: {registry: MeshRegistry | null}) {
  const selections = useConfiguratorStore(s => s.selectedOptions.parts.items);

  useEffect(() => {
    if (!registry) return;
    applyPartsVisibility(registry, selections);
  }, [registry, selections]);
}