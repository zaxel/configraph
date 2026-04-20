import { LoadingSlice } from "@/types/loading.types";
import { Product } from "../model";
import { OptionsSlice } from "../model/selections.types";
import { ViewerSlice } from "../ui/viewer.types";

export type BoundStore = OptionsSlice & { product: Product | null } & LoadingSlice & UiSlice & ViewerSlice & CanvasSlice; 

export type UiSlice = {
  activeModule: string | null;
  setActiveModule: (id: string | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void; 
};

export type DealTransform = {
    position: [number, number, number],
    rotation: [number, number, number],
    scale: number,
  }

export type CanvasSlice = { 
  mode: "decal" | "uv" | null,
  setMode: (mode: "decal" | "uv" | null) => void
  
  active: boolean;
  toggleActive: () => void,
  // Fabric JSON
  
  design?: any,
  setDesign: (design: any) => void,

  // decal-specific
  decalTransform?: DealTransform,
  setDecalTransform: (transform: DealTransform) => void,

  // uv-specific
  availableStickers: string[],
  addSticker: (file: File) => void,
  removeSticker: (delUrl: string) => void,
  
  
  activeZone?: string | null | undefined,
  setActiveZone: (zone: string) => void,



}