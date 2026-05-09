import { PartsComponent, Product } from "@/features/configurator/model";
import { isComponentType } from "@/features/configurator/model/component.guards";

export const findPartsColorVariant = (
  draft: Product,
  moduleId: string,
  optionId: string,
  groupId: string,
  variantId: string
) => {
  const mod = draft.modules.find(m => m.instanceId === moduleId);
  const component = mod?.components.find(c => isComponentType(c, "parts")) as PartsComponent | undefined;
  const option = component?.options.find(o => o.id === optionId);
  const group = option?.groups.find(g => g.id === groupId);
  if(!group)return;
  return group.colors?.variants?.find(v => v.id === variantId);
};

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

export const findPartsOption = (
  draft: Product,
  moduleId: string,
  optionId: string,
) => {
  const mod = draft.modules.find(m => m.instanceId === moduleId);
  const component = mod?.components.find(c => isComponentType(c, "parts")) as PartsComponent | undefined;
  return component?.options.find(o => o.id === optionId);
};

export const findPartsComponent = (
  draft: Product,
  moduleId: string,
) => { 
  const mod = draft.modules.find(m => m.instanceId === moduleId);
  const component = mod?.components.find(c => isComponentType(c, "parts")) as PartsComponent | undefined;
  return component;
};