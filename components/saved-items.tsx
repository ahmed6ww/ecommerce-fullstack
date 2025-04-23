"use client"

import Image from "next/image"
import { Button } from "../components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function SavedItems() {
  const savedItems = [
    {
      id: 1,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$99.50",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$99.50",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$99.50",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$99.50",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <div className="bg-white rounded-md border border-[#dee2e7] p-5 mb-8">
      <h2 className="text-xl font-semibold mb-4">Saved for later</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {savedItems.map((item) => (
          <div key={item.id} className="border border-[#dee2e7] rounded-md p-4">
            <div className="mb-3">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={150}
                height={150}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="mb-3">
              <div className="font-semibold mb-1">{item.price}</div>
              <h3 className="text-sm">{item.name}</h3>
            </div>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Move to cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

