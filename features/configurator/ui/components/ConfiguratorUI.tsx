import React from 'react';
import { useConfiguratorStore } from '../../store/configurator.store';
import { ModuleRenderer } from '../ModuleRenderer';


const ConfiguratorUI = () => {
    const selectedOptions = useConfiguratorStore(s => s.selectedOptions);
    const setOption = useConfiguratorStore(s => s.setOption);
    const product = useConfiguratorStore(s => s.product);

    return (
        <div className='w-full md:w-1/3 shrink-0 flex flex-col gap-6'>
            {product.modules
                .sort((a, b)=> a.order - b.order)
                .map(({id, ...rest}) => {
                    return <ModuleRenderer key={id} module={rest}/>
                })}
        </div>
    );
};

export default ConfiguratorUI;