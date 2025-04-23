import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

interface RecommendedProductsProps {
  products: Product[]
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">You may like</h2>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-[#dee2e7] rounded-md p-3 flex gap-3">
            <Link href={`/product/${product.id}`} className="flex gap-3">
              <Image
                src={product.image || "/placeholder.svg?height=80&width=80"}
                alt={product.name}
                width={80}
                height={80}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
                <p className="text-xs text-[#8b96a5] mt-1">{formatPrice(product.price)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

