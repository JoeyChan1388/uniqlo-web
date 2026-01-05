import type { ProductCategory, ProductType } from "@/types/products";

// ------------------------------------------------------------------

/**
 * Fetch a list of products from the server, optionally filtered by category and type.
 * @param productCategory - Optional category to filter products by
 * @param productType - Optional type to filter products by
 * @returns A list of products matching the specified filters
 */
export const fetchProducts = async (
  productCategory?: ProductCategory,
  productType?: ProductType
) => {
  const res = await fetch(
    `/api/products/${productCategory ? `?category=${productCategory}` : ""}/${
      productType ? `&type=${productType}` : ""
    }`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// ------------------------------------------------------------------

/**
 * Fetch a product from the server by its ID.
 *
 * @param id - The ID of the product to fetch
 * @returns The product with the specified ID
 */
export const fetchProductById = async (id: string) => {
  // TODO: Implement schema validation for the returned product data using Zod
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};
