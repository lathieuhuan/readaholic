import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { BooksTable } from "@/schemas/book";
import { UsersTable } from "@/schemas/user";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle<{
  BooksTable: typeof BooksTable;
  UsersTable: typeof UsersTable;
}>(sql);

async function configureDatabase() {
  await sql`CREATE TABLE IF NOT EXISTS "books" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "author" varchar(255) NOT NULL,
    "added_at" timestamp DEFAULT now() NOT NULL
  )`;

  await sql`CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "username" varchar(60) NOT NULL,
    "password" varchar(60) NOT NULL,
    "email" varchar(60),
    "joined_at" timestamp DEFAULT now() NOT NULL
  )`;

  await sql`CREATE UNIQUE INDEX "username_idx" ON "users" USING btree ("username")`;
}

configureDatabase();

export { sql, db, configureDatabase };
