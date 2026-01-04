import { NextResponse } from "next/server";
import { getProducts } from "./controller";

// ------------------------------------------------------------------

/**
 * Handles the GET request to retrieve a list of products, optionally filtered by category and type.
 *
 * @param request - The incoming request object
 * @returns - A JSON response containing the list of products, optionally filtered by category and type
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const result = await getProducts({
      category: searchParams.get("category") ?? undefined,
      type: searchParams.get("type") ?? undefined,
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: (err as Error).message },
      { status: 500 }
    );
  }
}
