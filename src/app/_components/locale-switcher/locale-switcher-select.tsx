"use client";

import { Locale } from "next-intl";
import { useParams } from "next/navigation";
import { ReactNode, useTransition } from "react";

import { usePathname, useRouter } from "@app/_hooks/navigation";
import { Select, SelectTrigger, SelectValue } from "@lib/components/select";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <Select defaultValue={defaultValue} disabled={isPending} onValueChange={onSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      {children}
    </Select>
  );
}
