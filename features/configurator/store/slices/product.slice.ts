import { StateCreator } from "zustand";
import { Product } from "../../model";
import { BoundStore } from "../store.types";

export type ProductSlice = {
  product: Product | null;
  quantity: number;
  setProduct: (product: Product) => void;
};

export const createProductSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never]],
  [],
  ProductSlice
> = (set) => ({
  quantity: 1,

  product: null, 

  setProduct: (product) =>
    set({ product }, false, "setProduct"), 
});
