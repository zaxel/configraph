import * as THREE from "three";
import { Component } from "./components.types";
export type DefaultParts = {
  type: "parts";
  selectedPart: string;
  selections: Record<string, {
    groupId: string;
    color?: string | number | THREE.Color;
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

export type DefaultCanvas = {
  type: "canvas",
}

export type DefaultContent = {
  type: "content",
}

export type DefaultSubmit = {
  type: "submit",
}
export type DefaultPrice = {
  type: "price",
}
export type ModuleDefault =  
  | DefaultParts 
  | DefaultAddons 
  | DefaultSizes 

  | DefaultCanvas 
  | DefaultContent
  | DefaultSubmit 
  | DefaultPrice;


export type BaseModule = {
  id: string;
  instanceId: string;
  order: number;
  type?: string;
  components: Component[];
};

export type ContentModule = BaseModule & {
  id: "content";
  type: "content";
  default?: DefaultContent;
};


export type PartsModule = BaseModule & {
  id: "parts";
  type: "parts";
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

export type CanvasModule = BaseModule & {
  id: "canvas";
  default?: DefaultCanvas;
};

export type SubmitModule = BaseModule & {
  id: "submit";
  default?: DefaultSubmit;
};
export type PriceModule = BaseModule & {
  id: "price";
  default?: DefaultPrice;
};


export type Module = PartsModule | SizeModule | AddonModule | CanvasModule | ContentModule | SubmitModule | PriceModule;

export type Product = {
  id?: string;

  quantity: number;

  model: {
    url: string;
  };

  modules: Module[];
};