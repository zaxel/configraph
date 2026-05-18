import { MeshRegistry } from "@/features/viewer/types/registry.types";
import { useMemo } from "react";
import * as THREE from "three";

export const useMeshDebugger = (registry: MeshRegistry | null) => {
 return useMemo(() => {
         if (!registry) return null;
         return {
             toggleVisibility: (name: string) => {
                if (!registry) return;
                 const obj = registry.byName.get(name);
                 if (!obj || !(obj as THREE.Mesh).isMesh) return;
  
                 obj.visible = !obj.visible;
             },
             allMeshesOn: () => {
                if (!registry) return;
                const meshes = registry.byName;
                if(!meshes.size)return;
                meshes.forEach(obj => {
                    if (!obj || !(obj as THREE.Mesh).isMesh) return;
                    obj.visible = true;
                })
             },
             highlight: (name: string, enabled: boolean) => {
                 if (!enabled || !registry) return;
                 const obj = registry.byName.get(name);
                 if (!obj || !(obj as THREE.Mesh).isMesh) return;
                 
                 const mesh = obj as THREE.Mesh;
                 mesh.userData.originalMaterial = mesh.material;
                 mesh.material = new THREE.MeshBasicMaterial({
                     color: 0xff0000,
                 });
             },
             resetHighlight: (name: string, enabled: boolean) => {
                 if (!enabled || !registry) return;
 
                 const obj = registry.byName.get(name);
                 if (!obj || !(obj as THREE.Mesh).isMesh) return;
 
                 const mesh = obj as THREE.Mesh;
                 if (mesh.userData.originalMaterial) {
                     mesh.material = mesh.userData.originalMaterial; // restore
                     delete mesh.userData.originalMaterial;
                 }
             },
         };
     }, [registry]);
};