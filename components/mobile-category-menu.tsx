'use client'

import { useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryItem {
  name: string
  href: string
}

export default function MobileCategoryMenu() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  
  // Hardcoded categories matching the desktop categories
  const categories: CategoryItem[] = [
    { name: "All category", href: "/products" },
    { name: "Hot offers", href: "/hot-offers" },
    { name: "Gift boxes", href: "/gift-boxes" },
    { name: "Projects", href: "/projects" },
    { name: "Menu item", href: "/menu-item" },
    { name: "Help", href: "/help" }
  ]
  
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }
  
  return (
    <div className="relative md:hidden border-t border-b border-gray-200 py-2">
      {/* Left arrow navigation button */}
      {showLeftArrow && (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border-gray-200 h-6 w-6"
          onClick={scrollLeft}
        >
          <ChevronLeft size={18} />
        </Button>
      )}
      
      {/* Scrollable container */}
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto no-scrollbar gap-4 px-4"
        onScroll={handleScroll}
      >
        {categories.map((category, index) => (
          <Link 
            key={index} 
            href={category.href}
            className="whitespace-nowrap text-sm font-medium flex-shrink-0"
          >
            {category.name}
          </Link>
        ))}
      </div>
      
      {/* Right arrow navigation button */}
      {showRightArrow && (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border-gray-200 h-6 w-6"
          onClick={scrollRight}
        >
          <ChevronRight size={18} />
        </Button>
      )}
      
      {/* Gradient fades for better UX */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      )}
      {showRightArrow && (
        <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      )}
    </div>
  )
}