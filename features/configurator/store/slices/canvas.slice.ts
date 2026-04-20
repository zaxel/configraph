import { StateCreator } from 'zustand';
import { BoundStore, CanvasSlice } from '../store.types';


export const createCanvasSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never]],
  [],
  CanvasSlice
> = (set) => ({

  mode: null,
  setMode: (mode) =>
    set(() => ({
      mode,
      activeZone: mode === "uv" ? null : undefined,
      decalTransform: mode === "decal"
        ? { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 }
        : undefined,
    }), false, "canvas/setMode"),

  active: false,
  toggleActive: () =>
    set((state) => ({ active: !state.active }), false, "toggleActive"),

  availableStickers: [],
  addSticker: (file: File) => {
    const url = URL.createObjectURL(file);

    set((state) => ({
      availableStickers: [...state.availableStickers, url]
    }))
  },
  removeSticker: (delUrl: string) => {
    set((state) => ({
      availableStickers: [...state.availableStickers].filter(url => url !== delUrl)
    }))
  },

  design: null,
  setDesign: (design) =>
    set(() => ({ design }), false, "canvas/setDesign"),


  decalTransform: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1.0,
  },
  setDecalTransform: (transform) =>
    set(() => ({ decalTransform: transform }), false, "canvas/setDecalTransform"),

  activeZone: "",
  setActiveZone: (zone) =>
    set(() => ({ activeZone: zone }), false, "canvas/setActiveZone"),

});