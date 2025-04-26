"use client";

import { Button } from "@lib/components/button";
import { redirect } from "@app/_utils/navigation";

export function UserEntry(props: { className?: string }) {
  const onClickLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      redirect({ href: "/", locale: "en" });
    }
  };

  return (
    <div className={props.className}>
      <Button onClick={onClickLogout}>Logout</Button>
    </div>
  );
}
