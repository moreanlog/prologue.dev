'use client';

import Link from "next/link";
import headerNavLinks from "../../data/headerNavLinks";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const MobileNav = () => {
  return (
    <Menu as="div" className="relative inline-block text-left sm:hidden">
      <div>
        <Menu.Button
          className="inline-flex justify-center px-2 text-sm font-medium"
          aria-label="Navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-zinc-500 dark:text-zinc-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute rounded-md bg-white dark:bg-zinc-800 shadow-lg z-50">
          <div className="py-1 px-3 divide-y text-center divide-zinc-50 dark:divide-zinc-700">
            {headerNavLinks.map((link) => {
              return (
                <div key={link.title} className="py-2">
                  <Menu.Item>
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 text-sm transform duration-400 break-keep"
                    >
                      {link.title}
                    </Link>
                  </Menu.Item>
                </div>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MobileNav;
