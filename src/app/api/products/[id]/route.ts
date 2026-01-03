import { PRODUCTS } from "../_mock";
import { NextResponse } from "next/server";

// ------------------------------------------------------------------

interface ProductGETParams {
  id: string;
}

// ------------------------------------------------------------------

/**
 * Handles the GET request for a specific product by its ID.
 *
 * @param request - The incoming request object
 * @param params - Object containing route parameters (api/products/[id])
 * @returns - A JSON response containing the product data or a 404 error if not found
 */
export async function GET(
  request: Request,
  { params }: { params: ProductGETParams }
) {
  const { id } = await params;

  // TODO: Fetch product from database by ID
  const product = PRODUCTS.find((p) => p.id === id);

  // If product not found, return 404 response
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  // Return the found product as JSON response
  return NextResponse.json(product);
}
