import { Leaf, AlertTriangle, ThumbsUp } from "lucide-react"

interface FilterChipsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function FilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 px-4 py-2 overflow-x-auto">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          activeFilter === "veg" ? "bg-primary text-white" : "bg-white border"
        }`}
        onClick={() => onFilterChange("veg")}
      >
        <Leaf className="w-4 h-4" />
        <span className="text-sm">Veg</span>
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          activeFilter === "non-veg" ? "bg-primary text-white" : "bg-white border"
        }`}
        onClick={() => onFilterChange("non-veg")}
      >
        <AlertTriangle className="w-4 h-4" />
        <span className="text-sm">Non-Veg</span>
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          activeFilter === "recommended" ? "bg-primary text-white" : "bg-white border"
        }`}
        onClick={() => onFilterChange("recommended")}
      >
        <ThumbsUp className="w-4 h-4" />
        <span className="text-sm">Recommended</span>
      </button>
    </div>
  )
}

