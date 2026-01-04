import { NextResponse } from "next/server";

// ------------------------------------------------------------------

/**
 * Handles the member logout request.
 * @returns A response indicating the result of the logout attempt
 */
export async function POST() {
  try {
    // Flush JWT Token cookie
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the auth_token cookie
    response.cookies.set({
      name: "auth_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Server failed to logout", error: (error as Error).message },
      { status: 500 }
    );
  }
}
