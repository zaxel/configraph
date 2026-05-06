import { AddonComponent, Component, DefaultAddons, DefaultCanvas, DefaultContent, DefaultParts, DefaultPrice, DefaultSizes, DefaultSubmit, ModuleDefault, SizeComponent } from "@/features/configurator/model";
export type BuilderAddonComponent = AddonComponent;
export type BuilderSizeComponent = SizeComponent;

import AddonBuilderBlock from "./components/AddonBuilderBlock";
import SizeBuilderBlock from "./components/SizeBuilderBlock";


export type Renderer<T extends Component> = (props: { 
  data: T;
  moduleId: string;
  defaultOpt: ModuleDefault | undefined; 
}) => React.ReactNode;

type ComponentMap = {
  addon: BuilderAddonComponent;
  size: BuilderSizeComponent;
};

type ComponentDefaultMap = {
  addon: DefaultAddons;
  parts: DefaultParts;
  size: DefaultSizes;
  canvas: DefaultCanvas;
  content: DefaultContent;
  submit: DefaultSubmit;
  price: DefaultPrice;
};


type Registry = {
  [K in keyof ComponentMap]: (props: {
    data: ComponentMap[K];
    moduleId: string;
    defaultOpt: ComponentDefaultMap[K];
  }) => React.ReactNode;
}; 

export const componentRegistry: Registry = {
  addon: AddonBuilderBlock,
  size: SizeBuilderBlock, 
};  