import jwt from "jsonwebtoken";

import { pool } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify and decode the JWT
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as any;

    // Extract user ID from the token payload
    const memberId = decoded.memberId;

    // Fetch fresh user data from database using the ID
    const [members] = await pool.query(
      "SELECT id, email, name, type FROM users WHERE id = ? LIMIT 1",
      [memberId]
    );

    // If rows are returned, return the first one
    if (Array.isArray(members) && members.length > 0) {
      return NextResponse.json({ message: "Member found", member: members[0] }, { status: 200 });
    }

    return NextResponse.json({ message: "Member not found" }, { status: 404 });
  } catch (error) {
    console.error("Error in GET /api/members/me:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
