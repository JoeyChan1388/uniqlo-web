import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";
import { authenticateMember } from "@/app/api/members/controller";

// ------------------------------------------------------------------

/**
 * Handles the member login request.
 * @param request - The incoming request object
 * @returns A response indicating the result of the login attempt
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Retrieve maybe existing member by email
    const member = await authenticateMember(email, password);

    // If member does not exist, return 404
    if (!member) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 404 }
      );
    }

    // Issue JWT token and set cookie for the logged in member
    const token = jwt.sign(
      {
        memberId: member.id,
        email: member.email,
        type: member.type,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Prepare response
    const response = NextResponse.json(
      {
        message: "Login successful",
        member,
      },
      { status: 200 }
    );

    // Set the token in an HttpOnly cookie
    response.cookies.set("auth_token", token, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Server failed to login", error: (error as Error).message },
      { status: 500 }
    );
  }
}
