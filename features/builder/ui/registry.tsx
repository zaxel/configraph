import { AddonComponent, Component, DefaultAddons, DefaultCanvas, DefaultContent, DefaultParts, DefaultPrice, DefaultSizes, DefaultSubmit, ModuleDefault } from "@/features/configurator/model";
export type BuilderAddonComponent = AddonComponent;
import AddonBuilderBlock from "./components/AddonBuilderBlock";


export type Renderer<T extends Component> = (props: {
  data: T;
  moduleId: string;
  defaultOpt: ModuleDefault | undefined; 
}) => React.ReactNode;

type ComponentMap = {
  addon: BuilderAddonComponent;
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
};  