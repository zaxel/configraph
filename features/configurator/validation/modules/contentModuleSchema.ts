import { z } from "zod";

export const ContentBlockSchema = z.array(
  z.object({
    id: z.string().min(1),
    value: z.string().min(1),
    textType: z.string(),
  })
);

export const ContentModuleSchema = z.object({
  id: z.literal("content"),
  instanceId: z.string(),
  order: z.number(),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("content"),
      content: ContentBlockSchema,
    })
  ),
});