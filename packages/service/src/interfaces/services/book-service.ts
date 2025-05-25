import { BookEntity } from "../entities";
import { AddBookParams, GetBooksParams } from "../repositories";
import { ServiceResponse } from "./base-response";

export type AddBookRequest = AddBookParams;

export type AddBookResponse = ServiceResponse<BookEntity>;

export type GetBooksRequest = GetBooksParams;

export type GetBooksResponse = ServiceResponse<BookEntity[]>;
