import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { ProductConfigSlice } from "./productConfig.type";
import { Product } from "@/features/configurator/model";

export const initProductSample: Product = {
    id: "new project",
    quantity: 1,

    model: {
        url: "",
    },

    modules: [
        {
            id: "price",
            order: 1,
            components: [
                {
                    id: "102",
                    type: "price",
                    pricing: {
                        basePrice: 100.0,
                        oldPrice: 115.0,
                        currency: "USD",
                        order: 1,
                    },
                }
            ],
        },
        {
            id: "addon",
            order: 5,

            default: {
                type: "addon",
                selections: ["spare velcro", "exclusively signed by Michel Jordan",]
            },



            components: [
                {
                    id: "318",
                    type: "addon",
                    label: "Addons:",
                    options: [
                        {
                            value: "fancy and beautiful loop",
                            label: "fancy and beautiful loop",
                            price: 0
                        },
                        {
                            value: "spare velcro",
                            label: "spare velcro",
                            price: 10.0
                        },
                        {
                            value: "antibacterial and antifungal powder",
                            label: "antibacterial and antifungal powder",
                            price: 11.8
                        },
                        {
                            value: "exclusively signed by Michel Jordan",
                            label: "exclusively signed by Michel Jordan",
                            price: 99.99
                        },
                    ]
                },


            ],
        },
    ],
};

export const createProductConfigSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    ProductConfigSlice
> = (set, get) => ({
    product: null,
    configuratorId: null,
    builderConfig: null,

    initProduct: product => {
        set({ product: product }, false, "initProduct");
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
            const tempProduct = data.product;
            tempProduct.modules = initProductSample.modules;
            tempProduct.id = initProductSample.id;
            console.log(tempProduct)
            /* temp modules injection. to be removed */

            set(() => ({
                configuratorId: id,

                product: tempProduct, // overwrite (authoritative)
                builderConfig: data.builderConfig, // overwrite

                status: "ready",
                error: null,
            }));

        } catch (err) {
            set({
                status: "error",
                error: err instanceof Error ? err.message : "Failed to load",
            });
        }
    }
});