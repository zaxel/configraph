import { StateCreator } from 'zustand';
import { BoundStore } from '../store.types';
import { CanvasSlice} from './canvas.types';


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
    set((state: CanvasSlice) => ({ active: !state.active }), false, "toggleActive"),


  design: null,
  setDesign: (design: any) =>
    set(() => ({ design }), false, "canvas/setDesign"),


  decalTransform: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1.0,
  },
  setDecalTransform: (transform) =>
    set(() => ({ decalTransform: transform }), false, "canvas/setDecalTransform"),

  activeZone: null,
  setActiveZone: (zone: string) =>
    set(() => ({ activeZone: zone }), false, "canvas/setActiveZone"),
  
  editorTab: "text",
  setEditorTab: (tab) =>
    set(() => ({ editorTab: tab }), false, "canvas/setEditorTab"),
  
  activeSticker: null,
  setActiveSticker: (data) =>
    set(() => ({ activeSticker: data }), false, "canvas/setActiveSticker"),
  
  removeActiveSticker: () =>
    set(() => ({ activeSticker: null }), false, "canvas/removeActiveSticker"),

});