'use client'

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

// Separate client component that uses useSearchParams
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
      <Input
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

// Main component with Suspense boundary
export default function SearchComponent() {
  return (
    <Suspense fallback={
      <div className="relative w-full flex">
        <Input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none"
          disabled
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md flex items-center justify-center min-w-[100px]"
          disabled
        >
          <Search size={16} className="mr-1" />
          Search
        </button>
      </div>
    }>
      <SearchForm />
    </Suspense>
  )
}