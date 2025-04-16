import { getDomain } from "@/lib/utils";
import AddBook from "./add-book";

export default async function BooksPage() {
  const response = await fetch(`${getDomain()}/api/books`);
  const data = await response.json();

  console.log(data);

  return (
    <div>
      <h1>Books</h1>

      <AddBook />

      <div>
        {data.data.map((book: any) => (
          <p key={book.id}>{book.name} ({book.id})</p>
        ))}
      </div>
    </div>
  );
}

export const runtime = "edge";
