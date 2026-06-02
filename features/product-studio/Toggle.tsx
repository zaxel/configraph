import Button from '@/components/common/Button';
import React from 'react';
import { useProductStudioStore } from './product-studio.store';

const Toggle = () => {
    const mode = useProductStudioStore(s=>s.mode);
    const setMode = useProductStudioStore(s=>s.setMode);

    return (
        <Button className='absolute top-2 left-2 z-11 px-2 h-6 md:px-4 md:h-8' variant={mode==="builder" ? "active" : "primary"} onClick={() =>
            setMode((mode==="builder") ? "preview" : "builder")
        }>
            {mode==="builder" ? "preview" : "builder"}
        </Button>
    );
};

export default Toggle;