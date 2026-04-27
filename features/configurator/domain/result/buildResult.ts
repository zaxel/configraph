import { ProductResult } from "./result.types";
import { calculatePrice } from "../pricing/calculatePrice";
import { PartsSelection, Product, SelectedOptions } from "../../model";
import { DecalConfig } from "../../store/slices/decals.types";

export type PartialState = {
    parts: Omit<PartsSelection, "selectedPart">,
    decals: DecalConfig[],
    size: string,
    addon: string[],
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
            parts: state.parts.items,
            size: state.size,
            addons: state.addon || [],
            decals: state.decals,
        },
        meta: {
            createdAt: Date.now(),
            version: "1.0",
        },
    };
}