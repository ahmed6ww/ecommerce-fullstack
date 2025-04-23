"use server"

import { db } from "@/db/index";
import { carts, cartItems, products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Get a user's cart
export async function getUserCart() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return null;
    }
    
    // Find the user's cart
    const userCart = await db.query.carts.findFirst({
      where: eq(carts.userId, user.id),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    });
    
    if (!userCart) {
      // Create a new cart if one doesn't exist
      const [newCart] = await db.insert(carts)
        .values({
          userId: user.id,
        })
        .returning();
      
      return { ...newCart, items: [] };
    }
    
    return userCart;
  } catch (error) {
    console.error("Error getting user cart:", error);
    return null;
  }
}

// Add an item to a user's cart
export async function addToCart(productId: number, quantity: number) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }
    
    // Get or create the user's cart
    let userCart = await db.query.carts.findFirst({
      where: eq(carts.userId, user.id),
    });
    
    if (!userCart) {
      const [newCart] = await db.insert(carts)
        .values({
          userId: user.id,
        })
        .returning();
      
      userCart = newCart;
    }
    
    // Check if the item is already in the cart
    const existingItem = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.cartId, userCart.id),
        eq(cartItems.productId, productId)
      ),
    });
    
    if (existingItem) {
      // Update quantity if item exists
      await db.update(cartItems)
        .set({
          quantity: existingItem.quantity + quantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      // Add new item to cart
      await db.insert(cartItems)
        .values({
          cartId: userCart.id,
          productId,
          quantity,
        });
    }
    
    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, error: "Failed to add item to cart" };
  }
}

// Remove an item from a user's cart
export async function removeFromCart(cartItemId: number) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }
    
    // Get the user's cart
    const userCart = await db.query.carts.findFirst({
      where: eq(carts.userId, user.id),
    });
    
    if (!userCart) {
      return { success: false, error: "Cart not found" };
    }
    
    // Verify the item belongs to this user's cart
    const item = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.id, cartItemId),
        eq(cartItems.cartId, userCart.id)
      ),
    });
    
    if (!item) {
      return { success: false, error: "Item not found in cart" };
    }
    
    // Remove the item
    await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
    
    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false, error: "Failed to remove item from cart" };
  }
}

// Update item quantity in cart
export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }
    
    // Get the user's cart
    const userCart = await db.query.carts.findFirst({
      where: eq(carts.userId, user.id),
    });
    
    if (!userCart) {
      return { success: false, error: "Cart not found" };
    }
    
    // Verify the item belongs to this user's cart
    const item = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.id, cartItemId),
        eq(cartItems.cartId, userCart.id)
      ),
    });
    
    if (!item) {
      return { success: false, error: "Item not found in cart" };
    }
    
    if (quantity <= 0) {
      // Remove the item if quantity is 0 or negative
      await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
    } else {
      // Update the quantity
      await db.update(cartItems)
        .set({
          quantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, cartItemId));
    }
    
    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return { success: false, error: "Failed to update item quantity" };
  }
}

// Clear cart
export async function clearCart() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }
    
    const userCart = await db.query.carts.findFirst({
      where: eq(carts.userId, user.id),
    });
    
    if (!userCart) {
      return { success: false, error: "Cart not found" };
    }
    
    // Delete all items in the cart
    await db.delete(cartItems).where(eq(cartItems.cartId, userCart.id));
    
    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: "Failed to clear cart" };
  }
}