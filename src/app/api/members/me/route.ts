import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getMemberById } from "@/app/api/members/controller";
import { DecodedMemberToken } from "@/types/members";

// ------------------------------------------------------------------

/**
 *
 * Handles the GET request to retrieve the authenticated member's information from their JWT token.
 *
 * @returns - A JSON response containing the member's information or an error message
 */
export async function GET() {
  try {
    // Retrieve the auth token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    // If no auth token is present, return unauthorized
    if (!authToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify and decode the JWT
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as DecodedMemberToken;

    // Extract user ID from the token payload
    const memberId = decoded.memberId;

    // Attempt to fetch member data from the database
    const member = await getMemberById(memberId);

    // Return the member data if found
    if (member) {
      return NextResponse.json({ member });
    } else {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Server failed to get member", details: (err as Error).message },
      { status: 500 }
    );
  }
}
