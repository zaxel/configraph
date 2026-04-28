import { create } from "zustand";

type Mode = "builder" | "preview" | "embded";

export const useProductStudioStore = create((set) => ({
  mode: "preview" as Mode,
  setMode: (mode: Mode) => set({ mode }),
}));