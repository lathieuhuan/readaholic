import { db } from "@/lib/db";
import { BooksTable } from "@/schemas/book";
import { BookAddRequest } from "@/requests/book-request";

export async function addBook(request: BookAddRequest) {
  return await db
    .insert(BooksTable)
    .values({ name: request.name, author: request.author })
    .returning();
}

export async function getBooks() {
  return await db.select().from(BooksTable);
}
