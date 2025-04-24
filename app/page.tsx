import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Heart, Menu, MessageSquare, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CategorySidebar from "@/components/category-sidebar"
import ProductCard from "@/components/product-card"
import SupplierRegions from "@/components/supplier-regions"
import ExtraServices from "@/components/extra-services"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"
import { getProducts, getCategories } from "@/lib/actions"
import UserWelcomePanel from "@/components/user-welcome-panel"

export default async function Home() {
  // Fetch all products data using server actions
  const allProducts = await getProducts()
  
  // Fetch category data for the sidebar
  const categoriesData = await getCategories()
  
  // Format categories for the sidebar - convert string array to objects with id and name
  const categories = categoriesData.map(categoryName => ({
    id: categoryName,
    name: categoryName,
    href: `/products?category=${encodeURIComponent(categoryName)}`
  }))
  
  // Filter products by category
  const electronicsProducts = allProducts.filter(product => 
    product.category === 'Electronics' || product.category === 'Consumer electronics'
  ).slice(0, 10)
  
  const homeProducts = allProducts.filter(product => 
    product.category === 'Home' || product.category === 'Home & Garden' || 
    product.category === 'Kitchen'
  ).slice(0, 10)
  
  // Use some products for the deals and offers section
  const dealsProducts = allProducts
    .filter(product => product.price < 50) // Just an example - products under $50
    .slice(0, 5)
  
  // Recommended items can be all products or a random selection
  const recommendedProducts = allProducts.slice(0, 10)

  return (
    <div className="min-h-screen bg-[#ffffff]">
     
      <header className="border-b border-[#dee2e7]">
        {/* Header content commented out */}
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Layout with sidebar on left and main content on right */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          {/* Category Sidebar - fixed width column */}
          <div className="md:col-span-1 ">
            <CategorySidebar categories={categories} />
          </div>

          {/* Main Content - takes all remaining width */}
          <div className="md:col-span-1 ">
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/hero-banner.png"
                    alt="Hero Banner"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 p-6 flex items-center h-full">
                  <div className="flex-1">
                    <p className="text-sm md:text-3xl mb-1">Latest trending</p>
                    <h2 className=" md:text-4xl font-bold mb-2">Electronic items</h2>
                    <Button variant="outline" className="bg-white  text-sm">
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <UserWelcomePanel />
              </div>
            </div>

            {/* Deals and Offers */}
            <div className="mb-8 w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Deals and offers</h2>
                <Link href="/products?category=deals" className="text-[#0d6efd] text-sm">
                  See all
                </Link>
              </div>
              <p className="text-sm text-[#8b96a5] mb-3">Hygiene equipments</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {dealsProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="flex flex-col items-center border border-[#dee2e7] rounded-md p-4 hover:shadow-md transition-all">
                    <Image
                      src={product.image || "/placeholder.svg?height=100&width=100"}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="object-contain mb-2"
                    />
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-[#eb001b] font-semibold mt-1">-25%</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Home and Outdoor */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Home and outdoor</h2>
                <Link href="/products?category=Home" className="text-[#0d6efd] text-sm">
                  Source now
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 border border-[#dee2e7] rounded-md overflow-hidden">
                <div className="relative p-6 flex flex-col justify-between bg-[#ffe8ba]/50 h-full">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Home and outdoor</h3>
                    <Link href="/products?category=Home">
                      <Button variant="outline" className="text-xs mt-2">
                        Source now
                      </Button>
                    </Link>
                  </div>
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Home and outdoor"
                    width={150}
                    height={150}
                    className="object-contain self-end"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 md:col-span-4">
                  {homeProducts.slice(0, 8).map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="border-t border-l border-[#dee2e7] p-4 hover:bg-gray-50 transition-colors">
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-[#8b96a5] mb-2">From USD {product.price.toFixed(2)}</p>
                      <Image
                        src={product.image || "/placeholder.svg?height=80&width=80"}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Consumer Electronics */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Consumer electronics and gadgets</h2>
                <Link href="/products?category=Electronics" className="text-[#0d6efd] text-sm">
                  Source now
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 border border-[#dee2e7] rounded-md overflow-hidden">
                <div className="relative p-6 flex flex-col justify-between bg-[#ffa7a7]/20 h-full">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Consumer electronics and gadgets</h3>
                    <Link href="/products?category=Electronics">
                      <Button variant="outline" className="text-xs mt-2">
                        Source now
                      </Button>
                    </Link>
                  </div>
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Electronics"
                    width={150}
                    height={150}
                    className="object-contain self-end"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 md:col-span-4">
                  {electronicsProducts.slice(0, 8).map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="border-t border-l border-[#dee2e7] p-4 hover:bg-gray-50 transition-colors">
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-[#8b96a5] mb-2">From USD {product.price.toFixed(2)}</p>
                      <Image
                        src={product.image || "/placeholder.svg?height=80&width=80"}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Supplier Request Section */}
            <div className="bg-[#0d6efd] rounded-md p-6 mb-8 text-white grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">An easy way to send requests to all suppliers</h2>
                <p className="text-sm opacity-80 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>

              <div className="bg-white p-4 rounded-md text-black">
                <h3 className="text-lg font-medium mb-4">Send quote to suppliers</h3>
                <div className="space-y-4">
                  <Input placeholder="What item you need?" className="border-[#dee2e7]" />
                  <textarea
                    placeholder="Type more details"
                    className="w-full border border-[#dee2e7] rounded-md p-2 text-sm h-24 resize-none focus:outline-none focus:ring-1 focus:ring-[#0d6efd]"
                  />

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-[#8b96a5] block mb-1">Quantity</label>
                      <Input placeholder="100" className="border-[#dee2e7]" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-[#8b96a5] block mb-1">Pcs</label>
                      <select className="w-full border border-[#dee2e7] rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0d6efd]">
                        <option>Pcs</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full bg-[#0d6efd] hover:bg-[#0d6efd]/90">Send inquiry</Button>
                </div>
              </div>
            </div>

            {/* Recommended Items */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Recommended items</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Extra Services */}
            <ExtraServices />

            {/* Suppliers by Region */}
            <SupplierRegions />

            {/* Newsletter */}
            <NewsletterSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

