import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { UiSlice } from "./ui.type";


export const createUiSlice: StateCreator<
  BoundBuilderStore,
  [["zustand/devtools", never]],
  [],
  UiSlice
> = (set) => ({
  activeTab: "mesh",
  saving: false,

  setActiveTab: (name) =>
    set({ activeTab: name }, false, "setActiveTab"),

  setSaving: (status) =>
    set({ saving: status }, false, "setSaving"),

});