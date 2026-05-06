import { UpdateAddonOption } from "@/features/builder/store/slices/addon.types";

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
    containerLabel: ({ raw, update, moduleId}) => {  
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

};