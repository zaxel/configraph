import { PriceConfig } from "./pricing.types";

export type ComponentType =
  | "parts"
  | "size"
  | "addon"
  | "content"
  | "canvas"
  | "submit"
  | "price";


export type BaseComponent = {
  id: string;
  label?: string;
  type: ComponentType;
  order?: number;
};

export type ColorVariant = {
  id: string;
  value: string;
  label?: string;
  price?: number;
}

export type meshGroup = {
  id: string;
  label: string;
  meshes: string[];
  colors: {
    allowCustom: boolean;
    variants: ColorVariant[] | null;
  }
}

export type OptionsComponent = {
  id: string;
  type?: string,
  label?: string;
  optional: boolean;
  enabled: boolean;
  groups: meshGroup[];

};
export type PartsComponent = BaseComponent & {
  id: string;
  type: "parts";
  options: OptionsComponent[];

};

export type SizeComponent = BaseComponent & {
  type: "size";
  options: {
    id: string;
    value: string;
    label?: string;
    price?: number;
  }[];
};

export type AddonComponent = BaseComponent & {
  type: "addon";
  options: {
    id: string;
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



export type CanvasComponent = BaseComponent & {
  type: "canvas";
  mode: "decal" | "uv";
  stickers: string[];
  zones?: string[];
  uvTemplates?: Record<string, string>;

};

export type PriceComponent = BaseComponent & {
  type: "price";
  pricing: PriceConfig;
};

export type SubmitComponent = BaseComponent & {
  id: string;
  text: string;
};

export type TextType = | "heading1" | "heading2" | "text-sm" | "text-md" | "text-md-gray" | "button";

export type Component =
  | PartsComponent
  | SizeComponent
  | AddonComponent
  | ContentComponent
  | CanvasComponent
  | SubmitComponent
  | PriceComponent;