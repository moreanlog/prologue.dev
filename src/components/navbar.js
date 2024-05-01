"use client";

import headerNavLinks from "../../data/headerNavLinks";
import ThemeSwitch from "./themeswitch";
import MobileNav from "./mobilenav";
import Link from "next/link";
import siteMetadata from "../../data/sitemetadata";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className={`top-0 py-2 sticky z-10 bg-white dark:bg-black backdrop-blur bg-opacity-[88.6%] border-b border-zinc-50 dark:border-zinc-800 px-4`}
    >
      <div className="max-w-7xl mx-auto items-center flex justify-between">
        <div>
          <Link href="/" aria-label={siteMetadata.publishName}>
            <div className="flex items-center justify-between">
              <div className="text-xl whitespace-nowrap font-semibold rounded-lg sm:block text-zinc-800 hover:bg-zinc-50 dark:hover:bg-slate-900 dark:text-zinc-200 select-none tracking-tight transition px-3 py-1 duration-400">
                {siteMetadata.publishName}
              </div>
            </div>
          </Link>
        </div>
        <nav className="flex items-center text-base leading-6">
          <div className="hidden sm:block" tabIndex="0">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={`rounded-lg px-3 py-2 font-normal  hover:bg-zinc-50 hover:text-cyan-500 dark:hover:bg-slate-900 transition trasnform duration-400 select-none ${
                  pathname == link.href
                    ? "text-cyan-500 font-semibold"
                    : "text-zinc-500 dark:text-zinc-300"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center text-base leading-5">
          <MobileNav />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
