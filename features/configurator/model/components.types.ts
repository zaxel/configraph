import { PriceConfig } from "./pricing.types";

export type ComponentType =
  | "part"
  | "size"
  | "addon"
  | "content"
  | "price";



export type BaseComponent = {
  id: string;
  type: ComponentType;
  order?: number;
};

export type meshGroup = {
  id: string;
  label: string;
  meshes: string[];
  colors: {
    allowCustom: boolean;
    variants: {
      value: string;
      label?: string;
      price?: number;
    }[] | null;
  }
}

export type PartComponent = BaseComponent & {
  id: string;
  type: "part";
  optional: boolean;
  groups: meshGroup[];
  
};

export type SizeComponent = BaseComponent & {
  type: "size";
  label?: string;
  options: {
    value: string;
    label?: string;
    price?: number;
  }[];
};

export type AddonComponent = BaseComponent & {
  type: "addon";
  label?: string;
  options: {
    value: string;
    label: string;
    price?: number;
  }[];
  multiple?: boolean;
};

export type ContentComponent = BaseComponent & {
  type: "content";
  content: {
    value: string;
    textType: TextType;
  };
};

export type PriceComponent = BaseComponent & {
  type: "price";
  pricing: PriceConfig;
};

export type TextType = | "heading1" | "heading2" | "text-sm" | "text-md" | "text-md-gray" | "button";

export type Component =
  | PartComponent
  | SizeComponent
  | AddonComponent
  | ContentComponent
  | PriceComponent;