/* base selectors */

import { CanvasComponent } from "../model";
import { BoundStore } from "./store.types";

export const getProduct = (s) => s.product;

export const selectOptions = (s) => s.selectedOptions;

/* param selector */

export const selectOption =
  (componentId: string) => (s) =>
    s.selectedOptions[componentId];

/* derived */

export const selectHasOption =
  (componentId: string, value: string) => (s) =>
    s.selectedOptions[componentId] === value;

/* example computed */

export const selectTotalSelected = (s) =>
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
    ...defaultStickers.map(s => `/stickers/${s}`),
    ...userStickers
  ];
};