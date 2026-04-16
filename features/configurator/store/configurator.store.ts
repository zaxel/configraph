import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createProductSlice } from "./slices/product.slice";
import { createOptionsSlice } from "./slices/options.slice";
import { createViewerSlice } from "./slices/viewer.slice";
import { createUiSlice } from "./slices/ui.slice";
import { createLoadingSlice } from "./slices/loading.slice";

export const useConfiguratorStore = create(
  devtools((...a) => ({
    ...createProductSlice(...a),
    ...createOptionsSlice(...a),
    ...createViewerSlice(...a),
    ...createUiSlice(...a),
    ...createLoadingSlice(...a),
  }))
);



