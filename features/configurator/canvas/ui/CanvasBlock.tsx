"use client"
import dynamic from "next/dynamic";
import CanvasToolbar from "./CanvasToolbar";
import { useConfiguratorStore } from "../../store/configurator.store";
import Button from "@/components/common/Button";
import { ToggleLeft } from "lucide-react";
import { CanvasComponent } from "../../model";

const FabricCanvas = dynamic(() => import("./FabricCanvas"), {
  ssr: false,
})

const CanvasBlock = ({ data }: { data: CanvasComponent }) => {
  const editorTab = useConfiguratorStore(s => s.editorTab);
  const canvasIsActive = useConfiguratorStore(s => s.active);
  const toggleActiveCanvas = useConfiguratorStore(s => s.toggleActive);

  if (!canvasIsActive)
    return (
      <>
        {data.label && (
          <h3 className="font-medium text-xl mb-4">{data.label}</h3>
        )}
        <Button onClick={() => toggleActiveCanvas()} className='w-max' icon={<ToggleLeft width={14} height={14} />}>
          Open Editor
        </Button>
      </>
    )

  return (
    <div className='flex flex-col gap-6'>
      {data.label && (
        <h3 className="font-medium text-xl mb-4">{data.label}</h3>
      )}
      <div className={editorTab === "applied" ? "hidden" : ""}>
          <FabricCanvas />
      </div>
      <CanvasToolbar />
    </div>
  )
}

export default CanvasBlock;