import Link from "next/link"
import type { Category } from "@/types"

interface CategorySidebarProps {
  categories: Category[]
}

export default function CategorySidebar({ categories }: CategorySidebarProps) {
  return (
    <div className="w-full md:w-[220px] shrink-0 h-fit">
      <div className="border border-[#dee2e7] rounded-md overflow-hidden">
        <ul key="categories-list">
          {categories.map((category, index) => (
            <li
              key={category.id}
              className={`border-b border-[#dee2e7] ${index === categories.length - 1 ? "border-b-0" : ""}`}
            >
              <Link href={category.href} className="block px-4 py-4 text-sm hover:bg-[#e3f0ff] transition-colors">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

