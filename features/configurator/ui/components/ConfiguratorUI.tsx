import React from 'react';
import { useConfiguratorStore } from '../../store/configurator.store';
import { ModuleRenderer } from '../ModuleRenderer';


const ConfiguratorUI = () => {
    const selectedOptions = useConfiguratorStore(s => s.selectedOptions);
    const setOption = useConfiguratorStore(s => s.setOption);
    const product = useConfiguratorStore(s => s.product);


    console.log(selectedOptions);
    console.dir(product);

    return (
        <div className='w-full md:w-1/3 shrink-0 flex flex-col gap-6'>
            {product.modules.map(({id, ...rest}) => {
                    console.log(rest)
                    return <ModuleRenderer key={id} module={rest}/>
                })}
        </div>
    );
};

export default ConfiguratorUI;