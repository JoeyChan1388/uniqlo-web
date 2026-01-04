/**
 * Represents the available product categories.
 */
export type ProductCategory = "men" | "women" | "kids" | "baby";

/**
 * Represents the available product types.
 */
export type ProductType = "outerwear" | "tops" | "bottoms";

/**
 * Represents the available sizes for products.
 */
export type ProductSize = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";

/**
 * Represents a product with all its possible details.
 */
export type Product = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  type: ProductType;
  category: ProductCategory;
  rating?: number;
  thumbnailUrl?: string;
  sizesAvailable?: ProductSize[];
};

/**
 * Represents a simplified type product listing.
 */
export type ProductTypeListing = {
  id: ProductType;
  displayName: string;
  imageUrl?: string;
  href?: string;
};