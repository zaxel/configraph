import { CanvasComponent, SelectedOptions } from "../model";
import { BoundStore } from "./store.types";

/* base selectors */
export const getProduct = (s: BoundStore) => s.product;
export const selectOptions = (s: BoundStore) => s.selectedOptions;

/* param selector */
export const selectOption =
  (componentId: string) => (s: BoundStore) =>
    s.selectedOptions[componentId as keyof SelectedOptions];

/* derived */
export const selectHasOption =
  (componentId: string, value: string) => (s: BoundStore) =>
    s.selectedOptions[componentId as keyof SelectedOptions] === value;

/* example computed */
export const selectTotalSelected = (s: BoundStore) =>
  Object.keys(s.selectedOptions).length;

export const selectAvailableStickers = (state: BoundStore) => {
  const productId = state.product?.id;
  if (!productId) return [];

  const canvasModule = state.product!.modules.find(m => m.id === "canvas");
  if (!canvasModule) return [];

  const canvasComp = canvasModule.components.find(
    (c): c is CanvasComponent => c.type === "canvas"
  );

  const defaultStickers = canvasComp?.stickers ?? [];
  const userStickers = state.userCanvas[productId]?.savedStickers ?? [];

  return [
    ...defaultStickers.map((s, i) => {
      return {
        id: `default-${s}-${i}`,
        src: `/stickers/${s}`
      }
    }),
    ...userStickers
  ];
};