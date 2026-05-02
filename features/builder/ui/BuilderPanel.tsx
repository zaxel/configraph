import Button from '@/components/common/Button';
import React from 'react';
import { useBuilderStore } from '../store/builder.store';
import MeshChecker from './components/MeshChecker';
import BuilderUI from './components/BuilderUI';

const BuilderPanel = () => {
     const activeTab = useBuilderStore(s => s.activeTab);
     const setActiveTab = useBuilderStore(s => s.setActiveTab);

    const isMeshSelected = activeTab==="mesh";
    const isBuilderSelected = activeTab==="builder";
    
    return (
        <div className="flex flex-col gap-6 w-full mt-4 md:w-1/3 md:mt-0">
            <div className="flex gap-6">
                <Button variant={isMeshSelected ? "active-outline" : "outline"} onClick={() =>
                    !isMeshSelected &&
                    setActiveTab("mesh")
                }>
                    Mesh Checker
                </Button>
                <Button variant={isBuilderSelected ? "active-outline" : "outline"} onClick={() =>
                    !isBuilderSelected &&
                    setActiveTab("builder")
                }>
                    Builder
                </Button>
            </div>
            <div>
                {isMeshSelected ? <MeshChecker/> : <BuilderUI/>}
            </div>
        </div>
    );
};

export default BuilderPanel;