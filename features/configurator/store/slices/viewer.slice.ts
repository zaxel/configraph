export const createViewerSlice = (set) => ({
  cameraMode: "orbit",

  setCameraMode: (mode) =>
    set({ cameraMode: mode }),

  selectedMesh: null,

  setSelectedMesh: (mesh) =>
    set({ selectedMesh: mesh }),
});