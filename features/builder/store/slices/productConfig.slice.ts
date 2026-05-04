import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { BuilderConfig, ProductConfigSlice } from "./productConfig.type";
import { Product } from "@/features/configurator/model";
import { isComponentType, isModuleType } from "@/features/configurator/model/component.guards";

export const initProductSample: Product = {
    id: `${'prod_' + crypto.randomUUID()}`,
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


            /* temp modules injection. to be removed */
            // const tempProduct = data.product;
            // tempProduct.modules = initProductSample.modules;
            // tempProduct.id = initProductSample.id;
            // console.log(tempProduct)
            /* temp modules injection. to be removed */

            set(() => ({
                configuratorId: id,

                product: data.product, // overwrite (authoritative)
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
    updateAddonOption: (moduleId, optionId, patch) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "addon"));
            if (!component) return state;

            const option = component.options.find(o => o.id === optionId);
            if (!option) return state;

            Object.assign(option, patch);

        }),
    deleteAddonOption: (moduleId, optionId) =>
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
    addAddonOption: (moduleId, option) =>
        set((state) => {
            const draft = state.draft;
            if (!draft) return state;

            const mod = draft.modules.find(m => m.instanceId === moduleId);
            if (!mod) return state;

            const component = mod.components.find(c => isComponentType(c, "addon"));
            if (!component) return state;

            component.options.push(option);

        }),
    updateCheckOption: (moduleId, optionId, isSelected) =>
        set((state) => {
            const mod = state.draft?.modules.find(m => m.instanceId === moduleId);
            if (mod && isModuleType(mod, "addon")) {
                const selections = mod.default?.selections || [];

                if (isSelected) {
                    mod.default = { ...mod.default, type: "addon", selections: selections.filter(id => id !== optionId) };
                } else {
                    mod.default = { ...mod.default, type: "addon", selections: [...selections, optionId] };
                }
            }
        }),
});