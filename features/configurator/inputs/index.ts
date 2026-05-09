import { UpdateAddonOption } from "@/features/builder/store/slices/addon.types";
import { UpdateSizeOption } from "@/features/builder/store/slices/size.types";

type InputHandlerFunc<TUpdate, TArgs extends object = object> = (args: {
    raw: string;
    moduleId: string;
    update: TUpdate;
} & TArgs) => void;

type WithOptionId = { optionId: string };

type InputHandlerMap = {
    containerLabel: InputHandlerFunc<(moduleId: string, label: string) => void>;
    addonOptionValue: InputHandlerFunc<UpdateAddonOption, WithOptionId>;
    addonOptionLabel: InputHandlerFunc<UpdateAddonOption, WithOptionId>;
    sizeOptionValue: InputHandlerFunc<UpdateSizeOption, WithOptionId>;
    sizeOptionLabel: InputHandlerFunc<UpdateSizeOption, WithOptionId>;
    price: InputHandlerFunc<UpdateAddonOption, WithOptionId>;
    color: InputHandlerFunc<UpdateAddonOption, WithOptionId>;
};

const isValidHex = (value: string) =>
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

export const inputHandlers: InputHandlerMap = {
    addonOptionValue: ({ raw, update, moduleId, optionId }) => {
        update(moduleId, optionId, { value: raw.trimStart() });
    },
    addonOptionLabel: ({ raw, update, moduleId, optionId }) => {
        update(moduleId, optionId, { label: raw.trimStart() });
    },
    containerLabel: ({ raw, update, moduleId }) => {
        update(moduleId, raw.trimStart());
    },

    price: ({ raw, update, moduleId, optionId }) => {
        if (!/^\d*\.?\d*$/.test(raw)) return;

        if (raw === "") return;
        const parsed = Number(raw);

        if (parsed < 0) return;
        update(moduleId, optionId, { price: parsed });
    },
    color: ({ raw, update, moduleId, optionId }) => {
        const value = raw.trim();

        update(moduleId, optionId, { value });
    },

    sizeOptionValue: ({ raw, update, moduleId, optionId }) => {
        update(moduleId, optionId, { value: raw.trimStart() });
    },
    sizeOptionLabel: ({ raw, update, moduleId, optionId }) => {
        update(moduleId, optionId, { label: raw.trimStart() });
    },


    updatePartsColorValue({ raw, moduleId, optionId, groupId, variantId, update }) {
        const value = raw.trim();
        // moduleId, optionId, groupId, variantId, patch 
        update(moduleId, optionId, groupId, variantId, { value });
    },
    updatePartsColorLabel({ raw, moduleId, optionId, groupId, variantId, update }) {
        const label = raw.trim();
        // moduleId, optionId, groupId, variantId, patch 
        update(moduleId, optionId, groupId, variantId, { label });
    },
    updatePartsColorPrice({ raw, moduleId, optionId, groupId, variantId, update }) {
        if (!/^\d*\.?\d*$/.test(raw)) return;

        if (raw === "") return;
        const parsed = Number(raw);

        if (parsed < 0) return;
        update(moduleId, optionId, groupId, variantId, { price: parsed });
    },


    partLabel: ({ raw, moduleId, optionId, update }) => {
        update(moduleId, optionId, raw.trimStart());
    },

    variantLabel: ({ raw, moduleId, optionId, groupId, update }) => {
        update(moduleId, optionId, groupId, raw.trimStart());
    },
};