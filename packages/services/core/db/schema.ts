import {
  pgTable,
  bigserial,
  varchar,
  pgEnum,
  bigint,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["seller", "buyer"]);

export const user = pgTable("users", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 255 }),
  role: roleEnum("role"),
  avatar: varchar("avatar", { length: 255 }),
  email: varchar("email", { length: 255 }),
});

export const profile = pgTable("session", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: bigint("userId", { mode: "number" }),
});
