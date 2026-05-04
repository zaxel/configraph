import { AddonComponent } from "@/features/configurator/model";

type AddonOption = AddonComponent["options"][number];


export type AddonSlice = {
    deleteAddonOption: (moduleId: string, optionId: string) => void,
    addAddonOption: (moduleId: string, option: AddonOption) => void,
    updateAddonOption: (moduleId: string, optionId: string, patch: Partial<AddonOption>) => void,
    updateCheckOption: (moduleId: string, optionId: string, isSelected: boolean) => void,
}