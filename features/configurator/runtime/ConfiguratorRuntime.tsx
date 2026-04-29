import { useEffect, useRef } from "react";
import { useConfiguratorStore } from "../store/configurator.store";

const ConfiguratorRuntime = ({ active }: { active: boolean }) => {
  const product = useConfiguratorStore(s => s.product);
  const initOptions = useConfiguratorStore(s => s.initOptions);
  const loadUserCanvas = useConfiguratorStore(s => s.loadUserCanvas);

  // useEffect(() => {
  //   if(!active) return;
  //   if (product) {
  //     initOptions();
  //   }
  // }, [product, initOptions, active]);

  // useEffect(() => {
  //   if (!product?.id || !active) return;
  //   loadUserCanvas(product.id);
  // }, [product?.id, loadUserCanvas, active]);

  const initializedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!active) return;
    if (!product?.id) return;

    if (initializedRef.current === product.id) return;

    initOptions();
    initializedRef.current = product.id;
  }, [product?.id, initOptions, active]);


  const canvasLoadedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!active) return;
    if (!product?.id) return;

    if (canvasLoadedRef.current === product.id) return;

    loadUserCanvas(product.id);
    canvasLoadedRef.current = product.id;
  }, [product?.id, loadUserCanvas, active]);

  return null; // 🔥 no UI
};

export default ConfiguratorRuntime;