import { AddonComponent, Component, ContentComponent, PartsComponent, PriceComponent, SizeComponent } from "../model";
import AddonBlock from "./components/AddonBlock";
import ContentBlock from "./components/ContentBlock";
import PartsBlock from "./components/PartsBlock";
import PriceBlock from "./components/PriceBlock";
import SizeBlock from "./components/SizeBlock";

type Renderer<T extends Component> = (props: { data: T }) => React.ReactNode;

type ComponentMap = {
  content: ContentComponent;
  price: PriceComponent;
  parts: PartsComponent;
  size: SizeComponent;
  addon: AddonComponent;
};

type Registry = {
  [K in keyof ComponentMap]: Renderer<ComponentMap[K]>;
};

export const componentRegistry: Registry = {
  content: ContentBlock,
  price: PriceBlock,
  parts: PartsBlock, 
  size: SizeBlock,
  addon: AddonBlock,
}; 