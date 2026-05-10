import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { isComponentType } from "@/features/configurator/model/component.guards";
import { PriceSlice } from "./price.types";
import { PriceComponent } from "@/features/configurator/model";


export const createPriceSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    PriceSlice
> = (set) => ({
    updatePriceTittle: (moduleId, value) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "price"));
            if (!component) return;

            component.label = value;
        }),

    
    updatePrice: (moduleId, type, value) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "price")) as PriceComponent | undefined;;
            if (!component) return;

            component.pricing[type] = value;
        }),
});