import { Component } from "./components.types";
export type DefaultParts = {
  type: "parts";
  selections: Record<string, {
    groupId: string;
    color: string;
    enabled: boolean;
  }>
}
export type DefaultAddons = {
  type: "addon",
  selections: string[];
};

export type DefaultSizes = {
  type: "size",
  value: string;
}

export type BaseModule = {
  id: string;
  order: number;
  components: Component[];
};

export type PartsModule = BaseModule & {
  id: "parts";
  default?: DefaultParts;
};

export type SizeModule = BaseModule & {
  id: "size";
  default?: DefaultSizes;
};

export type AddonModule = BaseModule & {
  id: "addon";
  default?: DefaultAddons;
};


export type Module = PartsModule | SizeModule | AddonModule | BaseModule;

export type Product = {
  id: string;

  quantity: number;

  model: {
    url: string;
  };

  modules: Module[];
};