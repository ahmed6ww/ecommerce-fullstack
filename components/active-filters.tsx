interface Filter {
    id: number
    name: string
  }
  
  interface ActiveFiltersProps {
    filters: Filter[]
    onClearFilter?: (id: number) => void
    onClearAll?: () => void
  }
  
  export default function ActiveFilters({ 
    filters, 
    onClearFilter = () => {}, 
    onClearAll = () => {} 
  }: ActiveFiltersProps) {
    if (filters.length === 0) return null
    
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center gap-1 bg-white border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            {filter.name}
            <button 
              className="text-blue-500"
              onClick={() => onClearFilter(filter.id)}
            >
              ×
            </button>
          </div>
        ))}
        {filters.length > 0 && (
          <button 
            className="text-blue-500 text-sm"
            onClick={onClearAll}
          >
            Clear all filter
          </button>
        )}
      </div>
    )
  }