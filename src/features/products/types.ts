import type { ProductCategory, ProductType } from "@/types/products";

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
