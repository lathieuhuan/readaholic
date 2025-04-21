import { db } from "@/db";
import { BooksTable, type BookEntity } from "@/db/book";

export type AddBookParams = Pick<BookEntity, "name" | "author">;

export async function addBook(params: AddBookParams) {
  return await db
    .insert(BooksTable)
    .values({ name: params.name, author: params.author })
    .returning();
}

export async function getBooks() {
  return await db.select().from(BooksTable);
}
