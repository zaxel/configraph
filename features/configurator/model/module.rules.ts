import { ComponentType } from "./components.types";
import { Product } from "./product.types";

export const MODULE_RULES = {
  size: { max: 1 },
  price: { max: 1 },
  parts: { max: 1 },
  addon: { max: 1 },
  content: { max: 10 },
  submit: { max: 1 },
} as const;

export function canAddModule(type: ComponentType, draft: Product) {
  const rule = MODULE_RULES[type as keyof typeof MODULE_RULES];
  if (!rule) return true;

  const count = draft.modules.filter((m) => m.id === type).length;
  return count < rule.max;
}