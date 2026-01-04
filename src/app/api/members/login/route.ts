import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";
import { getMemberByEmail } from "../controller";

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
    const member = await getMemberByEmail(email);

    // If member does not exist, return 404
    if (!member) {
      return NextResponse.json(
        { message: "Member does not exist" },
        { status: 404 }
      );
    }

    // Member exists, validate password
    if (password === "pass123") {
      // Correct password, issue JWT token and set cookie
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
      const response = NextResponse.json({
        message: "Login successful",
        member,
      });

      // Set the token in an HttpOnly cookie
      response.cookies.set("auth_token", token, { httpOnly: true });

      // Return the response with the cookie set
      return response;
    } else {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server failed to login", error: (error as Error).message },
      { status: 500 }
    );
  }
}
