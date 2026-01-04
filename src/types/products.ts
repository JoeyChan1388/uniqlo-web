/**
 * Represents the available product categories.
 */
export type ProductCategory = "men" | "women" | "kids" | "baby";

/**
 * Represents the available product types.
 */
export type ProductType =
  | "outerwear"
  | "tops"
  | "sweaters"
  | "shirts"
  | "bottoms"
  | "dresses"
  | "innerwear"
  | "loungewear"
  | "accessories"
  // Technology Collections
  | "heattech"
  | "airism"
  | "sport-utility"
  | "uv-protection"
  | "pufftech"
  // Collaborations & Special Collections
  | "special-collaborations"
  | "uniqlo-c"
  | "jw-anderson"
  | "ut-graphic"
  | "cashmere"
  | "limited-time"
  // Shopping Categories
  | "sale"
  | "new-arrivals"
  | "coming-soon"
  | "best-sellers"
  | "online-exclusives"
  | "multibuy-offers";

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
