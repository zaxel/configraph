import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { GLTF } from 'three-stdlib';

const useMeshRegistry = (gltf: GLTF) => {
  const registry = useRef<Map<string, THREE.Mesh>>(new Map());

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        registry.current.set(mesh.name, mesh);
      }
    })
  }, [gltf])

  return registry;
}

export default useMeshRegistry;