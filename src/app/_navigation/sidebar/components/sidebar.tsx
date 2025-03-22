'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { cn } from '@/lib/utils';
import { signInPath, signUpPath } from '@/paths';
import { getActivePath } from '@/utils/get-active-path';

import { SidebarItem } from './sidebar-item';

import { navItems } from '../constants';

const Sidebar = () => {
  const { user, isFetched } = useAuth();
  const pathName = usePathname();

  const { activeIndex } = getActivePath(
    pathName,
    navItems.map(navItem => navItem.href),
    [signInPath(), signUpPath()],
  );

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  if (!user || !isFetched) {
    return <div className="bg-secondary/20 w-[78px]" />;
  }

  return (
    <nav
      className={cn(
        'animate-sidebar-from-left',
        'h-screen border-r pt-24',
        isTransition && 'duration-200',
        isOpen ? 'w-[78px] md:w-60' : 'w-[78px]',
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={activeIndex === index}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
