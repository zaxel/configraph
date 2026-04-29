"use client"
import BuilderPanel from "../builder/ui/BuilderPanel";
import ViewerBridge from "./ViewerBridge";
import ConfiguratorRuntime from "../configurator/runtime/ConfiguratorRuntime";
import ConfiguratorPanel from "../configurator/ui/components/ConfiguratorPanel";
import { useProductStudioStore } from "./product-studio.store";
import BuilderOverlay from "../builder/ui/components/BuilderOverlay";

const ProductStudio = () => {
    const mode = useProductStudioStore(s => s.mode);

    return (
        <div className="w-full flex flex-col md:flex-row relative">
            {/* LEFT — always visible */}
            <div className="w-full md:w-2/3 shrink-0 h-[50vh] md:h-[75vh] sticky top-0 left-0 bg-background overflow-hidden z-100 -mx-3 md:mx-2">
                <ViewerBridge />
                {mode === "builder" && <BuilderOverlay />}  
            </div>

            {/* RIGHT — changes */}
            {mode === "builder" && <BuilderPanel />}
            {mode === "preview" && (
                <>
                    <ConfiguratorRuntime active={mode === "preview"}/>
                    <ConfiguratorPanel />
                </>
            )}
        </div>
    );
};

export default ProductStudio;