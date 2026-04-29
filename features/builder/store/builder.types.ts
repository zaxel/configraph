import { ModelSlice } from "./slices/model.type";
import { UiSlice } from "./slices/ui.type";

export type BoundBuilderStore = UiSlice & ModelSlice;
