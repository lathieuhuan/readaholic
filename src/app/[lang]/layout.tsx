import type { Metadata } from 'next';
import { i18nConfig } from '@/internationalization';
import './globals.css';

export const metadata: Metadata = {
  title: 'Readaholic',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => {
    console.log('locale', locale);

    return { locale };
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
