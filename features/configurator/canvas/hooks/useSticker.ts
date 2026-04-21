import { useEffect, useState } from "react"
import { FabricImage } from "fabric"

export const useSticker = (url: string) => {
  const [image, setImage] = useState<FabricImage | null>(null)

  useEffect(() => {
    let mounted = true

    FabricImage.fromURL(url).then((img) => {
      if (mounted) setImage(img);
      img.scale(0.1);
       
    })

    return () => {
      mounted = false
    }
  }, [url])

  return image;
}