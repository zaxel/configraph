import { Canvas, FabricImage, IText, Textbox } from "fabric"
import { RefObject, useEffect, useRef } from "react"
import { useConfiguratorStore } from "../../store/configurator.store"

export const useFabric = (ref: RefObject<HTMLCanvasElement>) => {
  const canvasRef = useRef<Canvas | null>(null);
  const activeTextRef = useRef<Textbox | null>(null);

  const editorTab = useConfiguratorStore(s => s.editorTab);
  const activeSticker = useConfiguratorStore(s => s.activeSticker);
  const setTextEditor = useConfiguratorStore(s => s.setTextEditor);
  const setTextEditorRef = useRef(setTextEditor);

  const {
    fontFamily,
    fontSize,
    color,
    fontWeight,
    fontStyle,
    underline,
    textAlign,
    content
  } = useConfiguratorStore(s => s.textEditor);

  const handleTextChanged = (e: { target: IText }) => {
    const obj = e.target;
    if (obj.isType('i-text', 'textbox')) {
      setTextEditorRef.current({ content: obj.text });
    }
  };

  // INIT
  useEffect(() => {
    if (!ref.current) return;

    const canvas = new Canvas(ref.current, {
      preserveObjectStacking: true,
      selection: true,
    });

    canvas.on('text:changed', handleTextChanged);

    canvasRef.current = canvas;
    return () => {
      if (!canvasRef.current) return;
      canvas.off('text:changed', handleTextChanged);

      try {
        canvasRef.current.dispose();
      } catch (e) {
        console.warn("Fabric dispose failed (safe to ignore)", e);
      }

      canvasRef.current = null;
    };
  }, []);

  // SWITCH TOOL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.remove(...canvas.getObjects());
    activeTextRef.current = null;

    if (editorTab === "text") {
      const text = new Textbox("Edit me", {
        fill: color,
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        underline,
        textAlign,
        width: 140,
      });

      canvas.add(text);
      canvas.setActiveObject(text);

      text.enterEditing();
      text.selectAll();

      canvas.viewportCenterObject(text);

      activeTextRef.current = text;
    }

    if (editorTab === "sticker" && activeSticker) {
      FabricImage.fromURL(activeSticker.src).then((img) => {
        const MAX_SIZE = 200;

        const scale = Math.min(
          MAX_SIZE / img.width!,
          MAX_SIZE / img.height!
        );

        img.scale(scale);
        canvas.add(img);
        canvas.viewportCenterObject(img);
        img.setCoords();

      })
    }

    canvas.requestRenderAll();
  }, [editorTab, activeSticker]);

  // TEXT STYLE SYNC

  // Inside TEXT STYLE SYNC useEffect
  useEffect(() => {
    const text = activeTextRef.current;
    if (!text) return;

    const updates:  Partial<Textbox> = {
      fill: color,
      fontFamily,
      fontSize: Number(fontSize),
      fontWeight,
      fontStyle,
      underline,
      textAlign,
    };

    // ONLY update text if it's different to prevent cursor jumping/loops
    if (text.text !== content) {
      updates.text = content;
    }

    text.set(updates);
    canvasRef.current?.requestRenderAll();
  }, [color, fontFamily, fontSize, fontWeight, fontStyle, underline, textAlign, content]);

  useEffect(() => {
    setTextEditorRef.current = setTextEditor;
  }, [setTextEditor]);

  return canvasRef;
};