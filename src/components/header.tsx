import { Sticker } from "lucide-react";
import Link from "next/link";

import { ticketsPath } from "@/paths";
import { homePath } from "@/paths";

import { ThemeSwitcher } from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";

export const Header = () => {
  return (
    <nav className="flex fixed left-0 right-0 top-0 z-20 justify-between py-2.5 px-5 border-b backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <Sticker />
          <h1 className="text-lg font-bold">TicketApp</h1>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
};
