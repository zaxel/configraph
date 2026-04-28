import { LoadingSlice } from "@/types/loading.types";
import { Product } from "../model";
import { OptionsSlice } from "../model/selections.types";
import { ViewerSlice } from "../../viewer/types/viewer.types";
import { CanvasSlice } from "./slices/canvas.types";
import { UserSlice } from "./slices/user.types";
import { DecalsSlice } from "./slices/decals.types";

export type BoundStore = OptionsSlice & { product: Product | null, quantity: number } & LoadingSlice & UiSlice & ViewerSlice & CanvasSlice & UserSlice & DecalsSlice;

export type UiSlice = {
  activeModule: string | null;
  setActiveModule: (id: string | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};




