import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Await the auth() function before destructuring
    // This ensures that the userId is available before proceeding
 
    const { userId } = await auth();

    
    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Get user data from database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    
    // Return combined user data
    return NextResponse.json({
      id: userId,
      dbUser: dbUser ? {
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        isAdmin: dbUser.isAdmin,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt
      } : null,
      hasAdminInDb: Boolean(dbUser?.isAdmin)
    });
    
  } catch (error: any) {
    console.error("Error retrieving user status:", error);
    return NextResponse.json(
      { error: "Failed to retrieve user status" },
      { status: 500 }
    );
  }
}