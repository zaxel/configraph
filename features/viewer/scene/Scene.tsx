import React, { Suspense } from 'react';
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import Model from '../Model';
import Loader from './Loader';
import { ViewerProps } from '../Viewer';
import { GlCaptureBridge } from './GlCaptureBridge';


const Scene = ({ modelUrl, product, selectedOptions, mode, rotation}: ViewerProps) => {
    return (
        <>
            <GlCaptureBridge />
            <OrbitControls />
            <Environment preset="city" />

            <Suspense fallback={<Loader />}>
                <Float >
                    <Model 
                    rotation={rotation} 
                    modelUrl={modelUrl} product={product} selectedOptions={selectedOptions} mode={mode}/>
                </Float>
                <ContactShadows position-y={-1.5} opacity={0.4} blur={2} />
            </Suspense>
        </>
    );
};

export default Scene;