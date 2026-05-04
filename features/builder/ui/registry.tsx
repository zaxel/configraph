import { AddonComponent, Component, DefaultAddons, DefaultCanvas, DefaultContent, DefaultParts, DefaultPrice, DefaultSizes, DefaultSubmit, ModuleDefault } from "@/features/configurator/model";
export type BuilderAddonComponent = AddonComponent;


// import { AddonComponent, CanvasComponent, Component, ContentComponent, PartsComponent, PriceComponent, SizeComponent, SubmitComponent } from "";
import AddonBuilderBlock from "./components/AddonBuilderBlock";



// type Renderer<T extends Component> = (props: { data: T }) => React.ReactNode;
type Renderer<T extends Component> = (props: {
  data: T;
  moduleId: string;
  defaultOpt: ModuleDefault | undefined; // Use the union here
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

// type Registry = {
//   [K in keyof ComponentMap]: Renderer<ComponentMap[K]>;
// };

type Registry = {
  [K in keyof ComponentMap]: (props: {
    data: ComponentMap[K]; 
    moduleId: string;
    // No 'any' needed because we use K to look up the exact type
    defaultOpt: ComponentDefaultMap[K];
  }) => React.ReactNode;
}; 

export const componentRegistry: Registry = {
  addon: AddonBuilderBlock,
};  