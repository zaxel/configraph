"use client"
import BuilderPanel from "../builder/ui/BuilderPanel";
import ViewerBridge from "./ViewerBridge";
import ConfiguratorRuntime from "../configurator/runtime/ConfiguratorRuntime";
import ConfiguratorPanel from "../configurator/ui/components/ConfiguratorPanel";
import { useProductStudioStore } from "./product-studio.store";
import BuilderOverlay from "../builder/ui/components/BuilderOverlay";
import { useBuilderStore } from "../builder/store/builder.store";
import BuilderDisabled from "../builder/ui/components/BuilderDisabled";
import { initProductSample } from "../builder/store/slices/productConfig.slice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Toggle from "./Toggle";
import { ProductContext } from "./context/ProductContext";
import { Watermark } from "../viewer/Watermark";
import { useEntitlements } from "../billing/context/entitlements.context";
import ConfiguratorLoader from "@/components/common/ConfiguratorLoader";

const ProductStudio = () => {
    const params = useParams();
    const id = params.id;

    const mode = useProductStudioStore(s => s.mode);
    const initProduct = useBuilderStore(s => s.initProduct);
    const loadConfigurator = useBuilderStore(s => s.loadConfigurator);
    const { status, draft } = useBuilderStore();
    const activeBuilderTab = useBuilderStore(s => s.activeTab);
    const { plan, usage, limits, permissions } = useEntitlements();
    let loading = !!id;

    useEffect(() => {
        if (!id) {
            initProduct(initProductSample); // empty state
        } else {
            const configuratorId = Array.isArray(id) ? id[0] : id;
            loadConfigurator(configuratorId); // fetch from server
        }
    }, [id, initProduct, loadConfigurator]);

    if(loading===true && (status==="ready" || status==="error") )
        loading = false;

    if(loading) return <ConfiguratorLoader spacingTopVh={15}/>

    return (
        <div className="w-full flex flex-col md:flex-row relative gap-4">
            {/* TOGGLE MODE BTN */}
            {status === "ready" && <Toggle />}
            {/* LEFT — always visible */}
            <div className={`w-full ${(mode === "builder" && activeBuilderTab === "builder") ? "md:w-1/3" : "md:w-2/3"} shrink-0 h-[50vh] ${(mode === "builder" && activeBuilderTab === "builder") ? "md:h-[45vh]" : "md:h-[75vh]"} sticky top-0 left-0 bg-background overflow-hidden z-10`}>
                <ViewerBridge canExportWithoutWatermark={permissions.canExportWithoutWatermark}/>
                {mode === "builder" && <BuilderOverlay />}
            </div>

            {/* RIGHT — changes */}
            <ProductContext.Provider value={draft ?? null}>
                {mode === "builder" ? (
                    status !== "ready"
                        ? <BuilderDisabled />
                        : <BuilderPanel permissions={permissions}/>

                ) : (
                    <>
                        <ConfiguratorRuntime active />
                        <ConfiguratorPanel permissions={permissions}/>
                    </>
                )}
            </ProductContext.Provider>
        </div>
    );
};

export default ProductStudio;