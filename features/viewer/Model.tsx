import React from 'react';
import { useGLTF } from './hooks/useModel';
import useMeshRegistry from './hooks/useMeshRegistry';
import { useMaterialSystem } from './hooks/useMaterialSystem ';
import { useVisibility } from './hooks/useVisibility';
import { useDecalSystem } from './systems/useDecalSystem';
import { ViewerProps } from './Viewer';
import { useConfiguratorStore } from '../configurator/store/configurator.store';

const Model = ({modelUrl, product, selectedOptions, mode}: ViewerProps) => {
    // const { gltf } = useGLTF("/models/nike5.glb");
    const { gltf } = useGLTF(modelUrl);

    // const product = useConfiguratorStore(s => s.product);
    // const selectedOptions = useConfiguratorStore(s => s.selectedOptions);
      const selections = useConfiguratorStore(s => s.selectedOptions.parts.items);
    

    const registry = useMeshRegistry(gltf) ?? { byName: new Map(), byGroup: new Map(), byPart: new Map() };
    useDecalSystem({ 
        registry,
        enabled: mode === "preview",
    });
    useVisibility({ 
        registry,
        enabled: mode === "preview",
        selections 
     });

    useMaterialSystem({
        registry,
        product,
        selectedOptions,
        enabled: mode === "preview",
    })
    return <primitive object={gltf.scene} />
};

export default Model;