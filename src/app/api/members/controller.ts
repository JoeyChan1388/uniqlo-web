import { pool } from "@/lib/db";

// ------------------------------------------------------------------

/**
 *
 * Retrieves a single member by its ID.
 * @param id - The ID of the member to retrieve
 * @returns - The member with the specified ID
 */
export async function getMemberById(id: string) {
  // Fetch fresh user data from database using the ID
  const [rows] = await pool.query(
    "SELECT id, email, name, type FROM users WHERE id = ? LIMIT 1",
    [id]
  );

  // If rows are returned, return the first one
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0];
  }
}

// ------------------------------------------------------------------

/**
 *
 * Retrieves a single member by its email.
 * @param email - The email of the member to retrieve
 * @returns - The member with the specified email
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