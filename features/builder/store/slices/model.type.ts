export type UploadStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "ready"
  | "error";

export interface ModelSlice {
  status: UploadStatus;
  error: string | null;

  uploadModel: (file: File) => Promise<void>;
  resetModel: () => void;
  initModel: (url: string) => void;
}