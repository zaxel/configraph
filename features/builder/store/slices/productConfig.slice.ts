import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { BuilderConfig, ProductConfigSlice } from "./productConfig.type";
import { Product } from "@/features/configurator/model";
import { isComponentType, isModuleType } from "@/features/configurator/model/component.guards";

export const initProductSample: Product = {
    quantity: 1,

    model: {
        url: "",
    },

    modules: [
        // {
        //     id: "price",
        //     order: 1,
        //     components: [
        //         {
        //             id: "102",
        //             type: "price",
        //             pricing: {
        //                 basePrice: 100.0,
        //                 oldPrice: 115.0,
        //                 currency: "USD",
        //                 order: 1,
        //             },
        //         }
        //     ],
        // },
        // {
        //     id: "addon",
        //     order: 5,

        //     default: {
        //         type: "addon",
        //         selections: ["spare velcro", "exclusively signed by Michel Jordan",]
        //     },



        //     components: [
        //         {
        //             id: "318",
        //             type: "addon",
        //             label: "Addons:",
        //             options: [
        //                 {
        //                     value: "fancy and beautiful loop",
        //                     label: "fancy and beautiful loop",
        //                     price: 0
        //                 },
        //                 {
        //                     value: "spare velcro",
        //                     label: "spare velcro",
        //                     price: 10.0
        //                 },
        //                 {
        //                     value: "antibacterial and antifungal powder",
        //                     label: "antibacterial and antifungal powder",
        //                     price: 11.8
        //                 },
        //                 {
        //                     value: "exclusively signed by Michel Jordan",
        //                     label: "exclusively signed by Michel Jordan",
        //                     price: 99.99
        //                 },
        //             ]
        //         },


        //     ],
        // },
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
        })
});