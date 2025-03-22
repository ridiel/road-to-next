import { ReactElement } from 'react';

export interface NavItem {
  title: string;
  href: string;
  icon: ReactElement & { props: { className?: string } };
  separator?: boolean;
}
