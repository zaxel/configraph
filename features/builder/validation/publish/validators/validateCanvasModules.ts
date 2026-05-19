import { Product } from "@/features/configurator/model";
import { PublishIssue } from "../types";

export function validateCanvasModules(
    draft: Product,
    issues: PublishIssue[]
) {
    const modules = draft.modules.filter(
        (m) => m.id === "canvas"
    );

    for (const canvasModule of modules) {
        for (const component of canvasModule.components) {

            if (
                "stickers" in component &&
                component.stickers.length === 0
            ) {
                issues.push({
                    severity: "warning",
                    moduleId: canvasModule.instanceId,
                    componentId: component.id,
                    message:
                        "Canvas module has no default stickers",
                });
            }

            if (
                "mode" in component &&
                !component.mode
            ) {
                issues.push({
                    severity: "error",
                    moduleId: canvasModule.instanceId,
                    componentId: component.id,
                    field: "mode",
                    message:
                        "Canvas mode is missing",
                });
            }
        }
    }
}