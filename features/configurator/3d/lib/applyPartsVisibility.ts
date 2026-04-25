import { DefaultParts } from "../../model/product.types";
import { MeshRegistry } from "../../ui/registry.types";

export function applyPartsVisibility(
  registry: MeshRegistry,
  selections: DefaultParts["selections"]
) {
  // Hide all groups mentioned in config first
  registry.byGroup.forEach((meshes) => {
    meshes.forEach((m) => (m.visible = false));
  });

  // Show only enabled ones
  for (const { groupId, enabled } of Object.values(selections)) {
    if (!enabled) continue;
    registry.byGroup.get(groupId)?.forEach((m) => (m.visible = true));
  }
}