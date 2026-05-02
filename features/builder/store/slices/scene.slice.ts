import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { SceneSlice } from "./scene.types";

export const createSceneSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never]],
    [],
    SceneSlice
> = (set) => ({
    registry: null,
    debuggerApi: null,

    setRegistry: (registry) => set({ registry }),
    setDebuggerApi: (api) => set({ debuggerApi: api }),

    resetViewer: () =>
        set({
            registry: null,
            debuggerApi: null, 
        }), 
});