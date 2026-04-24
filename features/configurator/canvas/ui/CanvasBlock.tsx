import dynamic from "next/dynamic";
import CanvasToolbar from "./CanvasToolbar";
import { useConfiguratorStore } from "../../store/configurator.store";

const FabricCanvas = dynamic(() => import("./FabricCanvas"), {
  ssr: false,
})


const CanvasBlock = () => {
  const editorTab = useConfiguratorStore(s => s.editorTab);
  return (
    <div className='flex flex-col gap-6'>
      <div className={editorTab === "applied" ? "hidden" : ""}>
        <FabricCanvas />
      </div>
      <CanvasToolbar />
    </div>
  )
}

export default CanvasBlock;