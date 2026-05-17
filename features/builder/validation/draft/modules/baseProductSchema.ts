import { z } from "zod";

export const BaseProductSchema = z.object({
  quantity: z.number().min(1),

  model: z.object({
    url: z.string().min(1),
  }),

  modules: z.array(z.any()), // will refine later
});