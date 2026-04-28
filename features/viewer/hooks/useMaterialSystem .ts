import { useEffect, useMemo } from "react"
import * as THREE from "three"
import { ensureUniqueMaterial } from "../materials/ensureUniqueMaterial"
import { ensureMaterialState } from "../materials/ensureMaterialState"
import { MaterialSystemProps } from "@/features/viewer/types/viewer.types";
import { resolvePartMeshes } from "@/features/configurator/engine/resolvers/resolveParts";
import { ResolvedPart } from "@/features/configurator/engine/types/resolved.types";

interface CustomUserData {
    currentColor?: string | number | THREE.Color;
}

type ColorableMesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial> & {
    userData: CustomUserData;
};

export const useMaterialSystem = ({
    registry,
    product,
    selectedOptions,
    enabled
}: MaterialSystemProps) => {
    const resolved = useMemo(() => {
        if (!product || !selectedOptions) return []
        return resolvePartMeshes(product, selectedOptions)
    }, [product, selectedOptions])

    useEffect(() => {
        if (!registry || !product || !enabled) return;


        resolved.forEach(({ meshes, color }: ResolvedPart) => {
            meshes.forEach((name) => {
                const obj = registry.byName.get(name);
                if (!obj || !(obj as THREE.Mesh).isMesh) return;
                const mesh = obj as ColorableMesh;

                ensureUniqueMaterial(mesh);
                ensureMaterialState(mesh);

                if (mesh.userData.currentColor !== color) {
                    mesh.material.map = null;
                    mesh.material.color.set(color);
                    mesh.material.needsUpdate = true;
                    mesh.userData.currentColor = color;
                }
            });
        })

    }, [registry, product, resolved, enabled])
}