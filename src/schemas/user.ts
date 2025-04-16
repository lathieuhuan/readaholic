import { pgTable, serial, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

const UsersTable = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  username: varchar("username", { length: 60 }).notNull(),
  password: varchar("password", { length: 60 }).notNull(),
  email: varchar("email", { length: 60 }),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
}, (table) => {
    return {
        usernameIndex: uniqueIndex("username_idx").on(table.username),
    }
});

export { UsersTable };
export type UserEntity = typeof UsersTable.$inferSelect;
