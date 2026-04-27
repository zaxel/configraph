import { SelectedOptions, SizeComponent } from "@/features/configurator/model";

export function findSizePrice(sizeComponent: SizeComponent, options: SelectedOptions){
    const size = options.size;
    const variants = sizeComponent?.options;

    if(!size || !variants) return 0;

    return variants.find(variant=> variant.value === size)?.price ?? 0;
}