import * as BookRepo from "@repositories/book-repository";

export type AddBookRequest = BookRepo.AddBookParams;

export async function addBook(params: AddBookRequest) {
  return await BookRepo.addBook(params);
}

export async function getBooks() {
  return await BookRepo.getBooks();
}
