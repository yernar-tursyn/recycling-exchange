import type React from "react"

interface FilterProps {
  onFilterChange: (filter: string) => void
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="filterSelect" className="mr-2">
        Фильтр по типу
      </label>
      <select
        id="filterSelect"
        className="p-2 border rounded"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">Все типы</option>
        <option value="paper">Бумага</option>
        <option value="plastic">Пластик</option>
        <option value="metal">Металл</option>
        <option value="glass">Стекло</option>
      </select>
    </div>
  )
}

export default Filter
