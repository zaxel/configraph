import { ProductResult } from "./result.types";
import { calculatePrice } from "../pricing/calculatePrice";
import { Product, SelectedOptions } from "../../model";
import { DecalConfig } from "../../store/slices/decals.types";

export type PartialState = {
    decals: DecalConfig[],
    quantity: number,
    selectedOptions: SelectedOptions
}

export function buildResult(
    product: Product,
    state: PartialState
): ProductResult {
    const price = calculatePrice(product, state);

    return {
        productId: product.id,
        quantity: state.quantity,
        price,
        configuration: {
            parts: state.selectedOptions.parts.items,
            size: state.selectedOptions.size,
            addons: state.selectedOptions.addon || [],
            decals: state.decals,
        },
        meta: {
            createdAt: Date.now(),
            version: "1.0",
        },
    };
}