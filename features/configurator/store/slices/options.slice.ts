import { StateCreator } from "zustand";
import { buildInitialAddonSelections, buildInitialPartsSelections, buildInitialSizeSelections } from "../../engine/initialSelections";
import { OptionsSlice } from "../../model/selections.types";
import { BoundStore } from "../store.types";

const initValue = {
    parts: {},
    addon: [],
    size: ""
  };

export const createOptionsSlice: StateCreator<
  BoundStore,
  [],
  [],
  OptionsSlice
> = (set, get): OptionsSlice => ({
  selectedOptions: initValue,

  initOptions: () => {
    const product = get().product;
    if (!product) return;
    const initialSelections = {
      parts: {},
      size: "",
      addon: [],
      ...buildInitialPartsSelections(product),
      ...buildInitialSizeSelections(product),
      ...buildInitialAddonSelections(product),
    };
    set({ selectedOptions: initialSelections });
  },

  setOption: (module, value) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        [module]: value,
      },
    })),

  toggleAddon: (value) =>
    set((state) => {
      const current = state.selectedOptions.addon;
      const exists = current.includes(value);

      return {
        selectedOptions: {
          ...state.selectedOptions,
          addon: exists
            ? current.filter(v => v !== value)
            : [...current, value],
        },
      };
    }),

  resetOptions: () => set({ selectedOptions: initValue }),
});


