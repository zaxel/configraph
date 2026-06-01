import { ColorVariant, meshGroup, OptionsComponent, PartsComponent, Product } from "../../../configurator/model";
import { PathResolver } from "./mapZodErrors";



export const buildPathResolver = (draft: Product): PathResolver => {
    return (zodPath) => {
        const resolved: (string | number)[] = [];

        for (let i = 0; i < zodPath.length; i++) {
            const segment = zodPath[i];
            const prev = zodPath[i - 1];

            // modules[N] → modules[instanceId]
            if (prev === "modules" && typeof segment === "number") {
                const instanceId = draft.modules[segment]?.instanceId;
                resolved.push(instanceId ?? segment);
                continue;
            }

            // components[N] → components[component.id]
            if (prev === "components" && typeof segment === "number") {
                const moduleIdx = zodPath[1] as number;
                const compId = draft.modules[moduleIdx]?.components[segment]?.id;
                resolved.push(compId ?? segment);
                continue;
            }

            // options[N] → options[option.id]
            if (prev === "options" && typeof segment === "number") {
                const moduleIdx = zodPath[1] as number;
                const compIdx = zodPath[3] as number;
                const component = draft.modules[moduleIdx]?.components[compIdx];

                if (component && "options" in component && Array.isArray(component.options)) {
                    const option = component.options[segment] as OptionsComponent | undefined;
                    resolved.push(option?.id ?? segment);
                } else {
                    resolved.push(segment);
                }
                continue;
            }

            // groups[N] → groups[group.id]
            if (prev === "groups" && typeof segment === "number") {
                const moduleIdx = zodPath[1] as number;
                const compIdx = zodPath[3] as number;
                const optIdx = zodPath[5] as number;
                const component = draft.modules[moduleIdx]?.components[compIdx] as PartsComponent | undefined;;
                const option = component?.options?.[optIdx] as OptionsComponent | undefined;;
                const group = option?.groups?.[segment] as meshGroup | undefined;
                resolved.push(group?.id ?? segment);
                continue;
            }

            // variants[N] → variants[variant.id]  (colors.variants[N])
            if (prev === "variants" && typeof segment === "number") {
                const moduleIdx = zodPath[1] as number;
                const compIdx = zodPath[3] as number;
                const optIdx = zodPath[5] as number;
                const groupIdx = zodPath[7] as number;
                const component = draft.modules[moduleIdx]?.components[compIdx] as PartsComponent | undefined;;
                const option = component?.options?.[optIdx] as OptionsComponent | undefined;
                const group = option?.groups?.[groupIdx] as meshGroup | undefined;
                const variant = group?.colors?.variants?.[segment] as ColorVariant | undefined;
                resolved.push(variant?.id ?? segment);
                continue;
            }

            if (typeof segment === "symbol") continue; 
            resolved.push(segment);
        }

        return resolved.join(".");
    };
};