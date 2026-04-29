import { useConfiguratorStore } from "@/features/configurator/store/configurator.store";
import { useProductStudioStore } from "@/features/product-studio/product-studio.store";
import Viewer from "@/features/viewer/Viewer";
import { useBuilderStore } from "../builder/store/builder.store";

const ViewerBridge = () => {
  const mode = useProductStudioStore(s => s.mode);

  const builderModel = useBuilderStore(s => s.modelUrl);
  const product = useConfiguratorStore(s => s.product);
  const selectedOptions = useConfiguratorStore(s => s.selectedOptions);

  if (mode === "builder") {
    if (!builderModel) return null;

    return (
      <Viewer
        modelUrl={builderModel}
        mode={mode}
      />
    );
  }

  if (!product?.model.url) return null;

  return (
    <Viewer
      modelUrl={product.model.url}
      product={product}
      selectedOptions={selectedOptions}
      mode={mode}
    />
  );
};

export default ViewerBridge;