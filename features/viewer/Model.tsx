import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from './hooks/useModel';
import useMeshRegistry from './hooks/useMeshRegistry';
import { useMaterialSystem } from './hooks/useMaterialSystem ';
import { useVisibility } from './hooks/useVisibility';
import { useDecalSystem } from './systems/useDecalSystem';
import { ViewerProps } from './Viewer';
import { useConfiguratorStore } from '../configurator/store/configurator.store';
import { useBuilderStore } from '../builder/store/builder.store';
import { MeshLayout } from '@/lib/extractMeshes';
import { useMeshDebugger } from '../builder/hooks/useMeshDebugger';
import { GLTF } from 'three-stdlib';

const Model = ({ modelUrl, product, selectedOptions, mode, rotation }: ViewerProps) => {
    const { gltf } = useGLTF(modelUrl);
    const selections = useConfiguratorStore(s => s.selectedOptions.parts.items);
    const activeTab = useBuilderStore(s => s.activeTab);
    const setDebuggerApi = useBuilderStore(s => s.setDebuggerApi);
    const setRegistry = useBuilderStore(s => s.setRegistry);
    const {id: configuratorId} = useBuilderStore(s => s.configurator);
    const meshesRegistered = useBuilderStore(s => (s.builderConfig?.meshes?.length ?? 0) > 0);
    const setBuilderConfig = useBuilderStore(s => s.setBuilderConfig);

    const registry = useMeshRegistry(gltf as unknown as GLTF, product);
    // const debuggerApi = useMeshDebugger(registry, activeTab === "mesh");

    useEffect(() => {
        if (!registry || !configuratorId || meshesRegistered) return;

        const meshLayout: MeshLayout[] = [];
        gltf.scene.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                meshLayout.push({
                    name: mesh.name,
                    parentName: mesh.parent?.name ?? null,
                    parentType: mesh.parent?.type ?? null,
                    isGroupChild: mesh.parent?.type === 'Group',
                    materialCount: Array.isArray(mesh.material) ? mesh.material.length : 1,
                });
            }
        });

        fetch(`/api/configurator/${configuratorId}/meshes`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meshLayout),
        }).then(res => {
            if (res.ok) setBuilderConfig({ meshes: meshLayout }); // update store → meshesRegistered becomes true
        });

    }, [registry, configuratorId, meshesRegistered, gltf.scene, setBuilderConfig]);

    const debuggerApi = useMeshDebugger(registry);

    useEffect(() => {
        if (!registry) return;
        setRegistry(registry);
        return () => setRegistry(null);
    }, [registry, setRegistry]);

    useEffect(() => {
        if (activeTab !== "mesh") return;
        setDebuggerApi(debuggerApi);
        return () => setDebuggerApi(null);
    }, [debuggerApi, activeTab, setDebuggerApi]);

    useDecalSystem({
        registry,
        enabled: mode === "preview" || mode === "embed",
    });
    useVisibility({
        registry,
        enabled: mode === "preview" || mode === "embed",
        selections
    });

    useMaterialSystem({
        registry,
        product,
        selectedOptions,
        enabled: mode === "preview" || mode === "embed",
    })

    return <primitive rotation={rotation} object={gltf.scene} />
};

export default Model;