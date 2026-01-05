import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/app/api/products/controller";

// ------------------------------------------------------------------

/**
 * Handles the GET request for a specific product by its ID.
 *
 * @param request - The incoming request object
 * @param params - Object containing route parameters (api/products/[id])
 * @returns - A JSON response containing the product data or a 404 error if not found
 */
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    // Attempt to find the product by ID
    const result = await getProductById(id);

    // Return the product if found, otherwise return 404
    if (result) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Server failed to fetch product", details: (err as Error).message },
      { status: 500 }
    );
  }
}
