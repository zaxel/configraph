import { Field, FieldGroup } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';

const ModuleSelect = () => {

    const [selectedModule, setSelectedModule] = useState<string | undefined>(undefined)
    const modules = ["parts", "size", "addon", "content", "price", "canvas", "submit"];

    return (
        <FieldGroup className="w-full max-w-xs">
            <Field>
                <Select
                    value={selectedModule}
                    onValueChange={(value) => {
                        setSelectedModule(value)
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
                                return <SelectItem key={module} value={module}>{module}</SelectItem>
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    )
};

export default ModuleSelect;