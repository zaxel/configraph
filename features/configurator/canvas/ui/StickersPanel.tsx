import React from 'react';
import { useConfiguratorStore } from '../../store/configurator.store';
import { useShallow } from 'zustand/shallow';
import { selectAvailableStickers } from '../../store/selectors';
// import upload from '/icons/upload.svg';
import Image from 'next/image';
import Button from '@/components/common/Button';

const StickersPanel = () => {
    const stickers = useConfiguratorStore(useShallow(selectAvailableStickers));
    const userCanvas = useConfiguratorStore(s => s.userCanvas);

    console.log(userCanvas);
    console.log(stickers);

    return (
        <div>
            <ul className='flex gap-2 flex-wrap'>
                {stickers.map(sticker => {
                    return <li className='cursor-pointer relative w-14 h-14 overflow-hidden' key={sticker}><Image className='object-cover' src={sticker} fill sizes="56px" alt={'sticker'} /></li>
                })}
                <li className='flex flex-col gap-2 items-start ml-auto'>
                    <Button variant={"outline"} className='w-full' icon={<Image className='inline mr-2' width={14} height={14} src={'/icons/upload.svg'} alt="upload sticker" />}>
                        Add Sticker
                    </Button>
                    <Button variant={"outline"} className='w-full' icon={<Image className='inline mr-2' width={14} height={14} src={'/icons/save.svg'} alt="save sticker" />}>
                        Apply
                    </Button>
                    {/* <button className='cursor-pointer ring-1 rounded-md px-3 py-0.5'>
                        <Image className='inline mr-2' width={14} height={14} src={'/icons/upload.svg'} alt="upload sticker" />
                        add sticker
                    </button> */}
                    {/* <button className='cursor-pointer ring-1 rounded-md px-3 py-0.5'>
                        <Image className='inline mr-2' width={14} height={14} src={'/icons/save.svg'} alt="upload sticker" />
                        apply
                    </button> */}
                </li>
            </ul>
        </div>
    );
};

export default StickersPanel;