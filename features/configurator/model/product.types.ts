import { Component } from "./components.types";
import { PriceConfig } from "./pricing.types";

export type DefaultMaterials = Record<string, {
  componentId: number,
  colorIndex: number | null,
}>

export type DefaultSizes = {
  sizeIndex: number | null;
}

export type BaseModule = {
  id: string;
  order: number;
  displayType: "one-at-time" | "select" | "x-slider" | "all";
  components: Component[];
};

export type MaterialsModule = BaseModule & {
  id: "materials";
  default?: DefaultMaterials;
};

export type SizeModule = BaseModule & {
  id: "size";
  default?: DefaultSizes;
};


export type Module = MaterialsModule | SizeModule | BaseModule;

export type Product = {
  id: string;

  quantity: number;

  model: {
    url: string;
  };

  pricing: PriceConfig;

  modules: Module[];
};