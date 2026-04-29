import { Product } from "@/features/configurator/model";

export type ProductConfigSlice = {
    product: Product | null;
    initProduct: (product: Product) => void;
    setModelUrl: (url: string) => void;
}