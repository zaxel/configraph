import { useConfiguratorStore } from "@/features/configurator/store/configurator.store";
import { useProductStudioStore } from "@/features/product-studio/product-studio.store";
import Viewer from "@/features/viewer/Viewer";
import { useBuilderStore } from "../builder/store/builder.store";

const ViewerBridge = () => {
  const mode = useProductStudioStore(s => s.mode);

  const product = useConfiguratorStore(s => s.product);
  const productUrl = useBuilderStore(s => s.product?.model.url);
  const selectedOptions = useConfiguratorStore(s => s.selectedOptions); 

  if (!productUrl) return null;
  if (mode === "builder") {

    return (
      <Viewer
        modelUrl={productUrl}
        mode={mode}
      />
    );
  }

  return (
    <Viewer
      modelUrl={productUrl}
      product={product}
      selectedOptions={selectedOptions}
      mode={mode}
    />
  );
};

export default ViewerBridge;