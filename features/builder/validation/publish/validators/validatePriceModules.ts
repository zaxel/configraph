import { Product } from "@/features/configurator/model";
import { PublishIssue } from "../types";

export function validatePriceModules(
    draft: Product,
    issues: PublishIssue[]
) {
    const modules = draft.modules.filter(
        (m) => m.id === "price"
    );

    for (const priceModule of modules) {
        for (const component of priceModule.components) {

            if (
                !("pricing" in component)
            ) {
                continue;
            }

            const pricing = component.pricing;

            if (pricing.basePrice < 0) {
                issues.push({
                    severity: "error",
                    moduleId: priceModule.instanceId,
                    componentId: component.id,
                    field: "basePrice",
                    message:
                        "Base price cannot be negative",
                });
            }

            if (pricing.oldPrice < 0) {
                issues.push({
                    severity: "warning",
                    moduleId: priceModule.instanceId,
                    componentId: component.id,
                    field: "oldPrice",
                    message:
                        "Old price cannot be negative",
                });
            }

            if (
                pricing.oldPrice > 0 &&
                pricing.oldPrice < pricing.basePrice
            ) {
                issues.push({
                    severity: "warning",
                    moduleId: priceModule.instanceId,
                    componentId: component.id,
                    message:
                        "Old price is lower than base price",
                });
            }

            if (!pricing.currency.trim()) {
                issues.push({
                    severity: "error",
                    moduleId: priceModule.instanceId,
                    componentId: component.id,
                    field: "currency",
                    message:
                        "Currency is missing",
                });
            }
        }
    }
}