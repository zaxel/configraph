import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createProductSlice } from "./slices/product.slice";
import { createOptionsSlice } from "./slices/options.slice";
import { createViewerSlice } from "./slices/viewer.slice";
import { createUiSlice } from "./slices/ui.slice";
import { createLoadingSlice } from "./slices/loading.slice";
import { createCanvasSlice } from "./slices/canvas.slice";
import { createUserSlice } from "./slices/user.slice";
import { BoundStore } from "./store.types";
import { createDecalsSlice } from "./slices/decals.slice";

export const useConfiguratorStore = create<BoundStore>()(
  devtools((...a) => ({
    ...createProductSlice(...a),
    ...createOptionsSlice(...a),
    ...createViewerSlice(...a),
    ...createUiSlice(...a),
    ...createLoadingSlice(...a),
    ...createCanvasSlice(...a),
    ...createUserSlice(...a),
    ...createDecalsSlice(...a),
  }))
);



