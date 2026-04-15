export type BaseComponent = {
  id: string;
  type: string;
  order?: number;
};

export type ColorVariant = {
  value: string; // hex or material id
  label?: string;
  price?: number;
};

export type ColorComponent = BaseComponent & {
  type: "color";
  mesh: string;
  variants: ColorVariant[];
  allowCustom?: boolean; // replaces colorPicker
};

export type SizeComponent = BaseComponent & {
  type: "size";
  options: {
    label: string;
    price?: number;
  }[];
};

export type AddonComponent = BaseComponent & {
  type: "addons";
  options: {
    label: string;
    price?: number;
  }[];
  multiple?: boolean; // checkbox vs radio
};

export type TextType =
  | "heading1"
  | "heading2"
  | "text-sm"
  | "text-md"
  | "text-lg"
  | "button";

export type ContentComponent = BaseComponent & {
  type: "content";
  content: {
    value: string;
    textType: TextType;
  }[];
};

export type Component =
  | ColorComponent
  | SizeComponent
  | AddonComponent
  | ContentComponent;