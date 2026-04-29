import { ModelSlice } from "./slices/model.type";
import { ProductConfigSlice } from "./slices/productConfig.type";
import { UiSlice } from "./slices/ui.type";

export type BoundBuilderStore = UiSlice & ModelSlice & ProductConfigSlice;
