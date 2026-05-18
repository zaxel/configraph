import { z } from "zod";

export const SizeModuleSchema = z.object({
  id: z.literal("size"),
  instanceId: z.string(),
  order: z.number(),

  default: z.object({
    type: z.literal("size"),
    value: z.string().optional(),
  }),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("size"),
      label: z.string().max(100, "Max 100 characters"),

      options: z.array(
        z.object({
          id: z.string(),
          value: z.string().min(1, "Value cannot be empty").max(100, "Max 100 characters"),
          label: z.string().max(100, "Max 100 characters"),
          price: z.number().min(0, "Price cannot be negative").max(500000, "Price cannot exceed 500000"),
        })
      ),
    })
  ),
});