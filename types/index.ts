export interface Product {
  id: string | number
  name: string
  price: string | number
  image: string
  description?: string
  category?: string
  stock?: number
  discount?: number
  rating?: number
  reviews?: number
  sold?: number
}

export interface Category {
  id: string
  name: string
  href: string
}

export interface Supplier {
  id: string
  name: string
  location?: string
  country?: string
  verified?: boolean
  rating?: number
  logo?: string
}

