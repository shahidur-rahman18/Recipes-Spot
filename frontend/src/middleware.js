// middleware.js

import { NextResponse } from "next/server"; // <--- YOU NEED THIS IMPORT
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// Define URLs
const LOGIN_URL = new URL("/login", BASE_URL);
const HOME_URL = new URL("/", BASE_URL);

// 🟢 Routes that EVERYONE can access (even logged out users).
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/recipes", // Base index page
];

// 🔴 Routes that should redirect a logged-in user
const publicOnlyRoutes = ["/login", "/register"];

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token");
  const isAuthenticated = !!token;

  // --- A. Handle Public Only Routes (Redirect if already logged in) ---
  if (publicOnlyRoutes.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(HOME_URL);
    }
  }

  // --- B. Handle ALL other routes (Protection Logic) ---

  // 1. Check for exact public routes
  const isExactPublicRoute = publicRoutes.some((path) => pathname === path);

  // 2. Check for dynamic public routes (fixes the dynamic routing issue)
  const isDynamicRecipeRoute = pathname.startsWith("/recipes/");

  // If the route is public (exact match OR dynamic recipe page), let it pass.
  if (isExactPublicRoute || isDynamicRecipeRoute) {
    return NextResponse.next();
  }

  // If the route is NOT public (and is protected)
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(LOGIN_URL);
  }

  // If the user is authenticated, allow access to the private route.
  return NextResponse.next();
}

// 🌐 Configure which paths the middleware applies to
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.png$).*)",
  ],
};
