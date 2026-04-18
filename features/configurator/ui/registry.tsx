import { AddonComponent, Component, ContentComponent, MaterialComponent, PriceComponent, SizeComponent } from "../model";
import AddonBlock from "./components/AddonBlock";
import ContentBlock from "./components/ContentBlock";
import MaterialBlock from "./components/MaterialBlock";
import PriceBlock from "./components/PriceBlock";
import SizeBlock from "./components/SizeBlock";

type Renderer<T extends Component> = (props: { data: T }) => React.ReactNode;

type ComponentMap = {
  content: ContentComponent;
  price: PriceComponent;
  material: MaterialComponent;
  size: SizeComponent;
  addon: AddonComponent;
};

type Registry = {
  [K in keyof ComponentMap]: Renderer<ComponentMap[K]>;
};

export const componentRegistry: Registry = {
  content: ContentBlock,
  price: PriceBlock,
  material: MaterialBlock,
  size: SizeBlock,
  addon: AddonBlock,
}; 