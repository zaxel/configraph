import React from 'react';
import { ModuleRenderer } from '../ModuleRenderer';
import { useProduct } from '@/features/product-studio/context/ProductContext';


const ConfiguratorPanel = () => {
    const product = useProduct();
    if(!product) return null;

    return (
        <div className='w-full md:w-1/3 shrink-0 flex flex-col gap-6'>
            {product.modules
                .slice()
                .sort((a, b)=> a.order - b.order)
                .map((module) => {
                    return <ModuleRenderer key={module.id} module={module}/>
                })}
        </div>
    );
};

export default ConfiguratorPanel;