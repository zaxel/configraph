import { meshGroup, OptionsComponent, Product } from "../../model";
import { SelectedOptions } from "../../model/selections.types";
import { ResolvedParts } from "../types/resolved.types";


export function resolvePartMeshes(product: Product, selectedOptions: SelectedOptions): ResolvedParts {
  const result: ResolvedParts = [];

  const partsModule = product.modules.find(m => m.type === "parts");
  if (!partsModule) return result;

  const partsComponent = partsModule.components.find(c => c.type === "parts") as PartsComponent | undefined;
  if (!partsComponent) return result;

  for (const partId in selectedOptions.parts.items) {
    const item = selectedOptions.parts.items[partId];

    const part = partsComponent.options.find((p: OptionsComponent) => p.id === partId);
    if (!part) continue;

    const group = part.groups.find((g: meshGroup) => g.id === item.groupId);
    if (!group) continue;

    result.push({
      partId,
      meshes: group.meshes,
      color: item.color ?? "#000",
    });
  }

  return result;
}
