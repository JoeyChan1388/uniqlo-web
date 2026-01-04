import { pool } from "@/lib/db";

// ------------------------------------------------------------------

/**
 *
 * Retrieves a single product by its ID.
 * @param id - The ID of the product to retrieve
 * @returns - The product with the specified ID
 */
export async function getMemberByEmail(email: string) {
  // Build and execute the query
  const sql = `SELECT id, name, email, type FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.query(sql, [email]);

  // If rows are returned, return the first one
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0];
  }
}

// ------------------------------------------------------------------