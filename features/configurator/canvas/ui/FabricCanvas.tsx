import { useRef } from "react";
import { useFabric } from "../hooks/useFabric";

const FabricCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useFabric(canvasRef);

  return <canvas ref={canvasRef} />
}

export default FabricCanvas;