import mysql from "mysql2/promise";

// ------------------------------------------------------------------

const dbUrl = new URL(process.env.DATABASE_URL!);

/**
 * MySQL connection pool for database interactions.
 */
export const pool = mysql.createPool({
  host: dbUrl.hostname,
  port: Number(dbUrl.port),
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  waitForConnections: true,
  connectionLimit: 10,
  decimalNumbers: true,
});