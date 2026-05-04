import { AddonSlice } from "./slices/addon.types";
import { ModelSlice } from "./slices/model.type";
import { ProductConfigSlice } from "./slices/productConfig.type";
import { SceneSlice } from "./slices/scene.types";
import { UiSlice } from "./slices/ui.type";

export type BoundBuilderStore = UiSlice & ModelSlice & ProductConfigSlice & SceneSlice & AddonSlice;
