import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { MeshRegistry } from "../../ui/registry.types";
import { DecalGeometry } from "three/examples/jsm/Addons.js";
import { useConfiguratorStore } from "../../store/configurator.store";
import { DecalSource } from "../../store/slices/decals.types";

export const useDecalSystem = ({ registry }: { registry: MeshRegistry }) => {
  const { scene, camera } = useThree();

  const decals = useConfiguratorStore((s) => s.decals);
  const preview = useConfiguratorStore((s) => s.previewDecal);
  const addDecal = useConfiguratorStore((s) => s.addDecal);
  const commitRequested = useConfiguratorStore((s) => s.commitRequested);
  const activeSticker = useConfiguratorStore((s) => s.activeSticker);

  const previewRef = useRef<THREE.Mesh | null>(null);
  const decalRefs = useRef<Map<string, THREE.Mesh>>(new Map());

  // stable single raycaster
  const raycasterRef = useRef(new THREE.Raycaster());
  // screen center — never changes
  const screenCenter = useRef(new THREE.Vector2(0, 0));
  const offset = 0.002;


  const lastHit = useRef<{
    point: THREE.Vector3;
    normal: THREE.Vector3;
    orientation: THREE.Euler;
    target: string;
  } | null>(null);

  // throttle counter
  const frameSkip = useRef(0);

  // =========================================================
  // COMMITTED DECALS
  // =========================================================
  useEffect(() => {
    console.log(activeSticker)
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

      const position = new THREE.Vector3(...decal.position);
      const orientation = new THREE.Euler(...decal.orientation);
      const size = new THREE.Vector3(...decal.size);

      const geometry = new DecalGeometry(mesh, position, orientation, size);
      const decalMesh = new THREE.Mesh(geometry, material);

      scene.add(decalMesh);
      decalRefs.current.set(decal.id, decalMesh);
    });

    const currentIds = new Set(decals.map((d) => d.id));
    decalRefs.current.forEach((mesh, id) => {
      if (!currentIds.has(id)) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
        decalRefs.current.delete(id);
      }
    });
  }, [decals, registry, scene]);

  // =========================================================
  // PREVIEW CLEANUP
  // =========================================================
  useEffect(() => {
    if (!preview && previewRef.current) {
      scene.remove(previewRef.current);
      previewRef.current.geometry.dispose();
      (previewRef.current.material as THREE.Material).dispose();
      previewRef.current = null;
      lastHit.current = null;
    }
  }, [preview, scene]);

  // =========================================================
  // PREVIEW + RAYCAST
  // =========================================================
  useFrame(() => {
    if (!preview?.texture) return;

    // throttle raycast to every 5 frames
    frameSkip.current++;
    if (frameSkip.current < 5) return;
    frameSkip.current = 0;

    // raycast from screen center
    raycasterRef.current.setFromCamera(screenCenter.current, camera);
    const meshes = Array.from(registry.byName.values());
    const hits = raycasterRef.current.intersectObjects(meshes, true);

    if (hits.length === 0) {
      lastHit.current = null;
      if (previewRef.current) previewRef.current.visible = false;
      return;
    }

    const hit = hits[0];

    // climb to registered mesh
    let targetObj: THREE.Object3D | null = hit.object;
    while (targetObj && !registry.byName.has(targetObj.name)) {
      targetObj = targetObj.parent;
    }
    if (!targetObj) return;

    const normal = hit.face?.normal
      ?.clone()
      .transformDirection(targetObj.matrixWorld);
    if (!normal) return;

    const orientation = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
    );

    lastHit.current = {
      point: hit.point.clone(),
      normal,
      orientation,
      target: targetObj.name,
    };

    // --- create preview mesh if needed ---
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

    previewRef.current.visible = true;

    // place preview ON the surface at hit point, oriented to normal
    previewRef.current.position.copy(hit.point);
    previewRef.current.quaternion.setFromEuler(orientation);

    // scale in world units (match your decal size)
    previewRef.current.scale.set(1, 0.5, 1);


    previewRef.current.position
      .copy(hit.point)
      .add(normal.clone().multiplyScalar(offset));

    const mat = previewRef.current.material as THREE.MeshBasicMaterial;
    if (mat.map) mat.map.needsUpdate = true;
  });

  const previewRef2 = useRef(preview); 
  const activeStickerRef = useRef(activeSticker);

  useEffect(() => { previewRef2.current = preview; }, [preview]);
  useEffect(() => { activeStickerRef.current = activeSticker; }, [activeSticker]);
  // =========================================================
  // COMMIT
  // =========================================================
  
  useEffect(() => {
  if (commitRequested === 0) return;
  
  const preview = previewRef2.current;
  const activeSticker = activeStickerRef.current;

  if (!preview?.texture || !lastHit.current) return;

  const { point, orientation, target } = lastHit.current;
  const pos = point.clone().add(lastHit.current.normal.clone().multiplyScalar(offset));

  const source: DecalSource = activeSticker
    ? { type: "sticker", stickerId: activeSticker.id }
    : { type: "text", textId: "temp-text-id" };

  addDecal({
    id: crypto.randomUUID(),
    source,
    target,
    texture: preview.texture.toDataURL(),
    position: [pos.x, pos.y, pos.z],
    orientation: [orientation.x, orientation.y, orientation.z],
    size: [1, 0.5, 1],
  });
}, [commitRequested, addDecal]);
};