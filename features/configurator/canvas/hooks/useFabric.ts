import { Canvas } from "fabric"
import { RefObject, useEffect, useRef } from "react"
import { useConfiguratorStore } from "../../store/configurator.store"
import { useText } from "./useText"
import { useSticker } from "./useSticker"

export const useFabric = (ref: RefObject<HTMLCanvasElement>) => {
  const canvasRef = useRef<Canvas | null>(null)
  
  const editorTab = useConfiguratorStore(s => s.editorTab);
  const activeSticker = useConfiguratorStore(s => s.activeSticker);
  
  const text = useText();
  const sticker = useSticker(activeSticker?.src ?? "");

  // 🔹 1. INIT canvas (once)
  useEffect(() => {
    if (!ref.current) return;

    const canvas = new Canvas(ref.current, {
      preserveObjectStacking: true,
      selection: true,
    });

    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
      canvasRef.current = null;
    };
  }, []);

  // 🔹 2. UPDATE canvas content
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.clear();

    if (editorTab === "text" && text) {
      canvas.add(text);
      canvas.viewportCenterObject(text);
      text.setCoords();
    }

    if (editorTab === "sticker" && sticker) {
      canvas.add(sticker);
      canvas.viewportCenterObject(sticker);
      sticker.setCoords();
    }

    // if (editorTab === "applied") {
    //   canvas.clear();
    // }

    canvas.renderAll();
  }, [editorTab, text, sticker])

  return canvasRef;
}