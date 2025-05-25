import { BooksTable } from "../db";
import { AddBookParams, GetBooksParams, IBookRepository } from "../interfaces/repositories";
import { BaseRepository } from "./base-repository";

export class BookRepository extends BaseRepository implements IBookRepository {
  //
  async addBook(params: AddBookParams) {
    const [book] = await this.db
      .insert(BooksTable)
      .values({ name: params.name, author: params.author })
      .returning();
    return book;
  }

  async getBooks(params: GetBooksParams) {
    return await this.db.select().from(BooksTable);
  }
}
