import { useEffect, useRef } from "react";
import { useFabric } from "../hooks/useFabric";
import { useConfiguratorStore } from "../../store/configurator.store";

const FabricCanvas = ({ target }: { target: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const setPreviewDecal = useConfiguratorStore(s => s.setPreviewDecal); 
  const addDecal = useConfiguratorStore(s => s.addDecal);

  useFabric(canvasRef);

  // preview pipe
  useEffect(() => {
    if (!canvasRef.current) return;

    setPreviewDecal({
      target,
      texture: canvasRef.current
    });
    return () => setPreviewDecal(null);
  }, [target, setPreviewDecal]);

  const commit = () => {
    if (!canvasRef.current) return;

    addDecal({
      id: crypto.randomUUID(),
      target,
      texture: canvasRef.current.toDataURL()
    });
  };

  (window as any).commitDecal = commit;

//   return <canvas ref={canvasRef} style={{ display: "none" }} />;
  
return <canvas className='bg-gray-200/20' ref={canvasRef} />
};

export default FabricCanvas;