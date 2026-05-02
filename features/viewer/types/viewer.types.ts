import { MeshRegistry } from "./registry.types";
import { Product } from "../../configurator/model";
import { SelectedOptions } from "../../configurator/model/selections.types";

 export type ViewerSlice = {
  cameraMode: "orbit" | "other-mode"; // Be specific if you can!
  setCameraMode: (mode: "orbit" | "other-mode") => void;
  selectedMesh: any; // Or your Mesh type
  setSelectedMesh: (mesh: any) => void;
}; 

export type MaterialSystemProps = {
    registry: MeshRegistry | null;
    product?: Product | null;
    selectedOptions?: SelectedOptions; 
    enabled: boolean;
}