import { StateCreator } from "zustand";
import { BoundStore } from "../store.types";
import { DecalsSlice } from "./decals.types";

export const createDecalsSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never]],
  [],
  DecalsSlice
> = (set) => ({
  decals: [],
  previewDecal: null,

  addDecal: (decal) =>
    set(
      (s) => ({
        decals: [...s.decals, decal],
      }),
      false,
      "decals/add"
    ),

  removeDecal: (id) =>
    set(
      (s) => ({
        decals: s.decals.filter((d) => d.id !== id),
      }),
      false,
      "decals/remove"
    ),

  setPreviewDecal: (preview) =>
    set(
      () => ({
        previewDecal: preview,
      }),
      false,
      "decals/setPreview"
    ),

  commitRequested: 0,

  requestCommit: () => {
    set((s) => ({
      commitRequested: s.commitRequested + 1
    }), false, "decals/requestCommit")
  },
});