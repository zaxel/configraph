import * as THREE from "three"
import { Product } from "./product.types";

export type PartsSelection = {
  selectedPart?: string;
  items: Record<string, {
    groupId: string;
    color?: string | number | THREE.Color;
    enabled?: boolean;
  }>;
};

export type SelectedOptions = {
    parts: PartsSelection;
    size: string | null;
    addon: string[];
};

export type OptionsSlice = {
    selectedOptions: SelectedOptions;
    setOption: <K extends keyof SelectedOptions>(
        key: K,
        value: SelectedOptions[K]
    ) => void;

    toggleAddon: (value: string) => void;

    resetOptions: () => void;
    initOptions: (product: Product) => void;
    setPart: (product: Product, partId: string) => void;
    setGroup: (product: Product, part: string, group: string) => void;
    setColor: (part: string, color: string | number | THREE.Color) => void;
    setEnabled: (part: string, status: boolean) => void;
};

