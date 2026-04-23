// decals.types.ts
import * as THREE from "three";
import { Sticker } from "./user.types";

export type DecalConfig = {
  id: string;
  source: Sticker;
  target: string;
  texture: string; // base64
  type: "sticker" | "text";

  position: [number, number, number];
  orientation: [number, number, number];
  size: [number, number, number];
};

export type PreviewDecal = {
  target: string;
  texture: HTMLCanvasElement | null;
};

export interface DecalsSlice {
  decals: DecalConfig[];
  previewDecal: PreviewDecal | null;

  commitRequested: number
  requestCommit: () => void

  addDecal: (decal: DecalConfig) => void;
  removeDecal: (id: string) => void;
  setPreviewDecal: (preview: PreviewDecal | null) => void;
}