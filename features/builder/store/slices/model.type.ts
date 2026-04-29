export type UploadStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "ready"
  | "error";

export interface ModelSlice {
  modelUrl: string | null;
  status: UploadStatus;
  error: string | null;

  uploadModel: (file: File) => Promise<void>;
  resetModel: () => void;
}