import { z } from "zod";
import {
  CONST_PRODUCT_CATEGORIES,
  CONST_PRODUCT_TYPES,
  type ProductCategory,
  type ProductType,
} from "@/types/products";

// ------------------------------------------------------------------

/**
 * Zod schema for validating product data returned from the API.
 * Validates that the product matches the expected structure.
 */
const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  salePrice: z.number().optional(),
  type: z.enum(CONST_PRODUCT_TYPES),
  category: z.enum(CONST_PRODUCT_CATEGORIES),
  rating: z.number().optional(),
  thumbnailUrl: z.string().optional(),
  sizesAvailable: z
    .array(z.enum(["XXS", "XS", "S", "M", "L", "XL", "XXL"]))
    .optional(),
});

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

  // Raw response data from the API
  const data = await res.json();

  // Validate the returned data using Zod schema
  const validatedProducts = z.array(ProductSchema).parse(data);

  return validatedProducts;
};

// ------------------------------------------------------------------

/**
 * Fetch a product from the server by its ID.
 *
 * @param id - The ID of the product to fetch
 * @returns The product with the specified ID
 */
export const fetchProductById = async (id: string) => {
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok) throw new Error("Failed to fetch product");

  // Raw response data from the API
  const data = await res.json();

  // Validate the returned data using Zod schema
  const validatedProduct = ProductSchema.parse(data);

  return validatedProduct;
};
