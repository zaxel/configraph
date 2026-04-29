import { StateCreator } from "zustand";
import { ModelSlice } from "./model.type";
import { BoundBuilderStore } from "../builder.types";

export const MAX_FILE_SIZE = 200 * 1024 * 1024;
export const MAX_UNOPTIMIZED_SIZE = 2 * 1024 * 1024;


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
            // 1. Check size
            if (file.size > MAX_FILE_SIZE) {
                alert(`File is too large! Please upload an image smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
                set({
                    status: "error",
                    error: `File too large (max ${MAX_FILE_SIZE}MB)`,
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
            
            // 2. distinguish processing stage
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
        } catch (err: unknown) {
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