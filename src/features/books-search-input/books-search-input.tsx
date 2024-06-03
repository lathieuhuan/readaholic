'use client';
import Link from 'next/link';
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CircleNotch } from '@phosphor-icons/react';

import { useGetSearchedBooks } from '@/hooks/use-get-searched-books';
import { constructUrl } from '@/utils/construct-url';
import { Input } from '@/components/ui/input';
import { Divider } from '@/components/ui/divider';

export const BooksSearchInput = () => {
  const { isLoading, books, fetch } = useGetSearchedBooks();
  const [opened, setOpened] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (formRef.current) {
      const handleClickOutside = (e: MouseEvent) => {
        if (e.target instanceof Node && !formRef.current?.contains(e.target)) {
          setOpened(false);
        }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  useLayoutEffect(() => {
    setOpened(!!books?.length);
  }, [books?.length]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      fetch(e.target.value.trim());
    }, 300);
  }

  function onFocus() {
    if (books?.length) {
      if (!opened) setOpened(true);
    } else {
      const keyword = formRef.current?.querySelector('input')?.value;

      /**
       * after go to the search page, go back to the page containing this component,
       * the input value is still there
       */
      if (keyword) fetch(keyword);
    }
  }

  return (
    <form ref={formRef} action={'/search'} className="relative">
      <Input
        size="small"
        placeholder="Search books"
        name="key"
        onChange={onChange}
        onFocus={onFocus}
        suffix={isLoading ? <CircleNotch size={20} weight="bold" className="animate-spin" /> : null}
      />
      {opened ? (
        <div className="absolute top-full w-full text-sm bg-popover-bg text-popover-fg shadow-popover">
          {books?.map((book) => {
            return (
              <Fragment key={book.id}>
                <Link href={constructUrl(['book', book.id])} prefetch={false}>
                  <div className="p-4 py-2 hover:bg-accent-bg hover:text-accent-fg">
                    <div className="font-semibold">{book.title}</div>
                    <div className="mt-1">{book.author}</div>
                  </div>
                </Link>
                <Divider />
              </Fragment>
            );
          })}
          <button type="submit" className="text-link w-full h-10 flex justify-center items-center">
            See all results
          </button>
        </div>
      ) : null}
    </form>
  );
};
