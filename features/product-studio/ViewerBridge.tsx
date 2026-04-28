import { useConfiguratorStore } from "@/features/configurator/store/configurator.store";
import { useProductStudioStore } from "@/features/product-studio/product-studio.store";
import Viewer from "@/features/viewer/Viewer";

const ViewerBridge = () => {
  const mode = useProductStudioStore(s => s.mode);

//   const builderModel = useBuilderStore(s => s.modelUrl);
  const product = useConfiguratorStore(s => s.product);
  const selectedOptions = useConfiguratorStore(s => s.selectedOptions);

  if (mode === "builder") {
    // return <Viewer modelUrl={builderModel} />;
    return <Viewer modelUrl={"/models/nike5.glb"} mode={mode}/>;
  }

  return (
    <Viewer
      modelUrl={product?.model.url ?? ""}
      product={product ?? undefined}
      selectedOptions={selectedOptions}
      mode={mode}
    />
  );
};
export default ViewerBridge;
