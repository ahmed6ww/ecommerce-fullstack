import { Product } from "@/lib/actions"
import ProductCard from "@/components/product-card"

interface ProductsGridProps {
  products: Product[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-3 text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  )
}