// import type { Metadata } from "next";
import { NavBar, PageFrame } from '@/components/laypout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: "Readaholic",
// };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-dvh`}>
        <NavBar />
        <div className="h-14" />

        <PageFrame>{children}</PageFrame>
      </body>
    </html>
  );
}
