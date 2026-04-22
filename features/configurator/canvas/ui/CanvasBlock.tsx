import dynamic from "next/dynamic";
import CanvasToolbar from "./CanvasToolbar";
// import FabricCanvas from "./FabricCanvas";

const FabricCanvas = dynamic(() => import("./FabricCanvas"), {
  ssr: false,
})

const CanvasBlock = () => { 
  return (
    <div className='flex flex-col gap-6'>
      <FabricCanvas target="wamp"/>  
      <CanvasToolbar />
      
    </div>
  )
}

export default CanvasBlock;