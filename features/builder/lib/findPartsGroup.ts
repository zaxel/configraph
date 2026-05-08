import { PartsComponent, Product } from "@/features/configurator/model";
import { isComponentType } from "@/features/configurator/model/component.guards";

export const findPartsGroup = (
  draft: Product,
  moduleId: string,
  optionId: string,
  groupId: string
) => {
  const mod = draft.modules.find(m => m.instanceId === moduleId);
  const component = mod?.components.find(c => isComponentType(c, "parts")) as PartsComponent | undefined;
  const option = component?.options.find(o => o.id === optionId);
  return option?.groups.find(g => g.id === groupId);
};