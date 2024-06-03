import { StandardResponse } from '@/types';
import { baseAction } from './base-action';

export type BookItemModel = {
  id: string;
  title: string;
  author: string;
};

export async function getSearchedBooks(
  keyword: string,
): Promise<StandardResponse<BookItemModel[]>> {
  if (keyword) {
    const params = {
      keyword,
      limit: '5',
    };

    return await baseAction<BookItemModel[]>(`/api/book?${new URLSearchParams(params).toString()}`);
  }

  return await new Promise((resolve) =>
    resolve({
      meta: {},
      data: [],
    }),
  );
}
