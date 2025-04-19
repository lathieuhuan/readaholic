import { db } from "@/repositories/db";
import { BooksTable } from "@/models/book";
import { BookAddRequest } from "@/types/requests/book-request";

export async function addBook(request: BookAddRequest) {
  return await db
    .insert(BooksTable)
    .values({ name: request.name, author: request.author })
    .returning();
}

export async function getBooks() {
  return await db.select().from(BooksTable);
}
