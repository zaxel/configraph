import { z } from "zod";

export const ContentBlockSchema = z.array(
  z.object({
    id: z.string().min(1),
    value: z.string().min(1, "Value cannot be empty").max(1000, "Max 1000 characters"),
    textType: z.string(),
  })
);

export const ContentModuleSchema = z.object({
  id: z.literal("content"),
  instanceId: z.string(),
  order: z.number(),
  type: z.literal("content"),        
  default: z.object({                
    type: z.literal("content"),
  }),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("content"),
      label: z.string().max(100, "Max 100 characters"),

      content: ContentBlockSchema,
    })
  ),
});