import { Product } from "@/features/configurator/model";
import { PublishIssue } from "../types";

export function validateAddonModules(
    draft: Product,
    issues: PublishIssue[]
) {
    const modules = draft.modules.filter(
        (m) => m.id === "addon"
    );

    for (const addonModule of modules) {
        for (const component of addonModule.components) {

            if (
                !("options" in component) ||
                component.options.length === 0
            ) {
                issues.push({
                    severity: "error",
                    moduleId: addonModule.instanceId,
                    componentId: component.id,
                    message:
                        "Addon module has no options",
                });

                continue;
            }

            for (const option of component.options) {

                if (!option.value.trim()) {
                    issues.push({
                        severity: "error",
                        moduleId: addonModule.instanceId,
                        componentId: component.id,
                        entityId: option.id,
                        field: "value",
                        message:
                            "Addon value cannot be empty",
                    });
                }

                if (!option.label.trim()) {
                    issues.push({
                        severity: "warning",
                        moduleId: addonModule.instanceId,
                        componentId: component.id,
                        entityId: option.id,
                        field: "label",
                        message:
                            "Addon label is empty",
                    });
                }

                if (option.price < 0) {
                    issues.push({
                        severity: "error",
                        moduleId: addonModule.instanceId,
                        componentId: component.id,
                        entityId: option.id,
                        field: "price",
                        message:
                            "Addon price cannot be negative",
                    });
                }
            }
        }
    }
}