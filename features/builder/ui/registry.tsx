import { AddonComponent, Component } from "@/features/configurator/model";
export type BuilderAddonComponent = AddonComponent;


// import { AddonComponent, CanvasComponent, Component, ContentComponent, PartsComponent, PriceComponent, SizeComponent, SubmitComponent } from "";
import AddonBuilderBlock from "./components/AddonBuilderBlock";



type Renderer<T extends Component> = (props: { data: T }) => React.ReactNode;

type ComponentMap = {
  addon: BuilderAddonComponent;
};

type Registry = {
  [K in keyof ComponentMap]: Renderer<ComponentMap[K]>;
};

export const componentRegistry: Registry = {
  addon: AddonBuilderBlock,
};  