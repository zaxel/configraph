"use client"
import ConfiguratorRuntime from '@/features/configurator/runtime/ConfiguratorRuntime';
import { useConfiguratorStore } from '@/features/configurator/store/configurator.store';
import { product_sample } from '@/features/configurator/store/slices/product.slice';
import ConfiguratorPanel from '@/features/configurator/ui/components/ConfiguratorPanel';
import Viewer from '@/features/viewer/Viewer';
import React, { useEffect } from 'react';

const Embed = () => {
    const product = useConfiguratorStore(s => s.product);
    const setProduct = useConfiguratorStore(s => s.setProduct);
    const selectedOptions = useConfiguratorStore(s => s.selectedOptions);


    useEffect(()=>{
        setProduct(product_sample);
    }, [])

    return (
        <div className="grow p-4 md:p-8">
            <div className="w-full flex flex-col md:flex-row relative">
                {/* LEFT — always visible */}
                <div className="w-full md:w-2/3 shrink-0 h-[50vh] md:h-[75vh] sticky top-0 left-0 bg-background overflow-hidden z-100 -mx-3 md:mx-2">
                    <Viewer
                        modelUrl={product?.model?.url ?? ""}
                        product={product}
                        selectedOptions={selectedOptions}
                        mode={"preview"}
                    />
                </div>
                <>
                    <ConfiguratorRuntime active={true} />
                    <ConfiguratorPanel />
                </>
            </div>
        </div>
    );
};

export default Embed;