import { StateCreator } from "zustand";
import { ModelSlice } from "./model.type";
import { BoundBuilderStore } from "../builder.types";
import { getToken } from "@clerk/nextjs";

export const MAX_FILE_SIZE = 80 * 1024 * 1024;
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
        const draft = get().draft;
        if (draft?.model.url) {
            set({
                status: "error",
                error: "Model already set. Create a new configurator.",
            });
            return;
        }

        // Check format
        if (!file.name.toLowerCase().endsWith('.glb')) {
            set({ status: "error", error: "Only .glb files are supported." });
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

            const token = await getToken(); // Clerk's useAuth() hook

            const res = await fetch(`${process.env.NEXT_PUBLIC_UPLOAD_SERVER_URL}/upload-model`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            set({ status: "processing" });

            if (!res.ok) {
                let message = 'Upload failed';
                try {
                    const contentType = res.headers.get('content-type');
                    if (contentType?.includes('application/json')) {
                        const json = await res.json();
                        message = json.error ?? message;
                    } else {
                        // don't expose raw HTML stack traces to UI
                        message = `Upload failed (${res.status})`;
                    }
                } catch { }
                throw new Error(message);
            }

            const { configuratorId } = await res.json();

            get().setConfiguratorId(configuratorId);

            set({
                status: "ready",
                error: null,
            });

            return configuratorId;

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            set({
                status: "error",
                error: message,
            });

        }
    },

    resetModel: () =>
        set({
            status: "idle",
            error: null,
        }),
});