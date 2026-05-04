import { create } from "zustand";
import { BoundBuilderStore } from "./builder.types";
import { devtools } from "zustand/middleware";
import { createUiSlice } from "./slices/ui.slice";
import { createSceneSlice } from "./slices/scene.slice";
import { createModelSlice } from "./slices/model.slice";
import { createProductConfigSlice } from "./slices/productConfig.slice";
import { immer } from "zustand/middleware/immer";
import { createAddonSlice } from "./slices/addon.slice";

export const useBuilderStore = create<BoundBuilderStore>()(
  immer(devtools((...a) => ({
    ...createUiSlice(...a),
    ...createModelSlice(...a),
    ...createProductConfigSlice(...a),
    ...createSceneSlice(...a),
    ...createAddonSlice(...a),
  })))
);