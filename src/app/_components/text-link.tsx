import { ComponentProps } from "react";
import { Link } from "@app/_i18n/navigation";
import { cn } from "@lib/utils/functions";

type TextLinkProps = ComponentProps<typeof Link>;

export function TextLink({ className, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "text-blue-500 font-medium hover:text-blue-600 hover:underline underline-offset-2 visited:text-blue-800",
        className,
      )}
      {...props}
    />
  );
}
