import { useState } from 'react';
import { BookItemModel, getSearchedBooks } from '@/server-actions';

type State = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: BookItemModel[] | null;
  error?: string;
};

export function useGetSearchedBooks() {
  const [state, setState] = useState<State>({
    status: 'idle',
    data: null,
  });

  const fetchSearchedBooks = async (keyword: string) => {
    setState({
      status: 'loading',
      data: state.data,
    });

    const { meta, data } = await getSearchedBooks(keyword);

    if (data) {
      setState({
        status: 'success',
        data: data,
      });
    } else {
      setState({
        status: 'error',
        data: null,
        error: meta.message,
      });
    }
  };

  return {
    isLoading: state.status === 'loading',
    books: state.data,
    fetch: fetchSearchedBooks,
  };
}
