import { Checkbox } from '@/components/ui/checkbox';
import { useBuilderStore } from "../../store/builder.store";
import React, { useState } from 'react';

const MeshChecker = () => {
    const builderConfig = useBuilderStore((s) => s.builderConfig);
    const debuggerApi = useBuilderStore(s => s.debuggerApi);
    console.log(builderConfig);

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
    console.log(builderConfig?.meshes)

    return (
        <div className="w-full">
            <div className="mb-6 flex justify-between items-center gap-4 text-xl">
                <div className="w-5/6 text-center">Detected Meshes</div>
                {/* <div className="ml-auto">Mat <br /> Count</div> */}
                <div className="mr-6 w-1/6">Toggle</div>
            </div>

            <ul className="flex flex-col gap-4">
                {(builderConfig?.meshes ?? []).map(mesh => {
                    const isEnabled = !disabledMeshes.has(mesh.name);

                    return (
                        <li key={mesh.name} className="flex justify-between items-center gap-4">
                            <span className="truncate ml-6">{mesh.name}</span>
                            {/* <span className="ml-auto mr-12">{mesh.materialCount}</span> */}
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