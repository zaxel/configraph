import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { BuilderConfig, ProductConfigSlice } from "./productConfig.type";
import { Product } from "@/features/configurator/model";
import { isComponentType, isModuleType } from "@/features/configurator/model/component.guards";
import { canAddModule } from "@/features/configurator/model/module.rules";
import { createModuleFactory } from "../../lib/factories/createModule";
import { arrayMove } from "@dnd-kit/sortable";

export const initProductSample: Product = {
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
    builderConfig: null,
    meshesRegistered: false,

    configurator: {
        id: null,
        name: "",
        status: "idle",
        error: null,
    },


    setConfiguratorName: (name) => {
        set((state) => {
            state.configurator.name = name.trimStart();
        });
    },
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

    setConfiguratorId: (id) => {
        set((state) => {
            state.configurator.id = id;
        });
    },

    loadConfigurator: async (id) => {
        const { configurator } = get();
        if (configurator.id === id && configurator.status === "ready") {
            return;
        }

        set((state) => {
            state.configurator.status = "loading";
        });

        try {
            const res = await fetch(`/api/configurator/${id}`);

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to load configurator");
            }

            const configuratorResp = await res.json();
            set(() => ({
                product: configuratorResp.data?.published ?? configuratorResp.data.draft, // overwrite (authoritative)
                draft: configuratorResp.data.draft, // overwrite (authoritative)
                builderConfig: configuratorResp.data.builder_config, // overwrite
                meshesRegistered: configuratorResp.data.builder_config.meshes?.length > 0,

                configurator: {
                    id,
                    name: configuratorResp.name,
                    status: "ready",
                    error: null
                },
                status: "ready", //update modele status
            }));
        } catch (err) {
            set((state) => {
                state.configurator.status = "error";
                state.configurator.error = err instanceof Error ? err.message : "Failed to load";
            });
        }
    },
    setBuilderConfig: (config) => set({ builderConfig: config }),
    saveDraft: async () => {
        const { draft, configurator, setSaving } = get();
        if (!draft || !configurator.id) return;

        setSaving(true);

        try {
            await fetch(`/api/configurator/${configurator.id}/draft`, {
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
    updateConfiguratorMeta: async () => {
        const { configurator, setSaving } = get();
        if (!configurator || !configurator.id) return;

        set((state) => {
            state.configurator.status = "updating";
        });


        try {
            await fetch(`/api/configurator/${configurator.id}/meta`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(configurator.name),
            });
        } catch (e) {
            console.error("Failed to update configurator meta data", e);
        } finally {
            set((state) => {
                state.configurator.status = "ready";
            });

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