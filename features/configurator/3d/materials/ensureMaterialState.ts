import * as THREE from "three"
import { CustomUserData, MappableMaterial } from "../../ui/material.types"

const hasMap = (mat: THREE.Material): mat is MappableMaterial => {
  return "map" in mat
}

export const ensureMaterialState = (mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => {
  if (mesh.userData.materialState) return

  const userData = mesh.userData as CustomUserData
  if (userData.materialState) return;
  const material = mesh.material;;

  if (Array.isArray(material)) {
    mesh.userData.materialState = {
      originalMap: material.map((m) => (hasMap(m) ? m.map : null))
    }
  } else {
    mesh.userData.materialState = {
      originalMap: hasMap(material) ? material.map : null
    }
  }
}