import { Product } from "../model";
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
                    const option = component.options[segment];

                    if (option && typeof option === "object" && "id" in option) {
                        resolved.push(option.id as string);
                    } else {
                        resolved.push(segment);
                    }
                } else { 
                    resolved.push(segment);
                }
                continue; 
            }
            resolved.push(segment as string | number);
        }
        return resolved.join(".");
    };
};