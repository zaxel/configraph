export type PartsSelection = Record<string, {
    groupId: string;
    color: string;
}>;


type SelectedOptions = {
    parts: PartsSelection;
    size: string;
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
    initOptions: () => void;
};

