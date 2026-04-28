import React, { Suspense } from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import Model from '../Model';
import Loader from './Loader';


const Scene = ({ modelUrl, product, selectedOptions}) => {
    return (
        <>
            <OrbitControls />
            <Environment preset="city" />

            <Suspense fallback={<Loader />}>
                {/* <Float > */}
                <Model  modelUrl={modelUrl} product={product} selectedOptions={selectedOptions}/>
                {/* </Float> */}
                {/* <ContactShadows position-y={-2.2} opacity={0.4} blur={2} /> */}
            </Suspense>
        </>
    );
};

export default Scene;