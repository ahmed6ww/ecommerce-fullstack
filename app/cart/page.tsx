"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronDown, Minus, Plus, Heart, MessageSquare, ShoppingCart, User, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "@/components/footer"
import SavedItems from "@/components/saved-items"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isCouponApplied, setIsCouponApplied] = useState(false)
  const router = useRouter()

  // Handle coupon application (simple example)
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setDiscount(total * 0.1) // 10% discount
      setIsCouponApplied(true)
    } else if (couponCode.toLowerCase() === "save20") {
      setDiscount(total * 0.2) // 20% discount
      setIsCouponApplied(true)
    } else {
      alert("Invalid coupon code")
      setIsCouponApplied(false)
      setDiscount(0)
    }
  }

  // Calculate tax (example: 5% of total)
  const tax = total * 0.05
  
  // Calculate final total
  const finalTotal = total - discount + tax

  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      updateQuantity(id, newQuantity)
    }
  }

  // Handle checkout
  const handleCheckout = () => {
    // In a real app, this would navigate to the checkout page
    alert("Proceeding to checkout. In a real app, this would navigate to a payment page.")
    // router.push('/checkout')
  }

  // Empty cart message and redirect button
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <main className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto py-12">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => router.push('/products')} className="bg-blue-500 hover:bg-blue-600">
              Start Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">My cart ({items.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-md border border-[#dee2e7] overflow-hidden mb-6">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b border-[#dee2e7]">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain bg-[#f5f5f5]"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/product/${item.id}`} className="hover:text-blue-500">
                              {item.name}
                            </Link>
                          </h3>
                          <div className="text-sm text-[#8b96a5] mt-1">Category: {item.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${item.price.toFixed(2)}</div>
                          <div className="flex items-center mt-2 justify-end">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:bg-gray-100 p-1 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-2 min-w-[30px] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:bg-gray-100 p-1 rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button 
                          className="text-sm text-[#fa3434] flex items-center gap-1 hover:underline"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                        <button className="text-sm text-[#0d6efd] flex items-center gap-1 hover:underline">
                          <Heart className="h-4 w-4" />
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => router.push('/products')}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to shop
              </Button>
              <button 
                className="text-[#fa3434] text-sm flex items-center gap-1 hover:underline"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4" />
                Remove all
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-md border border-[#dee2e7] p-5 mb-6">
              <h2 className="text-lg font-medium mb-4">Have a coupon?</h2>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add coupon" 
                  className="border-[#dee2e7]" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={isCouponApplied}
                />
                <Button
                  variant="outline"
                  className="text-[#0d6efd] border-[#0d6efd] hover:bg-[#0d6efd] hover:text-white"
                  onClick={handleApplyCoupon}
                  disabled={isCouponApplied}
                >
                  Apply
                </Button>
              </div>
              
              {isCouponApplied && (
                <div className="mt-2 text-sm text-green-600">
                  Coupon applied successfully!
                </div>
              )}

              <div className="border-t border-[#dee2e7] my-4 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[#505050]">Subtotal:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[#505050]">Discount:</span>
                  <span className="text-[#fa3434]">- ${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-[#505050]">Tax:</span>
                  <span className="text-[#00b517]">+ ${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <Button 
                  className="w-full mt-4 bg-[#00b517] hover:bg-[#00b517]/90 text-lg py-6"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>

                <div className="flex justify-center gap-2 mt-4">
                  <Image
                    src="/placeholder.svg?height=24&width=40"
                    alt="American Express"
                    width={40}
                    height={24}
                    className="object-contain"
                  />
                  <Image
                    src="/placeholder.svg?height=24&width=40"
                    alt="Mastercard"
                    width={40}
                    height={24}
                    className="object-contain"
                  />
                  <Image
                    src="/placeholder.svg?height=24&width=40"
                    alt="PayPal"
                    width={40}
                    height={24}
                    className="object-contain"
                  />
                  <Image
                    src="/placeholder.svg?height=24&width=40"
                    alt="Visa"
                    width={40}
                    height={24}
                    className="object-contain"
                  />
                  <Image
                    src="/placeholder.svg?height=24&width=40"
                    alt="Apple Pay"
                    width={40}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#f7f7f7] rounded-md p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#dee2e7] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 11H5V21H19V11Z"
                  stroke="#8B96A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9"
                  stroke="#8B96A5"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Secure payment</h3>
              <p className="text-sm text-[#8b96a5]">Protected by encryption</p>
            </div>
          </div>

          <div className="bg-[#f7f7f7] rounded-md p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#dee2e7] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                  stroke="#8B96A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Customer support</h3>
              <p className="text-sm text-[#8b96a5]">24/7 dedicated help</p>
            </div>
          </div>

          <div className="bg-[#f7f7f7] rounded-md p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#dee2e7] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#8B96A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M2 12H22" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
                  stroke="#8B96A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Free delivery</h3>
              <p className="text-sm text-[#8b96a5]">On orders over $100</p>
            </div>
          </div>
        </div>

        {/* Saved Items */}
        <SavedItems />

        {/* Discount Banner */}
        <div className="bg-[#005ade] text-white rounded-md p-6 mb-8 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold mb-1">Super discount on more than 100 USD</h3>
            <p className="text-sm opacity-80">Get special pricing and free shipping on bulk orders</p>
          </div>
          <Button className="bg-[#ff9017] hover:bg-[#ff9017]/90" onClick={() => router.push('/products')}>
            Shop now
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

