import { pool } from "@/lib/db";

import type { RowDataPacket } from "mysql2";
import type { Product, ProductCategory, ProductType } from "@/types/products";

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
 * Formats a database row into a Product object.
 *
 * @param row - The db row to be converted into a Product object
 * @returns - The formatted Product object
 */
export function formatRowToProduct(row: RowDataPacket): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    category: row.category as ProductCategory,
    type: row.type as ProductType,
    price: Number(row.price),
    thumbnailUrl: row.thumbnail_url ?? row.thumbnailUrl ?? "",
  };
}

// ------------------------------------------------------------------

/**
 *
 * Builds a SQL query to retrieve products based on optional category and type filters.
 *
 * @param opts - Object containing optional category and type filters
 * @returns - An object containing the SQL query string and an array of parameters
 */
export function buildProductsQuery(opts: {
  category?: ProductCategory;
  type?: ProductType;
}) {
  // Initialize query components
  const params: unknown[] = [];
  const conditions: string[] = [];

  // Add conditions based on provided filters
  if (opts.category) {
    conditions.push("category = ?");
    params.push(opts.category);
  }
  if (opts.type) {
    conditions.push("type = ?");
    params.push(opts.type);
  }

  // Construct the final SQL query
  const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const sql = `SELECT id, name, category, type, price, thumbnail_url FROM products${where} ORDER BY id ASC LIMIT 100`;

  // Return the constructed SQL query string and parameters
  return { sql, params };
}

// ------------------------------------------------------------------

/**
 *
 * Handles the db query to retrieve products based on optional category and type filters.
 *
 * @param raw - Object containing raw category and type strings
 * @returns - An array of products matching the specified filters
 */
export async function getProducts(raw: { category?: string; type?: string }) {
  // Normalize inputs from the query string
  const type = normalize(raw.type) as ProductType | undefined;
  const category = normalize(raw.category) as ProductCategory | undefined;

  // Build and execute the query
  const { sql, params } = buildProductsQuery({ category, type });
  const [rows] = await pool.query(sql, params);

  // Map database rows to TypeScript Product objects
  const formattedRows: Product[] = (rows as RowDataPacket[]).map(formatRowToProduct);

  // Return the resulting rows
  return formattedRows;
}

// ------------------------------------------------------------------

/**
 *
 * Retrieves a single product by its ID.
 * @param id - The ID of the product to retrieve
 * @returns - The product with the specified ID
 */
export async function getProductById(id: string) {
  // Build and execute the query
  const sql = `SELECT id, name, category, type, price, thumbnail_url FROM products WHERE id = ? LIMIT 1`;
  const [rows] = await pool.query(sql, [id]);

  // Map database rows to TypeScript Product objects
  const formattedRows: Product[] = (rows as RowDataPacket[]).map(formatRowToProduct);

  // If rows are returned, return the first one
  if (Array.isArray(formattedRows) && formattedRows.length > 0) {
    return formattedRows[0];
  }
}
