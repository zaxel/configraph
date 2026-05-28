import { UpdateAddonOption } from "@/features/builder/store/slices/addon.types";
import { UpdateContentText } from "@/features/builder/store/slices/content.types";
import { UpdateSizeOption } from "@/features/builder/store/slices/size.types";
import { EditablePriceKeys } from "@/features/builder/store/slices/price.types";

type InputHandlerFunc<TUpdate, TArgs extends object = object> = (args: {
    raw: string;
    moduleId: string;
    update: TUpdate;
} & TArgs) => void;

type WithOptionId = { optionId: string };
type WithGroupId = { optionId: string; groupId: string };
type WithVariantId = { optionId: string; groupId: string; variantId: string };

type UpdatePartsColor = (moduleId: string, optionId: string, groupId: string, variantId: string, patch: { value?: string; label?: string; price?: number }) => void;
type UpdatePartLabel = (moduleId: string, optionId: string, value: string) => void;
type UpdateVariantLabel = (moduleId: string, optionId: string, groupId: string, value: string) => void;

type WithTextId = { textId: string; };
type UpdatePrice = (moduleId: string, type: EditablePriceKeys, value: number) => void;
type WithPriceType = { type: EditablePriceKeys; };

type InputHandlerMap = {
    containerLabel: InputHandlerFunc<(moduleId: string, label: string) => void>;
    addonOptionValue: InputHandlerFunc<UpdateAddonOption, WithOptionId>;
    addonOptionLabel: InputHandlerFunc<UpdateAddonOption, WithOptionId>;
    sizeOptionValue: InputHandlerFunc<UpdateSizeOption, WithOptionId>;
    sizeOptionLabel: InputHandlerFunc<UpdateSizeOption, WithOptionId>;
    price: InputHandlerFunc<UpdateAddonOption, WithOptionId>;
    color: InputHandlerFunc<UpdateAddonOption, WithOptionId>;
    
    updatePartsColorValue: InputHandlerFunc<UpdatePartsColor, WithVariantId>;
    updatePartsColorLabel: InputHandlerFunc<UpdatePartsColor, WithVariantId>;
    updatePartsColorPrice: InputHandlerFunc<UpdatePartsColor, WithVariantId>;
    
    partLabel: InputHandlerFunc<UpdatePartLabel, WithOptionId>;
    variantLabel: InputHandlerFunc<UpdateVariantLabel, WithGroupId>;


    contentTextValue: InputHandlerFunc<UpdateContentText, WithTextId>;
    productPrice: InputHandlerFunc<UpdatePrice, WithPriceType>;
};

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
        update(moduleId, optionId, groupId, variantId, { value });
    },
    updatePartsColorLabel({ raw, moduleId, optionId, groupId, variantId, update }) {
        const label = raw.trim();
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

    contentTextValue: ({ raw, moduleId, textId, update }) => {
        update(moduleId, textId, { value: raw.trimStart() });   
    },

    productPrice: ({ raw, moduleId, type, update }) => { 
        if (!/^\d*\.?\d*$/.test(raw)) return;

        if (raw === "") return;
        const parsed = Number(raw);

        if (parsed < 0) return;
        update(moduleId, type, parsed);
    },
};