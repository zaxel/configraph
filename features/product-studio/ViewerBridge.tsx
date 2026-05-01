import { useConfiguratorStore } from "@/features/configurator/store/configurator.store";
import { useProductStudioStore } from "@/features/product-studio/product-studio.store";
import Viewer from "@/features/viewer/Viewer";
import { useBuilderStore } from "../builder/store/builder.store";

const ViewerBridge = () => {
  const mode = useProductStudioStore(s => s.mode);

  const product = useBuilderStore(s => s.product);
  const productUrl = product?.model.url;

  const selectedOptions = useConfiguratorStore(s => s.selectedOptions);

  if (!productUrl) return null;

  return (
    <Viewer
      modelUrl={productUrl}
      product={mode === "preview" ? product : undefined}
      selectedOptions={mode === "preview" ? selectedOptions : undefined}
      mode={mode}
    />
  );
};
export default ViewerBridge;