import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)",
  "/products(.*)",
  "/product/(.*)",
  "/cart",
]);

// Define admin routes
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth;
  
  // For public routes, don't enforce authentication
  if (isPublicRoute(req)) {
    return;
  }

  // For admin routes, enforce authentication
  if (isAdminRoute(req)) {
    // If user is not authenticated, redirect to sign-in
    if (!auth.isSignedIn) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
    
    // You could add admin role check here later if needed
    // const { has } = auth;
    // if (!has({ role: "admin" })) {
    //   return NextResponse.redirect(new URL('/', req.url));
    // }
  }

  // For all other routes, require authentication
  await auth.protect();
});

export const config = {
  matcher: [
    // Exclude static files
    "/((?!_next|.*\\.[^.]*$).*)",
    // Include API routes
    "/api/(.*)"
  ]
};