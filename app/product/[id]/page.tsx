import { notFound } from "next/navigation"
import { getProductById, getRelatedProducts } from "@/lib/actions"
import ProductDetail from "@/components/product-detail"

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    // Convert the ID from string to number since your getProductById expects a number
    const productId = Number(params.id)
    
    // Check if the ID is a valid number
    if (isNaN(productId)) {
      return notFound()
    }
    
    // Fetch the product data server-side
    const product = await getProductById(productId)
    
    // If no product is found, show the 404
    if (!product) {
      return notFound()
    }
    
    // Fetch related products if the product has a category
    const relatedProducts = product.category 
      ? await getRelatedProducts(product.category) 
      : []
    
    // Pass the data to the client component
    return <ProductDetail product={product} relatedProducts={relatedProducts} />
  } catch (error) {
    console.error("Error loading product:", error)
    return notFound()
  }
}

