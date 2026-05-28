import * as THREE from "three";

import { Object3D, Mesh } from 'three';

export type MeshInfo = {
    id: string;
    name: string;
    materialCount: number;
};

export interface GLTFMesh {
    name?: string;
    primitives: Array<{
        material?: number;
    }>;
}

export function extractMeshesServer(root: Object3D): MeshInfo[] {
    const meshes: MeshInfo[] = [];

    root.traverse((obj: Object3D) => {
        if (obj instanceof Mesh) {
            meshes.push({
                id: obj.uuid,              // stable inside this model snapshot
                name: obj.name || `mesh_${meshes.length}`,
                materialCount: Array.isArray(obj.material)
                    ? obj.material.length
                    : 1
            });
        }
    });

    return meshes;
}

export interface MeshLayout {
    name: string;
    parentName: string | null;
    parentType: string | null;
    isGroupChild: boolean;
    materialCount: number;
}

export function extractMeshLayout(scene: THREE.Object3D): MeshLayout[] {
    const meshes: MeshLayout[] = [];

    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            meshes.push({
                name: mesh.name,
                parentName: mesh.parent?.name ?? null,
                parentType: mesh.parent?.type ?? null,
                isGroupChild: mesh.parent?.type === 'Group',
                materialCount: Array.isArray(mesh.material) 
                    ? mesh.material.length 
                    : 1,
            });
        }
    });

    return meshes;
}