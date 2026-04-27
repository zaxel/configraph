import { describe, it, expect } from "vitest";
import { calculatePrice } from "./calculatePrice";
import { getProduct, mockState } from "../../tests/helpers/configurator.mock";
import { product as prod } from "../../store/slices/product.slice";

describe("calculatePrice (real product)", () => {
    it("returns base price when no extras", () => {
        const product = getProduct(prod);
        const state = mockState(product, {
            selectedOptions: {
                size: "XL", //
                addon: [],
                parts: { items: {} }, // no parts selected
            },
        });
        const result = calculatePrice(product, state);
        expect(result.base).toBe(100);
        expect(result.extras).toBe(0);
        expect(result.total).toBe(100);
    });

    it("adds addon prices correctly", () => {
        const product = getProduct(prod);
        const state = mockState(product, {
            selectedOptions: {
                ...mockState(product).selectedOptions,
                addon: [
                    "spare velcro", // 10
                    "exclusively signed by Michel Jordan", // 99.99
                ],
            },
        });

        const result = calculatePrice(product, state);
        expect(result.extras).toBeCloseTo(109.99);
        expect(result.total).toBeCloseTo(209.99);
    });

    it("adds size price (if any)", () => {
        const product = getProduct(prod);
        const state = mockState(product, {
            selectedOptions: {
                ...mockState(product).selectedOptions,
                size: "XL",
            },
        });
        const result = calculatePrice(product, state);
        expect(result.extras).toBeGreaterThanOrEqual(0);
    });

    it("adds color price from parts", () => {
        const product = getProduct(prod);
        const state = mockState(product, {
            selectedOptions: {
                ...mockState(product).selectedOptions,
                parts: {
                    items: {
                        "body left": {
                            groupId: "id-83866e",
                            color: "red", // price 5
                            enabled: true,
                        },
                    },
                },
            },
        });
        const result = calculatePrice(product, state);
        expect(result.extras).toBeGreaterThanOrEqual(5);
    });

    it("ignores disabled parts", () => {
        const product = getProduct(prod);
        const state = mockState(product, {
            selectedOptions: {
                ...mockState(product).selectedOptions,
                parts: {
                    items: {
                        sole: {
                            groupId: "id-76653",
                            color: "gold", // price 1.0
                            enabled: false,
                        },
                    },
                },
                addon: [],
            },
        });
        const result = calculatePrice(product, state);
        expect(result.extras).toBe(0);
    });

    it("adds decals pricing", () => {
        const product = getProduct(prod);
        const state = mockState(product, {
            decals: [{ id: "1" }, { id: "2" }],
            selectedOptions: {
                size: "XL", //
                addon: [],
                parts: { items: {} }, // no parts selected
            },
        });
        const result = calculatePrice(product, state);
        expect(result.extras).toBe(10); // 2 * 5
    });

    it("handles floating precision correctly", () => {
        const product = getProduct(prod);
        const state = mockState(product, {
            selectedOptions: {
                ...mockState(product).selectedOptions,
                addon: [
                    "antibacterial and antifungal powder", // 11.8
                ],
            },
        });
        const result = calculatePrice(product, state);
        expect(result.total).toBeCloseTo(111.8);
    });
});