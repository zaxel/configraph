import React from 'react';
import { useGLTF } from './hooks/useModel';
import useMeshRegistry from './hooks/useMeshRegistry';
import { useMaterialSystem } from './hooks/useMaterialSystem ';
import { useVisibility } from './hooks/useVisibility';
import { useDecalSystem } from '../configurator/canvas/hooks/useDecalSystem';

const Model = ({modelUrl, product, selectedOptions}) => {
    // const { gltf } = useGLTF("/models/nike5.glb");
    const { gltf } = useGLTF(modelUrl);

    // const product = useConfiguratorStore(s => s.product);
    // const selectedOptions = useConfiguratorStore(s => s.selectedOptions);

    const registry = useMeshRegistry(gltf) ?? { byName: new Map(), byGroup: new Map(), byPart: new Map() };
    useDecalSystem({ registry });
    useVisibility({ registry });

    useMaterialSystem({
        registry,
        product,
        selectedOptions
    })
    return <primitive object={gltf.scene} />
};

export default Model;