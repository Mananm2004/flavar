import { MapPin, SlidersHorizontal } from "lucide-react"

export function LocationHeader() {
  return (
    <div className="px-4 py-2 bg-white">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
          <MapPin className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <div className="text-sm text-gray-400">You're at</div>
          <div className="text-base font-medium">Jl. Soekarno Hatta 15A...</div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.58268 17.5C13.9549 17.5 17.4993 13.9555 17.4993 9.58329C17.4993 5.21104 13.9549 1.66663 9.58268 1.66663C5.21043 1.66663 1.66602 5.21104 1.66602 9.58329C1.66602 13.9555 5.21043 17.5 9.58268 17.5Z"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3327 18.3333L16.666 16.6666"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search menu, restaurant or etc"
          className="w-full pl-10 pr-12 py-3 rounded-xl bg-orange-50/50 border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2">
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

