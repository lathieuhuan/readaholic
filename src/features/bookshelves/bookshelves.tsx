import { ObviousLink } from '@/components/ui/obvious-link';

type ShelfModel = {
  id: string;
  label: string;
  bookCount: number;
};

export function Bookshelves() {
  const shelves: ShelfModel[] = [
    {
      id: '0',
      label: 'Want to Read',
      bookCount: 0,
    },
    {
      id: '1',
      label: 'Currently Reading',
      bookCount: 0,
    },
    {
      id: '2',
      label: 'Already Read',
      bookCount: 0,
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold">Bookshelves</h3>

      <ul className="space-y-1">
        {shelves.map((shelf) => {
          return (
            <li key={shelf.id} className="flex gap-1">
              <span className="truncate">
                <ObviousLink href={['user_shelf', shelf.id]}>{shelf.label}</ObviousLink>
              </span>
              <span>({shelf.bookCount})</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
