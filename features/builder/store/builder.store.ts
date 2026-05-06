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

export const useBuilderStore = create<BoundBuilderStore>()(
  immer(devtools((...a) => ({
    ...createUiSlice(...a),
    ...createModelSlice(...a),
    ...createProductConfigSlice(...a),
    ...createSceneSlice(...a),
    ...createAddonSlice(...a),
    ...createValidationSlice(...a),
  })))
);