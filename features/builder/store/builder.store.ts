import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { BoundBuilderStore } from "./builder.types";
import { createUiSlice } from "./slices/ui.slice";
import { createSceneSlice } from "./slices/scene.slice";
import { createModelSlice } from "./slices/model.slice";
import { createProductConfigSlice } from "./slices/productConfig.slice";
import { createAddonSlice } from "./slices/addon.slice";
import { createValidationSlice } from "./slices/validation.slice";
import { createSizeSlice } from "./slices/size.slice";
import { createPartsSlice } from "./slices/parts.slice";
import { createContentSlice } from "./slices/content.slice";
import { createSubmitSlice } from "./slices/submit.slice";
import { createPriceSlice } from "./slices/price.slice";
import { createCanvasSlice } from "./slices/canvas.slice";
import { createPublishSlice } from "./slices/publish.slice";

export const useBuilderStore = create<BoundBuilderStore>()(
  immer(devtools((...a) => ({
    ...createUiSlice(...a),
    ...createModelSlice(...a),
    ...createProductConfigSlice(...a),
    ...createSceneSlice(...a),
    ...createAddonSlice(...a),
    ...createValidationSlice(...a),
    ...createSizeSlice(...a),
    ...createPartsSlice(...a),
    ...createContentSlice(...a),
    ...createSubmitSlice(...a),
    ...createPriceSlice(...a),
    ...createCanvasSlice(...a),
    ...createPublishSlice(...a),
  })))
);