import { MapPin, Search, SlidersHorizontal } from "lucide-react";

interface HeaderProps {
  onSearch: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <div className="px-4 pt-2 space-y-4 bg-white">
      <div className="flex items-start gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <div>
          <p className="text-xs text-gray">You're at</p>
          <p className="text-sm">Jl. Soekarno Hatta 15A...</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray" />
        <input
          type="text"
          placeholder="Search menu, restaurant or etc"
          className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-lg text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <SlidersHorizontal className="w-4 h-4 text-gray" />
        </button>
      </div>
    </div>
  );
}
