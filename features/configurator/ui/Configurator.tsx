"use client"
import React, { useEffect } from 'react';
import Viewer from '../3d/Viewer';
import ConfiguratorUI from './components/ConfiguratorUI';
import { useConfiguratorStore } from '../store/configurator.store';
import { selectAvailableStickers } from '../store/selectors';
import { useShallow } from 'zustand/shallow';

const Configurator = () => {
    const initOptions = useConfiguratorStore(s => s.initOptions);
    const product = useConfiguratorStore(s => s.product);
    const loadUserCanvas = useConfiguratorStore(s => s.loadUserCanvas);
    const stickers = useConfiguratorStore(useShallow(selectAvailableStickers));
    const userCanvas = useConfiguratorStore(s => s.userCanvas);

    console.log(userCanvas);
    console.log(stickers);

    useEffect(() => {
        if (product) {
            initOptions();
        }
    }, [product, initOptions]);

    useEffect(() => {
        if (!product?.id) return
        loadUserCanvas(product.id)
    }, [product?.id, loadUserCanvas]);

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