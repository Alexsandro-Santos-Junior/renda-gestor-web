"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigation";

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

  return (
    <aside className="flex w-48 flex-col bg-white px-1">
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.title} className="mb-1 last:mb-0">
              <Link href={item.href}>
                <div
                  className={`flex items-center gap-2 px-7 py-3  ${
                    isActiveSection(pathname, item.href)
                      ? "bg-green-300 text-white rounded-xl"
                      : "hover:bg-green-100 hover:text-green-600 rounded-xl"
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
    </aside>
  );
}
