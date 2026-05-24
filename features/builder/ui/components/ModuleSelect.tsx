import { Field, FieldGroup } from '@/components/ui/field';
import { UpgradeModal } from '@/components/common/UpgradeModal';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { canAddModule } from '@/features/configurator/model/module.rules';
import React, { useState } from 'react';
import { useBuilderStore } from '../../store/builder.store';
import { ComponentType } from '@/features/configurator/model';
import { PermissionValues } from '@/features/billing/types/billing.types';

const ModuleSelect = ({ permissions }: {permissions: PermissionValues}) => {

    const [selectedModule, setSelectedModule] = useState<string>("");
    const modules: ComponentType[] = ["parts", "size", "addon", "content", "price", "canvas", "submit"];

    const draft = useBuilderStore(s => s.draft);
    const addModule = useBuilderStore(s => s.addModule);

    const [upgradeOpen, setUpgradeOpen] = useState(false);

    return (
        <>
            <FieldGroup className="w-full max-w-xs">
                <Field>
                    <Select
                        value={selectedModule}
                        onValueChange={(value: ComponentType) => {
                            if (
                                value === "canvas" &&
                                !permissions.canUseCanvasEditor
                            ) {
                                setUpgradeOpen(true);
                                setSelectedModule("");
                                return;
                            }
                            addModule(value);
                            setSelectedModule("");
                        }}
                    >
                        <SelectTrigger className="w-full max-w-58">
                            <SelectValue placeholder="Add a module" />
                        </SelectTrigger>
                        <SelectContent
                            position={"popper"}
                        >
                            <SelectGroup>
                                {modules.map(module => {
                                    if (!draft) return null;
                                    return canAddModule(module, draft)
                                        ? <SelectItem
                                            key={module}
                                            value={module}
                                        >{module}</SelectItem>
                                        : null
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            </FieldGroup>

            <UpgradeModal
                open={upgradeOpen}
                onOpenChange={setUpgradeOpen}
                title="Canvas Editor not available on Free plan"
                description="Upgrade plan to unlock interactive canvas modules and advanced editor features."
            />
        </>
    )
};

export default ModuleSelect;