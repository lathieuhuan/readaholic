import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import { getUserSession } from "@utils/auth-utils";
import { getBooks } from "@services/book-service";

import { HomePage } from "@features/home-page";
import { WelcomePage } from "@features/welcome-page";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function MainPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return <MainRouter />;
}

// Cannot use async on MainPage because setRequestLocale will cause error
async function MainRouter() {
  const user = await getUserSession();

  if (user) {
    const response = await getBooks({ ownerId: user.userId });

    return <HomePage />;
  }

  return <WelcomePage />;
}
