import { StateCreator } from "zustand";
import { buildInitialAddonSelections, buildInitialPartsSelections, buildInitialSizeSelections } from "../../engine/initialSelections";
import { OptionsSlice, SelectedOptions } from "../../model/selections.types";
import { BoundStore } from "../store.types";
import { PartsComponent, PartsModule } from "../../model";

const initValue: SelectedOptions = {
  parts: {
    selectedPart: "",
    items: {}
  },
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
      ...initValue,
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

  setPart: (partId) =>
    set((state) => {
      const product = state.product;
      if (!product) return state;

      const partsModule = product.modules.find(
        (m): m is PartsModule => m.id === "parts"
      );
      if (!partsModule) return state;

      const partsComponent = partsModule.components.find(
        (c): c is PartsComponent => c.type === "parts"
      );
      if (!partsComponent) return state;

      const part = partsComponent.options.find(p => p.id === partId);
      if (!part) return state;

      const firstGroup = part.groups[0];
      const firstColor = firstGroup?.colors?.variants?.[0];
      const firstIsEnabled = partsModule.default?.selections[partId].enabled;
      const existing = state.selectedOptions.parts.items[partId];

      return {
        selectedOptions: {
          ...state.selectedOptions,
          parts: {
            ...state.selectedOptions.parts,
            selectedPart: partId,
            items: {
              ...state.selectedOptions.parts.items,
              [partId]: existing ?? {
                groupId: firstGroup?.id ?? "",
                color: firstColor?.value ?? "",
                enabled: firstIsEnabled,
              }
            }
          }
        }
      };
    }),

  setGroup: (part, group) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        parts: {
          ...state.selectedOptions.parts,
          items: {
            ...state.selectedOptions.parts.items,
            [part]: {
              ...state.selectedOptions.parts.items[part],
              groupId: group
            }
          },
        }
      },
    })),
  setColor: (part, color) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        parts: {
          ...state.selectedOptions.parts,
          items: {
            ...state.selectedOptions.parts.items,
            [part]: {
              ...state.selectedOptions.parts.items[part],
              color
            }
          },
        }
      },
    })),
  setEnabled: (part, status) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        parts: {
          ...state.selectedOptions.parts,
          items: {
            ...state.selectedOptions.parts.items,
            [part]: {
              ...state.selectedOptions.parts.items[part], 
              enabled: status,
            }
          },
        }
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


