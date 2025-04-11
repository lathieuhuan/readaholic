import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <h1 className="text-4xl text-orange-500 font-bold">{t("title")}</h1>
    </div>
  );
}
