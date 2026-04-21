import { LoadingSlice } from "@/types/loading.types";
import { Product } from "../model";
import { OptionsSlice } from "../model/selections.types";
import { ViewerSlice } from "../ui/viewer.types";
import { CanvasSlice } from "./slices/canvas.types";
import { UserSlice } from "./slices/user.types";

export type BoundStore = OptionsSlice & { product: Product | null } & LoadingSlice & UiSlice & ViewerSlice & CanvasSlice & UserSlice;

export type UiSlice = {
  activeModule: string | null;
  setActiveModule: (id: string | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};




