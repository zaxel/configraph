import { useEffect, useRef } from "react";
import { useFabric } from "../hooks/useFabric";
import { useConfiguratorStore } from "../../store/configurator.store";

const FabricCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    const setPreviewDecal = useConfiguratorStore((s) => s.setPreviewDecal);

    // ✅ Fabric ONLY runs on client now
    useFabric(canvasRef as React.RefObject<HTMLCanvasElement>);

    // ✅ preview pipe lives here
    useEffect(() => {
        const el = canvasRef.current;
        if (!el) return;

        setPreviewDecal({
            target: "dummy",
            texture: el,
        });

        return () => {
            setPreviewDecal(null);
        };
    }, [setPreviewDecal]);


    return <canvas className="bg-gray-200/20" ref={canvasRef} />;

};

export default FabricCanvas;