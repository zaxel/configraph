import { useBuilderStore } from "@/features/builder/store/builder.store";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export const GlCaptureBridge = () => {
    const { gl, scene, camera } = useThree();
    const setCaptureFrame = useBuilderStore(s => s.setCaptureFrame);

    useEffect(() => {
        const capture = () => {
            gl.render(scene, camera); 
            return new Promise<Blob | null>((resolve) => {
                gl.domElement.toBlob(resolve, 'image/webp', 0.55);
            });
        };

        setCaptureFrame(capture);
        return () => setCaptureFrame(null);
    }, [gl, scene, camera]);
 
    return null;
};