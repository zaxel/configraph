import React from 'react';
import Viewer from './3d/Viewer';
import ConfiguratorUI from './components/ConfiguratorUI';

const Configurator = () => {
    // 1. init store
    // useConfiguratorStore.init(config);

    // 2. run engine
    // useConfiguratorEngine();

    return (
        <div className='w-full flex flex-col md:flex-row justify-start item-start'>
            <Viewer />
            <ConfiguratorUI />
        </div>
    );
};

export default Configurator;