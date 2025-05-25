import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import { HttpSetup } from "@components/http-setup";
import { QueryClientProvider } from "@components/query-client-provider";
import { routing } from "@config/next-intl/routing";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Readaholic",
  description: "Readaholic",
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <HttpSetup locale={locale} />
          <QueryClientProvider>
            <Toaster expand richColors position="top-right" />
            {children}
          </QueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
