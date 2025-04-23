import Image from "next/image"
import Link from "next/link"
import {
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  MessageSquare,
  Search,
  ShoppingCart,
  Star,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductGallery from "@/components/product-gallery"
import RelatedProducts from "@/components/related-products"
import RecommendedProducts from "@/components/recommended-products"
import Footer from "@/components/footer"

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-[#dee2e7]">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
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
              <span className="text-xs">Profile</span>
            </Link>
            <Link href="#" className="flex flex-col items-center text-[#8b96a5]">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Message</span>
            </Link>
            <Link href="#" className="flex flex-col items-center text-[#8b96a5]">
              <Heart className="h-5 w-5" />
              <span className="text-xs">Orders</span>
            </Link>
            <Link href="#" className="flex flex-col items-center text-[#8b96a5]">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs">My cart</span>
            </Link>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="border-t border-[#dee2e7] bg-white">
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 text-sm text-[#8b96a5] mb-4">
          <Link href="/" className="hover:text-[#0d6efd]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/clothing" className="hover:text-[#0d6efd]">
            Clothing
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/clothing/mens-wear" className="hover:text-[#0d6efd]">
            Men's wear
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#505050]">Summer clothing</span>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-md border border-[#dee2e7] p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Gallery */}
            <div>
              <ProductGallery images={[]} />
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#00b517] text-white text-xs px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  <span>In stock</span>
                </div>
              </div>

              <h1 className="text-xl font-medium mb-3">Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle</h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#ff9017] text-[#ff9017]" />
                  ))}
                  <Star className="h-4 w-4 fill-[#dee2e7] text-[#dee2e7]" />
                </div>
                <span className="text-[#ff9017] text-sm">4.3</span>
                <div className="text-sm text-[#8b96a5] flex items-center gap-2">
                  <span>32 reviews</span>
                  <span className="h-1 w-1 bg-[#8b96a5] rounded-full"></span>
                  <span>154 sold</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="border border-[#dee2e7] rounded-md p-3 text-center">
                  <div className="text-lg font-semibold text-[#fa3434]">$98.00</div>
                  <div className="text-xs text-[#8b96a5]">50-100 pcs</div>
                </div>
                <div className="border border-[#dee2e7] rounded-md p-3 text-center">
                  <div className="text-lg font-semibold">$90.00</div>
                  <div className="text-xs text-[#8b96a5]">100-700 pcs</div>
                </div>
                <div className="border border-[#dee2e7] rounded-md p-3 text-center">
                  <div className="text-lg font-semibold">$78.00</div>
                  <div className="text-xs text-[#8b96a5]">700+ pcs</div>
                </div>
              </div>

              <div className="space-y-3 border-t border-[#dee2e7] pt-4">
                <div className="flex">
                  <div className="w-28 text-[#8b96a5] text-sm">Price:</div>
                  <div className="text-sm">Negotiable</div>
                </div>
                <div className="flex">
                  <div className="w-28 text-[#8b96a5] text-sm">Type:</div>
                  <div className="text-sm">Classic shoes</div>
                </div>
                <div className="flex">
                  <div className="w-28 text-[#8b96a5] text-sm">Material:</div>
                  <div className="text-sm">Plastic material</div>
                </div>
                <div className="flex">
                  <div className="w-28 text-[#8b96a5] text-sm">Design:</div>
                  <div className="text-sm">Modern nice</div>
                </div>
                <div className="flex">
                  <div className="w-28 text-[#8b96a5] text-sm">Customization:</div>
                  <div className="text-sm">Customized logo and design custom packages</div>
                </div>
                <div className="flex">
                  <div className="w-28 text-[#8b96a5] text-sm">Protection:</div>
                  <div className="text-sm">Refund Policy</div>
                </div>
                <div className="flex">
                  <div className="w-28 text-[#8b96a5] text-sm">Warranty:</div>
                  <div className="text-sm">2 years full warranty</div>
                </div>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="border-l border-[#dee2e7] pl-6 hidden lg:block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#c6f3f1] rounded-md flex items-center justify-center text-[#4ca7a7] font-semibold">
                  R
                </div>
                <div>
                  <div className="text-sm text-[#8b96a5]">Supplier</div>
                  <div className="font-medium">Guanjoi Trading LLC</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg?height=20&width=30"
                    alt="Germany"
                    width={30}
                    height={20}
                    className="rounded-sm"
                  />
                  <span className="text-sm">Germany, Berlin</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00b517] flex items-center justify-center text-white">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm">Verified Seller</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#8b96a5]/20 flex items-center justify-center text-[#8b96a5]">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm">Worldwide shipping</span>
                </div>
              </div>

              <Button className="w-full bg-[#0d6efd] hover:bg-[#0d6efd]/90 mb-2">Send inquiry</Button>
              <Button variant="outline" className="w-full">
                Seller's profile
              </Button>

              <div className="mt-4 flex justify-center">
                <Button variant="ghost" className="text-[#0d6efd] flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  <span>Save for later</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Tabs */}
        <div className="bg-white rounded-md border border-[#dee2e7] mb-6">
          <Tabs defaultValue="description">
            <TabsList className="border-b border-[#dee2e7] w-full justify-start rounded-none h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0d6efd] data-[state=active]:shadow-none px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0d6efd] data-[state=active]:shadow-none px-6 py-3"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0d6efd] data-[state=active]:shadow-none px-6 py-3"
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0d6efd] data-[state=active]:shadow-none px-6 py-3"
              >
                About seller
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-5">
              <div className="text-sm text-[#505050] leading-relaxed mb-6">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
                <p>
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-[#dee2e7]">
                      <td className="py-2 text-[#8b96a5]">Model</td>
                      <td className="py-2">#8786867</td>
                    </tr>
                    <tr className="border-b border-[#dee2e7]">
                      <td className="py-2 text-[#8b96a5]">Style</td>
                      <td className="py-2">Classic style</td>
                    </tr>
                    <tr className="border-b border-[#dee2e7]">
                      <td className="py-2 text-[#8b96a5]">Certificate</td>
                      <td className="py-2">ISO-898921212</td>
                    </tr>
                    <tr className="border-b border-[#dee2e7]">
                      <td className="py-2 text-[#8b96a5]">Size</td>
                      <td className="py-2">34mm x 450mm x 19mm</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#8b96a5]">Memory</td>
                      <td className="py-2">36GB RAM</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#00b517] mt-0.5" />
                  <span>Some great feature name here</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#00b517] mt-0.5" />
                  <span>Lorem ipsum dolor sit amet, consectetur</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#00b517] mt-0.5" />
                  <span>Duis aute irure dolor in reprehenderit</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#00b517] mt-0.5" />
                  <span>Some great feature name here</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-5">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Product Reviews</h3>
                <p className="text-[#8b96a5]">No reviews yet. Be the first to review this product.</p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="p-5">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                <p className="text-[#8b96a5]">Shipping details will be displayed here.</p>
              </div>
            </TabsContent>
            <TabsContent value="about" className="p-5">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">About Seller</h3>
                <p className="text-[#8b96a5]">Seller information will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-3">
            <RelatedProducts products={[


            ]} />
          </div>
          <div>
            <RecommendedProducts products={[]} />
          </div>
        </div>

        {/* Discount Banner */}
        <div className="bg-[#005ade] text-white rounded-md p-6 mb-8 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold mb-1">Super discount on more than 100 USD</h3>
            <p className="text-sm opacity-80">Have you ever finally just write dummy info</p>
          </div>
          <Button className="bg-[#ff9017] hover:bg-[#ff9017]/90">Shop now</Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

