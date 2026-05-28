import { useLoader, useThree } from "@react-three/fiber";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function useGLTF(url: string) {
    const { gl } = useThree();

    const draco = new DRACOLoader().setDecoderPath("/draco/")
    const ktx2 = new KTX2Loader().setTranscoderPath("/basis/")

    const gltf = useLoader(GLTFLoader, url,
        (loader) => {
            ktx2.detectSupport(gl)

            loader.setDRACOLoader(draco)
            loader.setKTX2Loader(ktx2)
        }
    )
    return { gltf };
}