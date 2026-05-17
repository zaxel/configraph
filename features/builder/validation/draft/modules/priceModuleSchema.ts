import { z } from "zod";

export const PriceModuleSchema = z.object({
    id: z.literal("price"),
    instanceId: z.string(),
    order: z.number(),
    type: z.literal("price"),
    default: z.object({
        type: z.literal("price"),
    }),

    components: z.array(
        z.object({
            id: z.string(),
            type: z.literal("price"),
            label: z.string().max(100, "Max 100 characters").optional(), 
            pricing: z.object({
                basePrice: z.number().min(0, "Price cannot be negative").max(5_000_000_000, "Price cannot exceed 5 000 000 000"),
                oldPrice: z.number().min(0, "Price cannot be negative").max(5_000_000_000, "Price cannot exceed 5 000 000 000").optional(),
                currency: z.string(),
                order: z.number(),
            }),
        })
    ),
});