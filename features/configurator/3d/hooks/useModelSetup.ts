import * as THREE from 'three';
import { useEffect } from "react";
import { GLTF } from 'three-stdlib';

export const useModelSetup = (gltf: GLTF) => {
    useEffect(() => {
        gltf.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh

                if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map((m) => m.clone())
                } else {
                    mesh.material = mesh.material.clone()
                }
            }
        })
    }, [gltf])
}