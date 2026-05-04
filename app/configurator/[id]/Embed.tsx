"use client"
import ConfiguratorRuntime from '@/features/configurator/runtime/ConfiguratorRuntime';
import { useConfiguratorStore } from '@/features/configurator/store/configurator.store';
import { product_sample } from '@/features/configurator/store/slices/product.slice';
import ConfiguratorPanel from '@/features/configurator/ui/components/ConfiguratorPanel';
import { ProductContext } from '@/features/product-studio/context/ProductContext';
import { useProductStudioStore } from '@/features/product-studio/product-studio.store';
import Viewer from '@/features/viewer/Viewer';
import React, { useEffect } from 'react';

const Embed = () => {
    const product = useConfiguratorStore(s => s.product);
    const setProduct = useConfiguratorStore(s => s.setProduct);
    const selectedOptions = useConfiguratorStore(s => s.selectedOptions);
    const setMode = useProductStudioStore(s => s.setMode);

    useEffect(() => {
        setMode("embed");
        setProduct(product_sample);
    }, [])

    if (!product) return null;

    return (
        <ProductContext.Provider value={product}>
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
        </ProductContext.Provider>
    );
};

export default Embed;