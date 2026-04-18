import { LoadingSlice } from "@/types/loading.types";
import { Product } from "../model";
import { OptionsSlice } from "../model/selections.types";
import { ViewerSlice } from "../ui/viewer.types";

export type BoundStore = OptionsSlice & { product: Product | null } & LoadingSlice & UiSlice & ViewerSlice; 

export type UiSlice = {
  activeModule: string | null;
  setActiveModule: (id: string | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void; 
};