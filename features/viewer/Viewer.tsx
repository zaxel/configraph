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
}

const Viewer = ({ modelUrl, product, selectedOptions, mode, canExportWithoutWatermark }: ViewerProps) => {
    return (
        <>
            <Watermark
                visible={!canExportWithoutWatermark}
            />
            {/*<div className='w-full md:w-2/3 shrink-0 h-[50vh] md:h-[75vh] md:sticky'>*/}
            <div className='w-full h-full'>
                <Canvas
                    camera={{ position: [0, 1, 3] }}
                    gl={{
                        outputColorSpace: THREE.SRGBColorSpace,
                    }}
                >
                    <Scene modelUrl={modelUrl} product={product} selectedOptions={selectedOptions} mode={mode} />
                </Canvas>
            </div>
        </>

    );
};

export default Viewer;