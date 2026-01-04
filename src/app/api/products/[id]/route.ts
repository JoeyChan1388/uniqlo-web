import { NextResponse, type NextRequest } from "next/server";
import { getProductById } from "../controller";

// ------------------------------------------------------------------

/**
 * Handles the GET request for a specific product by its ID.
 *
 * @param request - The incoming request object
 * @param params - Object containing route parameters (api/products/[id])
 * @returns - A JSON response containing the product data or a 404 error if not found
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Find the product by ID
  try {
    const result = await getProductById(id);

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: (err as Error).message },
      { status: 500 }
    );
  }
}
