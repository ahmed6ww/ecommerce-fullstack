// components/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/actions";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-[#dee2e7] rounded-md p-3 hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`} className="block">
        <Image
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          className="object-contain mx-auto mb-3 h-[150px]"
        />
        <div>
          <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
          <p className="text-sm text-[#606060] line-clamp-2">{product.name}</p>
        </div>
      </Link>
    </div>
  )
}