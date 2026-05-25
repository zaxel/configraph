"use client"
import { useRef, useState } from "react";
import { useBuilderStore } from "../../store/builder.store";
import Button from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEntitlements } from "@/features/billing/context/entitlements.context";
import { UpgradeModal } from "@/components/common/UpgradeModal";

const UploadModel = () => {
    const uploadModel = useBuilderStore((s) => s.uploadModel);
    const uploadInput = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [upgradeOpen, setUpgradeOpen] = useState(false);

    const { plan, usage, limits, permissions } = useEntitlements();

    async function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;


        const configuratorId = await uploadModel(file);
        if (configuratorId)
            router.replace(`/builder/${configuratorId}`);

        // reset input so same file works again
        e.target.value = '';
    }

    return (
        <>
            <div>
                <Button onClick={() => {
                    if(!permissions.canCreateConfigurator){ 
                        setUpgradeOpen(true)
                        return;
                    }
                    uploadInput.current?.click();
                }} variant={"outline"} className='w-full' icon={<Image className='inline mr-2' width={14} height={14} src={'/icons/upload.svg'} alt="upload sticker" />}>
                    Upload Model
                </Button>
                <input ref={uploadInput} onChange={(e) => handleImgUpload(e)} type="file" accept=".glb" style={{ display: "none" }} />
            </div>
            <UpgradeModal
                open={upgradeOpen}
                onOpenChange={setUpgradeOpen}
                title="You reached the limit of configurators available on your plan"
                description="Upgrade your plan to unlock the ability to add more configurators."
            />
        </>
    );
};

export default UploadModel;