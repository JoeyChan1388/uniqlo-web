import { PRODUCTS } from "./_mock";
import { NextResponse } from "next/server";
import type { ProductCategory, ProductType } from "@/types/products";

// ------------------------------------------------------------------

/**
 * Handles the GET request to retrieve a list of products, optionally filtered by category and type.
 *
 * @param request - The incoming request object
 * @returns - A JSON response containing the list of products, optionally filtered by category and type
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get query parameters from URL
  const type = searchParams.get("type");
  const category = searchParams.get("category");

  // Remove trailing slash from query parameters if present
  const filteredType = type
    ? (type.replace(/\/$/, "") as ProductType)
    : undefined;
  const filteredCategory = category
    ? (category.replace(/\/$/, "") as ProductCategory)
    : undefined;

  // TODO: Filter products from database based on query parameters
  const filteredProducts = PRODUCTS.filter((product) => {
    let isMatch = true;

    // Apply category filter if present
    if (filteredCategory) {
      isMatch = isMatch && product.category === filteredCategory;
    }

    // Apply type filter if present
    if (filteredType) {
      isMatch = isMatch && product.type === filteredType;
    }

    return isMatch;
  });

  return NextResponse.json(filteredProducts);
}
