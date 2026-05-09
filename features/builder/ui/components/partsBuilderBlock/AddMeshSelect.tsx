import { Field, FieldGroup } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useMemo, useState } from 'react';
import { useBuilderStore } from '../../../store/builder.store';
import { Plus } from 'lucide-react';
import { getTakenMeshes } from '@/features/builder/lib/getMeshAvailability';

const AddMeshSelect = ({moduleId, optionId, groupId}: {moduleId: string, optionId: string, groupId: string}) => {

    const [selectedMesh, setSelectedMesh] = useState<string>("");

    const builderConfig = useBuilderStore(s => s.builderConfig);
    const draft = useBuilderStore(s => s.draft);
    const addMeshToGroup = useBuilderStore(s => s.addMeshToGroup);

    const takenMeshes = useMemo(() => draft ? getTakenMeshes(draft) : new Set<string>(), [draft]);

    const availableMeshes = useMemo(
        () => builderConfig?.meshes.filter(m => !takenMeshes.has(m.name)) ?? [],
        [builderConfig, takenMeshes]
    );

    return (
        <FieldGroup className="w-full max-w-xs">
            <Field>
                <Select
                    value={selectedMesh}
                    onValueChange={(value) => {
                        addMeshToGroup(moduleId, optionId, groupId, value)
                        setSelectedMesh("");
                    }}
                >
                    <SelectTrigger className="w-36! h-8! bg-card-foreground text-card! cursor-pointer">
                        <Plus className="w-4 h-4 mr-1" />
                        <SelectValue placeholder="Add Mesh" />
                    </SelectTrigger>
                    <SelectContent
                        position={"popper"}
                    >
                        <SelectGroup>
                            {availableMeshes.map(mesh => {
                                return <SelectItem
                                    key={mesh.name}
                                    value={mesh.name}
                                >{mesh.name}</SelectItem>

                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    )
};

export default AddMeshSelect;