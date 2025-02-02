import type React from "react"
import type { WasteItem } from "../types/types"

interface ModalProps {
  item: WasteItem | null
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  if (!item) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        <p>{item.description}</p>
        <p>Цена за кг: {item.pricePerKg} тенге</p>
        <p>Доступное количество: {item.availableQuantity} кг</p>
        <button className="mt-4 bg-red-500 text-white p-2 rounded" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default Modal

