import { pgTable, serial, timestamp, uniqueIndex, varchar, text } from "drizzle-orm/pg-core";

export const UsersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    email: varchar("email", { length: 64 }).notNull(),
    password: text("password").notNull(),
    username: varchar("username", { length: 24 }),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(table.email),
    };
  },
);

export type UserEntity = typeof UsersTable.$inferSelect;
