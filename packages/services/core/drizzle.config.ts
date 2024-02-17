import type { Config } from "drizzle-kit";
import { env } from "./lib/utils";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    password: env.DATABASE_PASSWORD,
    user: env.DATABASE_USER,
    database: env.DATABASE_NAME,
  },
} satisfies Config;
