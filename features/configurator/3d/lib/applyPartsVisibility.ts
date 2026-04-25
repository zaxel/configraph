import { DefaultParts } from "../../model/product.types";
import { MeshRegistry } from "../../ui/registry.types";

export function applyPartsVisibility(
  registry: MeshRegistry,
  selections: DefaultParts["selections"]
) {
  // 1. Hide ONLY meshes that belong to configurable parts
  registry.byPart.forEach((meshes) => {
    meshes.forEach((m) => (m.visible = false));
  });

  // 2. Show ONLY selected group meshes
  for (const partId in selections) {
    const selection = selections[partId];
    if (!selection?.enabled) continue;

    const meshes = registry.byGroup.get(selection.groupId);
    meshes?.forEach((m) => (m.visible = true));
  }

}


