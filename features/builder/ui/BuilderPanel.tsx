import Button from '@/components/common/Button';
import React, { useEffect, useRef } from 'react';
import { useBuilderStore } from '../store/builder.store';
import MeshChecker from './components/MeshChecker';
import BuilderUI from './components/BuilderUI';
import Link from 'next/link';
import { PermissionValues } from '@/features/billing/types/billing.types';

const BuilderPanel = ({permissions}: {permissions: PermissionValues}) => {
    const activeTab = useBuilderStore(s => s.activeTab);
    const setActiveTab = useBuilderStore(s => s.setActiveTab);

    const debuggerApi = useBuilderStore(s => s.debuggerApi);

    const isMeshSelected = activeTab === "mesh";
    const isBuilderSelected = activeTab === "builder";
    const isSettingsSelected = activeTab === "settings";

    useEffect(() => {
        if(!debuggerApi) return;
        if (isMeshSelected || isBuilderSelected) {
            debuggerApi.allMeshesOn();
        }
    }, [isMeshSelected, isBuilderSelected, debuggerApi]);


    return (
        <div className="flex flex-col gap-6 w-full mt-4 md:w-2/3 md:mt-0">
            <div className="flex justify-start gap-3 md:gap-4">
                <Button
                    className='px-2 h-6 md:px-4 md:h-8'
                    variant={isMeshSelected ? "active-outline" : "outline"} onClick={() => {
                    if (!isMeshSelected) setActiveTab("mesh")
                }
                }>
                    Meshes
                </Button>
                <Button 
                        className='px-2 h-6 md:px-4 md:h-8'
                        variant={isBuilderSelected ? "active-outline" : "outline"} onClick={() => {
                            if (!isBuilderSelected) setActiveTab("builder");
                        }}>
                    Builder
                </Button>
                <Button 
                    className='px-2 h-6 md:px-4 md:h-8'
                    variant={isSettingsSelected ? "active-outline" : "outline"} onClick={() =>
                    !isSettingsSelected &&
                    setActiveTab("settings")
                }>
                    Settings
                </Button>
                <Button 
                    className='px-1 h-6 md:px-4 md:h-8'
                    variant={"outline"} onClick={() =>
                    setActiveTab("mesh")
                }>
                    <Link href={"/dashboard/"}>
                        Dashboard
                    </Link>
                </Button>
            </div>
            <div>
                {isMeshSelected ? <MeshChecker /> : <BuilderUI permissions={permissions}/>}
            </div>
        </div>
    );
};

export default BuilderPanel;