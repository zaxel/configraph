import { Checkbox } from '@/components/ui/checkbox';
import { useBuilderStore } from "../../store/builder.store";
import React from 'react';

const MeshChecker = () => {
    const builderConfig = useBuilderStore((s) => s.builderConfig);

    console.log(builderConfig);



    return (
        <div className="w-full">
            <div className="mb-6 flex justify-between items-center gap-4 text-xl">
                <div >Detected <br/> Meshes</div>
                <div className="ml-auto">Mat <br/> Count</div>
                <div className="mr-6">Toggle</div>

            </div>
            <ul className="flex flex-col gap-4">

                {(builderConfig?.meshes ?? []).map(mesh => {
                    return <li key={mesh.id} className="flex justify-between items-center gap-4">
                        <span>{mesh.name}</span>
                        <span className="ml-auto mr-12">{mesh.materialCount}</span>
                        <Checkbox checked className='mr-10 cursor-pointer' />
                    </li>
                })}
            </ul>
        </div>
    );
};

export default MeshChecker;