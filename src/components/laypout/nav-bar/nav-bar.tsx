'use client';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { NavMenu } from '../../ui';
import styles from './nav-bar.module.css';

export const NavBar = () => {
  const params = useParams<{ lang: string }>();

  return (
    <div className={`fixed top-0 w-full z-50 ${styles['nav-bar']}`}>
      <div className={clsx('mx-auto flex items-center gap-4')}>
        <Link href={`/${params.lang}`} className="text-2xl font-bold">
          Readaholic
        </Link>

        <div className="py-2">
          <NavMenu
            items={[
              {
                label: 'Home',
                link: `/${params.lang}`,
              },
              {
                label: 'My Books',
                link: `/${params.lang}/my-books`,
              },
              {
                label: 'Browse',
                children: [
                  {
                    label: 'Recommendations',
                    link: `/${params.lang}/recommendations`,
                  },
                  {
                    label: 'New Releases',
                    link: `/${params.lang}/new-releases`,
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
