import jwt from "jsonwebtoken";

import { DecodedMemberToken } from "./types/members";
import { NextRequest, NextResponse } from "next/server";

// ------------------------------------------------------------------

/**
 *
 * Middleware for protecting routes based on authentication and authorization.
 *
 * @param request - The incoming Next.js request object
 * @returns - A NextResponse object to either continue, redirect, or block the request
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve the auth token from cookies from the GET new page request.  
  const token = request.cookies.get("auth_token")?.value;

  // Check if user is already logged in and trying to access login page
  if (pathname.startsWith("/members/login")) {
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET!);
        // Valid token exists - redirect to home
        return NextResponse.redirect(new URL("/", request.url));
      } catch {
        // Invalid token - let them proceed to login page
        return NextResponse.next();
      }
    }
    // No token - let them proceed to login page
    return NextResponse.next();
  }

  // Only run on protected routes
  if (pathname.startsWith("/products/create")) {
    if (!token) {
      return NextResponse.redirect(new URL("/members/login", request.url));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedMemberToken;

      // Check if user is admin
      if (decoded.type !== "admin") {
        return NextResponse.redirect(new URL("/", request.url)); // or /unauthorized
      }

      // Allow the request to continue
      return NextResponse.next();
    } catch {
      // Invalid token - redirect to login
      return NextResponse.redirect(new URL("/members/login", request.url));
    }
  }

  return NextResponse.next();
}

// ------------------------------------------------------------------

export const config = {
  matcher: ["/products/create/:path*", "/members/login"],
};

// ------------------------------------------------------------------

export const runtime = "nodejs";
