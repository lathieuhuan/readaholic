import clsx from 'clsx';
import Link from 'next/link';
import { constructUrl, ConstructableUrl } from '@/utils/construct-url';

export interface ObviousLinkProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {
  href: ConstructableUrl;
}

export const ObviousLink = ({ className, href, ...rest }: ObviousLinkProps) => {
  return (
    <Link className={clsx('text-[var(--color-link)] hover:underline', className)} {...rest} href={constructUrl(href)} />
  );
};
