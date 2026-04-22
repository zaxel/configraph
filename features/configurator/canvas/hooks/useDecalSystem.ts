import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { MeshRegistry } from "../../ui/registry.types";
import { DecalGeometry } from "three/examples/jsm/Addons.js";

type DecalConfig = {
  id: string;
  target: string;
  texture: string;
};

type PreviewDecal = {
  target: string;
  texture: HTMLCanvasElement | null;
};

export const useDecalSystem = ({
  registry,
  decals,
  preview,
}: {
  registry: MeshRegistry;
  decals: DecalConfig[];
  preview: PreviewDecal | null;
}) => {
  const { scene, camera } = useThree();

  const previewRef = useRef<THREE.Mesh | null>(null);
  const decalRefs = useRef<Map<string, THREE.Mesh>>(new Map());

  // =========================================================
  // COMMITTED DECALS (STATIC, SAFE)
  // =========================================================
  useEffect(() => {
    if (!registry) return;

    decals.forEach((decal) => {
      if (decalRefs.current.has(decal.id)) return;

      const mesh = registry.byName.get(decal.target);
      if (!mesh) return;

      const texture = new THREE.TextureLoader().load(decal.texture);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
      });

      // // NOTE: still simple placeholder geometry for now
      // const geometry = new THREE.PlaneGeometry(1, 1);

      // const decalMesh = new THREE.Mesh(geometry, material);

      // // attach roughly to mesh center
      // decalMesh.position.copy(mesh.position);
      // decalMesh.quaternion.copy(camera.quaternion);

      const position = mesh.position.clone();
      const orientation = new THREE.Euler().setFromQuaternion(camera.quaternion);
      const size = new THREE.Vector3(1, 1, 1); // tweak to taste

      const geometry = new DecalGeometry(mesh, position, orientation, size);
      const decalMesh = new THREE.Mesh(geometry, material);

      scene.add(decalMesh);
      decalRefs.current.set(decal.id, decalMesh);
    });
  }, [decals, registry, scene, camera]);

  // =========================================================
  // PREVIEW STATE TRACKING (OPTIMIZATION)
  // =========================================================
  const lastCamPos = useRef(new THREE.Vector3());
  const lastCamQuat = useRef(new THREE.Quaternion());
  const lastTarget = useRef<string | null>(null);

  const lastUpdate = useRef(0);

  // =========================================================
  // LIVE PREVIEW (FAST PLANE PROJECTION)
  // =========================================================
  useFrame((_, delta) => {
    if (!preview?.texture) return;

    const mesh = registry.byName.get(preview.target);
    if (!mesh) return;

    const cam = camera as THREE.PerspectiveCamera;

    // -----------------------------------------------------
    // throttle (20fps max)
    // -----------------------------------------------------
    lastUpdate.current += delta;
    if (lastUpdate.current < 0.05) return;
    lastUpdate.current = 0;

    // -----------------------------------------------------
    // change detection
    // -----------------------------------------------------
    const cameraMoved =
      !camera.position.equals(lastCamPos.current) ||
      !camera.quaternion.equals(lastCamQuat.current);

    const targetChanged = lastTarget.current !== preview.target;

    if (!cameraMoved && !targetChanged && previewRef.current) return;

    lastCamPos.current.copy(camera.position);
    lastCamQuat.current.copy(camera.quaternion);
    lastTarget.current = preview.target;

    // -----------------------------------------------------
    // ensure preview mesh exists
    // -----------------------------------------------------
    if (!previewRef.current) {
      const geometry = new THREE.PlaneGeometry(1, 1);

      const texture = new THREE.CanvasTexture(preview.texture);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
      });

      previewRef.current = new THREE.Mesh(geometry, material);
      scene.add(previewRef.current);
    }

    // -----------------------------------------------------
    // CAMERA-BASED PROJECTION (FAST APPROXIMATION)
    // -----------------------------------------------------

    const meshPos = mesh.position.clone();

    // distance camera → mesh
    const distance = camera.position.distanceTo(meshPos);

    // camera forward direction
    const camDir = camera.getWorldDirection(new THREE.Vector3());

    // -----------------------------------------------------
    // OFFSET (push decal slightly off surface toward camera)
    // -----------------------------------------------------

    const fixedDepth = 1; // units in front of camera

    const projectedPos = camera.position
      .clone()
      .add(camDir.clone().multiplyScalar(fixedDepth));

    previewRef.current.position.copy(projectedPos);

    // -----------------------------------------------------
    // CAMERA-BASED SCALE (screen-space approximation)
    // -----------------------------------------------------
    const vFov = THREE.MathUtils.degToRad(cam.fov);
    const height = 2 * Math.tan(vFov / 2) * fixedDepth;
    const width = height * cam.aspect;

    // apply scale
    const decalSize = 0.2; // 20% of screen height
    previewRef.current.scale.set(width * decalSize, height * decalSize, 1);

    // -----------------------------------------------------
    // FACE CAMERA
    // -----------------------------------------------------
    previewRef.current.quaternion.copy(camera.quaternion);

    // -----------------------------------------------------
    // UPDATE TEXTURE (if needed)
    // -----------------------------------------------------
    const mat = previewRef.current.material as THREE.MeshBasicMaterial;
    if (mat.map) mat.map.needsUpdate = true;


  });
};