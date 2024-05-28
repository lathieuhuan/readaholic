// import { Button } from '@/components/ui/button';
import { Bookshelves } from '@/features/bookshelves';
import { CurrentlyReading } from '@/features/currently-reading';
import { PageProps } from './types';
import { Divider } from '@/components/ui/divider';
import initTranslations from '@/internationalization';
import TranslationsProvider from '@/components/providers/translations-provider';

export default async function Home({ params: { lang } }: PageProps) {
  const { t, options, services } = await initTranslations(lang);

  return (
    <TranslationsProvider
      locale={lang}
      namespaces={options.ns}
      resources={services.resourceStore.data}
    >
      <main className="flex gap-4">
        <div className="w-72 space-y-4">
          <CurrentlyReading />
          <Divider />
          <Bookshelves />
        </div>

        <div className="grow">{t('UPDATES')}</div>

        <div className="w-72">News & Interviews</div>
      </main>
    </TranslationsProvider>
  );
}
