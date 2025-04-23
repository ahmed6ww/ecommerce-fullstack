'use client'

import Link from 'next/link'

interface SearchSuggestionProps {
  originalQuery: string;
  suggestedQuery: string;
}

export default function SearchSuggestion({ originalQuery, suggestedQuery }: SearchSuggestionProps) {
  if (!suggestedQuery || originalQuery.toLowerCase() === suggestedQuery.toLowerCase()) {
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
      <p className="text-sm text-gray-700">
        Did you mean:{' '}
        <Link
          href={`/products?query=${encodeURIComponent(suggestedQuery)}`}
          className="text-blue-600 font-medium hover:underline"
        >
          {suggestedQuery}
        </Link>
        ?
      </p>
    </div>
  )
}