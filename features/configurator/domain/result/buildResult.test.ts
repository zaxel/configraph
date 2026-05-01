import { describe, it, expect } from "vitest";
import { buildResult } from "./buildResult";
import { getProduct, mockState } from "../../tests/helpers/configurator.mock";
import { product_sample as item } from "../../store/slices/product.slice";

describe("buildResult", () => {
  it("builds full result correctly", () => {
    const product = getProduct(item);
    const state = mockState(product);

    const result = buildResult(product, state);

    expect(result.productId).toBe(product.id);
    expect(result.quantity).toBe(1);
    expect(result.price.total).toBeGreaterThan(0);

    expect(result.configuration.size).toBe("XL");
    expect(result.configuration.addons).toEqual(["spare velcro", "exclusively signed by Michel Jordan",]);
    expect(Array.isArray(result.configuration.decals)).toBe(true);
  });

  it("includes addons in configuration", () => {
    const product = getProduct(item);

    const state = mockState(product, {
      selectedOptions: {
        ...mockState(product).selectedOptions,
        addon: ["antibacterial and antifungal powder"],
      },
    });

    const result = buildResult(product, state);

    expect(result.configuration.addons).toContain("antibacterial and antifungal powder");
  });

  it("handles empty decals", () => {
    const product = getProduct(item);
    const state = mockState(product, { decals: [] });

    const result = buildResult(product, state);

    expect(result.configuration.decals).toEqual([]);
  });

  it("generates meta info", () => {
    const product = getProduct(item);
    const state = mockState(product);

    const result = buildResult(product, state);

    expect(result.meta).toBeDefined();
    expect(result.meta!.version).toBe("1.0");
    expect(typeof result.meta!.createdAt).toBe("number");
  });
});