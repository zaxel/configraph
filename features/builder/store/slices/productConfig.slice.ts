import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { ProductConfigSlice } from "./productConfig.type";
import { Product } from "@/features/configurator/model";
import { immer } from "zustand/middleware/immer";

export const initProductSample: Product = {
    id: "new project",
    quantity: 1,

    model: {
        url: "/models/optimized/1777461347794.glb",
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

    initProduct: product => {
        set({ product: product }, false, "initProduct");
        get().initModel(product.model.url);
    },

    setModelUrl: (url) =>
        set((state) => {
            if (state.product) {
                state.product.model.url = url; // No spreading needed!
            }
        }, false, "setModelUrl"),
});