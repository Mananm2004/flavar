"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { FilterChips } from "@/components/filter-chips"
import { FoodCard } from "@/components/food-card"
import { ARScreen } from "@/components/ar-screen"
import { MenuPopup } from "@/components/menu-popup"
import { CartBar } from "@/components/cart-bar"
import { CartScreen } from "@/components/cart-screen"
import { Menu } from "lucide-react"

const foodItems = [
  {
    id: 1,
    name: "Paneer Paratha",
    price: 150,
    serves: 2,
    image: "https://dcfvgbhj.netlify.app/paneer.jfif",
    isVeg: true,
    isRecommended: true,
    description:
      "Lorem ipsum dolor amet, consectetur adipiscing elit. Gravida lorem consectetur diam semper nulla facilisi bibendum et. Et pulvinar, vitae placerat massa.",
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
    image: "https://dcfvgbhj.netlify.app/chicken.jfif",
    isVeg: false,
    isRecommended: true,
    description: "A delicious paratha stuffed with spiced chicken filling. Served with raita and pickle.",
    modelSrc:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/15-04-2024-04-40-11_Paneer_Paratha.glb",
    iosSrc:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/usdz/15-04-2024-04-40-11_Paneer_Paratha.usdz",
  },
]

export default function MenuPage() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDish, setSelectedDish] = useState<(typeof foodItems)[0] | null>(null)
  const [isAROpen, setIsAROpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const filteredItems = foodItems
    .filter((item) => {
      if (filter === "veg") return item.isVeg
      if (filter === "non-veg") return !item.isVeg
      if (filter === "recommended") return item.isRecommended
      return true
    })
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0)

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  // ✅ FIXED: Correctly update quantity and remove item when it reaches 0
  const updateQuantity = (itemId: number, delta: number) => {
    setCart((prev) => {
      const newQty = (prev[itemId] || 0) + delta

      if (newQty <= 0) {
        // ✅ NEW: Removes the item from the cart if quantity is 0
        const { [itemId]: _, ...rest } = prev
        return rest
      }

      return { ...prev, [itemId]: newQty }
    })
  }

  return (
    <main className="min-h-screen pb-20">
      <Header onSearch={setSearchTerm} />
      <FilterChips activeFilter={filter} onFilterChange={setFilter} />

      <div className="divide-y">
        {filteredItems.map((item) => (
          <FoodCard
            key={item.id}
            {...item}
            quantity={cart[item.id] || 0}
            onQuantityChange={(delta) => updateQuantity(item.id, delta)}
            onAdd={() => addToCart(item.id)}
            onViewAR={() => {
              setSelectedDish(item)
              setIsAROpen(true)
            }}
          />
        ))}
      </div>

      <button
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="w-5 h-5" />
        MENU
      </button>

      {cartItemsCount > 0 && <CartBar itemCount={cartItemsCount} onViewCart={() => setIsCartOpen(true)} />}

      {selectedDish && <ARScreen isOpen={isAROpen} onClose={() => setIsAROpen(false)} dish={selectedDish} />}

      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ✅ FIXED: CartScreen now receives correct props and updates dynamically */}
      <CartScreen
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={foodItems.filter((item) => cart[item.id])}
        quantities={cart}
        onUpdateQuantity={updateQuantity} // ✅ FIXED: Ensures correct quantity updates
      />
    </main>
  )
}
