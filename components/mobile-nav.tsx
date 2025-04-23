'use client'

import Image from "next/image"
import Link from "next/link"
import { Home, LayoutGrid, Heart, ShoppingBag, Globe, MessageSquare, Info, FileText, Settings } from "lucide-react"
import { ShoppingCart, User } from "lucide-react"
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import UserWelcomePanel from "./user-welcome-panel"

export default function MobileNav({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

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

  return (
    <nav className="block md:hidden">
      <div className="flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <span className="sr-only">Open menu</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0 pb-8">
            <div className="p-4">
              <UserWelcomePanel />
            </div>
            
            <div className="mt-6 flex flex-col space-y-1 overflow-auto">
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

        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xl font-bold">B</span>
          </div>
          <span className="text-blue-500 text-xl font-semibold">Brand</span>
        </Link>
      </div>
    </nav>
  )
}