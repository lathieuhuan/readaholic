import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Readaholic',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}