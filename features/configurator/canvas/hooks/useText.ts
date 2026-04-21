import { useMemo } from "react"
import { FabricText } from "fabric"

export const useText = () => {
  return useMemo(() => {
    return new FabricText("Hello", {
      left: 100,
      top: 100,
      fill: "#000",
    })
  }, [])
}