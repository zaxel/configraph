import { StateCreator } from "zustand";
import { ModelSlice } from "./model.type";
import { BoundBuilderStore } from "../builder.types";



export const createModelSlice: StateCreator<
    BoundBuilderStore,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    ModelSlice
> = (set, get) => ({
    status: "idle",
    error: null,

    initModel: url =>
        set({
            status: url ? "ready" : "idle",
            error: null,
        }),

    uploadModel: async (file) => {
        const product = get().product;
        if (product?.model.url) {
            set({
                status: "error",
                error: "Model already set. Create a new configurator.",
            });
            return;
        }

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

            // const res = await POST("/api/upload-model");
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

            get().setModelUrl(data.url);

            set({
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
            status: "idle",
            error: null,
        }),
});