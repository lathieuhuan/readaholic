// import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Header } from '@/features/header';
import { PageFrame } from '@/components/layout/page-frame';
import { LayoutProps } from './types';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: "Readaholic",
// };

export default function Layout({ children, params }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-dvh`}>
        <Header prePath={params.lang} />
        <div className="h-14" />

        <PageFrame>{children}</PageFrame>
      </body>
    </html>
  );
}
