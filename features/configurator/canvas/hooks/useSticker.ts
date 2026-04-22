import { useEffect, useState } from "react"
import { FabricImage } from "fabric"

export const useSticker = (url: string) => {
    const [image, setImage] = useState<FabricImage | null>(null)

    useEffect(() => {
        let mounted = true

        FabricImage.fromURL(url).then((img) => {
            const MAX_SIZE = 200;

            const scale = Math.min(
                MAX_SIZE / img.width!,
                MAX_SIZE / img.height!
            );

            img.scale(scale);
            if (mounted) setImage(img);

        })

        return () => {
            mounted = false
        }
    }, [url])

    return image;
}