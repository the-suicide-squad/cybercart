import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import { env } from "./core/lib/utils";
dotenv.config();
export default {
  schema: "core/db/schema.ts",
  out: "core/db/migrations",
  driver: "pg",
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    password: env.DATABASE_PASSWORD,
    user: env.DATABASE_USER,
    database: env.DATABASE_NAME,
  },
} satisfies Config;
