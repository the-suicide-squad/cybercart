DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('seller', 'buyer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"userId" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"role" "role",
	"avatar" varchar(255),
	"email" varchar(255)
);
