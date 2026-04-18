import { StateCreator } from "zustand";
import { buildInitialGroupAndColorSelections, buildInitialSizeSelections } from "../../engine/initialSelections";
import { OptionsSlice, SelectedOptions } from "../../model/selections.types";
import { BoundStore } from "../store.types";


export const createOptionsSlice: StateCreator<
  BoundStore,
  [],
  [],
  OptionsSlice
  > = (set, get): OptionsSlice => ({
    selectedOptions: {},

    initOptions: () => {
      const product = get().product;
      if(!product) return;
      const initialSelections = {
        ...buildInitialGroupAndColorSelections(product),
        ...buildInitialSizeSelections(product),
      };
      set({ selectedOptions: initialSelections as Record<string, SelectedOptions>});
    },

    setOption: (componentId, value) =>
      set((state) => ({
        selectedOptions: {
          ...state.selectedOptions,
          [componentId]: value,
        },
      })),

    resetOptions: () => set({ selectedOptions: {} }),
  });


