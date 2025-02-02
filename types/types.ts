export interface WasteItem {
    id: number
    name: string
    type: string
    volume: number
    arrivalTime: string
    description: string
    pricePerKg?: number
    availableQuantity?: number
  }
  