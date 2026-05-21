import { useRef, useState } from "react";
import { storageRepo } from "@/features/account/repositories/storage.repo";
import { profileRepo } from "@/features/account/repositories/profile.repo";
import { updateAvatarAction, updateProfileAction } from "@/features/account/actions/profileAction";

interface AvatarUploadButtonProps {
    userId: string | null;
    onUploadSuccess?: (url: string) => void; 
}

export function AvatarUploadButton({ userId, onUploadSuccess }: AvatarUploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    if (!userId) return null;


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 1. Frontend validation (File constraints)
        if (file.size > 2 * 1024 * 1024) {
            alert("File is too large! Maximum 2MB allowed.");
            return;
        }

        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
        ];

        if (!validTypes.includes(file.type)) {
            alert("Invalid file type.");
            return;
        }
        try {
            setIsUploading(true);

            // 2. Upload to storage bucket
            // const url = await storageRepo.uploadAvatar(file, userId);
            const url = await updateAvatarAction(file);
            if (!url) throw new Error("Upload failed");

            // 3. Sync profile record
            await updateProfileAction({ avatar_url: url });
            // await profileRepo.update(userId, { avatar_url: url });

             //4. Trigger the local state refresh in your parent component
            if (onUploadSuccess) {
                onUploadSuccess(url);
            }

        } catch (error) {
            console.error("Avatar upload error:", error);
            alert("Failed to update profile picture.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            {/* Hidden file selector */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg, image/png, image/webp, image/avif"
                onChange={handleFileChange}
                disabled={isUploading}
            />

            {/* Visually clean trigger button */}
            <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-2xl border bg-background shadow-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            >
                {isUploading ? (
                    // Simple clean loading spinner icon
                    <svg className="h-4 w-4 animate-spin text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeDasharray="32" /><path d="M12 2v4" /></svg>
                ) : (
                    // Camera/Plus Upload Icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                )}
            </button>
        </>
    );
}
