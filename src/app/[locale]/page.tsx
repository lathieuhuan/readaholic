import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function HomePage({ params }: Props) {
  const t = useTranslations("HomePage");
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div>
      <h1 className="text-4xl text-orange-500 font-bold">{t("title")}</h1>
    </div>
  );
}
