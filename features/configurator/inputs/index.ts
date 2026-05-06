import { UpdateAddonOption } from "@/features/builder/store/slices/addon.types";

type AddonHandler = InputHandlerFunc<UpdateAddonOption>;

type InputHandlerFunc<TUpdate> = (args: {
  raw: string;
  moduleId: string;
  optionId: string;
  update: TUpdate;
}) => void;

type InputHandlerKey =
  | "addonOptionValue"
  | "addonOptionLabel"
  | "price"
  | "color";

const isValidHex = (value: string) =>
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

export const inputHandlers: Record<InputHandlerKey, AddonHandler> = {
    addonOptionValue: ({ raw, update, moduleId, optionId }) => {
        update(moduleId, optionId, { value: raw.trimStart() });
    },
    addonOptionLabel: ({ raw, update, moduleId, optionId }) => {
        update(moduleId, optionId, { label: raw.trimStart() });
    },

    price: ({ raw, update, moduleId, optionId }) => {
        if (!/^\d*\.?\d*$/.test(raw)) return;

        if (raw === "") return;
        const parsed = Number(raw); 

        if (parsed < 0) return; 
        console.log(moduleId, optionId, parsed)
        update(moduleId, optionId, { price: parsed });
    },
    color: ({ raw, update, moduleId, optionId }) => {
        const value = raw.trim();

        update(moduleId, optionId, { value });
    },

};