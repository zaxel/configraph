import {  ColorVariant } from "@/features/configurator/model";

export type PartsSlice = {
    updatePartsTittle: (moduleId: string, value: string) => void,
    updatePartLabel: (moduleId: string, optionId: string, value: string) => void,
    updateVariantLabel: (moduleId: string, optionId: string, groupId: string, value: string) => void,
    setDefaultPart: (moduleId: string, optionId: string, isSelected: boolean) => void,
    setOptionalPart: (moduleId: string, optionId: string, isSelected: boolean) => void,
    setPartEnabled: (moduleId: string, optionId: string, isSelected: boolean) => void,
    updateDefaultPartColor: (moduleId: string, optionId: string, color: string, isSelected: boolean) => void,
    updatePartColor: (moduleId: string, optionId: string, groupId: string, variantId: string, patch: Partial<ColorVariant>) => void,
    deleteColorOption: (moduleId: string, optionId: string, groupId: string, colorId: string) => void,
    addColorOption: (moduleId: string, optionId: string, groupId: string, newOption: ColorVariant) => void,
    setColorSelectType: (moduleId: string, optionId: string, groupId: string, isCustomAllowed: boolean) => void,
    addPartGroup: (moduleId: string, optionId: string) => void,
    deleteVariant: (moduleId: string, optionId: string, groupId: string) => void,
    addPart: (moduleId: string) => void,
    deletePart: (moduleId: string, optionId: string) => void,
    addMeshToGroup: (moduleId: string, optionId: string, groupId: string, mesh: string) => void,
    deleteMeshOption: (moduleId: string, optionId: string, groupId: string, mesh: string) => void,
} 
