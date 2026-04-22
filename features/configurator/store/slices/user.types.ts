
/**
 * 🔹 Canvas snapshot item
 */
export type CanvasItem = {
    id: string;
    type: "text" | "sticker";
    name: string;

    fabricJSON: any;

    decalTransform?: {
        position: [number, number, number];
        rotation: [number, number, number];
        scale: number;
    };

    createdAt: number;
};

export type UserCanvasState = {
    [productId: string]: {
        savedStickers: Sticker[];
        history: CanvasItem[];
    };
};

export type Sticker = {
  id: string;
  src: string;
}

export type UserCanvasData = {
  design?: any
  savedStickers: Sticker[]
  history: CanvasItem[]
}

export type UserSlice = {
    userCanvas: UserCanvasState;

    loadUserCanvas: (productId: string) => Promise<void>;
    saveUserCanvas: (productId: string) => Promise<void>;

    addSticker: (productId: string, url: string) => void;
    removeSticker: (productId: string, url: string) => void;

    addHistoryItem: (productId: string, item: CanvasItem) => void;
    removeHistoryItem: (productId: string, id: string) => void;

};
