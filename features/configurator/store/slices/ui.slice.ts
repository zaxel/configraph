import { StateCreator } from 'zustand';
import { BoundStore } from '../../model/bound.types';
import { UiSlice } from '../../model/uislice.types';



export const createUiSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never]],
  [],
  UiSlice
> = (set) => ({
  activeModule: null,

  setActiveModule: (id) =>
    set({ activeModule: id }, false, "setActiveModule"),

  sidebarOpen: true,

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, "toggleSidebar"),
});