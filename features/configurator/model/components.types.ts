export type ComponentType =
  | "material"
  | "size"
  | "addon"
  | "content";



export type BaseComponent = {
  id: number | string;
  type: ComponentType;
  order?: number;
};

export type MaterialComponent = BaseComponent & {
  type: "material";

  mesh: string;
  meshGroup: string;

  material: {
    key: string;
    label?: string;
    img?: string;
  };

  colors: {
    allowCustom: boolean;
    variants: {
      value: string;
      label?: string;
      price?: number;
    }[] | null;
  };
};

export type SizeComponent = BaseComponent & {
  type: "size";
  options: {
    label: string;
    price?: number;
  }[];
};

export type AddonComponent = BaseComponent & {
  type: "addon";
  options: {
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

export type TextType = | "heading1" | "heading2" | "text-sm" | "text-md" | "text-lg" | "button";

export type Component =
  | MaterialComponent
  | SizeComponent
  | AddonComponent
  | ContentComponent;