import { IBookRepository } from "../interfaces/repositories";
import { AddBookRequest, AddBookResponse, GetBooksRequest, GetBooksResponse, SuccessResponse } from "../interfaces/services";
import { CatchErrors } from "./decorators";

export class BookService {
  constructor(private readonly bookRepository: IBookRepository) {}

  @CatchErrors
  async addBook(request: AddBookRequest): Promise<AddBookResponse> {
    const book = await this.bookRepository.addBook(request);
    return new SuccessResponse(book);
  }

  @CatchErrors
  async getBooks(request: GetBooksRequest): Promise<GetBooksResponse> {
    const books = await this.bookRepository.getBooks(request);
    return new SuccessResponse(books);
  }
}
