import { PermissionKey } from "@/features/billing/types/billing.types";
import CanvasBlock from "../canvas/ui/CanvasBlock";

import {
  AddonComponent,
  CanvasComponent,
  Component,
  ContentComponent,
  PartsComponent,
  PriceComponent,
  SizeComponent,
  SubmitComponent,
} from "../model";

import AddonBlock from "./components/AddonBlock";
import ContentBlock from "./components/ContentBlock";
import PartsBlock from "./components/PartsBlock";
import PriceBlock from "./components/PriceBlock";
import SizeBlock from "./components/SizeBlock";
import SubmitBlock from "./components/SubmitBlock";

type Renderer<T extends Component> = (
  props: { data: T }
) => React.ReactNode;


type ComponentMap = {
  content: ContentComponent;
  price: PriceComponent;
  parts: PartsComponent;
  size: SizeComponent;
  addon: AddonComponent;
  canvas: CanvasComponent;
  submit: SubmitComponent;
};

type RegistryEntry<T extends Component> = {
  component: Renderer<T>;

  requiredPermission?: PermissionKey;
};

type Registry = {
  [K in keyof ComponentMap]:
    RegistryEntry<ComponentMap[K]>;
};

export const componentRegistry: Registry = {
  content: {
    component: ContentBlock,
  },

  price: {
    component: PriceBlock,
  },

  parts: {
    component: PartsBlock,
  },

  size: {
    component: SizeBlock,
  },

  addon: {
    component: AddonBlock,
  },

  canvas: {
    component: CanvasBlock,

    requiredPermission: "canUseCanvasEditor",
  },

  submit: {
    component: SubmitBlock,
  },
};