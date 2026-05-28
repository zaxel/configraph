export type ViewerSlice = {
    cameraMode: string;

    setCameraMode: (mode: string) => void;
    selectedMesh: string | null;

    setSelectedMesh: (mesh: string) => void;

};