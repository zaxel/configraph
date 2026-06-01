import { Mode } from "@/features/product-studio/product-studio.store";
import { Component, Module } from "../model";
import { componentRegistry } from "./registry";
import { PermissionValues } from "@/features/billing/types/billing.types";
import UpgradeFeaturePlaceholder from "./components/UpgradeFeaturePlaceholder";
import { useRouter } from "next/navigation";

export const ModuleRenderer = ({ module, permissions, mode }: { module: Module, permissions: PermissionValues, mode: Mode }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-4">
            {module.components.map((comp: Component) => {
                const entry =
                    componentRegistry[
                    comp.type as keyof typeof componentRegistry
                    ];

                if (!entry) return null;

                if (
                    entry.requiredPermission &&
                    !permissions[entry.requiredPermission]
                ) {
                    if (mode === "preview") {
                        return (
                            <UpgradeFeaturePlaceholder
                                key={comp.id}
                                title="Canvas Editor"
                                description="Upgrade plan to unlock interactive canvas modules."
                                onUpgrade={() => router.push("/dashboard/billing#plans")}
                            />
                        );
                    }

                    return null;
                }
                const Block = entry.component;
                return <Block key={comp.id} data={comp as never} />;
            })}
            <hr className='h-0.5 bg-gray-100 text-transparent' />
        </div>
    );
}; 