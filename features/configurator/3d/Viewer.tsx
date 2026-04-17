"use client"

import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense, useEffect, useState } from "react";
import * as THREE from 'three';


function Model() {
    const { gl } = useThree();

    const gltf = useLoader(GLTFLoader, "/models/nike4.glb",
        (loader) => {
            const draco = new DRACOLoader()
            draco.setDecoderPath("/draco/")

            const ktx2 = new KTX2Loader()
            ktx2.setTranscoderPath("/basis/")
            ktx2.detectSupport(gl)

            loader.setDRACOLoader(draco)
            loader.setKTX2Loader(ktx2)
        }
    )

    const getMeshes = (scene) => {
        const meshes = [];
        scene.traverse((child) => {
            if (child.isMesh) {
                meshes.push(child);
            }
        });
        return meshes;
    };

    useEffect(() => {
        const meshes = getMeshes(gltf.scene);
        console.log(meshes.map(m => m.name)); // see all mesh names
    }, []);

    useEffect(() => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
            }
        });
    }, []);

    useEffect(() => {
        window.__scene = gltf.scene;
    }, []);

    return <primitive object={gltf.scene} />


}

const Viewer = () => {



    return (
        <div className='w-full md:w-2/3 shrink-0 h-[50vh] md:h-[75vh] md:sticky'>
            <Canvas camera={{ position: [0, 1, 3] }}>
                <OrbitControls />
                <Environment preset="city" />

                <Suspense fallback={<Html center>
                    <div className="text-2xl text-gray-500">
                        Loading…
                    </div>
                </Html>}>
                    {/* <Float > */}
                    <Model />
                    {/* </Float> */}
                    {/* <ContactShadows position-y={-2.2} opacity={0.4} blur={2} /> */}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Viewer;