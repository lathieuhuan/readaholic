import { baseProcedure } from "@procedures/base-procedure";
import { addBookSchema, getBooksSchema } from "@validation-schemas/book-schemas";
import { validateBody, validateQueryParams } from "@procedures/add-ons";

export const GET = baseProcedure
  .interceptRequest(validateQueryParams(getBooksSchema))
  .createHandler(async (_, ctx) => {
    return await ctx.bookService.getBooks(ctx.queryParams);
  });

export const POST = baseProcedure
  .interceptRequest(validateBody(addBookSchema))
  .createHandler(async (_, ctx) => {
    return await ctx.bookService.addBook(ctx.body);
  });
