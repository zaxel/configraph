import { Product } from "@/features/configurator/model";
import { PublishIssue } from "../types";

export function validateContentModules(
    draft: Product,
    issues: PublishIssue[]
) {
    const modules = draft.modules.filter(
        (m) => m.id === "content"
    );

    for (const contentModule of modules) {
        for (const component of contentModule.components) {
            if ("content" in component && component.content.length === 0) {
                issues.push({
                    severity: "error",
                    moduleId: contentModule.instanceId,
                    message: "Content module is empty",
                });
            }
        }
    }
}