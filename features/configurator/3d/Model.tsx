import React from 'react';
import { useGLTF } from './hooks/useModel';
import useMeshRegistry from './hooks/useMeshRegistry';
import { useConfiguratorStore } from '../store/configurator.store';
import { useMaterialSystem } from './hooks/useMaterialSystem ';
import { useDecalSystem } from '../canvas/hooks/useDecalSystem';

const Model = () => {
    const { gltf } = useGLTF("/models/nike4.glb");

    const product = useConfiguratorStore(s => s.product)
    const selectedOptions = useConfiguratorStore(s => s.selectedOptions)

    const registry = useMeshRegistry(gltf) ?? {byName: new Map()};

    useDecalSystem({registry});
 
    useMaterialSystem({
        registry,
        product,
        selectedOptions
    })

    return <primitive object={gltf.scene} />
};

export default Model;