'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronLeft, Menu, ShoppingCart, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import UserWelcomePanel from "./user-welcome-panel"
import { Button } from "./ui/button"
import { Home, LayoutGrid, Heart, ShoppingBag, Globe, MessageSquare, Info } from "lucide-react"

export default function MobileHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount } = useCart()
  const isHomePage = pathname === '/'
  
  const navLinks = [
    { name: "Home", icon: <Home className="h-5 w-5" />, href: "/" },
    { name: "Categories", icon: <LayoutGrid className="h-5 w-5" />, href: "/products" },
    { name: "Favorites", icon: <Heart className="h-5 w-5" />, href: "/favorites" },
    { name: "My Orders", icon: <ShoppingBag className="h-5 w-5" />, href: "/orders" },
    { name: "Currency", icon: <Globe className="h-5 w-5" />, href: "#" },
    { name: "Contact Us", icon: <MessageSquare className="h-5 w-5" />, href: "/contact" },
    { name: "About", icon: <Info className="h-5 w-5" />, href: "/about" },
  ]

  const footerLinks = [
    { name: "User Agreement", href: "/terms" },
    { name: "Partnership", href: "/partnership" },
    { name: "Privacy Policy", href: "/privacy" },
  ]

  const handleBack = () => {
    router.back()
  }

  const getPageTitle = () => {
    // Extract page title from pathname
    if (pathname === '/') return 'Home'
    if (pathname === '/products') return 'Products'
    if (pathname.startsWith('/product/')) return 'Product Details'
    if (pathname === '/cart') return 'Shopping Cart'
    if (pathname === '/favorites') return 'Favorites'
    if (pathname === '/orders') return 'My Orders'
    if (pathname === '/profile') return 'My Profile'
    if (pathname === '/sign-in') return 'Sign In'
    if (pathname === '/sign-up') return 'Register'
    
    // Extract the last part of the path for other pages
    const parts = pathname.split('/')
    if (parts.length > 1 && parts[parts.length - 1]) {
      return parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1)
    }
    
    return ''
  }

  return (
    <div className="md:hidden container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - conditionally show back button or hamburger menu */}
        <div className="flex items-center">
          {isHomePage ? (
            <>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2">
                    <Menu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0 pb-8 overflow-y-auto">
                  <div className="p-4">
                    <UserWelcomePanel />
                  </div>
                  
                  <div className="mt-6 flex flex-col space-y-1">
                    {navLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="flex items-center gap-3 p-4 hover:bg-gray-100 text-gray-700"
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-auto border-t pt-4 px-4">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {footerLinks.map((link, i) => (
                        <Link key={i} href={link.href} className="hover:text-gray-900">
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center gap-2 ml-2">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xl font-bold">B</span>
                </div>
                <span className="text-blue-500 text-xl font-semibold">Brand</span>
              </Link>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack} 
                className="mr-1"
              >
                <ChevronLeft size={24} />
              </Button>
              <h1 className="text-lg font-medium">{getPageTitle()}</h1>
            </>
          )}
        </div>

        {/* Right side with cart and user */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <User size={24} />
            </Link>
          </SignedOut>
        </div>
      </div>

      {/* Mobile search */}
      <div className="mt-3">
        <form className="relative w-full flex">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none pr-10"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}