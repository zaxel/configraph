import { z } from "zod";

export const CanvasModuleSchema = z.object({
  id: z.literal("canvas"),
  instanceId: z.string(),
  order: z.number(),
  type: z.literal("price"),
  default: z.object({
    type: z.literal("price"),
  }),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("canvas"),
      label: z.string().max(100, "Max 100 characters").optional(),

      mode: z.enum(["decal", "uv"]),

      stickers: z.array(z.string()),
    })
  ),
});