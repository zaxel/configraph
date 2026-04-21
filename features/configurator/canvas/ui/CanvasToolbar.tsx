import React, { useState } from 'react';
import StickersPanel from './StickersPanel'; 
import TextPanel from './TextPanel';
import AppliedPanel from './AppliedPanel';
import { useConfiguratorStore } from '../../store/configurator.store';

const CanvasToolbar = () => {
    const editorTab = useConfiguratorStore(s => s.editorTab);
    const setEditorTab = useConfiguratorStore(s => s.setEditorTab);
    console.log(editorTab);

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-6'>
                <button
                onClick={()=>setEditorTab("sticker")}
                className={editorTab==="sticker"
                    ? "ring-1 ring-primary text-white bg-primary rounded-md py-1 px-4 text-sm"
                    : "ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer"
                }
            >
                Stickers
            </button>
                <button
                onClick={()=>setEditorTab("text")}
                className={editorTab==="text"
                    ? "ring-1 ring-primary text-white bg-primary rounded-md py-1 px-4 text-sm"
                    : "ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer"
                }
            >
                Text
            </button>
                <button
                onClick={()=>setEditorTab("applied")}
                className={editorTab==="applied"
                    ? "ring-1 ring-primary text-white bg-primary rounded-md py-1 px-4 text-sm ml-auto"
                    : "ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer ml-auto"
                }
            >
                Applied
            </button>
            </div>
            {editorTab==="sticker" && <StickersPanel />}
            {editorTab==="text" && <TextPanel />}
            {editorTab==="applied" && <AppliedPanel />}
        </div>
    );
};

export default CanvasToolbar;