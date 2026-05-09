import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { isComponentType } from "@/features/configurator/model/component.guards";
import { PartsSlice } from "./parts.types";
import { current } from 'immer';
import { DefaultParts, meshGroup, PartsComponent } from "@/features/configurator/model";
import { findPartsColorVariant, findPartsComponent, findPartsGroup, findPartsOption } from "../../lib/parts.traversal";


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

            const component = findPartsComponent(draft, moduleId);
            if (!component) return state;

            component.label = value;
        }),
    updatePartLabel: (moduleId, optionId, value) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const option = findPartsOption(draft, moduleId, optionId);
            if (!option) return;
            option.label = value;
        }),
    updateVariantLabel: (moduleId, optionId, groupId, value) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const group = findPartsGroup(draft, moduleId, optionId, groupId);
            if (!group) return;

            group.label = value;
        }),
    setDefaultPart: (moduleId, optionId, isSelected) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const partsDefault = mod.default as DefaultParts | undefined;
            if (!partsDefault) return;

            partsDefault.selectedPart = isSelected ? "" : optionId;
        }),
    setOptionalPart: (moduleId, optionId, isSelected) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const option = findPartsOption(draft, moduleId, optionId);
            if (!option) return;

            option.optional = !isSelected;
        }),
    setPartEnabled: (moduleId, optionId, isSelected) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;
            const option = findPartsOption(draft, moduleId, optionId);
            if (!option) return;
            option.enabled = !isSelected;
        }),
    updateDefaultPartColor: (moduleId, optionId, color, isSelected) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "parts"));
            if (!component) return;

            const partsDefault = mod.default as DefaultParts | undefined;
            if (!partsDefault) return;

            partsDefault.selections[optionId].color = (isSelected ? "" : color);

        }),
    updatePartColor: (moduleId, optionId, groupId, variantId, patch) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const variant = findPartsColorVariant(draft, moduleId, optionId, groupId, variantId);
            if (!variant) return;

            Object.assign(variant, patch);
        }),
    deleteColorOption: (moduleId, optionId, groupId, colorId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const group = findPartsGroup(draft, moduleId, optionId, groupId);
            if (!group) return;

            if (!group.colors) return;
            group.colors.variants = group.colors.variants?.filter(v => v.id !== colorId) ?? [];

            const partsDefault = mod.default as DefaultParts | undefined;
            if (!partsDefault?.selections) return;

            const selection = partsDefault.selections[optionId];
            if (selection?.groupId === groupId && selection?.color === colorId) {
                selection.color = group.colors.variants?.[0]?.value ?? "";
            }
        }),
    addColorOption: (moduleId, optionId, groupId, newOption) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const group = findPartsGroup(draft, moduleId, optionId, groupId);
            if (!group) return;

            group.colors.variants ??= [];
            group.colors.variants.push(newOption);
        }),
    setColorSelectType: (moduleId, optionId, groupId, isCustomAllowed) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const group = findPartsGroup(draft, moduleId, optionId, groupId);
            if (!group) return;

            if (group.meshes.length === 0) return;

            group.colors.allowCustom = isCustomAllowed;

            if (!isCustomAllowed) return;
            group.colors.variants = [];
        }),
    addPartGroup: (moduleId, optionId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const option = findPartsOption(draft, moduleId, optionId);
            if (!option) return;

            const existingLabels = new Set(option.groups.map(g => g.label));
            let label = "New Label";
            let counter = 0;
            while (existingLabels.has(label)) {
                if (counter++ > 100) return;
                label = `New Label ${counter}`;
            }

            const newGroup: meshGroup = {
                id: `grp_${crypto.randomUUID()}`,
                meshes: [],
                label,
                colors: { allowCustom: false, variants: [] }
            };

            option.groups.push(newGroup);

            const partsDefault = mod.default as DefaultParts | undefined;
            if (!partsDefault?.selections) return;

            if (!partsDefault.selections[optionId]) {
                partsDefault.selections[optionId] = { groupId: newGroup.id, color: "" };
            }
        }),
    deleteVariant: (moduleId, optionId, groupId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const option = findPartsOption(draft, moduleId, optionId);
            if (!option) return;

            option.groups = option.groups.filter(g => g.id !== groupId);

            const partsDefault = mod.default as DefaultParts | undefined;
            if (!partsDefault?.selections) return;

            if (option.groups.length > 0) {
                if (partsDefault.selections[optionId]?.groupId === groupId)
                    partsDefault.selections[optionId].groupId = option.groups[0].id;
            } else {
                delete partsDefault.selections[optionId];

                if (partsDefault.selectedPart === optionId) {
                    const remaining = Object.keys(partsDefault.selections);
                    partsDefault.selectedPart = remaining[0] ?? "";
                }
            }
        }),
    addPart: (moduleId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const component = findPartsComponent(draft, moduleId);
            if (!component) return;

            const existingLabels = new Set(component.options.map(o => o.id));
            let label = "New Label";
            let counter = 0;
            while (existingLabels.has(label)) {
                if (counter++ > 100) return;
                label = `New Part ${counter}`;
            }

            const newOption = {
                "id": `prt_${crypto.randomUUID()}`,
                label,
                "optional": false,
                "enabled": true,
                "groups": []
            }

            component.options.push(newOption);
        }),
    deletePart: (moduleId, optionId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = findPartsComponent(draft, moduleId);
            if (!component) return;

            component.options = component.options.filter(o => o.id !== optionId);

            const partsDefault = mod.default as DefaultParts | undefined;
            if (!partsDefault?.selections) return;

            delete partsDefault.selections[optionId];

            if (partsDefault.selectedPart === optionId) {
                const remaining = Object.keys(partsDefault.selections);
                partsDefault.selectedPart = remaining[0] ?? "";
            }
        }),
    addMeshToGroup: (moduleId, optionId, groupId, mesh) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const group = findPartsGroup(draft, moduleId, optionId, groupId);
            if (!group) return;

            group.meshes.push(mesh);
        }),
    deleteMeshOption: (moduleId, optionId, groupId, mesh) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const group = findPartsGroup(draft, moduleId, optionId, groupId);
            if (!group) return;

            group.meshes = group.meshes.filter(m => m !== mesh);

            if (group.meshes.length > 0) return;
            group.colors.variants = [];
        }),
});