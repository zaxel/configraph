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
> = (set): OptionsSlice => ({
  selectedOptions: initValue,

  initOptions: (product) => {
    if (!product) return;
    const initialSelections = {
      ...initValue,
      ...buildInitialPartsSelections(product),
      ...buildInitialSizeSelections(product),
      ...buildInitialAddonSelections(product),
    };
    set({
      selectedOptions: {
        ...initialSelections,
        size: initialSelections.size ?? null 
      }
    });
  },

  setOption: (module, value) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        [module]: value,
      },
    })),
  setPart: (product, partId) =>
    set((state) => {
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
      const existing = state.selectedOptions.parts.items[partId];

      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,
          parts: {
            ...state.selectedOptions.parts,
            selectedPart: partId,
            items: {
              ...state.selectedOptions.parts.items,
              [partId]: existing ?? {
                groupId: firstGroup?.id ?? "",
                color: firstColor?.value ?? "#fff",
                enabled: !part.optional,
              }
            }
          }
        }
      };
    }),

  setGroup: (product, part, groupId) =>
    set((state) => {
      if (!product) return state;

      const partsModule = product.modules.find((m): m is PartsModule => m.id === "parts");
      const partsComponent = partsModule?.components.find((c): c is PartsComponent => c.type === "parts");
      const partOption = partsComponent?.options.find(p => p.id === part);
      const group = partOption?.groups.find(g => g.id === groupId);

      const firstColor = group?.colors?.variants?.[0]?.value ?? "#FFF";

      return {
        selectedOptions: {
          ...state.selectedOptions,
          parts: {
            ...state.selectedOptions.parts,
            items: {
              ...state.selectedOptions.parts.items,
              [part]: {
                ...state.selectedOptions.parts.items[part],
                groupId,
                color: firstColor,
              }
            },
          }
        },
      };
    }),
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


