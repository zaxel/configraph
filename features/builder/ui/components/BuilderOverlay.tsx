import UploadModel from "./UploadModel";
import { useBuilderStore } from "../../store/builder.store";
import Button from "@/components/common/Button";

const BuilderOverlay = () => {
  const { status, error, resetModel } = useBuilderStore();
  
  if (status === "ready") return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {status === "idle" && <UploadModel />}
      {status === "uploading" && <div>Uploading...</div>}
      {status === "processing" && <div>Optimizing model...</div>}
      {status === "error" && <div className="flex flex-col gap-6">
        <p>{error ?? "Something went wrong"}</p>
        <Button variant={"outline"} className='w-max' onClick={() => resetModel()}>Try again</Button>
      </div>} 
    </div>
  );
};

export default BuilderOverlay;