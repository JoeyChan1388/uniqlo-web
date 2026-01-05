import {
  CONST_PRODUCT_CATEGORIES,
  CONST_PRODUCT_SIZES,
  CONST_PRODUCT_TYPES,
} from "@/features/products/constants";

// ------------------------------------------------------------------

/**
 * Represents the form fields for creating a new product record.
 */
export type ProductFormFields = {
  name: string;
  category: ProductCategory;
  type: ProductType;
  price: number;
  thumbnail: FileList;
};

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
