import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { isComponentType, isModuleType } from "@/features/configurator/model/component.guards";
import { AddonSlice } from "./addon.types";


export const createAddonSlice: StateCreator< 
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    AddonSlice
> = (set) => ({
    updateAddonOption: (moduleId, optionId, patch) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "addon"));
            if (!component) return state;

            const option = component.options.find(o => o.id === optionId);
            if (!option) return state;

            Object.assign(option, patch);

        }),
    deleteAddonOption: (moduleId, optionId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "addon"));
            if (!component) return state;

            const options = component.options.filter(o => o.id !== optionId);
            if (!options) return state;
            component.options = options;
        }),
    addAddonOption: (moduleId, option) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "addon"));
            if (!component) return state;

            component.options.push(option);

        }),
    updateCheckOption: (moduleId, optionId, isSelected) =>
        set((state) => {
            const mod = state.draft?.modules.find(m => m.instanceId === moduleId);
            if (mod && isModuleType(mod, "addon")) {
                const selections = mod.default?.selections || [];

                if (isSelected) {
                    mod.default = { ...mod.default, type: "addon", selections: selections.filter(id => id !== optionId) };
                } else {
                    mod.default = { ...mod.default, type: "addon", selections: [...selections, optionId] };
                }
            }
        }),
    updateAddonTittle: (moduleId, value) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "addon"));
            if (!component) return state;

            component.label = value; 
        }),
});