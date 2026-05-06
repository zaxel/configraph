import { z } from "zod";

export const SubmitModuleSchema = z.object({
  id: z.literal("submit"),
  instanceId: z.string(),
  order: z.number(),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("submit"),
      label: z.string(),
      text: z.string(),
    })
  ),
});