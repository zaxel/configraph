"use client"
import ConfiguratorLoader from '@/components/common/ConfiguratorLoader';
import ConfiguratorNotFound from '@/components/common/ConfiguratorNotFound';
import { useEntitlements } from '@/features/billing/context/entitlements.context';
import ConfiguratorRuntime from '@/features/configurator/runtime/ConfiguratorRuntime';
import { useConfiguratorStore } from '@/features/configurator/store/configurator.store';
import ConfiguratorPanel from '@/features/configurator/ui/components/ConfiguratorPanel';
import { getConfiguratorAction } from '@/features/configurators/actions/editor.actions';
import { ProductContext } from '@/features/product-studio/context/ProductContext';
import { useProductStudioStore } from '@/features/product-studio/product-studio.store';
import Viewer from '@/features/viewer/Viewer';
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';

const Embed = () => {
  const product = useConfiguratorStore(s => s.product);
  const setProduct = useConfiguratorStore(s => s.setProduct);
  const selectedOptions = useConfiguratorStore(s => s.selectedOptions);
  const setMode = useProductStudioStore(s => s.setMode);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    setLoading(true);
    setMode("preview");

    const configuratorId = Array.isArray(id) ? id[0] : id;
    if (!configuratorId) return;

    const initConfigurator = async (configuratorId: string) => {
      try {
        const configurator = await getConfiguratorAction(configuratorId);
        if (!configurator?.data.draft) return;
        setProduct(configurator?.data.draft);

      } finally {
        setLoading(false);
      }
    }
    initConfigurator(configuratorId);


  }, [id])

  const { permissions } = useEntitlements();

  if (loading) return <ConfiguratorLoader spacingTopVh={15}/>
  if (!product) return <ConfiguratorNotFound spacingTopVh={15}/>

  return (
    <ProductContext.Provider value={product}>
      <div className="grow p-4 md:p-8">
        <div className="w-full flex flex-col md:flex-row relative gap-2">
          {/* LEFT  */}
          <div className="w-full md:w-2/3 shrink-0 h-[50vh] md:h-[75vh] sticky top-0 left-0 bg-background overflow-hidden z-10 -mx-3 md:mx-2">
            <Viewer
              modelUrl={product?.model?.url ?? ""}
              product={product}
              selectedOptions={selectedOptions}
              mode={"preview"}
              canExportWithoutWatermark={permissions.canExportWithoutWatermark}
            />
          </div>
          {/* RIGHT  */}
          <>
            <ConfiguratorRuntime active={true} />
            <ConfiguratorPanel permissions={permissions} />
          </>
        </div>
      </div>
    </ProductContext.Provider>
  );
};

export default Embed;