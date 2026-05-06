import { z } from "zod";

export const CanvasModuleSchema = z.object({
  id: z.literal("canvas"),
  instanceId: z.string(),
  order: z.number(),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("canvas"),
      label: z.string().optional(),

      mode: z.enum(["decal", "uv"]),

      stickers: z.array(z.string()),
    })
  ),
});