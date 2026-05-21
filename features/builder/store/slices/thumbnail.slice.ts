import { StateCreator } from "zustand";
import { ThumbnailSlice } from "./thumbnail.type";
import { BoundBuilderStore } from "../builder.types";

export const createThumbnailSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never]],
    [],
    ThumbnailSlice
> = (set, get) => ({
    thumbnailCreating: false,
    thumbnailUploading: false,
    thumbnail: null,
    captureFrame: null,

    setCaptureFrame: (fn) => set({ captureFrame: fn }),

    setThumbnailCreating: (creating) =>
        set({ thumbnailCreating: creating }),

    captureThumbnail: async () => {
        const { captureFrame } = get();
        if (!captureFrame) throw "no capture frame.";

        set({ thumbnailCreating: true });
        try {
            const blob = await captureFrame();
            set({ thumbnail: blob });
        } catch (error) {
            console.error("Failed to capture frame:", error);
        } finally {
            set({ thumbnailCreating: false }); 
        }
        await get().uploadThumbnail();
    },

    uploadThumbnail: async () => {
        const { thumbnail } = get();
        if (!thumbnail) return;

        set({ thumbnailUploading: true });

        try {
            const formData = new FormData();
            formData.append("file", thumbnail, "thumbnail.webp");
            const configuratorId = get().configurator.id;
            if(!configuratorId) throw "no configurator id";
            const res = await fetch(`/api/upload-thumbnail/${configuratorId}`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

        } catch (error) {
            console.error("Thumbnail upload failed:", error);
        } finally {
            set({ thumbnailUploading: false });
        }
    },
});