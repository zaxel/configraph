import * as THREE from "three"

export type ProductResult = {
  productId: string;
  quantity: number;

  price: {
    base: number;
    extras: number;
    total: number;
    currency: string;
  };

  configuration: {
    parts: Record<string, {
      groupId: string;
      color?: string | number | THREE.Color; 
      enabled: boolean;
    }>;

    size?: string;

    addons: string[];

    decals?: {
      id: string;
      target: string;
      texture: string;
      position: number[];
      orientation: number[];
      size: number[];
      source: {
        type: "sticker" | "text";
        refId?: string;
      };
    }[];
  };

  meta?: {
    createdAt: number,
    version: string
  }
}