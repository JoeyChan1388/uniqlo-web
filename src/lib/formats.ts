import { ProductSize } from "@/features/products/types";

// ------------------------------------------------------------------

/**
 *
 * Normalizes a query string by removing any trailing slashes.
 *
 * @param q - query string
 * @returns - normalized query string without trailing slash
 */
export function normalize(q?: string) {
  return q ? q.replace(/\/$/, "") : undefined;
}

// ------------------------------------------------------------------

/**
 *
 * Gets the size range from an array of product sizes.
 *
 * @param sizes - Array of product sizes
 * @returns - A string representing the size range (XXS-XXL) or "N/A" if sizes are undefined or empty
 */
export function getSizeRange(sizes: ProductSize[] | undefined) {
  if (!sizes || sizes.length === 0) return "N/A";

  // Return smallest to largest size
  return `${sizes[0]}-${sizes[sizes.length - 1]}`;
}
