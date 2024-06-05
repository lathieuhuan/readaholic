import initTranslations from '@/internationalization';
import { Bookshelves } from '@/features/bookshelves';
import { CurrentlyReading } from '@/features/currently-reading';
import { Divider } from '@/components/ui/divider';
import { TranslationsProvider } from '@/components/providers/translations-provider';
import { PageProps } from './types';

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
