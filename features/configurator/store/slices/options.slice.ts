import { buildInitialGroupAndColorSelections, buildInitialSizeSelections } from "../../engine/initialSelections";
import { getProduct } from "../selectors";

type OptionsSlice = {
  selectedOptions: Record<string, unknown>;
  setOption: (componentId: string, value: unknown) => void;
  resetOptions: () => void;
  initOptions: () => void;
};



export const createOptionsSlice = (set, get): OptionsSlice => ({
  selectedOptions: {},
  
  initOptions: () => {
    const product = get().product;
    const initialSelections = {
      ...buildInitialGroupAndColorSelections(product),
      ...buildInitialSizeSelections(product),
    };
    set({ selectedOptions: initialSelections });
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


