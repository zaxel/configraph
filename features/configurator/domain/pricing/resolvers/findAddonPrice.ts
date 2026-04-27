import { AddonComponent, SelectedOptions } from "@/features/configurator/model";

export function findAddonPrice(addonComponent: AddonComponent, options: SelectedOptions){
    const selectedAddons = options.addon || [];
    const variants = addonComponent.options || []; 
    return variants.reduce((acc, addon)=> selectedAddons.includes(addon.value) ? acc + (addon?.price ?? 0) : acc, 0);
}