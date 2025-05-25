import { z } from "zod";

export const getBooksSchema = z.object({
  ownerId: z.coerce.number().optional(),
})

export const addBookSchema = z.object({
  name: z.string().min(1),
  author: z.string().min(1),
});

export type GetBooksSchema = z.infer<typeof getBooksSchema>;
export type AddBookSchema = z.infer<typeof addBookSchema>;
