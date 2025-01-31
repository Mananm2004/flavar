"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  isVeg: boolean
  serves: number
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Paneer Paratha",
      price: 150,
      quantity: 2,
      isVeg: true,
      serves: 2,
    },
    {
      id: 2,
      name: "Mushroom Curry",
      price: 150,
      quantity: 1,
      isVeg: true,
      serves: 2,
    },
    {
      id: 3,
      name: "Biryani",
      price: 150,
      quantity: 1,
      isVeg: false,
      serves: 2,
    },
  ])

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity === 0) {
        return prevItems.filter((item) => item.id !== itemId)
      }
      return prevItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    })
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Carts</h1>
        </div>
      </header>

      <div className="fixed inset-0 bg-black/20 z-10">
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white rounded-t-[32px] max-w-lg mx-auto">
            <div className="p-6 space-y-6">
              {cartItems.map((item) => (
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
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="text-orange-500 font-medium px-2"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-orange-500 font-medium px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>Total:</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
              <button className="bg-white text-emerald-500 px-4 py-2 rounded-lg font-medium">Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

