'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Product } from '@/lib/actions'
import { useUser } from '@clerk/nextjs'
import { addToCart, removeFromCart, updateCartItemQuantity, clearCart as clearDbCart, getUserCart } from '@/lib/cart-actions'
import { useToast } from '@/components/ui/use-toast'

// Define cart item type
export type CartItem = {
  id: number
  cartItemId?: number // For database cart items
  name: string
  price: number
  image: string | null
  quantity: number
  category: string
}

// Define cart context type
type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: number, cartItemId?: number) => void
  updateQuantity: (id: number, quantity: number, cartItemId?: number) => void
  clearCart: () => void
  itemCount: number
  total: number
  isLoading: boolean
}

// Create cart context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  total: 0,
  isLoading: false
})

// Custom hook to use cart context
export const useCart = () => useContext(CartContext)

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart items
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser()
  const { toast } = useToast()

  // Load cart based on authentication status
  const loadCart = useCallback(async () => {
    if (!isUserLoaded) return

    setIsLoading(true)

    try {
      if (isSignedIn && user) {
        // Get cart from database for authenticated users
        const dbCart = await getUserCart()
        
        if (dbCart && dbCart.items) {
          const cartItems = dbCart.items.map(item => ({
            id: item.product.id,
            cartItemId: item.id, // Store cart item ID for database operations
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            category: item.product.category,
            quantity: item.quantity
          }))
          
          setItems(cartItems)
          
          // Clear local storage cart when user signs in
          localStorage.removeItem('cart')
        } else {
          setItems([])
        }
      } else {
        // For non-authenticated users, use localStorage
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
          try {
            setItems(JSON.parse(storedCart))
          } catch (error) {
            console.error('Failed to parse cart from localStorage:', error)
            setItems([])
          }
        } else {
          setItems([])
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      toast({
        title: 'Error',
        description: 'Failed to load your cart items.',
        variant: 'destructive'
      })
    } finally {
      setLoaded(true)
      setIsLoading(false)
    }
  }, [isUserLoaded, isSignedIn, user, toast])

  // Load cart when component mounts or auth state changes
  useEffect(() => {
    loadCart()
  }, [loadCart])

  // Save cart to localStorage for non-authenticated users
  useEffect(() => {
    if (loaded && !isSignedIn) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, loaded, isSignedIn])

  // Add item to cart (or update quantity if already exists)
  const addItem = async (product: Product, quantity: number = 1) => {
    try {
      setIsLoading(true)
      
      if (isSignedIn) {
        // Add to database cart for authenticated users
        const result = await addToCart(product.id, quantity)
        
        if (result.success) {
          // Reload cart to get updated items
          loadCart()
          
          toast({
            title: 'Added to cart',
            description: `${quantity} ${product.name} added to your cart.`
          })
        } else {
          toast({
            title: 'Error',
            description: result.error || 'Failed to add item to cart.',
            variant: 'destructive'
          })
        }
      } else {
        // Add to local cart for non-authenticated users
        setItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id)
          
          if (existingItem) {
            // Update quantity of existing item
            const updatedItems = prevItems.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
            return updatedItems
          } else {
            // Add new item
            return [...prevItems, { 
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category || '',
              quantity: quantity
            }]
          }
        })
        
        toast({
          title: 'Added to cart',
          description: `${quantity} ${product.name} added to your cart.`
        })
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
      toast({
        title: 'Error',
        description: 'Failed to add item to cart.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Remove item from cart
  const removeItem = async (id: number, cartItemId?: number) => {
    try {
      setIsLoading(true)
      
      if (isSignedIn) {
        // Remove from database cart for authenticated users
        if (!cartItemId) {
          toast({
            title: 'Error',
            description: 'Cannot remove item: missing cart item ID.',
            variant: 'destructive'
          })
          return
        }
        
        const result = await removeFromCart(cartItemId)
        
        if (result.success) {
          // Reload cart to get updated items
          loadCart()
          
          toast({
            title: 'Removed from cart',
            description: 'Item removed from your cart.'
          })
        } else {
          toast({
            title: 'Error',
            description: result.error || 'Failed to remove item from cart.',
            variant: 'destructive'
          })
        }
      } else {
        // Remove from local cart for non-authenticated users
        setItems(prevItems => prevItems.filter(item => item.id !== id))
        
        toast({
          title: 'Removed from cart',
          description: 'Item removed from your cart.'
        })
      }
    } catch (error) {
      console.error('Error removing item from cart:', error)
      toast({
        title: 'Error',
        description: 'Failed to remove item from cart.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update quantity of an item
  const updateQuantity = async (id: number, quantity: number, cartItemId?: number) => {
    try {
      setIsLoading(true)
      
      if (quantity < 1) {
        await removeItem(id, cartItemId)
        return
      }
      
      if (isSignedIn) {
        // Update in database cart for authenticated users
        if (!cartItemId) {
          toast({
            title: 'Error',
            description: 'Cannot update item: missing cart item ID.',
            variant: 'destructive'
          })
          return
        }
        
        const result = await updateCartItemQuantity(cartItemId, quantity)
        
        if (result.success) {
          // Reload cart to get updated items
          loadCart()
          
          toast({
            title: 'Cart updated',
            description: 'Item quantity updated in your cart.'
          })
        } else {
          toast({
            title: 'Error',
            description: result.error || 'Failed to update item quantity.',
            variant: 'destructive'
          })
        }
      } else {
        // Update in local cart for non-authenticated users
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        )
        
        toast({
          title: 'Cart updated',
          description: 'Item quantity updated in your cart.'
        })
      }
    } catch (error) {
      console.error('Error updating item quantity:', error)
      toast({
        title: 'Error',
        description: 'Failed to update item quantity.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Clear all items from cart
  const clearCart = async () => {
    try {
      setIsLoading(true)
      
      if (isSignedIn) {
        // Clear database cart for authenticated users
        const result = await clearDbCart()
        
        if (result.success) {
          // Reload cart to get updated items
          loadCart()
          
          toast({
            title: 'Cart cleared',
            description: 'All items have been removed from your cart.'
          })
        } else {
          toast({
            title: 'Error',
            description: result.error || 'Failed to clear cart.',
            variant: 'destructive'
          })
        }
      } else {
        // Clear local cart for non-authenticated users
        setItems([])
        
        toast({
          title: 'Cart cleared',
          description: 'All items have been removed from your cart.'
        })
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast({
        title: 'Error',
        description: 'Failed to clear cart.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Compute total number of items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Compute total price of items in cart
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    total,
    isLoading
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}