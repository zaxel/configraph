import { StateCreator } from "zustand";
import { canvasRepository } from "../../data/canvas.repository";
import { BoundStore } from "../store.types";
import { CanvasItem, Sticker, UserSlice } from "./user.types";



export const createUserSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never]],
  [],
  UserSlice
> = (set, get) => ({
  userCanvas: {},

  // 🔹 LOAD
  loadUserCanvas: async (productId) => {
    try {
      const data = await canvasRepository.load(productId);

      const history: CanvasItem[] = data?.history ?? [];

      set(
        (state) => ({
          userCanvas: {
            ...state.userCanvas,
            [productId]: {
              savedStickers: data?.savedStickers ?? [],
              history,
            },
          },
        }),
        false,
        "user/load"
      );

      // 🔥 hydrate canvas slice (IMPORTANT)
      if (data?.design) {
        get().setDesign(data.design);
      }

    } catch (e) {
      console.error("Failed to load user canvas", e);
    }
  },

  // 🔹 SAVE
  saveUserCanvas: async (productId) => {
    const userData = get().userCanvas[productId];
    const design = get().design; // from CanvasSlice

    if (!userData) return;

    await canvasRepository.save(productId, {
      savedStickers: userData.savedStickers,
      history: userData.history,
      design, // merged at save time
    });
  },

  // 🔹 STICKERS
  addSticker: (productId, url) => {
    set((state) => {
      const current = state.userCanvas[productId]?.savedStickers ?? [];

      if (current.length >= 5) return state;

      const newSticker: Sticker = {
        id: crypto.randomUUID(),
        src: url,               
      };

      return {
        userCanvas: {
          ...state.userCanvas,
          [productId]: {
            ...state.userCanvas[productId],
            savedStickers: [...current, newSticker],
          },
        },
      };
    }, false, "user/addSticker");
  },

  removeSticker: (productId, id) => {
    set((state) => {
      const current = state.userCanvas[productId]?.savedStickers ?? [];

      return {
        userCanvas: {
          ...state.userCanvas,
          [productId]: {
            ...state.userCanvas[productId],
            savedStickers: current.filter((s) => s.id !== id),
          },
        },
      };
    }, false, "user/removeSticker");
  },

  // 🔥 HISTORY
  addHistoryItem: (productId, item) => {
    set((state) => {
      const current = state.userCanvas[productId]?.history ?? [];

      return {
        userCanvas: {
          ...state.userCanvas,
          [productId]: {
            ...state.userCanvas[productId],
            history: [item, ...current],
          },
        },
      };
    }, false, "user/addHistoryItem");
  },

  removeHistoryItem: (productId, id) => {
    set((state) => {
      const current = state.userCanvas[productId]?.history ?? [];

      return {
        userCanvas: {
          ...state.userCanvas,
          [productId]: {
            ...state.userCanvas[productId],
            history: current.filter((i) => i.id !== id),
          },
        },
      };
    }, false, "user/removeHistoryItem");
  },
});