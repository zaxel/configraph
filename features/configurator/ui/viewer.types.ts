 export type ViewerSlice = {
  cameraMode: "orbit" | "other-mode"; // Be specific if you can!
  setCameraMode: (mode: "orbit" | "other-mode") => void;
  selectedMesh: any; // Or your Mesh type
  setSelectedMesh: (mesh: any) => void;
};