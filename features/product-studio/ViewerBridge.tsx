import { useConfiguratorStore } from "@/features/configurator/store/configurator.store";
import { useProductStudioStore } from "@/features/product-studio/product-studio.store";
import Viewer from "@/features/viewer/Viewer";
import { useBuilderStore } from "../builder/store/builder.store";

const ViewerBridge = ({canExportWithoutWatermark}:{canExportWithoutWatermark: boolean}) => {
  const mode = useProductStudioStore(s => s.mode);

  const product = useBuilderStore(s => s.product);
  const draft = useBuilderStore(s => s.draft);
  const productUrl = mode==="embed" ? product?.data.model.url : draft?.model.url;

  const selectedOptions = useConfiguratorStore(s => s.selectedOptions);
  if (!productUrl) return null;

  return (
    <Viewer
      modelUrl={productUrl}
      product={mode==="embed" ? product?.data : draft}
      selectedOptions={mode === "preview" ? selectedOptions : undefined}
      mode={mode}
      canExportWithoutWatermark={canExportWithoutWatermark}
    />
  );
};
export default ViewerBridge;