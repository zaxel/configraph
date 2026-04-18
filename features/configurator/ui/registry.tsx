import { AddonComponent, Component, ContentComponent, PartComponent, PriceComponent, SizeComponent } from "../model";
import AddonBlock from "./components/AddonBlock";
import ContentBlock from "./components/ContentBlock";
import PartBlock from "./components/PartBlock";
import PriceBlock from "./components/PriceBlock";
import SizeBlock from "./components/SizeBlock";

type Renderer<T extends Component> = (props: { data: T }) => React.ReactNode;

type ComponentMap = {
  content: ContentComponent;
  price: PriceComponent;
  part: PartComponent;
  size: SizeComponent;
  addon: AddonComponent;
};

type Registry = {
  [K in keyof ComponentMap]: Renderer<ComponentMap[K]>;
};

export const componentRegistry: Registry = {
  content: ContentBlock,
  price: PriceBlock,
  part: PartBlock,
  size: SizeBlock,
  addon: AddonBlock,
}; 