import { Field, FieldGroup } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { canAddModule } from '@/features/configurator/model/module.rules';
import React, { useState } from 'react';
import { useBuilderStore } from '../../store/builder.store';
import { ComponentType } from '@/features/configurator/model';

const ModuleSelect = () => {

    const [selectedModule, setSelectedModule] = useState<string>("");
    const modules: ComponentType[] = ["parts", "size", "addon", "content", "price", "canvas", "submit"];

    const draft = useBuilderStore(s => s.draft); 
    const addModule = useBuilderStore(s => s.addModule); 

    return (
        <FieldGroup className="w-full max-w-xs">
            <Field>
                <Select
                    value={selectedModule}
                    onValueChange={(value: ComponentType) => {
                        addModule(value)
                        setSelectedModule("")
                        console.log("New value selected:", value)
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
                                if(!draft) return null;
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
    )
};

export default ModuleSelect;