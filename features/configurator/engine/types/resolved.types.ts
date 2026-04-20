import * as THREE from "three"

export type ResolvedPart = {
  partId: string;
  meshes: string[];
  color: string | number | THREE.Color;
};

export type ResolvedParts = ResolvedPart[];