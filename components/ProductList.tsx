import { Product } from '@/lib/actions';
import ProductCard from '@/components/ProductCard';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (!products.length) {
    return <div className="text-center py-8">No products found.</div>;
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}