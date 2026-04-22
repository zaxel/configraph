type DecalConfig = {
  id: string
  target: string
  texture: string // base64
}

type PreviewDecal = {
  target: string
  texture: HTMLCanvasElement | null
}

export interface DecalsSlice {
  decals: DecalConfig[]
  previewDecal: PreviewDecal | null

  addDecal: (decal: DecalConfig) => void
  removeDecal: (id: string) => void
  setPreviewDecal: (preview: PreviewDecal | null) => void
}