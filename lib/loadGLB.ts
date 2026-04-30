import { GLTFLoader, GLTF } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';

export async function loadGLB(buffer: ArrayBuffer) {
  const loader = new GLTFLoader();

  // ✅ DRACO support (important)
  const draco = new DRACOLoader();
  draco.setDecoderPath(process.cwd() + '/public/draco/'); 
  loader.setDRACOLoader(draco);

  return new Promise<GLTF>((resolve, reject) => {
    loader.parse(
      buffer,
      '',
      (gltf) => resolve(gltf),
      (err) => reject(err)
    );
  });
}