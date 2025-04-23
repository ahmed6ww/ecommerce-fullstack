"use server"

import { db } from "@/db/index";
import { users, carts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Create or update a user in our database based on Clerk user data
export async function syncUserWithDb() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return { success: false, error: "Not authenticated" };
    }
    
    // Check if user exists in our database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, clerkUser.id),
    });
    
    if (existingUser) {
      // Update user info
      await db.update(users)
        .set({
          email: clerkUser.emailAddresses[0].emailAddress,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          profileImage: clerkUser.imageUrl,
          updatedAt: new Date(),
        })
        .where(eq(users.id, clerkUser.id));
      
      return { success: true, userId: clerkUser.id };
    } else {
      // Create new user
      const newUser = await db.insert(users)
        .values({
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0].emailAddress,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          profileImage: clerkUser.imageUrl,
          isAdmin: false, // Default to non-admin
        })
        .returning();
      
      // Create cart for the new user
      await db.insert(carts)
        .values({
          userId: clerkUser.id,
        });
      
      return { success: true, userId: clerkUser.id };
    }
  } catch (error) {
    console.error("Error syncing user:", error);
    return { success: false, error: "Failed to sync user data" };
  }
}

// Check if a user has admin rights
export async function checkUserIsAdmin() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return false;
    }
    
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, clerkUser.id),
    });
    
    return dbUser?.isAdmin || false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

// Update a user's admin status (for super admins to promote others)
export async function updateUserAdminStatus(userId: string, isAdmin: boolean) {
  try {
    // First check if the current user is an admin
    const isCurrentUserAdmin = await checkUserIsAdmin();
    
    if (!isCurrentUserAdmin) {
      return { success: false, error: "Not authorized" };
    }
    
    await db.update(users)
      .set({ isAdmin, updatedAt: new Date() })
      .where(eq(users.id, userId));
    
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error("Error updating admin status:", error);
    return { success: false, error: "Failed to update admin status" };
  }
}

// Get the current user with additional DB data
export async function getCurrentUserWithData() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return null;
    }
    
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, clerkUser.id),
    });
    
    return {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      profileImage: clerkUser.imageUrl,
      isAdmin: dbUser?.isAdmin || false,
    };
  } catch (error) {
    console.error("Error getting current user data:", error);
    return null;
  }
}