// import { Button } from '@/components/ui/button';
import { Bookshelves } from '@/features/bookshelves';
import { CurrentlyReading } from '@/features/currently-reading';
import { PageProps } from './types';
import { Divider } from '@/components/ui/divider';

export default function Home({ params: { lang } }: PageProps) {
  return (
    <main className="flex">
      <div className="w-80 space-y-4">
        <CurrentlyReading lang={lang} />
        <Divider />
        <Bookshelves />
      </div>

      <div className="grow">Updates</div>

      <div className="w-80">News & Interviews</div>
    </main>
  );
}
