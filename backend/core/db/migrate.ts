import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, initDB } from "./index";
import pg from "pg";
import { env } from "../lib/utils";
async function main() {
  try {
    await initDB();
    const connection = new pg.Connection({
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
    });
    await migrate(db, { migrationsFolder: "core/db/migrations" });
    console.log("migration complete");
    connection.end();
    process.exit(0);
  } catch (err) {
    console.error("failed to run migration:", err);
  }
}

main();
