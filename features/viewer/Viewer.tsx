"use client"
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import Scene from "./scene/Scene";
import { Product, SelectedOptions } from "../configurator/model";
import { Mode } from "../product-studio/product-studio.store";
import { Watermark } from "./Watermark";

export type ViewerProps = {
    modelUrl: string;
    mode: Mode;

    product?: Product | null | undefined;
    selectedOptions?: SelectedOptions;
    canExportWithoutWatermark?: boolean;

    rotation?: [number, number, number];
    floatingSpeed?: number
}

const Viewer = ({ modelUrl, product, selectedOptions, mode, canExportWithoutWatermark, rotation, floatingSpeed }: ViewerProps) => {
    return (
        <>
            <Watermark
                visible={!canExportWithoutWatermark}
            />
            <div className='w-full h-full'>
                <Canvas
                    camera={{ position: [0, 1, 3] }}
                    gl={{
                        outputColorSpace: THREE.SRGBColorSpace,
                    }}
                >
                    <Scene 
                        rotation={rotation} 
                        modelUrl={modelUrl} 
                        product={product} 
                        selectedOptions={selectedOptions} 
                        mode={mode} 
                        floatingSpeed={floatingSpeed}
                        />
                </Canvas>
            </div>
        </>

    );
};

export default Viewer;