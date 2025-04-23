// lib/actions.ts
import { db } from "@/db/index";
import { products } from "@/db/schema";
import { eq, and, ne, sql, gte, lte, inArray, like, or } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

export type Product = InferSelectModel<typeof products>;

// Filter options interface
export interface FilterOptions {
  category?: string | null;
  brands?: string[] | null;
  priceMin?: number | null;
  priceMax?: number | null;
  rating?: number | null;
  search?: string | null;
  page?: number;
  limit?: number;
}

// Helper function to generate fuzzy search conditions with trigram similarity
function generateFuzzySearchConditions(searchText: string) {
  const words = searchText.split(/\s+/).filter(w => w.length > 0);
  
  // Generate both exact and fuzzy search conditions
  return words.map(word => 
    or(
      // Exact matches (higher priority)
      sql`LOWER(${products.name}) LIKE ${`%${word}%`}`,
      sql`LOWER(${products.description}) LIKE ${`%${word}%`}`,
      
      // Fuzzy matches using trigram similarity (for typo tolerance)
      // Lower threshold (0.2 instead of 0.3) for more aggressive typo tolerance
      sql`similarity(LOWER(${products.name}), ${word}) > 0.2`,
      sql`similarity(LOWER(${products.description}), ${word}) > 0.2`,
      
      // Word boundary matches with trigram similarity
      sql`similarity(LOWER(${products.name}), ${` ${word} `}) > 0.2`,
      sql`similarity(LOWER(${products.description}), ${` ${word} `}) > 0.2`,
      
      // Metaphone matching for phonetic similarity (words that sound alike)
      sql`metaphone(LOWER(${products.name}), 6) = metaphone(${word}, 6)`,
      sql`metaphone(LOWER(${products.description}), 6) = metaphone(${word}, 6)`,
      
      // Levenshtein distance for edit-distance based matching
      sql`levenshtein(LOWER(${products.name}), ${word}) <= 2`,
      sql`levenshtein(LOWER(${products.description}), ${word}) <= 2`
    )
  );
}

export async function getProducts(filters?: FilterOptions): Promise<Product[]> {
  // Default pagination values
  const page = filters?.page || 1;
  const limit = filters?.limit || 12;
  const offset = (page - 1) * limit;

  // Build conditions array for filtering
  const conditions = [];
  
  // Category filter
  if (filters?.category) {
    conditions.push(eq(products.category, filters.category));
  }
  
  // Brands filter (multiple selection)
 
  
  // Price range filter
  if (filters?.priceMin !== null && filters?.priceMin !== undefined) {
    conditions.push(gte(products.price, filters.priceMin));
  }
  
  if (filters?.priceMax !== null && filters?.priceMax !== undefined) {
    conditions.push(lte(products.price, filters.priceMax));
  }
  
  // Rating filter (products with rating >= selected value)

  
  // Search term with enhanced typo tolerance
  if (filters?.search && filters.search.trim()) {
    const searchText = filters.search.trim().toLowerCase();
    
    try {
      // Enable PostgreSQL extensions if not already enabled - execute them separately
      await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
      await db.execute(sql`CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;`);
      
      // Try advanced search with enhanced trigram similarity for typo tolerance
      const fuzzyConditions = generateFuzzySearchConditions(searchText);
      
      // Add fuzzy search conditions
      if (fuzzyConditions.length > 0) {
        conditions.push(or(...fuzzyConditions));
      }
    } catch (error) {
      console.error("Fuzzy search error:", error);
      // Fall back to PostgreSQL's native full-text search
      try {
        conditions.push(
          sql`to_tsvector('english', ${products.name} || ' ' || ${products.description}) @@ plainto_tsquery('english', ${searchText})`
        );
      } catch (fallbackError) {
        console.error("Full-text search error:", fallbackError);
        // Fall back to simpler search as the last resort
        const words = searchText.split(/\s+/).filter((w: string) => w.length > 0);
        
        // Build basic LIKE conditions for each word with some partial matching
        const searchConditions = words.map((word: string) => 
          or(
            sql`LOWER(${products.name}) LIKE ${`%${word}%`}`,
            sql`LOWER(${products.description}) LIKE ${`%${word}%`}`,
            // Add some simple partial matching for typos
            sql`LOWER(${products.name}) LIKE ${`%${word.substring(0, Math.max(3, word.length - 1))}%`}`,
            sql`LOWER(${products.description}) LIKE ${`%${word.substring(0, Math.max(3, word.length - 1))}%`}`
          )
        );
        
        if (searchConditions.length > 0) {
          conditions.push(or(...searchConditions));
        }
      }
    }
  }
  
  // Only show products in stock
  conditions.push(ne(products.stock, 0));
  
  // Execute the query with all applied filters
  if (conditions.length > 0) {
    return db.select()
      .from(products)
      .where(and(...conditions))
      .limit(limit)
      .offset(offset);
  } else {
    return db.select()
      .from(products)
      .where(ne(products.stock, 0))
      .limit(limit)
      .offset(offset);
  }
}

