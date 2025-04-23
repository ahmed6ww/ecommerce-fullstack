import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage?: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (items: number) => void
}

export default function Pagination({ 
  totalItems, 
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange = () => {},
  onItemsPerPageChange = () => {}
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5)
  
  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex items-center gap-2">
        <span className="text-sm">Show</span>
        <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1">
          <span className="text-sm">{itemsPerPage}</span>
          <ChevronDown size={16} />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
        
        {pages.map(page => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        
        <button
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}