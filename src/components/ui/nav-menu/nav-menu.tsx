import clsx, { ClassValue } from 'clsx';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { constructUrl, ConstructableUrl } from '@/utils/construct-url';
import { Divider } from '../divider';

type NavMenuItemCommonModel = {
  key: string;
  /** For tooltip on hover, if branch is opened, hide this title */
  title?: React.ReactNode;
  label: React.ReactNode;
  /** Default to true of label is string, otherwise default to false */
  withArrow?: boolean;
};

type NavMenuItemLeafModel = NavMenuItemCommonModel & {
  link: ConstructableUrl;
};

type NavMenuItemBranchModel = NavMenuItemCommonModel & {
  heading?: React.ReactNode;
  children: (NavMenuItemLeafModel | 'divider')[];
};

const itemIsBranch = (
  item: NavMenuItemBranchModel | NavMenuItemLeafModel,
): item is NavMenuItemBranchModel => {
  return 'children' in item;
};

export interface NavMenuProps {
  listCls?: ClassValue;
  items: (NavMenuItemBranchModel | NavMenuItemLeafModel)[];
}
export const NavMenu = ({ listCls, items }: NavMenuProps) => {
  const itemCls = 'p-2 rounded hover:bg-accent-bg hover:text-accent-fg';

  return (
    <nav>
      <ul className={clsx('flex', listCls)}>
        {items.map((item) => {
          const isBranch = itemIsBranch(item);
          const { withArrow = isBranch && typeof item.label === 'string' ? true : false } = item;

          return (
            <li key={item.key} className="relative group">
              {isBranch ? (
                <>
                  <span className={`${itemCls} flex gap-1 items-center cursor-default`}>
                    {item.label}
                    {withArrow && <CaretDown size={16} />}
                  </span>

                  <div className="absolute top-full left-0 z-10 p-2 bg-popover-bg text-popover-fg rounded shadow-popover hidden group-hover:block">
                    <ul>
                      {item.children.map((child, childIndex) => {
                        if (child === 'divider') {
                          return (
                            <li key={childIndex} className="my-2">
                              <Divider />
                            </li>
                          );
                        }
                        return (
                          <li key={child.key ?? childIndex}>
                            <Link
                              href={constructUrl(child.link)}
                              className="px-2 py-1 block rounded hover:bg-accent-bg hover:text-accent-fg"
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <Link href={constructUrl(item.link)} className={`${itemCls} block`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
