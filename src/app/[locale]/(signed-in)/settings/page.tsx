import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import { LocaleSwitcher } from "@app/_components/locale-switcher";
import { UserProfile } from "./user-profile";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function SettingsPage({ params }: Props) {
  const t = useTranslations("SettingsPage");
  const { locale } = use(params);

  setRequestLocale(locale);

  return (
    <div>
      <h1>{t("title")}</h1>

      <div>
        <LocaleSwitcher />
      </div>

      <UserProfile />
    </div>
  );
}
