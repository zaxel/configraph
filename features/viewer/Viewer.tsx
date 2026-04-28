"use client"
import { Canvas} from "@react-three/fiber";
import * as THREE from 'three';
import Scene from "./scene/Scene";

const Viewer = ({modelUrl, product, selectedOptions}) => {
    return (
        <div className='w-full md:w-2/3 shrink-0 h-[50vh] md:h-[75vh] md:sticky'>
            <Canvas
                camera={{ position: [0, 1, 3] }}
                gl={{
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
            >
               <Scene modelUrl={modelUrl} product={product} selectedOptions={selectedOptions}/>
            </Canvas>
        </div>
    );
};

export default Viewer;