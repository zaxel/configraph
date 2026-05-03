import { createContext, useContext } from "react";
import { Product } from "@/features/configurator/model";

export const ProductContext = createContext<Product | null>(null);

export const useProduct = () => {
  const ctx = useContext(ProductContext);
  if (ctx === undefined) {
    throw new Error("useProduct must be used inside ProductContext.Provider");
  }
  return ctx;
};