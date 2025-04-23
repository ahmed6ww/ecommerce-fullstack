import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Related products</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-[#dee2e7] rounded-md p-4">
            <Link href={`/product/${product.id}`} className="block">
              <Image
                src={product.image || "/placeholder.svg?height=150&width=150"}
                alt={product.name}
                width={150}
                height={150}
                className="mx-auto h-[120px] object-contain mb-3"
              />
              <div className="text-center">
                <h3 className="text-sm mb-1">{product.name}</h3>
                <p className="text-sm text-[#8b96a5]">{formatPrice(product.price)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

