import { Product } from "../../model";

export function mockState(product: Product, overrides = {}) {
    const partsModule = product.modules.find(m => m.id === "parts");
    const sizeModule = product.modules.find(m => m.id === "size");
    const addonModule = product.modules.find(m => m.id === "addon");

    return {
        quantity: product.quantity ?? 1,
        decals: [],
        selectedOptions: {
            size: sizeModule?.default?.value ?? null,
            addon: addonModule?.default?.selections ?? [],
            parts: {
                items: partsModule?.default?.selections ?? {},
            },
        },
        ...overrides,
    };
}

export function getProduct(product: Product) {
    return structuredClone(product);
}