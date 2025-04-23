// lib/admin-actions.ts
"use server"

import { db } from "@/db/index";
import { products } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { checkUserIsAdmin } from "./user-actions";

// Define the structure for a new product submission
export interface ProductSubmission {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  discount: number;
}

// Create a new product
export async function createProduct(data: ProductSubmission) {
  try {
    // Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }
    
    // Check if user has admin rights
    const isAdmin = await checkUserIsAdmin();
    if (!isAdmin) {
      return { success: false, error: "Not authorized" };
    }

    const result = await db.insert(products).values({
      name: data.name,
      price: data.price,
      image: data.image,
      description: data.description,
      category: data.category,
      stock: data.stock || 0,
      discount: data.discount || 0,
    }).returning();

    revalidatePath('/admin');
    return { success: true, product: result[0] };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

// Delete a product by ID
export async function deleteProduct(id: number) {
  try {
    // Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }
    
    // Check if user has admin rights
    const isAdmin = await checkUserIsAdmin();
    if (!isAdmin) {
      return { success: false, error: "Not authorized" };
    }

    await db.delete(products).where(eq(products.id, id));
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

// Get all products for admin view (with no filtering)
export async function getAdminProducts() {
  try {
    // Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return [];
    }
    
    // Check if user has admin rights
    const isAdmin = await checkUserIsAdmin();
    if (!isAdmin) {
      return [];
    }

    const allProducts = await db.select().from(products);
    return allProducts;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}