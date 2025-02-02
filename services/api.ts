import type { WasteItem } from "../types/types"

export const fetchWasteItems = async (): Promise<WasteItem[]> => {

  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      name: "Бумага",
      volume: 100,
      arrivalTime: "2023-05-20T10:00:00Z",
      description: "Макулатура различных сортов",
      pricePerKg: 500,
      availableQuantity: 100,
      type: "paper",
    },
    {
      id: 2,
      name: "Пластик",
      volume: 50,
      arrivalTime: "2023-05-20T11:00:00Z",
      description: "ПЭТ бутылки и пластиковые контейнеры",
      pricePerKg: 1000,
      availableQuantity: 50,
      type: "plastic",
    },
    {
      id: 3,
      name: "Металл",
      volume: 200,
      arrivalTime: "2023-05-20T09:00:00Z",
      description: "Алюминиевые банки и стальной лом",
      pricePerKg: 1500,
      availableQuantity: 200,
      type: "metal",
    },
    {
      id: 4,
      name: "Стекло",
      volume: 150,
      arrivalTime: "2023-05-20T12:00:00Z",
      description: "Стеклянные бутылки и банки",
      pricePerKg: 300,
      availableQuantity: 150,
      type: "glass",
    },
  ]
}

