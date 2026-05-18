import { Product, SizeComponent } from "@/features/configurator/model";
import { PublishIssue } from "../types";

export function validateSizeModules(
    draft: Product,
    issues: PublishIssue[]
) {
    const modules = draft.modules.filter(
        (m) => m.id === "size"
    );

    for (const sizeModule of modules) {
        if (!sizeModule.default?.id) {
            issues.push({
                severity: "warning",
                moduleId: sizeModule.instanceId,
                message: "No default size selected",
            });
        }
        for (const component of sizeModule.components) {

            if (
                !("options" in component) ||
                component.options.length === 0
            ) {
                issues.push({
                    severity: "error",
                    moduleId: sizeModule.instanceId,
                    componentId: component.id,
                    message: "Size module has no options",
                });

                continue;
            }

            for (const option of component.options as SizeComponent["options"]) {

                if (!option.value.trim()) {
                    issues.push({
                        severity: "error",
                        moduleId: sizeModule.instanceId,
                        componentId: component.id,
                        entityId: option.id,
                        field: "value",
                        message: "Size value cannot be empty",
                    });
                }

                if (!option.label?.trim()) {
                    issues.push({
                        severity: "warning",
                        moduleId: sizeModule.instanceId,
                        componentId: component.id,
                        entityId: option.id,
                        field: "label",
                        message: "Size label is empty",
                    });
                }
            }
        }
    }
}