import { OptionsComponent, SelectedOptions } from "@/features/configurator/model";

export function findColorOption(part: OptionsComponent, options: SelectedOptions) {
    const groups = part.groups;
    const partName = part.id;
    if (groups.length <= 0) return 0;

    const partSelection = options.parts?.items?.[partName];
    if (!partSelection?.enabled) return 0;

    const { color, groupId } = partSelection;
    if (!color || !groupId) return 0;

    const group = groups.find(group => group.id === groupId);
    const variant = group?.colors?.variants?.find(col => col.value === color);
    if (!variant) return 0;
    return variant.price ?? 0;
}