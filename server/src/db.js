import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool(process.env.DATABASE_URL);

export async function pingDb() {
  const conn = await pool.getConnection();
  try {
    await conn.query("SELECT 1");
    return true;
  } finally {
    conn.release();
  }
}

export { pool };