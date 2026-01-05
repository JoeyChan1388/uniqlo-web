import bcrypt from "bcryptjs";

import { pool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

import { Member } from "@/features/members/types";

// ------------------------------------------------------------------

type DbMemberRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  type: "regular" | "admin";
  password: string;
};

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
 * Authenticates a member by their email and password.
 *
 * @param email - The email of the member
 * @param password - The password of the member
 */
export async function authenticateMember(email: string, password: string) {
  // Build and execute the query
  const sql = `SELECT id, email, password FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.query(sql, [email]);

  // If no rows are returned, member does not exist
  const compareData = Array.isArray(rows) && rows.length > 0 ? rows[0] as DbMemberRow : null;

  if (!compareData) {
    return null;
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(
    password,
    (compareData).password
  );

  // If passwords do not match, return null
  if (!passwordMatch) {
    return null;
  }

  // Retrieve and return the full member data
  const member = await getMemberById(String((compareData).id));

  return member;
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

// ------------------------------------------------------------------

/**
 *
 * Creates a new member with the specified email and password.
 * @param email - The email of the new member
 * @param password - The password of the new member
 * @param name - The name of the new member
 * @returns The newly created member
 * @throws Error if member with the same email already exists
 */
export async function createMember(
  email: string,
  password: string,
  name: string
) {
  // Check if a member with the same email already exists
  const existingMember = await getMemberByEmail(email);

  if (existingMember) {
    throw new Error("Member with this email already exists.");
  }

  // Build and the insert query
  const sql = `INSERT INTO users (email, password, name, type) VALUES (?, ?, ?, ?)`;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Execute the insert query
  const [result] = await pool.query(sql, [
    email,
    hashedPassword,
    name,
    "admin",
  ]);

  // Conver the result to RowDataPacket to access insertId
  const insertResult = result as RowDataPacket;

  // Retrieve the insert ID of the new member
  const insertId = (insertResult).insertId;

  // Return the newly created member
  return {
    id: String(insertId),
    name: name,
    email,
    type: "admin",
  } as Member;
}
