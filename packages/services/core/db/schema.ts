import {
  pgTable,
  bigserial,
  varchar,
  pgEnum,
  bigint,
  integer,
  text,
  jsonb,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("userRole", ["seller", "buyer"]);
export const productStatusEnum = pgEnum("productStatus", ["unpublished", "published"]);
export const productTypeEnum = pgEnum("productType", ["files", "videos"]);

export const users = pgTable("users", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 255 }),
  role: userRoleEnum("role"),
  avatar: varchar("avatar", { length: 255 }),
  email: varchar("email", { length: 255 }),
});

export const products = pgTable("products", {
  id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  type: productTypeEnum("type").notNull(),
  about: text("about"),
  price: integer("price").notNull(),
  status: productStatusEnum("status").default("unpublished"),
  resources: jsonb("resources"),
  // TODO: drizzle foreign key relation
  userId: integer("user_id").notNull(),
});

export const profile = pgTable("session", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: bigint("userId", { mode: "number" }),
});
