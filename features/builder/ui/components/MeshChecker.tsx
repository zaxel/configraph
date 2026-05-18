import { Checkbox } from '@/components/ui/checkbox';
import { useBuilderStore } from "../../store/builder.store";
import React, { useState } from 'react';

const MeshChecker = () => {
    const builderConfig = useBuilderStore((s) => s.builderConfig);
    const debuggerApi = useBuilderStore(s => s.debuggerApi);
    const [disabledMeshes, setDisabledMeshes] = useState<Set<string>>(new Set());

    const toggleMesh = (name: string) => {
        setDisabledMeshes(prev => {
            const next = new Set(prev); 
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    };

    return (
        <div className="w-full">
            <div className="mb-6 flex justify-between items-center gap-4 text-xl">
                <div className="w-5/6 text-center">Detected Meshes</div>
                <div className="mr-6 w-1/6">Toggle</div>
            </div>

            <ul className="flex flex-col gap-4">
                {(builderConfig?.meshes ?? []).map(mesh => {
                    const isEnabled = !disabledMeshes.has(mesh.name);

                    return (
                        <li key={mesh.name} className="flex justify-between items-center gap-4">
                            <span 
                                onMouseEnter={()=>debuggerApi?.highlight(mesh.name, isEnabled)}
                                onMouseLeave={()=>debuggerApi?.resetHighlight(mesh.name, isEnabled)}
                            className="truncate ml-6">{mesh.name}</span>
                            <Checkbox
                                checked={isEnabled}
                                onCheckedChange={() => {
                                    toggleMesh(mesh.name);
                                    debuggerApi?.toggleVisibility(mesh.name);
                                }}
                                className="mr-10 cursor-pointer"
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MeshChecker;