import { AddonSlice } from "./slices/addon.types";
import { CanvasSlice } from "./slices/canvas.types";
import { ContentSlice } from "./slices/content.types";
import { ModelSlice } from "./slices/model.type";
import { PartsSlice } from "./slices/parts.types";
import { PriceSlice } from "./slices/price.types";
import { ProductConfigSlice } from "./slices/productConfig.type";
import { SceneSlice } from "./slices/scene.types";
import { SizeSlice } from "./slices/size.types";
import { SubmitSlice } from "./slices/submit.types";
import { UiSlice } from "./slices/ui.type";
import { ValidationSlice } from "./slices/validation.type";

export type BoundBuilderStore = UiSlice 
                                & ModelSlice 
                                & ProductConfigSlice 
                                & SceneSlice 
                                & AddonSlice 
                                & ValidationSlice 
                                & SizeSlice
                                & PartsSlice
                                & ContentSlice
                                & PriceSlice
                                & SubmitSlice
                                & CanvasSlice;