// Get total count of filtered products (for pagination)
export async function getFilteredProductsCount(filters?: FilterOptions): Promise<number> {
  // Build conditions array for filtering
  const conditions = [];
  
  // Category filter
  if (filters?.category) {
    conditions.push(eq(products.category, filters.category));
  }
  
  // Price range filter
  if (filters?.priceMin !== null && filters?.priceMin !== undefined) {
    conditions.push(gte(products.price, filters.priceMin));
  }
  
  if (filters?.priceMax !== null && filters?.priceMax !== undefined) {
    conditions.push(lte(products.price, filters.priceMax));
  }
  
  // Search term with enhanced typo tolerance
  if (filters?.search && filters.search.trim()) {
    const searchText = filters.search.trim().toLowerCase();
    
    try {
      // Enable PostgreSQL extensions if not already enabled - execute them separately
      await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
      await db.execute(sql`CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;`);
      
      // Use the same improved fuzzy search approach for consistency
      const fuzzyConditions = generateFuzzySearchConditions(searchText);
      
      // Add fuzzy search conditions
      if (fuzzyConditions.length > 0) {
        conditions.push(or(...fuzzyConditions));
      }
    } catch (error) {
      console.error("Fuzzy search error in getFilteredProductsCount:", error);
      // Fall back to PostgreSQL's native full-text search
      try {
        conditions.push(
          sql`to_tsvector('english', ${products.name} || ' ' || ${products.description}) @@ plainto_tsquery('english', ${searchText})`
        );
      } catch (fallbackError) {
        console.error("Full-text search error in getFilteredProductsCount:", fallbackError);
        // Fall back to simpler search if full-text search fails
        const words = searchText.split(/\s+/).filter((w: string) => w.length > 0);
        
        // Build conditions for each word
        const searchConditions = words.map((word: string) => 
          or(
            sql`LOWER(${products.name}) LIKE ${`%${word}%`}`,
            sql`LOWER(${products.description}) LIKE ${`%${word}%`}`
          )
        );
        
        conditions.push(or(...searchConditions));
      }
    }
  }
  
  // Only show products in stock
  conditions.push(ne(products.stock, 0));
  
  // Execute the count query with all applied filters
  const result = await db.select({ count: sql<number>`count(*)` })
    .from(products)
    .where(conditions.length > 0 ? and(...conditions) : undefined);
    
  return result[0]?.count || 0;
}

// Get all available categories
export async function getCategories(): Promise<string[]> {
  const result = await db
    .selectDistinct({ category: products.category })
    .from(products)
    .where(ne(products.stock, 0));
    
  return result.map(item => item.category);
}

// Get all available brands


// Get min and max prices
export async function getPriceRange(): Promise<{ min: number; max: number }> {
  const minResult = await db
    .select({ min: sql<number>`min(${products.price})` })
    .from(products)
    .where(ne(products.stock, 0));
    
  const maxResult = await db
    .select({ max: sql<number>`max(${products.price})` })
    .from(products)
    .where(ne(products.stock, 0));
    
  return {
    min: minResult[0]?.min || 0,
    max: maxResult[0]?.max || 1000
  };
}

export async function getProductById(id: number): Promise<Product | null> {
  return db.select()
    .from(products)
    .where(eq(products.id, id))
    .then(res => res[0] ?? null);
}

export async function getRelatedProducts(category: string): Promise<Product[]> {
  return db.select()
    .from(products)
    .where(and(
      eq(products.category, category),
      ne(products.stock, 0) // Exclude out-of-stock products
    ))
    .limit(4);
}

export async function getRecommendedProducts(): Promise<Product[]> {
  return db.select()
    .from(products)
    .orderBy(sql`RANDOM()`)
    .limit(4);
}

export const searchProducts = async (query: string): Promise<Product[]> => {
  // Return empty array for empty queries
  if (!query || typeof query !== 'string' || !query.trim()) {
    console.log("Search query was empty or invalid");
    return [];
  }
  
  try {
    // Normalize the search query
    const searchText = query.trim().toLowerCase();
    console.log(`Searching for: "${searchText}"`);
    
    // Enable PostgreSQL extensions if not already enabled - execute them separately
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;`);
    
    // Advanced search with enhanced trigram similarity for typo tolerance
    const fuzzyConditions = generateFuzzySearchConditions(searchText);
    
    const searchResults = await db
      .select()
      .from(products)
      .where(
        and(
          or(...fuzzyConditions),
          ne(products.stock, 0) // Only show products in stock
        )
      )
      .limit(20);
    
    console.log(`Found ${searchResults.length} search results`);
    
    return searchResults || [];
  } catch (error) {
    console.error("Search error:", error);
    // Fall back to a simpler search approach if the advanced search fails
    try {
      const fallbackSearchText = query.trim().toLowerCase();
      const words = fallbackSearchText.split(/\s+/).filter((w: string) => w.length > 0);
      
      // Build basic LIKE conditions for each word with some partial matching
      const conditions = words.map((word: string) => 
        or(
          sql`LOWER(${products.name}) LIKE ${`%${word}%`}`,
          sql`LOWER(${products.description}) LIKE ${`%${word}%`}`,
          // Add some simple partial matching for typos
          sql`LOWER(${products.name}) LIKE ${`%${word.substring(0, Math.max(3, word.length - 1))}%`}`,
          sql`LOWER(${products.description}) LIKE ${`%${word.substring(0, Math.max(3, word.length - 1))}%`}`
        )
      );
      
      const searchResults = await db
        .select()
        .from(products)
        .where(
          and(
            or(...conditions),
            ne(products.stock, 0)
          )
        )
        .limit(20);
        
      return searchResults || [];
    } catch (fallbackError) {
      console.error("Fallback search error:", fallbackError);
      return [];
    }
  }
};

