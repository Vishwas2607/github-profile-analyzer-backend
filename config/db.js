import mysql from "mysql2/promise";
import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "github_analyzer",
  ssl: {},
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function initDatabase() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sqlScriptPath = path.join(__dirname, "..", "database", "schema.sql");
    const sqlScript = fs.readFileSync(sqlScriptPath, "utf-8");

    await pool.query(sqlScript);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database: ", error.message);
    throw error;
  };
};