import { describe, it, expect } from "vitest";
import { calculatePrice } from "./calculatePrice";
import { getProduct, mockState } from "../../tests/helpers/configurator.mock";
import { product as item } from "../../store/slices/product.slice";
import { DecalConfig } from "../../store/slices/decals.types";

const unsafe = <T>(v: unknown) => v as T;

const createDecal = (overrides: Partial<DecalConfig> = {}): DecalConfig => ({
  id: "test-id",
  source: {
    type: "sticker", stickerId: "stickerId",
  },
  target: "target",
  texture: "texture", // base64

  position: [1, 1, 1],
  orientation: [1, 1, 1],
  size: [10, 10, 10],
  ...overrides,
});

describe("calculatePrice – edge cases", () => {
  it("falls back to 0 when price module is missing", () => {
    const product = getProduct(item);
    product.modules = product.modules.filter(m => m.id !== "price");

    const state = mockState(product);
    const result = calculatePrice(product, state);

    expect(result.base).toBe(0);
    expect(result.total).toBeGreaterThanOrEqual(0);
  });

  it("handles missing addon module", () => {
    const product = getProduct(item);
    product.modules = product.modules.filter(m => m.id !== "addon");

    const state = mockState(product);
    const result = calculatePrice(product, state);

    expect(result.total).toBeGreaterThanOrEqual(100);
  });

  it("handles unknown addon safely", () => {
    const product = getProduct(item);

    const state = mockState(product, {
      selectedOptions: {
        addon: ["unknown-addon"],
      },
    });

    const result = calculatePrice(product, state);

    expect(result.total).toBe(100);
  });

  it("handles empty addon selection", () => {
    const product = getProduct(item);

    const state = mockState(product, {
      selectedOptions: {
        addon: [],
      },
    });

    const result = calculatePrice(product, state);

    expect(result.total).toBe(100);
  });

  it("handles invalid groupId in parts", () => {
    const product = getProduct(item);

    const state = mockState(product, {
      selectedOptions: {
        addon: [],
        parts: {
          items: {
            "body left": {
              groupId: "invalid",
              color: "red",
              enabled: true,
            },
          },
        },
      },
    });

    const result = calculatePrice(product, state);

    expect(result.total).toBe(100);
  });

  it("ignores disabled parts", () => {
    const product = getProduct(item);

    const state = mockState(product, {
      selectedOptions: {
        addon: [],
        parts: {
          items: {
            "body left": {
              groupId: "id-83866e",
              color: "black",
              enabled: false,
            },
          },
        },
      },
    });

    const result = calculatePrice(product, state);

    expect(result.total).toBe(100);
  });

  it("handles unknown size safely", () => {
    const product = getProduct(item);

    const state = mockState(product, {
      selectedOptions: {
        addon: [],
        size: unsafe<string>("XXXL"),
      },
    });

    const result = calculatePrice(product, state);

    expect(result.total).toBe(100);
  });

  it("handles missing size module", () => {
    const product = getProduct(item);
    product.modules = product.modules.filter(m => m.id !== "size");

    const state = mockState(product);
    const result = calculatePrice(product, state);

    expect(result.total).toBeGreaterThanOrEqual(209.99);
  });

  it("handles empty parts selection", () => {
    const product = getProduct(item);

    const state = mockState(product, {
      selectedOptions: {
        addon: [],
        parts: {
          items: {},
        },
      },
    });

    const result = calculatePrice(product, state);

    expect(result.total).toBe(100);
  });

  it("handles decals pricing", () => {
    const product = getProduct(item);



    const state = mockState(product, {
      selectedOptions: {
        addon: [],
      },
      decals: [createDecal({ id: "1" }), createDecal({ id: "2" })],
    });

    const result = calculatePrice(product, state);

    expect(result.extras).toBeGreaterThanOrEqual(10);
  });

  it("rounds price to 2 decimal places", () => {
    const product = getProduct(item);

    const state = mockState(product, {
      selectedOptions: {
        addon: [],
      },
      decals: Array.from({ length: 3 }, () => createDecal()),
    });

    const result = calculatePrice(product, state);

    expect(Number.isInteger(result.total * 100)).toBe(true);
  });
});