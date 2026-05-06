import { z } from "zod";

export const AddonModuleSchema = z.object({
  id: z.literal("addon"),
  instanceId: z.string(),
  order: z.number(),

  default: z.object({
    type: z.literal("addon"),
    selections: z.array(z.string()),
  }),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("addon"),
      label: z.string(),

      options: z.array(
        z.object({
          id: z.string(),
          value: z.string().min(1, "Value cannot be empty").max(100, "Max 100 characters"),
          label: z.string().max(10, "Max 100 characters"),
          price: z.number().min(0, "Price cannot be negative").max(50, "Price cannot exceed 50"),
        })
      ),
    })
  ),
});