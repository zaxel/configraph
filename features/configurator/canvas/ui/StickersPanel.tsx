import React, { useRef } from 'react';
import { useConfiguratorStore } from '../../store/configurator.store';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { Sticker } from '../../store/slices/user.types';
import useCombinedStickers from '../hooks/useCombinedStickers';

const StickersPanel = () => {

    const userCanvas = useConfiguratorStore(s => s.userCanvas);
    const addSticker = useConfiguratorStore(s => s.addSticker);
    const removeSticker = useConfiguratorStore(s => s.removeSticker);

    const activeSticker = useConfiguratorStore(s => s.activeSticker);
    const setActiveSticker = useConfiguratorStore(s => s.setActiveSticker);
    const removeActiveSticker = useConfiguratorStore(s => s.removeActiveSticker);

    const saveUserCanvas = useConfiguratorStore(s => s.saveUserCanvas);

    const productId = useConfiguratorStore(s => s.product?.id);
    const stickers = useCombinedStickers(productId);

    const uploadBtn = useRef(null);
    const uploadInput = useRef<HTMLInputElement>(null);

    const requestCommit = useConfiguratorStore(s => s.requestCommit);

    console.log(userCanvas);
    console.log(stickers);

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    }

    async function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file || !productId) return;

        const MAX_FILE_SIZE = 5 * 1024 * 1024;

        // 2. Check size
        if (file.size > MAX_FILE_SIZE) {
            alert(`File is too large! Please upload an image smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
            e.target.value = ''; // Reset input
            return;
        }

        // const url = URL.createObjectURL(file);
        const base64 = await fileToBase64(file);
        addSticker(productId, base64);
        saveUserCanvas(productId);
        console.log(base64);

        // reset input so same file works again
        e.target.value = '';
    }

    async function deleteImage(sticker: Sticker) {
        if (!productId) return null;
        removeSticker(productId, sticker.id);
        if (activeSticker?.id === sticker.id)
            removeActiveSticker();
        saveUserCanvas(productId);
    }


    return ( 
        <div>
            <ul className='flex gap-2 flex-wrap'>
                {stickers.map(sticker => {
                    return <li className='cursor-pointer relative w-14 h-14 overflow-hidden' key={sticker.id}>
                        <Image onClick={() => setActiveSticker(sticker)} className='object-cover' src={sticker.src} fill sizes="56px" alt={'sticker'} />
                        <Image onClick={() => deleteImage(sticker)} className='cursor-pointer absolute opacity-65 hover:opacity-100 right-0 top-0 z-10' width={24} height={24} src={'/icons/circle-x.svg'} alt="remove" />
                    </li>
                })}
                <li key={"sticker-btns"} className='flex flex-col gap-2 items-start ml-auto'>
                    <input ref={uploadInput} onChange={(e) => handleImgUpload(e)} type="file" accept="image/*" style={{ display: "none" }} />
                    <Button ref={uploadBtn} onClick={() => uploadInput.current?.click()} variant={"outline"} className='w-full' icon={<Image className='inline mr-2' width={14} height={14} src={'/icons/upload.svg'} alt="upload sticker" />}>
                        Upload
                    </Button>
                    <Button onClick={() => requestCommit()} variant={"outline"} className='w-full' icon={<Image className='inline mr-2' width={14} height={14} src={'/icons/save.svg'} alt="save sticker" />}>
                        Apply
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default StickersPanel;