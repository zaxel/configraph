import { useEffect, useRef } from "react";
import { useConfiguratorStore } from "../store/configurator.store";
import { useProduct } from "@/features/product-studio/context/ProductContext";

export type ConfiguratorRuntime = {
  active: boolean;
};

const ConfiguratorRuntime = ({ active }: ConfiguratorRuntime) => {
  const product = useProduct();
  const initOptions = useConfiguratorStore(s => s.initOptions);
  const loadUserCanvas = useConfiguratorStore(s => s.loadUserCanvas);

  const initializedRef = useRef<string | null>(null);
  const canvasLoadedRef = useRef<string | null>(null);

  useEffect(() => {
    initializedRef.current = null;
    canvasLoadedRef.current = null;
  }, [product?.id]);


  useEffect(() => {
    console.log("init", product)
    if (!active) return;
    if (!product?.id) return;

    if (initializedRef.current === product.id) return;
    initOptions(product);
    initializedRef.current = product.id;
  }, [product, initOptions, active]);


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