export type ThumbnailSlice = {
    thumbnailCreating: boolean;
    thumbnailUploading: boolean;
    thumbnail: Blob | null;
    captureFrame: (() => Promise<Blob | null>) | null;

    setThumbnailCreating: (creating: boolean) => void;
    captureThumbnail: () => void;
    uploadThumbnail: () => Promise<void>;
    setCaptureFrame: (fn: (() => Promise<Blob | null>) | null) => void;

};