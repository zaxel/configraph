import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { isComponentType, isModuleType } from "@/features/configurator/model/component.guards";
import { SizeSlice } from "./size.types";


export const createSizeSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    SizeSlice
> = (set) => ({
    updateSizeOption: (moduleId, optionId, patch) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "size"));
            if (!component) return state;

            const option = component.options.find(o => o.id === optionId);
            if (!option) return state;

            Object.assign(option, patch);

        }),
    deleteSizeOption: (moduleId, optionId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "size"));
            if (!component) return state;

            const options = component.options.filter(o => o.id !== optionId);
            if (!options) return state;
            component.options = options;
        }),
    addSizeOption: (moduleId, option) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "size"));
            if (!component) return state;

            component.options.push(option);

        }),
    updateDefaultSize: (moduleId, isSelected, patch) => { 
        set((state) => {
            const mod = state.draft?.modules.find(m => m.instanceId === moduleId);
            if (mod && isModuleType(mod, "size")) {

                if (isSelected) {
                    mod.default = {type: "size"};
                } else {
                    mod.default = { ...patch };
                }
            }
        })
    },
    updateSizeTittle: (moduleId, value) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "size"));
            if (!component) return state;

            component.label = value;
        }),
});