import { create } from "zustand";
import { BoundBuilderStore } from "./builder.types";
import { devtools } from "zustand/middleware";
import { createUiSlice } from "./slices/ui.slice";
import { createModelSlice } from "./slices/model.slice";

export const useBuilderStore = create<BoundBuilderStore>()(
  devtools((...a) => ({
    ...createUiSlice(...a),
    ...createModelSlice(...a),
  }))
);