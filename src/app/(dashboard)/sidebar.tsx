"use client";

import Image from "next/image";
import { navigationItems } from "./navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

const isActiveSection = (currentPath: string, sectionPath: string) => {
  if (sectionPath === "/") {
    return currentPath === "/";
  }

  return (
    currentPath === sectionPath || currentPath.startsWith(`${sectionPath}/`)
  );
};

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="flex w-72 flex-col border-r bg-blue-100">
      <div className="mx-8 mt-12 flex h-20 items-center justify-center">
        <Image
          className="dark:invert"
          src="/logo-name.svg"
          alt="logo"
          width={300}
          height={100}
          priority
        />
      </div>

      <nav className="flex-1 overflow-y-auto pt-8">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.title}>
              <Link href={item.href}>
                <div
                  className={`flex items-center gap-2 px-8 py-3  ${
                    isActiveSection(pathname, item.href)
                      ? "bg-green-300 text-white"
                      : "hover:bg-green-100 hover:text-green-600"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-base">{item.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="border-t p-8 border-slate-100">
        <div className="flex flex-col">
          {user ? (
            <>
              <div className="mb-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent">
                  <UserButton />
                </div>

                <span className="text-sm font-medium text-black">
                  {user.fullName}
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhum utilizador encontrado.
            </p>
          )}
        </div>
      </section>
    </aside>
  );
}
