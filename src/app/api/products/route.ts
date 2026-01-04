import { NextResponse } from "next/server";
import { createProduct, getProducts } from "./controller";

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
      { error: "Server failed to fetch products", details: (err as Error).message },
      { status: 500 }
    );
  }
}

// ------------------------------------------------------------------

/**
 * Handles the POST request to create a new product.
 * 
 * @param request - The incoming request object containing product data in the body
 * @returns - A JSON response indicating success or failure of product creation
 */
export async function POST(request: Request) {
  try {
    await createProduct(request);
   
    return NextResponse.json({ message: "Product created successfully" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Server failed to create product", details: (err as Error).message },
      { status: 500 }
    );
  }
}
