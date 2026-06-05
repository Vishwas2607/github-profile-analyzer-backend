import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "github_analyzer",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const connectDB = async () => {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database");
    connection.release();
}
