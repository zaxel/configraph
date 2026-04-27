import { AddonComponent, PartsComponent, PriceComponent, Product, SizeComponent } from "../../model";
import { PartialState } from "../result/buildResult";
import { findAddonPrice } from "./resolvers/findAddonPrice";
import { findColorOption } from "./resolvers/findColorOption";
import { findSizePrice } from "./resolvers/findSizePrice";

export function calculatePrice(product: Product, state: PartialState) {
    let base = 0;
    let extras = 0;

    // base price
    const priceModule = product.modules.find(m => m.id === "price");
    const priceComponent = priceModule?.components.find(
        (c): c is PriceComponent => c.type === "price"
    );
    if (priceComponent)
        base = priceComponent?.pricing.basePrice || 0;

    // parts 
    const partsModule = product.modules.find(m => m.id === "parts");
    const partsComponent = partsModule?.components.find(
        (c): c is PartsComponent => c.type === "parts"
    );
    const parts = partsComponent?.options ?? [];
    extras = parts.reduce((acc, part) => {
        return acc + findColorOption(part, state.selectedOptions);
    }, extras);

    // size
    const sizeModule = product.modules.find(m => m.id === "size");
    const sizeComponent = sizeModule?.components.find(
        (c): c is SizeComponent => c.type === "size"
    );
    if (sizeComponent) {
        extras += findSizePrice(sizeComponent, state.selectedOptions);
    }

    // addons
    const addonModule = product.modules.find(m => m.id === "addon");
    const addonComponent = addonModule?.components.find(
        (c): c is AddonComponent => c.type === "addon"
    );
    if (addonComponent)
        extras += findAddonPrice(addonComponent, state.selectedOptions);

    // decals (optional pricing model)
    const decals = state.decals || [];
    extras += decals.length * 5;

    const total = Math.round((base + extras) * 100) / 100;

    return {
        base,
        extras,
        total,
        currency: priceComponent?.pricing.currency || "USD",
    };
}