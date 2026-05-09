import { z } from "zod";

const CSS_NAMED_COLORS = new Set([
  "black", "white", "red", "green", "blue", "yellow", "orange", "purple",
  "pink", "brown", "gray", "grey", "cyan", "magenta", "lime", "indigo",
  "violet", "gold", "silver", "transparent",
  // add more
]);


const colorValue = z.string().refine(
  (val) =>
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val) ||
    CSS_NAMED_COLORS.has(val.toLowerCase()),
  "Must be a valid color (#ffffff)"
);

const ColorVariantSchema = z.object({
  id: z.string(),
  value: colorValue,
  label: z.string().max(100, "Max 100 characters"),
  price: z.number().min(0, "Price cannot be negative").max(500000, "Price cannot exceed 500000"),
});

const GroupSchema = z.object({
  id: z.string(),
  meshes: z.array(z.string()),
  label: z.string().min(1, "Can not be empty").max(5, "Max 100 characters"),

  colors: z.object({
    allowCustom: z.boolean(),
    variants: z.array(ColorVariantSchema),
  }),
});

const PartOptionSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Can not be empty").max(100, "Max 100 characters"), 
  optional: z.boolean(),
  groups: z.array(GroupSchema), 
});

export const PartsModuleSchema = z.object({
  id: z.literal("parts"),
  instanceId: z.string(),
  order: z.number(),

  default: z.object({
    type: z.literal("parts"),
    selections: z.record(
      z.string(),
      z.object({
        groupId: z.string(),
        color: z.string(),
        enabled: z.boolean(),
      })
    ),
    selectedPart: z.string(),
  }),

  components: z.array(
    z.object({
      id: z.string(),
      type: z.literal("parts"),
      label: z.string().max(100, "Max 100 characters"), 

      options: z.array(PartOptionSchema),
    })
  ),
});