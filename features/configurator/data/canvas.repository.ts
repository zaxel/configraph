import { UserCanvasData } from "../store/slices/user.types"



export const canvasRepository = {
  async load(productId: string): Promise<UserCanvasData | null> {
    const raw = localStorage.getItem(`canvas:${productId}`)
    return raw ? JSON.parse(raw) : null
  },

  async save(productId: string, data: UserCanvasData) {
    localStorage.setItem(`canvas:${productId}`, JSON.stringify(data))
  }
}