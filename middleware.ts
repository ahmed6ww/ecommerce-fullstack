import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)", // This pattern matches /sign-in and all routes underneath it
  "/sign-up(.*)", // This pattern matches /sign-up and all routes underneath it
  "/api/webhook(.*)",
  "/products(.*)",
  "/product/(.*)",
  "/cart",
  "/debug(.*)", // Allow access to debug page
]);

// Define admin routes
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // For public routes, don't enforce authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For admin routes and other protected routes
  if (isAdminRoute(req)) {
    // Protect admin routes - will automatically redirect to sign-in if not authenticated
    await auth.protect();
    return NextResponse.next();
  }
  
  // For all other protected routes
  await auth.protect();
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Exclude static files and match all other routes
    "/((?!_next|.*\\.[^.]*$).*)",
    // Include API routes
    "/api/(.*)"
  ]
};