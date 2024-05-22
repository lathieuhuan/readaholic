import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

type NavMenuItemLeafModel = {
  key?: string;
  label: string;
  link: string;
};

type NavMenuItemBranchModel = {
  key?: string;
  label: string;
  children: NavMenuItemLeafModel[];
};

const itemIsBranch = (
  item: NavMenuItemBranchModel | NavMenuItemLeafModel,
): item is NavMenuItemBranchModel => {
  return 'children' in item;
};

export interface NavMenuProps {
  items: (NavMenuItemBranchModel | NavMenuItemLeafModel)[];
}
export const NavMenu = ({ items }: NavMenuProps) => {
  return (
    <div>
      <ul className="flex">
        {items.map((item, itemIndex) => {
          const isBranch = itemIsBranch(item);

          return (
            <li key={item.key ?? itemIndex} className="relative">
              {isBranch ? (
                <>
                  <button className="px-3 py-2 rounded flex gap-2 items-center">
                    {item.label}
                    <ChevronDown />
                  </button>

                  <div className="absolute top-full left-0">
                    {item.children.map((child, childIndex) => {
                      return (
                        <Link key={child.key ?? childIndex} href={child.link}>
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : (
                <Link href={item.link}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
