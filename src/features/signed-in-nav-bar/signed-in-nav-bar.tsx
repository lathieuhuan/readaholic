import { User } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { NavMenu } from '@/components/ui/nav-menu';
import { NavBarFrame } from '@/components/layout/nav-bar-frame';
import { BooksSearchInput } from '../books-search-input';

interface SignedInNavBar {
  prePath?: string;
}
export function SignedInNavBar({ prePath = '' }: SignedInNavBar) {
  return (
    <NavBarFrame>
      <div className="flex items-center gap-4">
        <Link href={`/${prePath}`} className="text-2xl font-bold">
          Readaholic
        </Link>

        <div className="py-2">
          <NavMenu
            items={[
              {
                key: 'home',
                label: 'Home',
                link: `/${prePath}`,
              },
              {
                key: 'my-books',
                label: 'My Books',
                link: [prePath, 'my-books'],
              },
              {
                key: 'browse',
                label: 'Browse',
                children: [
                  {
                    key: 'recommendations',
                    label: 'Recommendations',
                    link: [prePath, 'recommendations'],
                  },
                  {
                    key: 'new-releases',
                    label: 'New Releases',
                    link: [prePath, 'new-releases'],
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
                    link: [prePath, 'profile'],
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
    </NavBarFrame>
  );
}
