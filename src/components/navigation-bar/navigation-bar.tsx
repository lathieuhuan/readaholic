import { useTranslations } from "next-intl";
import { NavigationItem } from "./navigation-item";
import { UserEntry } from "./user-entry";

export default function NavigationBar() {
  const t = useTranslations("Navigation");

  return (
    <div className="bg-gray-900 flex items-center">
      <NavigationItem href="/">{t("home")}</NavigationItem>
      <NavigationItem href="/settings">{t("settings")}</NavigationItem>

      <UserEntry className="ml-auto" />
    </div>
  );
}
