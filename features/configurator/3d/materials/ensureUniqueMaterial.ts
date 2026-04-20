import * as THREE from "three"
export const ensureUniqueMaterial = (mesh: THREE.Mesh) => {
  if (!mesh.userData._materialCloned) {
    if (Array.isArray(mesh.material)) {
      mesh.material = mesh.material.map((m) => m.clone());
    } else {
      mesh.material = mesh.material.clone();
    }
    
    mesh.userData._materialCloned = true;
  }
}