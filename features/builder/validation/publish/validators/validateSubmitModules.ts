import { Product } from "@/features/configurator/model";
import { PublishIssue } from "../types";

export function validateSubmitModules(
    draft: Product,
    issues: PublishIssue[]
) {
    const modules = draft.modules.filter(
        (m) => m.id === "submit"
    );

    for (const submitModule of modules) {
        for (const component of submitModule.components) {

            if (
                "text" in component &&
                !component.text.trim()
            ) {
                issues.push({
                    severity: "error",
                    moduleId: submitModule.instanceId,
                    componentId: component.id,
                    field: "text",
                    message: "Submit button text cannot be empty",
                });
            }

            if (
                component.label && !component.label?.trim()
            ) {
                issues.push({
                    severity: "warning",
                    moduleId: submitModule.instanceId,
                    componentId: component.id,
                    field: "label",
                    message: "Submit label is empty",
                });
            }
        }
    }
}