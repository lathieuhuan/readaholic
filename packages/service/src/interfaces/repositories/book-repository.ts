import { BookEntity } from "../entities";

export type AddBookParams = Pick<BookEntity, "name" | "author">;

export type GetBooksParams = {
  ownerId?: number;
};

export interface IBookRepository {
  //
  addBook(params: AddBookParams): Promise<BookEntity>;

  getBooks(params: GetBooksParams): Promise<BookEntity[]>;
}
