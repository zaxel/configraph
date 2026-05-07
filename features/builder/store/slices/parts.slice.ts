import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { isComponentType } from "@/features/configurator/model/component.guards";
import { PartsSlice } from "./parts.types";
import { current } from 'immer';


export const createPartsSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    PartsSlice
> = (set) => ({
    updatePartsTittle: (moduleId, value) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "parts"));
            if (!component) return state;

            component.label = value;
        }),
    setDefaultPart: (moduleId, optionId, isSelected) =>
    set((state) => {
        const draft = state.draft;
        if (!draft) return;

        const mod = draft.modules.find(m => m.instanceId === moduleId);
        if (!mod) return;

        mod.default.selectedPart = isSelected ? "" : optionId;
    }),
    updatePartColor: (moduleId, optionId, groupId, variantId, patch) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "parts"));
            if (!component) return;

            const option = component.options.find(o => o.id === optionId);
            if (!option) return;

            const group = option.groups.find(g => g.id === groupId);
            if (!group) return;

            const variant = group.colors.variants.find(v => v.id === variantId);
            if (!variant) return;

            Object.assign(variant, patch); 
        }),



    deletePartColor: (moduleId, optionId) =>
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
    addPartColor: (moduleId, option) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "addon"));
            if (!component) return state;

            component.options.push(option);

        }),
});