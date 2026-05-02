import * as THREE from "three";

export type MeshDebuggerApi = {
  toggleVisibility: (name: string) => void;
  highlight: (name: string, enabled: boolean) => void;
} | null;

export type SceneSlice = {
  registry: {
    byName: Map<string, THREE.Object3D>;
  } | null;

  debuggerApi: MeshDebuggerApi;

  setRegistry: (registry: SceneSlice["registry"]) => void;
  setDebuggerApi: (api: MeshDebuggerApi) => void;

  resetViewer: () => void;
};