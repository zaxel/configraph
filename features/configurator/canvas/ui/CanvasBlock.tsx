import dynamic from "next/dynamic";
import CanvasToolbar from "./CanvasToolbar";

const FabricCanvas = dynamic(() => import("./FabricCanvas"), {
  ssr: false,
})

const CanvasBlock = () => {
  return (
    <div className='flex flex-col gap-6'>
      <FabricCanvas />
      <CanvasToolbar />
    </div>
  )
}

export default CanvasBlock;