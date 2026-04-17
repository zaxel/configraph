"use client"
import React, { useEffect } from 'react';
import Viewer from '../3d/Viewer';
import ConfiguratorUI from './components/ConfiguratorUI';
import { useConfiguratorStore } from '../store/configurator.store';

const Configurator = () => {
    const initOptions = useConfiguratorStore(s => s.initOptions);
    const product = useConfiguratorStore(s => s.product);

    useEffect(() => {
        if (product) {
            initOptions();
        }
    }, [product, initOptions]);

    // 2. run engine
    // useConfiguratorEngine();

    return (
        <div className='w-full flex flex-col md:flex-row justify-start item-start relative'>
            <Viewer />
            <ConfiguratorUI />
        </div>
    );
};

export default Configurator;