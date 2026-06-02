"use client"
import ConfiguratorNotFound from '@/components/common/ConfiguratorNotFound';
import ConfiguratorLoader from '@/components/common/ConfiguratorLoader';
import ConfiguratorRuntime from '@/features/configurator/runtime/ConfiguratorRuntime';
import { useConfiguratorStore } from '@/features/configurator/store/configurator.store';
import ConfiguratorPanel from '@/features/configurator/ui/components/ConfiguratorPanel';
import { getPublishedByIdNoAuthAction } from '@/features/configurators/actions/embed.actions';
import { ProductContext } from '@/features/product-studio/context/ProductContext';
import { useProductStudioStore } from '@/features/product-studio/product-studio.store';
import Viewer from '@/features/viewer/Viewer';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const initPermissions = {
    canCreateConfigurator: false,
    canUseCanvasEditor: false,
    canUseApi: false,
    canUploadFile: false,
    canExportWithoutWatermark: false,
    canUsePrioritySupport: false,
    canUseTeamAccess: false,
};

const Embed = () => {
    const product = useConfiguratorStore((s) => s.product);
    const setProduct = useConfiguratorStore((s) => s.setProduct);
    const selectedOptions = useConfiguratorStore((s) => s.selectedOptions);
    const setMode = useProductStudioStore((s) => s.setMode);
    const [permissions, setPermissions] = useState(initPermissions);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const id = params.id;

    useEffect(() => {
        setMode("embed");

        const configuratorId =
            Array.isArray(id)
                ? id[0]
                : id;

        if (!configuratorId) {
            setLoading(false);

            return;
        }



        const initConfigurator = async (
            configuratorId: string
        ) => {
            try {
                const published =
                    await getPublishedByIdNoAuthAction(
                        configuratorId
                    );

                if (!published)
                    return;
                
                setProduct(published.data);
                setPermissions(published.runtime);
            } finally {
                setLoading(false);
            }
        };

        initConfigurator(configuratorId);
    }, [id]);

    if (loading) 
        return <ConfiguratorLoader />
    

    if (!product) 
        return <ConfiguratorNotFound />

    return (
        <ProductContext.Provider value={product}>
            <div className="grow">
                <div className="w-full flex flex-col md:flex-row relative gap-4">
                    <div className="w-full md:w-2/3 shrink-0 h-[50vh] md:h-[75vh] sticky top-0 left-0 bg-background overflow-hidden z-100">
                        <Viewer
                            modelUrl={product?.model?.url ?? ""}
                            product={product}
                            selectedOptions={selectedOptions}
                            mode="embed"
                            canExportWithoutWatermark={permissions.canExportWithoutWatermark}
                            rotation={[0, 75 * (Math.PI / 180), 0]}
                            floatingSpeed={id==="b4555bde-67f9-47f8-9531-f97ec5c81ef0" ? 1 : 0}
                        />
                    </div>

                    <>
                        <ConfiguratorRuntime active />

                        <ConfiguratorPanel
                            permissions={permissions}
                        />
                    </>
                </div>
            </div>
        </ProductContext.Provider>
    );
};

export default Embed;