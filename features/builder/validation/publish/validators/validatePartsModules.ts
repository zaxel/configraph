import { Product } from "@/features/configurator/model";
import { PublishIssue } from "../types";
import { BuilderConfig } from "@/features/builder/store/slices/productConfig.type";

export function validatePartsModules(
    draft: Product,
    builderConfig: BuilderConfig,
    issues: PublishIssue[]
) {
    const modules = draft.modules.filter(
        (m) => m.id === "parts"
    );

    const existingMeshes = new Set(
        (builderConfig?.meshes ?? []).map(
            (m) => m.name
        )
    );

    const assignedMeshes = new Map<
        string,
        {
            moduleId: string;
            componentId: string;
            partId: string;
            groupId: string;
        }
    >();


    for (const partsModule of modules) {
        const selected = partsModule.default?.selectedPart;
        if (!selected) {
            issues.push({
                severity: "warning",
                moduleId: partsModule.instanceId,
                message:
                    "Parts module has no default part",
            });
        }

        for (const component of partsModule.components) {

            // empty parts module
            if (
                !("options" in component) ||
                component.options.length === 0
            ) {
                issues.push({
                    severity: "error",
                    moduleId: partsModule.instanceId,
                    componentId: component.id,
                    message:
                        "Parts module has no parts",
                });

                continue;
            }

            for (const part of component.options) {

                // enabled part without groups
                if (part && 'enabled' in part && 'groups' in part) {

                    // 2. Run your validation logic safely
                    if (part.enabled && part.groups.length === 0) {
                        issues.push({
                            severity: "error",
                            moduleId: partsModule.instanceId,
                            componentId: component.id,
                            entityId: part.id,
                            message: `Part "${part.label || part.id}" has no groups`, // Fallback to id if label is missing
                        });
                    }
                }

                // optional disabled warning
                if (part && 'optional' in part && 'enabled' in part) {
                    if (part.optional && !part.enabled) {
                        issues.push({
                            severity: "warning",
                            moduleId: partsModule.instanceId,
                            componentId: component.id,
                            entityId: part.id,
                            message: `Optional part "${part.label || part.id}" is disabled`,
                        });
                    }
                }
                if (part && 'optional' in part && 'enabled' in part) {
                    if (!part.optional && !part.enabled) {
                        issues.push({
                            severity: "warning",
                            moduleId: partsModule.instanceId,
                            componentId: component.id,
                            entityId: part.id,
                            message: `Part "${part.label || part.id}" is disabled and will not appear in configurator`,
                        });
                    }
                }
                if (part && 'groups' in part && Array.isArray(part.groups)) {
                    for (const group of part.groups) {

                        // group without meshes
                        if (group.meshes.length === 0) {
                            issues.push({
                                severity: "error",
                                moduleId: partsModule.instanceId,
                                componentId: component.id,
                                entityId: group.id,
                                message:
                                    `Group "${group.label}" has no meshes`,
                            });
                        }

                        // no selectable colors
                        const allowCustom = group?.colors?.allowCustom ?? false;
                        const variantsLength = group?.colors?.variants?.length ?? 0;

                        // 2. Run your condition with the safe fallback variables
                        if (!allowCustom && variantsLength === 0) {
                            issues.push({
                                severity: "warning",
                                moduleId: partsModule.instanceId,
                                componentId: component.id,
                                entityId: group.id,
                                message: `Group "${group.label || group.id}" has no selectable colors`,
                            });
                        }

                        for (const meshName of group.meshes) {
                            // mesh missing from builder config
                            if (
                                !existingMeshes.has(meshName)
                            ) {
                                issues.push({
                                    severity: "error",
                                    moduleId: partsModule.instanceId,
                                    componentId: component.id,
                                    entityId: group.id,
                                    message:
                                        `Mesh "${meshName}" does not exist in model`,
                                });

                                continue;
                            }

                            // duplicate mesh assignment
                            if (
                                assignedMeshes.has(meshName)
                            ) {
                                const existing =
                                    assignedMeshes.get(meshName);

                                issues.push({
                                    severity: "warning",
                                    moduleId: partsModule.instanceId,
                                    componentId: component.id,
                                    entityId: group.id,
                                    message:
                                        `Mesh "${meshName}" is assigned multiple times`,
                                });

                                continue;
                            }

                            assignedMeshes.set(
                                meshName,
                                {
                                    moduleId:
                                        partsModule.instanceId,
                                    componentId:
                                        component.id,
                                    partId: part.id,
                                    groupId: group.id,
                                }
                            );
                        }
                    }
                }
            }
        }
    }
}