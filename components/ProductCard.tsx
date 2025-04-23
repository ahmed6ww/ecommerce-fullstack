import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/actions';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-md border border-[#dee2e7] p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-[180px] h-[180px] shrink-0">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={180}
            height={180}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-sm ${product.stock > 0 ? 'text-[#00B517]' : 'text-red-500'}`}>
                  {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
                </span>
                <span className="text-[#8b96a5] text-sm">Category: {product.category}</span>
              </div>
              <p className="text-sm text-[#505050] mb-3">{product.description.length > 100 
                ? product.description.substring(0, 100) + '...' 
                : product.description}</p>
              <Link href={`/product/${product.id}`} className="text-[#0d6efd] text-sm">
                View details
              </Link>
            </div>
            <div className="mt-3 md:mt-0">
              <button className="text-[#0d6efd]">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}