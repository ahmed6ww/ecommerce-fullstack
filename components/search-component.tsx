'use client'

import { useState, useEffect } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchComponent() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isClientSide, setIsClientSide] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // First check if we're on the client
  useEffect(() => {
    setIsClientSide(true)
  }, [])
  
  // Then safely access search params only when on client
  useEffect(() => {
    if (isClientSide && searchParams) {
      try {
        const queryParam = searchParams.get('query')
        if (queryParam) {
          setQuery(queryParam)
        }
      } catch (error) {
        console.error("Error accessing search params:", error)
        setQuery('')
      }
    }
  }, [isClientSide, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    router.push(`/products?query=${encodeURIComponent(query.trim())}`)
  }

  const clearSearch = () => {
    setQuery('')
  }

  return (
    <div className="relative w-full max-w-[500px]">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full border-[#dee2e7] rounded-l-md pr-10 focus-visible:ring-[#0d6efd] focus-visible:ring-offset-0"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-[70px] text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
          <Button 
            type="submit"
            className="rounded-l-none bg-[#0d6efd] hover:bg-[#0d6efd]/90"
            disabled={isSearching}
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span className="ml-1">Search</span>
          </Button>
        </div>
      </form>
    </div>
  )
}