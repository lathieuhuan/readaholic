'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { NavMenu } from '../ui';

export const NavBar = () => {
  const params = useParams<{ lang: string }>();

  return (
    <div className="flex">
      <Link href={`/${params.lang}`}>Readaholic</Link>

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
  );
};
