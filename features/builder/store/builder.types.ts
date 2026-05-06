import { AddonSlice } from "./slices/addon.types";
import { ModelSlice } from "./slices/model.type";
import { ProductConfigSlice } from "./slices/productConfig.type";
import { SceneSlice } from "./slices/scene.types";
import { SizeSlice } from "./slices/size.types";
import { UiSlice } from "./slices/ui.type";
import { ValidationSlice } from "./slices/validation.type";

export type BoundBuilderStore = UiSlice & ModelSlice & ProductConfigSlice & SceneSlice & AddonSlice & ValidationSlice & SizeSlice;
