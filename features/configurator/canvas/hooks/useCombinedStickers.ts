import React, { useMemo } from 'react';
import { useConfiguratorStore } from '../../store/configurator.store';
import { Sticker } from '../../store/slices/user.types';

const EMPTY_STRINGS: string[] = [];
const EMPTY_STICKERS: Sticker[] = [];

const useCombinedStickers = (productId?: string) => {

    const defaultStickerStrings = useConfiguratorStore(s => {
        const canvasModule = s.product?.modules.find(m => m.id === "canvas");
        const canvasComp = canvasModule?.components.find(c => c.type === "canvas");
        return canvasComp?.stickers ?? EMPTY_STRINGS;
    });

    const userStickers = useConfiguratorStore(s => {
        if (!productId) return EMPTY_STICKERS;
        return s.userCanvas[productId]?.savedStickers ?? EMPTY_STICKERS;
    });

    const preparedDefaultStickers = useMemo(() => {
        return defaultStickerStrings.map((s, i) => ({
            id: `default-${s}-${i}`,
            src: `/stickers/${s}`,
        }));
    }, [defaultStickerStrings]);

    const stickers = useMemo(() => {
        return [...preparedDefaultStickers, ...userStickers];
    }, [preparedDefaultStickers, userStickers]);

    return stickers;
};

export default useCombinedStickers;