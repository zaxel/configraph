import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createVariantSlice } from "./slices/variant.slice";
import { createMaterialSlice } from "./slices/material.slice";
import { createCameraSlice } from "./slices/camera.slice";
import { createUiSlice } from "./slices/ui.slice";
import { createLoadingSlice } from "./slices/loading.slice";

export const useConfiguratorStore = create(
  devtools((...a) => ({
    ...createVariantSlice(...a),
    ...createMaterialSlice(...a),
    ...createCameraSlice(...a),
    ...createUiSlice(...a),
    ...createLoadingSlice(...a),
  }))
);



