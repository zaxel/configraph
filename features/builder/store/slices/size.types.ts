import { DefaultSizes, SizeComponent } from "@/features/configurator/model";

type SizeOption = SizeComponent["options"][number];

export type SizeSlice = {
    deleteSizeOption: (moduleId: string, optionId: string) => void,
    addSizeOption: (moduleId: string, option: SizeOption) => void,
    updateSizeOption: (moduleId: string, optionId: string, patch: Partial<SizeOption>) => void,
    updateSizeTittle: (moduleId: string, value: string) => void,
    updateDefaultSize: (moduleId: string, isSelected: boolean, patch: DefaultSizes) => void,
  }

export type UpdateSizeOption = (
  moduleId: string,
  optionId: string,
  patch: Partial<SizeOption>
) => void; 