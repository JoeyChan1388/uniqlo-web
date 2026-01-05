import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";
import { createMember } from "../controller";

// ------------------------------------------------------------------

/**
 * Handles the member signup request.
 * @param request - The incoming request object
 * @returns A response indicating the result of the signup attempt
 */
export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Create the new member
    const member = await createMember(email, password, name);

    // Issue JWT token and set cookie for the new member
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
        message: "Signup successful",
        member,
      },
      { status: 201 }
    );

    // Set the token in an HttpOnly cookie
    response.cookies.set("auth_token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("Error during member signup:", error);
    
    return NextResponse.json(
      { message: "Server failed to signup", error: (error as Error).message },
      { status: 500 }
    );
  }
}
