type UploadStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "loading"
  | "ready"
  | "error";

export interface ModelSlice {
  status: UploadStatus;
  error: string | null;

  resetModel: () => void;
  initModel: (url: string) => void;
 uploadModel: (file: File) => Promise<string>;
}