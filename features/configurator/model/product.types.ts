import { Component } from "./components.types";
export type DefaultMaterials = Record<string, {
  componentId: string,
  colorIndex: number | null,
}>

export type DefaultAddons = {
  sizeIndex: number | null;
}

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

export type AddonModule = BaseModule & {
  id: "addon";
  default?: DefaultAddons;
};


export type Module = MaterialsModule | SizeModule | AddonModule | BaseModule;

export type Product = {
  id: string;

  quantity: number;

  model: {
    url: string;
  };

  modules: Module[];
};