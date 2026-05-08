import { Field, FieldGroup } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { canAddModule } from '@/features/configurator/model/module.rules';
import React, { useState } from 'react';
import { useBuilderStore } from '../../../store/builder.store';
import { ComponentType } from '@/features/configurator/model';
import { findPartsGroup } from '@/features/builder/lib/findPartsGroup';

const ColorTypeSelect = ({ moduleId, optionId, groupId }: { moduleId: string, optionId: string, groupId: string }) => {

    // const [selectedType, setSelectedType] = useState<string>(""); 
    // const colorsTypes = ["color picker", "manual hex"];

    // const draft = useBuilderStore(s => s.draft);
    // const setColorSelectType = useBuilderStore(s => s.setColorSelectType);

    // if(!draft) return;
    // const group = findPartsGroup(draft, moduleId, optionId, groupId); 
    // if(!group) return;

    // const isCustomAllowed = group.allowCustom;


    const draft = useBuilderStore(s => s.draft);
    const setColorSelectType = useBuilderStore(s => s.setColorSelectType);

    if (!draft) return null;
    const group = findPartsGroup(draft, moduleId, optionId, groupId);
    if (!group) return null;

    const currentValue = group.colors.allowCustom ? "color picker" : "manual hex";

    return (
        <FieldGroup className="w-full max-w-xs">
            <Field>
                <Select
                    value={currentValue}
                    onValueChange={(value) => {
                        setColorSelectType(moduleId, optionId, groupId, value === "color picker");
                    }}
                >
                    <SelectTrigger className="w-full max-w-58">
                        <SelectValue placeholder={`${currentValue}`} />
                    </SelectTrigger>
                    <SelectContent
                        position={"popper"}
                    >
                        <SelectGroup>
                            <SelectItem
                                value="color picker"
                            >color picker</SelectItem>
                            <SelectItem
                                value="manual hex"
                            >manual hex</SelectItem>
                        </SelectGroup> 
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    )
};

export default ColorTypeSelect;