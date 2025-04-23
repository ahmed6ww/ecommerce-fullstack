"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, MessageSquare, Heart, ShoppingCart, ChevronDown, Menu, Search, X, Loader2, Settings, LogOut } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { syncUserWithDb } from "@/lib/user-actions"
import MobileHeader from "./mobile-header"

// Separate component for parts that use useSearchParams
function SearchForm() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize search query from URL parameters when the component mounts
  useEffect(() => {
    if (!searchParams) return;
    
    try {
      // Safely check if searchParams exists and has a get method
      if (searchParams && typeof searchParams.get === 'function') {
        const queryParam = searchParams.get('query')
        if (queryParam) {
          setQuery(queryParam)
        }
      }
    } catch (error) {
      console.error("Error accessing search params:", error)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    // Navigate to products page with search query
    router.push(`/products?query=${encodeURIComponent(query.trim())}`)
  }

  const clearSearch = () => {
    setQuery('')
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none pr-10"
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-[120px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
      <div className="border border-l-0 border-gray-300 px-3 flex items-center">
        <span className="text-gray-500 text-sm mr-1">All category</span>
        <ChevronDown size={16} className="text-gray-500" />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md flex items-center justify-center min-w-[100px]"
        disabled={isSearching}
      >
        {isSearching ? 
          <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 
          <Search size={16} className="mr-1" />
        }
        Search
      </button>
    </form>
  )
}

export default function Header() {
  const [categoryOpen, setCategoryOpen] = useState(false)
  const { itemCount } = useCart() // Get cart item count from context
  const { isLoaded, user } = useUser()
  
  // Sync user with database when signed in
  useEffect(() => {
    if (isLoaded && user) {
      syncUserWithDb();
    }
  }, [isLoaded, user]);

  return (
    <header className="w-full">
      {/* Mobile header with context-aware navigation */}
      <MobileHeader />

      {/* Desktop header */}
      <div className="hidden md:block">
        {/* Top header with search and icons */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="text-white text-xl font-bold">B</span>
            </div>
            <span className="text-blue-500 text-xl font-semibold">Brand</span>
          </Link>

          <div className="flex flex-1 max-w-xl mx-8">
            <Suspense fallback={
              <div className="relative w-full flex">
                <div className="w-full border border-gray-300 rounded-l-md py-2 px-4 bg-gray-50">
                  Loading search...
                </div>
                <div className="border border-l-0 border-gray-300 px-3 flex items-center">
                  <span className="text-gray-500 text-sm mr-1">All category</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                <div className="bg-blue-400 text-white px-4 py-2 rounded-r-md flex items-center justify-center min-w-[100px]">
                  <Search size={16} className="mr-1" />
                  Search
                </div>
              </div>
            }>
              <SearchForm />
            </Suspense>
          </div>

          <div className="flex items-center gap-5">
            <SignedIn>
              <div className="flex flex-col items-center text-xs text-gray-500">
                <UserButton afterSignOutUrl="/" />
                <span className="mt-1">Account</span>
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="flex flex-col items-center text-xs text-gray-500">
                <User size={20} className="mb-1" />
                <span>Sign In</span>
              </Link>
            </SignedOut>
            
            <Link href="/messages" className="flex flex-col items-center text-xs text-gray-500">
              <MessageSquare size={20} className="mb-1" />
              <span>Message</span>
            </Link>
            <Link href="/orders" className="flex flex-col items-center text-xs text-gray-500">
              <Heart size={20} className="mb-1" />
              <span>Orders</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center text-xs text-gray-500 relative">
              <div className="relative">
                <ShoppingCart size={20} className="mb-1" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span>My cart</span>
            </Link>
            <SignedIn>
              <Link href="/admin" className="flex flex-col items-center text-xs text-gray-500">
                <Settings size={20} className="mb-1" />
                <span>Admin</span>
              </Link>
            </SignedIn>
          </div>
        </div>

        {/* Secondary navigation - Desktop only */}
        <div className="border-t border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                className="flex items-center gap-2 text-sm font-medium"
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <Menu size={18} />
                <span>All category</span>
              </button>
              <Link href="/hot-offers" className="text-sm font-medium">
                Hot offers
              </Link>
              <Link href="/gift-boxes" className="text-sm font-medium">
                Gift boxes
              </Link>
              <Link href="/projects" className="text-sm font-medium">
                Projects
              </Link>
              <Link href="/menu-item" className="text-sm font-medium">
                Menu item
              </Link>
              <div className="flex items-center gap-1">
                <Link href="/help" className="text-sm font-medium">
                  Help
                </Link>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-sm">English, USD</span>
                <ChevronDown size={16} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">Ship to</span>
                <Image src="/placeholder.svg?height=20&width=28" alt="Flag" width={28} height={20} />
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
