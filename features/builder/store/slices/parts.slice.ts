import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { isComponentType } from "@/features/configurator/model/component.guards";
import { PartsSlice } from "./parts.types";
import { current } from 'immer';
import { PartsComponent } from "@/features/configurator/model";


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
    setOptionalPart: (moduleId, optionId, isSelected) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "parts"));
            if (!component) return;

            const option = component.options.find(o => o.id === optionId);
            if (!option) return;

            option.optional = !isSelected;
        }),
    setPartEnabled: (moduleId, optionId, isSelected) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "parts"));
            if (!component) return;

            const option = component.options.find(o => o.id === optionId);
            if (!option) return;

            option.enabled = !isSelected;
        }),
    updateDefaultPartColor: (moduleId, optionId, color, isSelected) =>
        // updateDefaultPartColor(moduleId, isSelected, color.value)
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "parts"));
            if (!component) return;
            mod.default.selections[optionId].color = (isSelected ? "" : color);

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



    deleteColorOption: (moduleId, optionId, groupId, colorId) =>
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

            group.colors.variants = group.colors.variants.filter(v => v.id !== colorId);
        }),

    addColorOption: (moduleId, optionId, groupId, newOption) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "parts")) as PartsComponent | undefined;
            if (!component) return;

            const option = component.options.find(o => o.id === optionId);
            if (!option) return;

            const group = option.groups.find(g => g.id === groupId);
            if (!group) return;

            if (group.meshes.length === 0) return;

            group.colors.variants ??= [];
            group.colors.variants.push(newOption);
        }),
    deleteVariant: (moduleId, optionId, groupId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "parts"));
            if (!component) return;

            const option = component.options.find(o => o.id === optionId);
            if (!option) return;

            option.groups = option.groups.filter(g => g.id !== groupId);

        }),
    deletePart: (moduleId, optionId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "parts"));
            if (!component) return;

            component.options = component.options.filter(o => o.id !== optionId);
        }),
    addMeshToGroup: (moduleId, optionId, groupId, mesh) =>
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

            group.meshes.push(mesh);
        }),
    deleteMeshOption: (moduleId, optionId, groupId, mesh) =>
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

            group.meshes = group.meshes.filter(m => m !== mesh);

            if (group.meshes.length > 0) return;
            group.colors.variants = [];
        }),


});