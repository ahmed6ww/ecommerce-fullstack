import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { users, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Await the auth() function before destructuring
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Check if user has admin rights
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    
    if (!dbUser?.isAdmin) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }
    
    // Fetch all products
    const allProducts = await db.select().from(products);
    
    return NextResponse.json({
      products: allProducts
    });
    
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}