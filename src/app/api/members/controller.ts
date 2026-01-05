import { pool } from "@/lib/db";
import { Member } from "@/types/members";
import { RowDataPacket } from "mysql2";

// ------------------------------------------------------------------

/**
 *
 * Formats a database row into a Member object.
 * 
 * @param row - The db row to be converted into a Member object
 * @returns - The formatted Member object
 */
function formatRowToMember(row: RowDataPacket): Member {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    type: row.type,
  };
}

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

  // Map database rows to TypeScript Product objects
  const formattedRows: Member[] = (rows as RowDataPacket[]).map(
    formatRowToMember
  );

  // If rows are returned, return the first one
  if (Array.isArray(formattedRows) && formattedRows.length > 0) {
    return formattedRows[0];
  }
}

// ------------------------------------------------------------------

/**
 *
 * Retrieves a single member by its email.
 * @param email The email of the member to retrieve
 * @returns The member with the specified email
 */
export async function getMemberByEmail(email: string) {
  // Build and execute the query
  const sql = `SELECT id, name, email, type FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.query(sql, [email]);

  // Map database rows to TypeScript Product objects
  const formattedRows: Member[] = (rows as RowDataPacket[]).map(
    formatRowToMember
  );

  // If rows are returned, return the first one
  if (Array.isArray(formattedRows) && formattedRows.length > 0) {
    return formattedRows[0];
  }
}
