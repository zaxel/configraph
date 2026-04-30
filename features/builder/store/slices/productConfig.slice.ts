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

    modules: [],
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

                product: data.product, // overwrite (authoritative)
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