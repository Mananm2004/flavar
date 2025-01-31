"use client"

import { useState } from "react"
import { Search, Menu, ShoppingBag } from "lucide-react"
import { FoodCard } from "@/components/food-card"
import { ARScreen } from "@/components/ar-screen"
import { LocationHeader } from "@/components/location-header"
import { CartSheet } from "@/components/cart-sheet"
import { MenuSheet } from "@/components/menu-sheet"
import { Switch } from "@/components/ui/switch"

const MENU_ITEMS = [
  {
    id: 1,
    name: "Paneer Paratha",
    price: 150,
    serves: 2,
    isVeg: true,
    image: "https://source.unsplash.com/featured/?paneer,paratha",
    modelSrc:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/15-04-2024-04-40-11_Paneer_Paratha.glb",
    iosSrc:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/usdz/15-04-2024-04-40-11_Paneer_Paratha.usdz",
  },
  {
    id: 2,
    name: "Chicken Paratha",
    price: 180,
    serves: 2,
    isVeg: false,
    image: "https://source.unsplash.com/featured/?chicken,paratha",
    modelSrc:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/15-04-2024-04-40-11_Chicken_Paratha.glb",
    iosSrc:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/usdz/15-04-2024-04-40-11_Chicken_Paratha.usdz",
  },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  isVeg: boolean
  serves: number
}

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVeg, setIsVeg] = useState(false)
  const [isNonVeg, setIsNonVeg] = useState(false)
  const [isRecommended, setIsRecommended] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedDish, setSelectedDish] = useState<(typeof MENU_ITEMS)[0] | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      (!isVeg && !isNonVeg && !isRecommended) || (isVeg && item.isVeg) || (isNonVeg && !item.isVeg) || isRecommended
    return matchesSearch && matchesFilter
  })

  const handleAddToCart = (itemId: number, quantity: number) => {
    const menuItem = MENU_ITEMS.find((item) => item.id === itemId)
    if (!menuItem) return

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId)
      if (existingItem) {
        return prevCart
          .map((item) => (item.id === itemId ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0)
      }
      if (quantity > 0) {
        return [
          ...prevCart,
          {
            id: itemId,
            name: menuItem.name,
            price: menuItem.price,
            quantity,
            isVeg: menuItem.isVeg,
            serves: menuItem.serves,
          },
        ]
      }
      return prevCart
    })
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="sticky top-0 bg-white z-10 pb-4">
        <LocationHeader />

        <div className="px-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu, restaurant or etc"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4 px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-2">
            <Switch id="veg-mode" checked={isVeg} onCheckedChange={setIsVeg} />
            <label htmlFor="veg-mode" className="text-sm font-medium">
              Veg
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="non-veg-mode" checked={isNonVeg} onCheckedChange={setIsNonVeg} />
            <label htmlFor="non-veg-mode" className="text-sm font-medium">
              Non-Veg
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="recommended-mode" checked={isRecommended} onCheckedChange={setIsRecommended} />
            <label htmlFor="recommended-mode" className="text-sm font-medium">
              Recommended
            </label>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4">
        <div className="space-y-4 mt-4">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              {...item}
              onViewAR={() => setSelectedDish(item)}
              onAddToCart={(quantity) => handleAddToCart(item.id, quantity)}
              initialQuantity={cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
            />
          ))}
        </div>
      </main>

      {selectedDish && <ARScreen isOpen={true} onClose={() => setSelectedDish(null)} dish={selectedDish} />}

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleAddToCart}
      />

      <MenuSheet isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed bottom-24 right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">
                {cart.reduce((total, item) => total + item.quantity, 0)} items
              </div>
              <div className="font-semibold">₹{cartTotal}</div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-6 py-3 rounded-full bg-orange-500 text-white font-medium flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

