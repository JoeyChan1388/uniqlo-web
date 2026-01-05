/**
 * Represents the allowed product categories.
 */
export const CONST_PRODUCT_CATEGORIES = ["men", "women", "kids", "baby"] as const;

// ------------------------------------------------------------------

/**
 * Represents the allowed product types, categories, and sizes.
 */
export const CONST_PRODUCT_TYPES = [
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
] as const;

// ------------------------------------------------------------------

/**
 * Represents the allowed product sizes.
 */
export const CONST_PRODUCT_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"] as const;

// ------------------------------------------------------------------

/**
 * DERIVED TYPES
 */

/**
 * Represents a product type.
 */
export type ProductType = (typeof CONST_PRODUCT_TYPES)[number];

// ------------------------------------------------------------------

/**
 * Represents a product category.
 */
export type ProductCategory = (typeof CONST_PRODUCT_CATEGORIES)[number];

// ------------------------------------------------------------------

/**
 * Represents a product category.
 */
export type ProductSize = (typeof CONST_PRODUCT_SIZES)[number];

// ------------------------------------------------------------------

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

// ------------------------------------------------------------------

/**
 * Represents a simplified type product listing.
 */
export type ProductTypeListing = {
  id: ProductType;
  displayName: string;
  imageUrl?: string;
  href?: string;
};
