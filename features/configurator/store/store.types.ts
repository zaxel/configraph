import { LoadingSlice } from "@/types/loading.types";
import { OptionsSlice } from "../model/selections.types";
import { ViewerSlice } from "../../viewer/types/viewer.types";
import { CanvasSlice } from "./slices/canvas.types";
import { UserSlice } from "./slices/user.types";
import { DecalsSlice } from "./slices/decals.types";
import { ProductSlice } from "./slices/product.slice";

export type BoundStore = OptionsSlice & ProductSlice & LoadingSlice & UiSlice & ViewerSlice & CanvasSlice & UserSlice & DecalsSlice;

export type UiSlice = {
  activeModule: string | null;
  setActiveModule: (id: string | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};




