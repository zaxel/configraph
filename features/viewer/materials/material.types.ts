import * as THREE from "three"

export type MappableMaterial = THREE.MeshStandardMaterial | THREE.MeshBasicMaterial

export interface MaterialState {
  originalMap: (THREE.Texture | null)[] | THREE.Texture | null
}

export interface CustomUserData {
  currentColor?: string | number | THREE.Color
  materialState?: MaterialState 
}