import { AddonComponent } from "@/features/configurator/model";

type AddonOption = AddonComponent["options"][number];


export type PartsSlice = {
    updatePartsTittle: (moduleId: string, value: string) => void,
}

// export type UpdateAddonOption = (
//   moduleId: string,
//   optionId: string,
//   patch: Partial<AddonOption>
// ) => void;