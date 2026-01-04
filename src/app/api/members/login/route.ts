import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";
import { getMemberByEmail } from "../controller";

// ------------------------------------------------------------------

/**
 * Handles the member login request.
 * @param req - The incoming request object
 * @returns A response indicating the result of the login attempt
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    let member = null;

    try {
      member = await getMemberByEmail(email);

      // If member does not exist, return 404
      if (!member) {
        return NextResponse.json(
          { message: "Member does not exist" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: "Error retrieving member",
          error: (error as Error).message,
        },
        { status: 500 }
      );
    }

    // Member exists, validate password (in real scenario, use hashed passwords)
    if (password === "pass123") {
      // Correct password, issue token and set cookie

      // Create JWT with user ID and other identifiers inside the payload
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
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
