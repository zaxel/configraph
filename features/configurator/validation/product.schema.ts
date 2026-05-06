import { z } from "zod";
import { PriceModuleSchema } from "./modules/priceModuleSchema";
import { CanvasModuleSchema } from "./modules/canvasModuleSchema";
import { ContentModuleSchema } from "./modules/contentModuleSchema";
import { PartsModuleSchema } from "./modules/partsModuleSchema";
import { SizeModuleSchema } from "./modules/sizeModuleSchema";
import { AddonModuleSchema } from "./modules/addonModuleSchema";
import { SubmitModuleSchema } from "./modules/submitModuleSchema";
import { BaseProductSchema } from "./modules/baseProductSchema";


const ModuleSchema = z.discriminatedUnion("id", [
  PriceModuleSchema,
  CanvasModuleSchema,
  ContentModuleSchema,
  PartsModuleSchema,
  SizeModuleSchema,
  AddonModuleSchema,
  SubmitModuleSchema,
]);

export const ProductSchema = BaseProductSchema.extend({
  modules: z.array(ModuleSchema),
});