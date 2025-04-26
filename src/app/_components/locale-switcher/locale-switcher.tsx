import { useLocale, useTranslations } from "next-intl";

import { routing } from "@app/_configs/next-intl/routing";
import { SelectContent, SelectItem } from "@lib/components/select";
import { LocaleSwitcherSelect } from "./locale-switcher-select";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      <SelectContent>
        {routing.locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </SelectItem>
        ))}
      </SelectContent>
    </LocaleSwitcherSelect>
  );
}
