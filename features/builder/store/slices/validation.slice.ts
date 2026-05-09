import { StateCreator } from "zustand";
import { BoundBuilderStore } from "../builder.types";
import { ValidationSlice } from "./validation.type";
import { mapZodErrors } from "@/features/configurator/validation/mapZodErrors";
import { ProductSchema } from "@/features/configurator/validation/product.schema";
import { buildPathResolver } from "@/features/configurator/validation/buildPathResolver";

export const createValidationSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    ValidationSlice
> = (set, get) => ({
    errors: {},
    touched: {},
    dirty: {},
    isValid: true,

    setFieldTouched: (path) =>
        set((state) => {
            state.touched[path] = true;
        }), 

    setFieldDirty: (path) =>
        set((state) => {
            state.dirty[path] = true;
        }),

    setErrors: (errors) =>
        set((state) => {
            state.errors = errors;
            state.isValid = Object.keys(errors).length === 0;
        }),

    clearErrors: () =>
        set((state) => {
            state.errors = {};
            state.isValid = true;
        }),
    validateDraft: () => {
        const draft = get().draft;

        if (!draft) {
            get().clearErrors();
            return;
        }

        const parsed = ProductSchema.safeParse(draft);

        if (parsed.success) {
            get().clearErrors();
        } else {
            const resolver = buildPathResolver(draft); 
            console.log(parsed.error);
            const mapped = mapZodErrors(parsed.error, resolver);  
            get().setErrors(mapped);
        }
    },

    validateField: (path) => {
        // MVP: just revalidate whole draft
        // later you can optimize with schema.pick()
        get().validateDraft();
    },
});