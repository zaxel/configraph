import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { isComponentType } from "@/features/configurator/model/component.guards";
import { CanvasSlice } from "./canvas.types";


export const createCanvasSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    CanvasSlice
> = (set) => ({
    updateCanvasTittle: (moduleId, value) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return;

            const component = mod.components.find(c => isComponentType(c, "canvas"));
            if (!component) return;

            component.label = value;
        }),

});