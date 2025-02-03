import { ShoppingCart, Plus, Minus } from "lucide-react"

interface FoodCardProps {
  id: number
  name: string
  price: number
  serves: number
  image: string
  isVeg: boolean
  quantity: number
  onQuantityChange: (delta: number) => void
  onAdd: () => void
  onViewAR: () => void
}

export function FoodCard({
  name,
  price,
  serves,
  image,
  isVeg,
  quantity,
  onQuantityChange,
  onAdd,
  onViewAR,
}: FoodCardProps) {
  return (
    <div className="flex justify-between p-4 border-bold">
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 ${isVeg ? "bg-success" : "bg-red-500"} rounded-full`} />
          <h3 className="font-medium">{name}</h3>
        </div>
        <p className="text-coral font-medium">₹{price}</p>
        <p className="text-xs text-gray-500">Serves {serves}</p>
        <div>
        {quantity > 0 ? (
          // ✅ Changed the quantity control UI to match the reference
          <div className="flex items-center border border-red-500 text-red-500 px-3 py-1 rounded-[9px] font-semibold text-sm font-semibold w-fit">
            {/* ✅ Styled button to match reference (red text, bold, padding) */}
            <button className="text-red-500 font-bold px-2 " onClick={() => onQuantityChange(-1)}>
              - {/* ✅ Calls onQuantityChange with -1 */}
            </button>
            
            {/* ✅ Styled quantity text (red color, bold, with margin) */}
            <span className="text-red-500 font-semibold px-2">{quantity}</span>
            
            {/* ✅ Styled button to match reference (red text, bold, padding) */}
            <button className="text-red-500 font-bold px-2" onClick={() => onQuantityChange(1)}>
              + {/* ✅ Calls onQuantityChange with +1 */}
            </button>
          </div>
        ) : (
          // ✅ Styled ADD button to match reference (border, text color, padding, rounded corners)
          <button onClick={onAdd} className="add-button flex items-center gap-2 border border-red-500 text-red-500 px-3 py-1 rounded-[9px] font-semibold ">
            ADD
            <ShoppingCart className="stroke-red-500" />
          </button>
        )}
        </div>
      </div>

      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={name} className="w-24 h-24 object-cover rounded-lg" />
        <button
          className="absolute bottom-1 right-1 bg-white text-coral text-xs px-3 py-1 rounded-full shadow-sm font-medium"
          onClick={onViewAR}
        >
          View in AR
        </button>
      </div>
    </div>
  )
}
