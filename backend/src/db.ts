import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
export const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("connected to Database!");
  } catch (error) {
    console.error("Failed to connect to Database");
    process.exit(1);
  }
};
export default pool;
