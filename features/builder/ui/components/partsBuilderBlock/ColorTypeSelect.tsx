import { Field, FieldGroup } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { canAddModule } from '@/features/configurator/model/module.rules';
import React, { useState } from 'react';
import { useBuilderStore } from '../../../store/builder.store';
import { ComponentType } from '@/features/configurator/model';

const ColorTypeSelect = () => {

    const [selectedType, setSelectedType] = useState<string>("");
    const colorsTypes = ["color picker", "manual hex"];

    const draft = useBuilderStore(s => s.draft);
    const addModule = useBuilderStore(s => s.addModule);

    return (
        <FieldGroup className="w-full max-w-xs">
            <Field>
                <Select
                    value={selectedType}
                    // onValueChange={(value: ComponentType) => {
                    onValueChange={(value) => {
                        // addModule(value);
                        // setSelectedModule("");
                        setSelectedType(value);
                    }}
                >
                    <SelectTrigger className="w-full max-w-58">
                        <SelectValue placeholder="Select Color Type" />
                    </SelectTrigger>
                    <SelectContent
                        position={"popper"}
                    >
                        <SelectGroup>
                            {colorsTypes.map(colorsType => {
                                // if (!draft) return null;
                                // return canAddModule(module, draft)
                                return <SelectItem
                                    key={colorsType}
                                    value={colorsType}
                                >{colorsType}</SelectItem>

                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    )
};

export default ColorTypeSelect;