import Button from '@/components/common/Button';
import React from 'react';
import { useBuilderStore } from '../store/builder.store';
import MeshChecker from './components/MeshChecker';
import BuilderUI from './components/BuilderUI';
import Link from 'next/link';

const BuilderPanel = () => {
     const activeTab = useBuilderStore(s => s.activeTab);
     const setActiveTab = useBuilderStore(s => s.setActiveTab);

    const isMeshSelected = activeTab==="mesh";
    const isBuilderSelected = activeTab==="builder";
    const isSettingsSelected = activeTab==="settings";
    
    return ( 
        <div className="flex flex-col gap-6 w-full mt-4 md:w-2/3 md:mt-0">
            <div className="flex gap-4">
                <Button variant={isMeshSelected ? "active-outline" : "outline"} onClick={() =>
                    !isMeshSelected &&
                    setActiveTab("mesh")
                }>
                    Meshes
                </Button>
                <Button variant={isBuilderSelected ? "active-outline" : "outline"} onClick={() =>
                    !isBuilderSelected &&
                    setActiveTab("builder")
                }>
                    Builder
                </Button>
                <Button variant={isSettingsSelected ? "active-outline" : "outline"} onClick={() =>
                    !isSettingsSelected &&
                    setActiveTab("settings")
                }>
                    Settings
                </Button>
                <Button variant={"outline"} onClick={() =>
                    setActiveTab("mesh")
                }>
                    <Link href={"/dashboard/"}>
                        Dashboard
                    </Link>
                </Button>
            </div>
            <div>
                {isMeshSelected ? <MeshChecker/> : <BuilderUI/>}
            </div>
        </div>
    );
};

export default BuilderPanel;