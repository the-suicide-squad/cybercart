import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./../db/schema";
import { env } from "../lib/utils";

export let db: NodePgDatabase<typeof schema>;

export async function initDB() {
  try {
    const pool = new Pool({
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
    });
    await pool.connect();
    db = drizzle(pool, { schema, logger: false });
  } catch (err) {
    throw new Error("failed to connect to db");
  }
}
