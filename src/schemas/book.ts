import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

const BooksTable = pgTable("books", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  addedAt: timestamp("added_at").notNull().defaultNow(),
});

export { BooksTable };
export type BookEntity = typeof BooksTable.$inferSelect;
