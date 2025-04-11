import { useTranslations } from "next-intl";
import NavigationItem from "./navigation-item";

export default function NavigationBar() {
  const t = useTranslations("Navigation");

  return (
    <div className="bg-gray-900">
      <NavigationItem href="/">{t("home")}</NavigationItem>
      <NavigationItem href="/settings">{t("settings")}</NavigationItem>
    </div>
  );
}
