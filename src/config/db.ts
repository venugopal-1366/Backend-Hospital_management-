import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

pool.query("SELECT 1")
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB error", err));
