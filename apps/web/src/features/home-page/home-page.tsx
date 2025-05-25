"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Button } from "@lib/components/button";
import { logout } from "@services/auth-service";

export function HomePage() {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const handleLogout = () => {
    logout().then(router.refresh);
  };

  return (
    <div>
      <h1>{t("title")}</h1>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
