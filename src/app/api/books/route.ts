import { addBook, getBooks } from "@/services/book-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, author } = await request.json();
  const [book] = await addBook({ name, author });
  return NextResponse.json({ data: book }, { status: 201 });
}

export async function GET() {
  const books = await getBooks();
  return NextResponse.json({ data: books });
}
