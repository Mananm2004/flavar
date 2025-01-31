"use client"

import { View } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface FoodCardProps {
  id: number
  name: string
  price: number
  serves: number
  image: string
  isVeg: boolean
  onViewAR: () => void
  onAddToCart?: (quantity: number) => void
  initialQuantity?: number
}

export function FoodCard({
  id,
  name,
  price,
  serves,
  image,
  isVeg,
  onViewAR,
  onAddToCart,
  initialQuantity = 0,
}: FoodCardProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleIncrement = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onAddToCart?.(newQuantity)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onAddToCart?.(newQuantity)
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border-b-2 border-orange-100">
      <div className="flex justify-between">
        <div className="flex-1 mr-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={cn("w-4 h-4 border-2 rounded-full", isVeg ? "border-green-500" : "border-red-500")}>
              <div className={cn("w-2 h-2 m-0.5 rounded-full", isVeg ? "bg-green-500" : "bg-red-500")} />
            </div>
            <h3 className="font-semibold">{name}</h3>
          </div>
          <p className="text-orange-500 font-semibold mb-1">₹{price}</p>
          <p className="text-gray-500 text-sm mb-4">Serves {serves}</p>
          {quantity === 0 ? (
            <button
              onClick={handleIncrement}
              className="px-4 py-1 rounded-full bg-orange-500 text-white text-sm font-medium"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-orange-500 text-orange-500"
              >
                -
              </button>
              <span className="text-lg font-medium w-6 text-center">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white"
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className="relative w-56 h-40">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="rounded-lg object-cover" />
          <button
            onClick={onViewAR}
            className="absolute bottom-1 left-1 bg-white/80 backdrop-blur-sm text-orange-500 px-2 py-1 text-xs rounded border border-orange-200 flex items-center gap-1"
          >
            <View className="w-3 h-3" />
            View in AR
          </button>
        </div>
      </div>
    </div>
  )
}

