import { NextResponse, type NextRequest } from 'next/server';
import type { BookItemModel } from '@/server-actions';

import { delay } from '@/utils/delay';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

const books: BookItemModel[] = [
  { id: '0', title: 'A Song of Ice and Fire', author: 'G. Martin' },
  { id: '1', title: 'The Hobbit', author: 'Tolkien' },
  { id: '2', title: 'Harry Porter', author: 'J.K. Rowling' },
];

export async function GET(request: NextRequest) {
  await delay();

  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (keyword) {
    const searchKw = keyword.toLowerCase();

    return NextResponse.json({
      data: books.filter((book) => book.title.toLowerCase().includes(searchKw)),
    });
  }

  return NextResponse.json({
    data: books,
  });
}
