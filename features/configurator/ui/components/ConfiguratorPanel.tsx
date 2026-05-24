import React from 'react';
import { ModuleRenderer } from '../ModuleRenderer';
import { useProduct } from '@/features/product-studio/context/ProductContext';
import { useProductStudioStore } from '@/features/product-studio/product-studio.store';
import { useBuilderStore } from '@/features/builder/store/builder.store';
import { PermissionValues } from '@/features/billing/types/billing.types';


const ConfiguratorPanel = ({permissions}: {permissions: PermissionValues}) => {
    const product = useProduct();
    const mode = useProductStudioStore(s => s.mode);
    const activeBuilderTab = useBuilderStore(s => s.activeTab);
    console.log(mode);
    
    if(!product) return null; 
    return (
       <div className={`w-full shrink-0 flex flex-col gap-6 ${(mode === "builder" && activeBuilderTab==="builder") ? "md:w-2/3" : "md:w-1/3"}`}>
            {product.modules
                .slice()
                .sort((a, b)=> a.order - b.order) 
                .map((module) => {
                    return <ModuleRenderer key={module.instanceId} module={module} permissions={permissions} mode={mode}/>
                })}
        </div>
    );
};

export default ConfiguratorPanel;