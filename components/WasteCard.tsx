import type React from "react"
import type { WasteItem } from "../types/types"

interface WasteCardProps {
  item: WasteItem
  onDetailsClick: (item: WasteItem) => void
}

const WasteCard: React.FC<WasteCardProps> = ({ item, onDetailsClick }) => {
  return (
    <div className="border p-4 rounded shadow-md" data-testid="waste-card">
      <h2 className="text-xl font-bold" data-testid="waste-name">
        {item.name}
      </h2>
      <p>Объем: {item.volume} кг</p>
      <p>Время поступления: {new Date(item.arrivalTime).toLocaleString()}</p>
      <button
        className="mt-2 bg-blue-500 text-white p-2 rounded"
        onClick={() => onDetailsClick(item)}
        data-testid="details-button"
      >
        Детали
      </button>
    </div>
  )
}

export default WasteCard

