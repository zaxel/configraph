import { useEffect } from "react";
import { useConfiguratorStore } from "../store/configurator.store";

const ConfiguratorRuntime = () => {
  const product = useConfiguratorStore(s => s.product);
  const initOptions = useConfiguratorStore(s => s.initOptions);
  const loadUserCanvas = useConfiguratorStore(s => s.loadUserCanvas);

  useEffect(() => {
    if (product) {
      initOptions();
    }
  }, [product, initOptions]);

  useEffect(() => {
    if (!product?.id) return;
    loadUserCanvas(product.id);
  }, [product?.id, loadUserCanvas]);

  return null; // 🔥 no UI
};

export default ConfiguratorRuntime;