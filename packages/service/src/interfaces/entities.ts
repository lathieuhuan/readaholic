import { BooksTable, UsersTable } from "../db";

export type BookEntity = typeof BooksTable.$inferSelect;
export type UserEntity = typeof UsersTable.$inferSelect;
