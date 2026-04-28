import { create } from "zustand";

export type Mode = "builder" | "preview" | "embed";
export type ProductStudio = {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

export const useProductStudioStore = create<ProductStudio>()((set) => ({
    mode: "builder", 
    setMode: (mode) => set({ mode }), 
}));