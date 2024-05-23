'use client';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
  const [activeBranch, setActiveBranch] = useState('');
  const itemCls = 'px-3 py-2 rounded hover:bg-accent-bg hover:text-accent-fg';

  const onClickBranch = (branchKey: string) => {
    setActiveBranch(activeBranch === branchKey ? '' : branchKey);
  };

  return (
    <div>
      <ul className="flex">
        {items.map((item, itemIndex) => {
          const isBranch = itemIsBranch(item);

          return (
            <li key={item.key ?? itemIndex} className="relative">
              {isBranch ? (
                <>
                  <button
                    className={`${itemCls} flex gap-1 items-center`}
                    onClick={() => onClickBranch(item.key ?? item.label)}
                  >
                    {item.label}
                    <ChevronDown size={16} />
                  </button>

                  {activeBranch && (
                    <div className="absolute top-full left-0 z-10 p-2 bg-popover-bg text-popover-fg rounded shadow-popover">
                      <ul>
                        {item.children.map((child, childIndex) => {
                          return (
                            <li key={child.key ?? childIndex}>
                              <Link href={child.link} className="px-2 py-1 block hover:underline">
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.link} className={`${itemCls} block`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
