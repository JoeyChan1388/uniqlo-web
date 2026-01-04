import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // Force Node.js runtime

// ------------------------------------------------------------------

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("auth_token")?.value;

  // Check if user is already logged in and trying to access login page
  if (pathname.startsWith("/members/login")) {
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET!);
        // Valid token exists - redirect to home
        return NextResponse.redirect(new URL("/", request.url));
      } catch (err) {
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      // Check if user is admin
      if (decoded.type !== "admin") {
        return NextResponse.redirect(new URL("/", request.url)); // or /unauthorized
      }

      // Allow the request to continue
      return NextResponse.next();
    } catch (err) {
      // Invalid token - redirect to login
      return NextResponse.redirect(new URL("/members/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/create/:path*",
    "/members/login", // Add login page to matcher
  ],
};
