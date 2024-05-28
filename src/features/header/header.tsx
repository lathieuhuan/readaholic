import { User } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { NavMenu } from '@/components/ui/nav-menu';
import { BooksSearchInput } from '../books-search-input';
import styles from './header.module.css';

export function Header() {
  return (
    <div className={`fixed top-0 w-full z-50 ${styles.header}`}>
      <div className="flex items-center gap-4">
        <Link href={`/`} className="text-2xl font-bold">
          Readaholic
        </Link>

        <div className="py-2">
          <NavMenu
            items={[
              {
                key: 'home',
                label: 'Home',
                link: `/`,
              },
              {
                key: 'my-books',
                label: 'My Books',
                link: 'my-books',
              },
              {
                key: 'browse',
                label: 'Browse',
                children: [
                  {
                    key: 'recommendations',
                    label: 'Recommendations',
                    link: 'recommendations',
                  },
                  {
                    key: 'new-releases',
                    label: 'New Releases',
                    link: 'new-releases',
                  },
                ],
              },
            ]}
          />
        </div>

        <BooksSearchInput />

        <div className="ml-auto">
          <NavMenu
            items={[
              {
                key: 'profile',
                label: <User weight="bold" size={24} />,
                children: [
                  {
                    key: 'profile',
                    label: 'Profile',
                    link: 'profile',
                  },
                  'divider',
                  {
                    key: 'signout',
                    label: 'Sign out',
                    link: '',
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
