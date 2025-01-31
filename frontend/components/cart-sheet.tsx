"use client"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  isVeg: boolean
  serves: number
}

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (itemId: number, quantity: number) => void
}

export function CartSheet({ isOpen, onClose, items, onUpdateQuantity }: CartSheetProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <>
      <style jsx global>{`
        .cart-sheet {
          position: fixed;
          bottom: -100%;
          left: 0;
          width: 100%;
          background: white;
          transition: bottom 0.3s ease-in-out;
          z-index: 1000;
          border-top-left-radius: 32px;
          border-top-right-radius: 32px;
          box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
        }

        .cart-sheet.active {
          bottom: 0;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-in-out;
        }

        .overlay.active {
          opacity: 1;
          visibility: visible;
        }
      `}</style>

      <div className="overlay active" onClick={onClose} />
      <div className="cart-sheet active">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Carts</h2>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <div
                    className={`w-4 h-4 border-2 rounded-full mt-1 ${item.isVeg ? "border-green-500" : "border-red-500"}`}
                  >
                    <div className={`w-2 h-2 m-0.5 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                    <p className="text-sm text-gray-500">Serves {item.serves}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="text-orange-500 font-medium px-2"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="text-orange-500 font-medium px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <button className="bg-white text-emerald-500 px-4 py-2 rounded-lg font-medium">Confirm Order</button>
        </div>
      </div>
    </>
  )
}

