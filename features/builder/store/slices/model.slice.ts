import { StateCreator } from "zustand";
import { ModelSlice } from "./model.type";



export const createModelSlice: StateCreator<ModelSlice> = (set) => ({
    modelUrl: null,
    status: "idle",
    error: null,

    uploadModel: async (file) => {
        try {
            // 1. basic validation (frontend UX only)
            const MAX_FILE_SIZE = 20 * 1024 * 1024;

            // 2. Check size
            if (file.size > MAX_FILE_SIZE) {
                alert(`File is too large! Please upload an image smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
                set({
                    status: "error",
                    error: "File too large (max 15MB)",
                });
                return;
            }

            set({ status: "uploading", error: null });

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload-model", {
                method: "POST",
                body: formData,
            });

            // optional: distinguish processing stage
            set({ status: "processing" });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Upload failed");
            }

            const data = await res.json();

            set({
                modelUrl: data.url,
                status: "ready",
                error: null,
            });
        } catch (err: any) {
            set({
                status: "error",
                error: err.message || "Something went wrong",
            });
        }
    },

    resetModel: () =>
        set({
            modelUrl: null,
            status: "idle",
            error: null,
        }),
});