export type MaterialSelection = {
    type: "material";
    meshGroup: string;
    color?: string;
};
export type SizeSelection = {
    type: 'size',
    value: string,
    label: string,
    price: string,
};

export type AddonSelection = {
    type: 'addon',
    value: string,
    label: string,
    price: string,
};

export type SelectedOptions = MaterialSelection | SizeSelection | AddonSelection;


export type OptionsSlice = {
    selectedOptions: Record<string, SelectedOptions>;
    setOption: (componentId: string, value: SelectedOptions) => void;
    resetOptions: () => void;
    initOptions: () => void;
}; 

