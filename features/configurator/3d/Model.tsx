import React from 'react';
import { useGLTF } from './hooks/useModel';
import useMeshRegistry from './hooks/useMeshRegistry';

const Model = () => {
    const { gltf } = useGLTF("/models/nike4.glb");
    const registry = useMeshRegistry(gltf);
    useMeshRegistry(gltf);

    // useMaterialSystem({registry})

    return <primitive object={gltf.scene} /> 
};

export default Model;