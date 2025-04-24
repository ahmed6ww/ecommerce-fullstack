import Link from "next/link"
import type { Category } from "@/types"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

interface CategorySidebarProps {
  categories: Category[]
}

export default function CategorySidebar({ categories }: CategorySidebarProps) {
  // Number of categories to show by default (rest will be accessible via "More category")
  const visibleCategoriesCount = 8;
  
  // Ensure all required categories are displayed (even if not present in fetched categories)
  const requiredCategories = [
    { id: 'Automobiles', name: 'Automobiles', href: '/products?category=Automobiles' },
    { id: 'Clothes and wear', name: 'Clothes and wear', href: '/products?category=Clothes%20and%20wear' },
    { id: 'Home interiors', name: 'Home interiors', href: '/products?category=Home%20interiors' },
    { id: 'Computer and tech', name: 'Computer and tech', href: '/products?category=Computer%20and%20tech' },
    { id: 'Tools, equipment', name: 'Tools, equipment', href: '/products?category=Tools%2C%20equipment' },
    { id: 'Sports and outdoor', name: 'Sports and outdoor', href: '/products?category=Sports%20and%20outdoor' },
    { id: 'Animal and pets', name: 'Animal and pets', href: '/products?category=Animal%20and%20pets' },
    { id: 'Machinery tools', name: 'Machinery tools', href: '/products?category=Machinery%20tools' },
    { id: 'Electronics', name: 'Electronics', href: '/products?category=Electronics' },
    { id: 'Home & Garden', name: 'Home & Garden', href: '/products?category=Home%20%26%20Garden' },
    { id: 'Kitchen', name: 'Kitchen', href: '/products?category=Kitchen' },
  ]

  // Add any categories from the database that might not be in required list
  const existingCategoryIds = requiredCategories.map(cat => cat.id);
  const mergedCategories = [
    ...requiredCategories,
    ...categories.filter(category => !existingCategoryIds.includes(category.id))
  ];

  // Separate visible and hidden categories
  const visibleCategories = mergedCategories.slice(0, visibleCategoriesCount);
  const hiddenCategories = mergedCategories.slice(visibleCategoriesCount);

  return (
    <div className="hidden md:block w-full md:w-[220px] shrink-0 h-fit">
      <div className="border border-[#dee2e7] rounded-md overflow-hidden">
        <ul key="categories-list" className="py-0.5">
          {visibleCategories.map((category, index) => (
            <li
              key={category.id}
              className="border-b border-[#f3f4f5]"
            >
              <Link href={category.href} className="flex items-center justify-between px-4 py-1.5 text-sm hover:bg-[#e3f0ff] transition-colors">
                <span>{category.name}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </li>
          ))}
          <li className="border-b-0">
            <Link href="/products" className="flex items-center justify-between px-4 py-1.5 text-sm hover:bg-[#e3f0ff] transition-colors text-[#0d6efd]">
              <span>More categories</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

