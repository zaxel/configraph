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
    return <Viewer modelUrl={"builderModel_fancy_url"} />;
  }

  return (
    <Viewer
      modelUrl={product?.model.url}
      product={product}
      selectedOptions={selectedOptions}
    />
  );
};
export default ViewerBridge;
