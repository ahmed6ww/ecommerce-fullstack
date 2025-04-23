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

export default async function Home() {
  // Fetch all products data using server actions
  const allProducts = await getProducts()
  
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
        {/* <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5">
              <div className="bg-[#0d6efd] text-white font-bold w-8 h-8 flex items-center justify-center rounded">
                A
              </div>
              <span className="text-[#0d6efd] font-medium">Brand</span>
            </Link>

            <div className="hidden md:flex items-center">
              <div className="relative flex items-center">
                <Input
                  placeholder="Search"
                  className="w-[300px] border-[#dee2e7] rounded-l-md focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="border border-l-0 border-[#dee2e7] px-3 py-2 flex items-center gap-1 bg-white">
                  <span className="text-sm text-[#8b96a5]">All category</span>
                  <ChevronDown className="h-4 w-4 text-[#8b96a5]" />
                </div>
                <Button className="rounded-l-none bg-[#0d6efd] hover:bg-[#0d6efd]/90">
                  <Search className="h-4 w-4" />
                  <span className="ml-1">Search</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="flex flex-col items-center text-[#8b96a5]">
              <User className="h-5 w-5" />
              <span className="text-xs hidden md:block">Profile</span>
            </Link>
            <Link href="#" className="flex flex-col items-center text-[#8b96a5]">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs hidden md:block">Message</span>
            </Link>
            <Link href="#" className="flex flex-col items-center text-[#8b96a5]">
              <Heart className="h-5 w-5" />
              <span className="text-xs hidden md:block">Orders</span>
            </Link>
            <Link href="./cart" className="flex flex-col items-center text-[#8b96a5]">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs hidden md:block">Cart</span>
            </Link>
          </div>
        </div> */}

        {/* Secondary Navigation */}
        {/* <div className="border-t border-[#dee2e7] bg-white">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm">
                <Menu className="h-5 w-5" />
                <span>All category</span>
              </button>
              <Link href="#" className="text-sm hidden md:block">
                Hot offers
              </Link>
              <Link href="#" className="text-sm hidden md:block">
                Gift boxes
              </Link>
              <Link href="#" className="text-sm hidden md:block">
                Projects
              </Link>
              <Link href="#" className="text-sm hidden md:block">
                Menu item
              </Link>
              <div className="flex items-center gap-1 text-sm">
                <span>Help</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm">
                <span>English, USD</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>Ship to</span>
                <Image
                  src="/placeholder.svg?height=20&width=20"
                  alt="Flag"
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div> */}
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Sidebar */}
          {/* <CategorySidebar categories={categories} /> */}

          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2 bg-[#e3f0ff] rounded-md p-6 flex items-center">
                <div className="flex-1">
                  <p className="text-sm mb-1">Latest trending</p>
                  <h2 className="text-xl font-bold mb-2">Electronic items</h2>
                  <Button variant="outline" className="bg-white text-sm">
                    Learn more
                  </Button>
                </div>
                <div className="hidden md:block">
                  <Image
                    src="./hero-banner.png"
                    alt="Electronics"
                    width={200}
                    height={200}
                    className="object-contain w-[0rem]"
                  />
                </div>
              </div>

              <div className="bg-white rounded-md border border-[#dee2e7] p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm">Hi, user</p>
                    <p className="text-xs text-[#8b96a5]">let's get started</p>
                  </div>
                </div>
                <Button className="w-full bg-[#0d6efd] hover:bg-[#0d6efd]/90 text-sm">Join now</Button>
                <Button variant="outline" className="w-full text-sm">
                  Log in
                </Button>

                <div className="mt-2 p-3 bg-[#f38332]/20 rounded-md">
                  <p className="text-sm font-medium">Get US $10 off</p>
                  <p className="text-xs text-[#8b96a5]">with a new supplier</p>
                </div>

                <div className="p-3 bg-[#55bdc3]/20 rounded-md">
                  <p className="text-sm font-medium">Send quotes with</p>
                  <p className="text-xs text-[#8b96a5]">supplier preferences</p>
                </div>
              </div>
            </div>

            {/* Deals and Offers */}
            <div className="mb-8">
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

