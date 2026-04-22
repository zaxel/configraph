import { Sticker } from "./user.types";

export type DealTransform = {
    position: [number, number, number],
    rotation: [number, number, number],
    scale: number,
}
export type canvasModeType = "decal" | "uv" | null;
export type CanvasSlice = {
    mode: canvasModeType,
    setMode: (mode: canvasModeType) => void

    active: boolean;
    toggleActive: () => void,
    // Fabric JSON

    design?: any,
    setDesign: (design: any) => void,

    // decal-specific
    decalTransform?: DealTransform,
    setDecalTransform: (transform: DealTransform) => void,

    activeZone?: string | null | undefined,
    setActiveZone: (zone: string) => void,

    editorTab: "text" | "sticker" | "applied",
    setEditorTab: (tab: "text" | "sticker" | "applied") => void,

    activeSticker: Sticker | null,
    setActiveSticker: (data: Sticker) => void,
    
    removeActiveSticker: () => void,
}