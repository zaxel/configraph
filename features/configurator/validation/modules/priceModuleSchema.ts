import { z } from "zod";

export const PriceModuleSchema = z.object({
    id: z.literal("price"),
    instanceId: z.string(),
    order: z.number(),

    components: z.array(
        z.object({
            id: z.string(),
            type: z.literal("price"),

            pricing: z.object({
                basePrice: z.number().min(0),
                oldPrice: z.number().min(0).optional(),
                currency: z.string(),
                order: z.number(),
            }),
        })
    ),
});