import type { ProductCategory, ProductType } from "@/types/products";
import { z } from "zod";

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
  type: z.enum([
    "outerwear",
    "tops",
    "sweaters",
    "shirts",
    "bottoms",
    "dresses",
    "innerwear",
    "loungewear",
    "accessories",
    "heattech",
    "airism",
    "sport-utility",
    "uv-protection",
    "pufftech",
    "special-collaborations",
    "uniqlo-c",
    "jw-anderson",
    "ut-graphic",
    "cashmere",
    "limited-time",
    "sale",
    "new-arrivals",
    "coming-soon",
    "best-sellers",
    "online-exclusives",
    "multibuy-offers",
  ]),
  category: z.enum(["men", "women", "kids", "baby"]),
  rating: z.number().optional(),
  thumbnailUrl: z.string().optional(),
  sizesAvailable: z.array(z.enum(["XXS", "XS", "S", "M", "L", "XL", "XXL"])).optional(),
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
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok) throw new Error("Failed to fetch product");
  
  const data = await res.json();
  
  // Validate the returned data using Zod schema
  const validatedProduct = ProductSchema.parse(data);
  
  return validatedProduct;
};
