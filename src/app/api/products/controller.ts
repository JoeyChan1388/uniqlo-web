import streamifier from "streamifier";

import { pool } from "@/lib/db";
import { normalize } from "@/lib/formats";
import { v2 as cloudinary } from "cloudinary";
import type { RowDataPacket } from "mysql2";
import type { Product, ProductCategory, ProductType } from "@/types/products";

cloudinary.config(process.env.CLOUDINARY_URL!);

// ------------------------------------------------------------------

/**
 *
 * Formats a database row into a Product object.
 *
 * @param row - The db row to be converted into a Product object
 * @returns - The formatted Product object
 */
function formatRowToProduct(row: RowDataPacket): Product {
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
 * @param buffer - The image buffer to upload
 * @param filename - Optional filename for the uploaded image
 * @returns A promise that resolves with the upload result
 */
function uploadBufferToCloudinary(buffer: Buffer, filename?: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products", public_id: filename },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

// ------------------------------------------------------------------

/**
 *
 * Builds a SQL query to retrieve products based on optional category and type filters.
 *
 * @param opts - Object containing optional category and type filters
 * @returns - An object containing the SQL query string and an array of parameters
 */
function buildProductsQuery(opts: {
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
  const formattedRows: Product[] = (rows as RowDataPacket[]).map(
    formatRowToProduct
  );

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
  const formattedRows: Product[] = (rows as RowDataPacket[]).map(
    formatRowToProduct
  );

  // If rows are returned, return the first one
  if (Array.isArray(formattedRows) && formattedRows.length > 0) {
    return formattedRows[0];
  }
}

// ------------------------------------------------------------------

/**
 *
 * Creates a new product in the database, first uploading the thumbnail image to Cloudinary if provided.
 *
 * @param request - The incoming request object containing product data in the form data
 */
export async function createProduct(request: Request) {
  // Parse the form data from the request
  const form = await request.formData();

  // Extract product fields from the form data
  const name = String(form.get("name") ?? "");
  const category = String(form.get("category") ?? "");
  const type = String(form.get("type") ?? "");
  const price = Number(form.get("price") ?? 0);
  const file = form.get("thumbnail") as File | null;

  // Initialize thumbnail URL as null
  let thumbnailUrl: string | null = null;

  // If a file is provided, upload it to Cloudinary
  if (file) {
    // Convert the File to a Buffer and upload
    const arr = await file.arrayBuffer();
    const buffer = Buffer.from(arr);

    // Generate a safe filename from the product name and upload to Cloudinary
    const filename = name.replace(/[^a-z0-9-_\.]/gi, "_").toLowerCase();

    // Upload the buffer to Cloudinary with the generated filename
    const res = await uploadBufferToCloudinary(buffer, filename);
    thumbnailUrl = res.secure_url;
  }

  // Insert the new product into the database with the thumbnail URL if available
  await pool.query(
    "INSERT INTO products (name, category, type, price, thumbnail_url) VALUES (?, ?, ?, ?, ?)",
    [name, category, type, price, thumbnailUrl]
  );

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
