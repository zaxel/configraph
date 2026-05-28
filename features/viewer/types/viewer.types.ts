import { MeshRegistry } from "./registry.types";
import { Product } from "../../configurator/model";
import { SelectedOptions } from "../../configurator/model/selections.types";

export type MaterialSystemProps = {
    registry: MeshRegistry | null;
    product?: Product | null;
    selectedOptions?: SelectedOptions; 
    enabled: boolean;
}