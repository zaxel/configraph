import { z } from "zod";

export const SizeModuleSchema = z.object({
  id: z.literal("size"),
  instanceId: z.string(),
  order: z.number(),

  default: z.object({
    type: z.literal("size"),
    value: z.string(),
  }),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("size"),
      label: z.string(),

      options: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
          price: z.number(),
        })
      ),
    })
  ),
});