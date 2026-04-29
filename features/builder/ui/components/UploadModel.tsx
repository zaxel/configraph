import { useRef } from "react";
import { useBuilderStore } from "../../store/builder.store";
import Button from "@/components/common/Button";
import Image from "next/image";

const UploadModel = () => {
    const uploadModel = useBuilderStore((s) => s.uploadModel);
    const uploadInput = useRef<HTMLInputElement>(null);

    async function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

       
        uploadModel(file);


        // reset input so same file works again
        e.target.value = '';
    }

    return (
        <div>
            <Button onClick={() => uploadInput.current?.click()} variant={"outline"} className='w-full' icon={<Image className='inline mr-2' width={14} height={14} src={'/icons/upload.svg'} alt="upload sticker" />}>
                Upload Model
            </Button>
            <input ref={uploadInput} onChange={(e) => handleImgUpload(e)} type="file" accept=".glb" style={{ display: "none" }} />
        </div>
    );
};

export default UploadModel;