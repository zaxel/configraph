import StickersPanel from './StickersPanel';
import TextPanel from './TextPanel';
import AppliedPanel from './AppliedPanel';
import { useConfiguratorStore } from '../../store/configurator.store';
import Button from '@/components/common/Button';

const CanvasToolbar = () => {
    const editorTab = useConfiguratorStore(s => s.editorTab);
    const setEditorTab = useConfiguratorStore(s => s.setEditorTab);
    console.log(editorTab);

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-4'>
                <Button variant={editorTab === "sticker" ? "active" : "primary"} onClick={() => setEditorTab("sticker")}>
                    Stickers
                </Button>
                <Button variant={editorTab === "text" ? "active" : "primary"} onClick={() => setEditorTab("text")}>
                    Text
                </Button>
                <Button className='ml-auto' variant={editorTab === "applied" ? "active" : "primary"} onClick={() => setEditorTab("applied")}>
                    Applied
                </Button>
            </div>
            {editorTab === "sticker" && <StickersPanel />}
            {editorTab === "text" && <TextPanel />}
            {editorTab === "applied" && <AppliedPanel />}
        </div>
    );
};

export default CanvasToolbar;