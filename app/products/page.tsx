import { ChevronDown, ChevronRight, ChevronLeft, Grid, List } from "lucide-react"
import { getProducts } from "@/lib/actions" // Import the server action
import ProductCard from "@/components/product-card"
import FilterSidebar from "@/components/filter-sidebar"
import Breadcrumb from "@/components/ui/breadcrumb"
import NewsletterSection from "@/components/newsletter-section"
import SearchComponent from "@/components/search-component"
import Link from "next/link"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
  };
}) {
  // Extract search parameters
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
  const category = params?.category || '';
  
  // Fetch products with search term and category filter
  const products = await getProducts({
    search: query,
    category: category || undefined,
    page: currentPage,
    limit: 12
  });
  
  // Get total count for pagination
  const totalCount = products.length;
  const totalPages = Math.ceil(totalCount / 12);

  // Helper function to generate pagination URLs
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();
    
    if (query) params.set('query', query);
    if (category) params.set('category', category);
    params.set('page', pageNumber.toString());
    
    return `/products?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
        ]}
      />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Keep the sidebar UI for visual consistency */}
        <FilterSidebar />

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-lg font-medium">
              {totalCount} items {query && <span className="font-semibold">matching "{query}"</span>}
            </h1>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* Search component */}
              <div className="w-full md:w-auto">
                <SearchComponent />
              </div>

              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm">Featured</span>
                <ChevronDown size={16} />
              </div>

              <div className="hidden md:flex items-center gap-2">
                <button className="p-1 bg-blue-500 rounded">
                  <Grid size={16} className="text-white" />
                </button>
                <button className="p-1 bg-gray-200 rounded">
                  <List size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Show search term as a filter badge */}
          {query && (
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-md px-2 py-1 text-sm">
                Search: {query}
                <Link href="/products" className="text-blue-500 ml-1">
                  ×
                </Link>
              </div>
            </div>
          )}

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8">
              <div className="flex items-center gap-2">
                <span className="text-sm">Show</span>
                <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1">
                  <span className="text-sm">12</span>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="flex items-center gap-1">
                {currentPage > 1 && (
                  <Link href={createPageURL(currentPage - 1)} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
                    <ChevronLeft size={16} />
                  </Link>
                )}
                
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Link
                      key={pageNumber}
                      href={createPageURL(pageNumber)}
                      className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded ${
                        currentPage === pageNumber ? 'bg-blue-500 text-white' : ''
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}
                
                {currentPage < totalPages && (
                  <Link href={createPageURL(currentPage + 1)} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
                    <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <NewsletterSection/>
    </div>
  )
}