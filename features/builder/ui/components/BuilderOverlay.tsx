import UploadModel from "./UploadModel";
import { useBuilderStore } from "../../store/builder.store";

const BuilderOverlay = () => {
  const { status, error } = useBuilderStore();

  if (status === "ready") return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {status === "idle" && <UploadModel />}
      {status === "uploading" && <div>Uploading...</div>}
      {status === "processing" && <div>Optimizing model...</div>}
      {status === "error" && <div>{error ?? "Something went wrong"}</div>}
    </div>
  );
};

export default BuilderOverlay;