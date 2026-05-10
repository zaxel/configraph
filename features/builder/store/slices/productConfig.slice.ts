import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { BuilderConfig, ProductConfigSlice } from "./productConfig.type";
import { Product } from "@/features/configurator/model";
import { isComponentType, isModuleType } from "@/features/configurator/model/component.guards";
import { canAddModule } from "@/features/configurator/model/module.rules";
import { createModuleFactory } from "../../lib/factories/createModule";
import { arrayMove } from "@dnd-kit/sortable";

export const initProductSample: Product = {
    id: `${crypto.randomUUID()}`,
    quantity: 1,

    model: {
        url: "",
    },

    modules: [

    ],
};

export const createProductConfigSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    ProductConfigSlice
> = (set, get) => ({
    product: null,
    draft: null,
    configuratorId: null,
    builderConfig: null,


    initProduct: product => {
        set({ product: product }, false, "initProduct");
        set({ draft: product }, false, "initDraft");
        get().initModel(product.model.url);
    },

    setModelUrl: (url) =>
        set((state) => {
            if (state.product) {
                state.product.model.url = url;
            }
        }, false, "setModelUrl"),

    setConfiguratorId: (id) =>
        set({ configuratorId: id }, false, "setConfiguratorId"),

    loadConfigurator: async (id) => {
        const { configuratorId, status } = get();
        if (configuratorId === id && status === "ready") {
            return;
        }

        set({ status: "loading", error: null });

        try {
            const res = await fetch(`/api/configurator/${id}`);

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to load configurator");
            }

            const data = await res.json();

            set(() => ({
                configuratorId: id,

                product: data.published ?? data.draft, // overwrite (authoritative)
                draft: data.draft, // overwrite (authoritative)
                builderConfig: data.builderConfig, // overwrite
                meshesRegistered: data.builderConfig.meshes?.length > 0,
                status: "ready",
                error: null,
            }));

        } catch (err) {
            set({
                status: "error",
                error: err instanceof Error ? err.message : "Failed to load",
            });
        }
    },
    setBuilderConfig: (config) => set({ builderConfig: config }),
    saveDraft: async () => {
        const { draft, configuratorId, setSaving } = get();
        if (!draft || !configuratorId) return;

        setSaving(true);

        try {
            await fetch(`/api/configurator/${configuratorId}/draft`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draft),
            });
        } catch (e) {
            console.error("Failed to save draft", e);
        } finally {
            setSaving(false);
        }
    },
    deleteModule: (moduleId) =>
        set((state) => {
            if (!state.draft) return;

            state.draft.modules = state.draft.modules.filter(
                (m) => m.instanceId !== moduleId
            );
        }),
    addModule: (type) =>
        set((state) => {
            if (!state.draft) return state;

            const order = state.draft.modules.length;

            if (!canAddModule(type, state.draft)) return;


            const newModule = createModuleFactory(type, order);
            return {
                draft: {
                    ...state.draft,
                    modules: [...state.draft.modules, newModule],
                },
            };
        }),

    reorderModules: (activeId, overId) =>
        set((state) => {
            if (!state.draft) return;

            const modules = state.draft.modules
                .slice()
                .sort((a, b) => a.order - b.order);

            const oldIndex = modules.findIndex((m) => m.instanceId === activeId);
            const newIndex = modules.findIndex((m) => m.instanceId === overId);

            if (oldIndex === -1 || newIndex === -1) return;

            const reordered = arrayMove(modules, oldIndex, newIndex);

            // Re-assign order to match new positions
            reordered.forEach((m, i) => {
                m.order = i;
            });

            state.draft.modules = reordered;
        }, false, "reorderModules"),
});