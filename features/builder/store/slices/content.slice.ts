import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { isComponentType } from "@/features/configurator/model/component.guards";
import { ContentSlice } from "./content.types";


export const createContentSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    ContentSlice
> = (set) => ({
    updateContentTittle: (moduleId, value) => 
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "content"));
            if (!component) return state;

            component.label = value;
        }),

    updateTextOption: (moduleId, textId, patch) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "content"));
            if (!component) return state;

            const text = component.content.find(t => t.id === textId);
            if (!text) return state;

            Object.assign(text, patch);

        }),
    setTextType: (moduleId, contentId, type) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "content"));
            if (!component) return state;

            const text = component.content.find(t => t.id === contentId);
            if (!text) return state;

            text.textType = type;

        }),
    deleteTextOption: (moduleId, contentId) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "content"));
            if (!component) return state;

            component.content = component.content.filter(c => c.id !== contentId);
        }),
    addTextOption: (moduleId, content) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "content"));
            if (!component) return state;
            component.content.push(content); 
        }),
});