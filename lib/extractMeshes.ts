import { Object3D } from 'three';

export type MeshInfo = {
    id: string;
    name: string;
    materialCount: any[];
};

export function extractMeshes(root: Object3D): MeshInfo[] {
    const meshes: MeshInfo[] = [];

    root.traverse((obj: any) => {
        if (obj.isMesh) {
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

export function extractMeshesFromGLB(buffer: ArrayBuffer): MeshInfo[] {
    const view = new DataView(buffer);
    
    // GLB header: magic (4) + version (4) + length (4) + chunk0 length (4) + chunk0 type (4)
    const jsonLength = view.getUint32(12, true);
    const jsonBytes = new Uint8Array(buffer, 20, jsonLength);
    const json = JSON.parse(new TextDecoder().decode(jsonBytes));

    const meshes: MeshInfo[] = [];

    (json.meshes || []).forEach((mesh: any, i: number) => {
        meshes.push({
            id: `mesh_${i}`,
            name: mesh.name || `mesh_${i}`,
            materialCount: new Set(
                (mesh.primitives || []).map((p: any) => p.material ?? 0)
            ).size,
        });
    });

    return meshes;
}