import { z } from "zod";

export const SubmitModuleSchema = z.object({
  id: z.literal("submit"),
  instanceId: z.string(),
  order: z.number(),
  type:       z.literal("submit"),        
  default:    z.object({                  
    type:     z.literal("submit"),
  }),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("submit"),
      label: z.string().max(100, "Max 100 characters"),
      text: z.string().min(1, "Value cannot be empty").max(50, "Max 50 characters"),
    })
  ),
});