import React from 'react';
import { useConfiguratorStore } from '../../store/configurator.store';
import { ModuleRenderer } from '../ModuleRenderer';


const ConfiguratorUI = () => {
    const product = useConfiguratorStore(s => s.product);
    if(!product) return null;

    return (
        <div className='w-full md:w-1/3 shrink-0 flex flex-col gap-6'>
            {product.modules
                .sort((a, b)=> a.order - b.order)
                .map((module) => {
                    return <ModuleRenderer key={module.id} module={module}/>
                })}
        </div>
    );
};

export default ConfiguratorUI;