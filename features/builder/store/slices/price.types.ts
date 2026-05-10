export type EditablePriceKeys = "basePrice" | "oldPrice";

export type PriceSlice = {
  updatePriceTittle: (moduleId: string, value: string) => void,
  updatePrice: (moduleId: string, type: EditablePriceKeys, value: number) => void,
}


