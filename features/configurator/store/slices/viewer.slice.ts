import { StateCreator } from 'zustand';
import { ViewerSlice } from './viewer.types';
import { BoundStore } from '../store.types';


export const createViewerSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never]],
  [],
  ViewerSlice
> = (set) => ({
  cameraMode: "orbit",

  setCameraMode: (mode) =>
    set({ cameraMode: mode }, false, "setCameraMode"),

  selectedMesh: null,

  setSelectedMesh: (mesh) =>
    set({ selectedMesh: mesh }, false, "setSelectedMesh"),
});