import StickersPanel from './StickersPanel';
import TextPanel from './TextPanel';
import AppliedPanel from './AppliedPanel';
import { useConfiguratorStore } from '../../store/configurator.store';
import Button from '@/components/common/Button';

const CanvasToolbar = () => {
    const editorTab = useConfiguratorStore(s => s.editorTab);
    const setEditorTab = useConfiguratorStore(s => s.setEditorTab);
    const decals = useConfiguratorStore((s) => s.decals);
      const toggleActiveCanvas = useConfiguratorStore(s => s.toggleActive);

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex gap-4 flex-wrap'>
                <Button variant={editorTab === "sticker" ? "active-accent" : "accent"} onClick={() => setEditorTab("sticker")}>
                    Stickers
                </Button>
                <Button variant={editorTab === "text" ? "active-accent" : "accent"} onClick={() => setEditorTab("text")}>
                    Text
                </Button>
                {decals.length >0 && <Button variant={editorTab === "applied" ? "active-accent" : "accent"} onClick={() => setEditorTab("applied")}>
                    Applied
                </Button>}
                <Button variant='accent' onClick={() => toggleActiveCanvas()} className='w-max ml-auto' >
                      Close
                </Button>
            </div>
            {editorTab === "sticker" && <StickersPanel />}
            {editorTab === "text" && <TextPanel />}
            {editorTab === "applied" && <AppliedPanel />}
        </div>
    );
};

export default CanvasToolbar;