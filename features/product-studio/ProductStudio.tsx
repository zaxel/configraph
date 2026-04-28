"use client"
import BuilderPanel from "../builder/ui/BuilderPanel";
import ViewerBridge from "./ViewerBridge";
import ConfiguratorRuntime from "../configurator/runtime/ConfiguratorRuntime";
import ConfiguratorPanel from "../configurator/ui/components/ConfiguratorPanel";
import { useProductStudioStore } from "./product-studio.store";

const ProductStudio = () => {
    const mode = useProductStudioStore(s => s.mode);

    return (
        <div className="w-full flex flex-col md:flex-row justify-start item-start relative">
            {/* LEFT — always visible */}
            <ViewerBridge />

            {/* RIGHT — changes */}
            {mode === "builder" && <BuilderPanel />}
            {mode === "preview" && (
                <>
                    <ConfiguratorRuntime />
                    <ConfiguratorPanel />
                </>
            )}
        </div>
    );
};

export default ProductStudio;